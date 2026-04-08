import { NextRequest, NextResponse } from "next/server"
import { Client, StdioClientTransport, StreamableHTTPClientTransport } from "@modelcontextprotocol/client"
import fs from "node:fs/promises"
import path from "node:path"

type Intent = "sessions" | "top_pages" | "top_country" | "events" | "general"

type ToolInfo = {
  name: string
  description?: string
  inputSchema?: {
    required?: string[]
    [key: string]: unknown
  }
}

const detectIntent = (question: string): Intent => {
  const q = question.toLowerCase()
  if ((q.includes("session") || q.includes("traffic")) && (q.includes("7") || q.includes("week"))) {
    return "sessions"
  }
  if (q.includes("top") && (q.includes("page") || q.includes("pageview") || q.includes("pages"))) {
    return "top_pages"
  }
  if (q.includes("country") || q.includes("location") || q.includes("geo")) {
    return "top_country"
  }
  if (q.includes("event") || q.includes("conversion") || q.includes("realtime")) {
    return "events"
  }
  return "general"
}

const extractTopN = (question: string, fallback = 10) => {
  const m = question.toLowerCase().match(/top\s+(\d{1,2})/)
  if (!m) return fallback
  const n = Number.parseInt(m[1] || "", 10)
  return Number.isFinite(n) ? Math.max(1, Math.min(25, n)) : fallback
}

const inferDateRange = (question: string) => {
  const q = question.toLowerCase()
  if (q.includes("last 7") || q.includes("this week") || q.includes("past week")) {
    return { start_date: "7daysAgo", end_date: "today" }
  }
  if (q.includes("last 30") || q.includes("past month")) {
    return { start_date: "30daysAgo", end_date: "today" }
  }
  if (q.includes("last 90") || q.includes("past 3 month")) {
    return { start_date: "90daysAgo", end_date: "today" }
  }
  if (q.includes("this month")) {
    return { start_date: "firstDayOfMonth", end_date: "today" }
  }
  if (q.includes("today")) {
    return { start_date: "today", end_date: "today" }
  }
  if (q.includes("yesterday")) {
    return { start_date: "yesterday", end_date: "yesterday" }
  }
  return { start_date: "365daysAgo", end_date: "today" }
}

const inferMetrics = (question: string) => {
  const q = question.toLowerCase()
  const metrics: string[] = []

  if (q.includes("session") || q.includes("traffic")) metrics.push("sessions")
  if (q.includes("user")) metrics.push("activeUsers")
  if (q.includes("pageview") || q.includes("page view") || q.includes("views")) metrics.push("screenPageViews")
  if (q.includes("event")) metrics.push("eventCount")
  if (q.includes("engagement")) metrics.push("engagementRate")
  if (q.includes("bounce")) metrics.push("bounceRate")

  if (!metrics.length) metrics.push("sessions")
  return [...new Set(metrics)]
}

const inferDimensions = (question: string, intent: Intent) => {
  const q = question.toLowerCase()

  if (q.includes("country")) return ["country"]
  if (q.includes("city")) return ["city"]
  if (q.includes("source") || q.includes("channel") || q.includes("medium")) return ["sourceMedium"]
  if (q.includes("page") || q.includes("landing")) return ["pagePath"]
  if (q.includes("event")) return ["eventName"]
  if (q.includes("device")) return ["deviceCategory"]

  if (intent === "top_country") return ["country"]
  if (intent === "top_pages") return ["pagePath"]
  if (intent === "events") return ["eventName"]

  return ["date"]
}

const isRealtimeQuestion = (question: string) => {
  const q = question.toLowerCase()
  return q.includes("realtime") || q.includes("real-time") || q.includes("right now") || q.includes("active users now")
}

const wantsNoBreakdown = (question: string) => {
  const q = question.toLowerCase()
  return (
    q.includes("no breakdown") ||
    q.includes("without breakdown") ||
    q.includes("total active users") ||
    q.includes("overall active users")
  )
}

const isActiveUsersQuestion = (question: string) => {
  const q = question.toLowerCase()
  return q.includes("active user") || (q.includes("how many") && q.includes("user"))
}

const pickBestTool = (tools: ToolInfo[], intent: Intent) => {
  const runReportTool = tools.find((tool) => tool.name.toLowerCase() === "run_report")
  const runRealtimeTool = tools.find((tool) => tool.name.toLowerCase() === "run_realtime_report")

  if (intent === "sessions" || intent === "top_pages" || intent === "top_country") {
    if (runReportTool) return runReportTool
  }

  if (intent === "events") {
    if (runReportTool) return runReportTool
    if (runRealtimeTool) return runRealtimeTool
  }

  const keywordMap: Record<Intent, string[]> = {
    sessions: ["session", "traffic", "source", "report", "query", "overview"],
    top_pages: ["page", "content", "landing", "view", "performance", "report"],
    top_country: ["country", "location", "geo", "user", "behavior", "report"],
    events: ["event", "conversion", "funnel", "realtime", "report"],
    general: ["report", "query", "analytics", "overview"],
  }

  const keywords = keywordMap[intent]
  let best: ToolInfo | undefined
  let bestScore = -1

  for (const tool of tools) {
    const hay = `${tool.name} ${tool.description || ""}`.toLowerCase()
    const score = keywords.reduce((acc, keyword) => acc + (hay.includes(keyword) ? 1 : 0), 0)
    if (score > bestScore) {
      best = tool
      bestScore = score
    }
  }

  return best || tools[0]
}

const withKnownRequiredFields = (
  args: Record<string, unknown>,
  tool: ToolInfo,
  ga4PropertyId?: string,
  question?: string,
) => {
  const next = { ...args }
  const required = tool.inputSchema?.required || []

  for (const field of required) {
    const key = field.toLowerCase()
    if (next[field] !== undefined) continue

    if ((key.includes("property") || key.includes("ga4")) && ga4PropertyId) {
      next[field] = ga4PropertyId
    } else if (key.includes("date_range") && !next[field]) {
      next[field] = [{ start_date: "30daysAgo", end_date: "today" }]
    } else if (key.includes("dimension") && !next[field]) {
      next[field] = ["country"]
    } else if (key.includes("metric") && !next[field]) {
      next[field] = ["activeUsers"]
    } else if (key.includes("question") && question) {
      next[field] = question
    } else if (key.includes("query") && question) {
      next[field] = question
    } else if (key.includes("limit")) {
      next[field] = next[field] || 5
    }
  }

  return next
}

const buildCandidateArgs = (intent: Intent, question: string) => {
  const dateRange = inferDateRange(question)
  const metrics = inferMetrics(question)
  const dimensions = inferDimensions(question, intent)
  const limit = extractTopN(question, 10)

  if (isRealtimeQuestion(question)) {
    const realtimeMetrics = metrics.includes("activeUsers") ? metrics : ["activeUsers"]
    if (wantsNoBreakdown(question) || isActiveUsersQuestion(question)) {
      return [
        {
          dimensions: ["country"],
          metrics: ["activeUsers"],
          limit: 10,
        },
        {
          dimensions: ["deviceCategory"],
          metrics: realtimeMetrics,
          limit: 10,
        },
      ]
    }

    const realtimeDims = intent === "events" ? ["eventName"] : dimensions
    const realtimePrimaryMetrics = intent === "events" ? ["eventCount"] : realtimeMetrics

    return [
      {
        dimensions: realtimeDims,
        metrics: realtimePrimaryMetrics,
        limit,
      },
      {
        dimensions: ["eventName"],
        metrics: ["eventCount"],
        limit,
      },
      {
        dimensions: ["country"],
        metrics: ["activeUsers"],
        limit,
      },
    ]
  }

  const commonReport = {
    date_ranges: [dateRange],
    dimensions,
    metrics,
    limit,
  }

  if (intent === "sessions") {
    return [
      {
        ...commonReport,
      },
      {
        date_ranges: [{ start_date: "90daysAgo", end_date: "today" }],
        dimensions: ["country"],
        metrics: ["sessions"],
      },
      {},
    ]
  }

  if (intent === "top_pages") {
    return [
      {
        date_ranges: [dateRange],
        dimensions: ["unifiedPagePathScreen"],
        metrics: ["views"],
        limit,
      },
      {
        date_ranges: [dateRange],
        dimensions: ["pageTitle"],
        metrics: ["views"],
        limit,
      },
      {
        date_ranges: [{ start_date: "90daysAgo", end_date: "today" }],
        dimensions: ["pagePath"],
        metrics: ["screenPageViews"],
        limit: 5,
      },
      {
        date_ranges: [{ start_date: "365daysAgo", end_date: "today" }],
        dimensions: ["pageTitle"],
        metrics: ["views"],
        limit: 5,
      },
      {},
    ]
  }

  if (intent === "top_country") {
    return [
      {
        ...commonReport,
      },
      {},
    ]
  }

  if (intent === "events") {
    return [
      {
        ...commonReport,
      },
      {},
    ]
  }

  return [
    {
      ...commonReport,
    },
    {
      date_ranges: [dateRange],
      dimensions: ["country"],
      metrics: ["activeUsers"],
      limit,
    },
    { query: question },
  ]
}

const formatToolResult = (result: unknown) => {
  const data = result as {
    content?: Array<{ type?: string; text?: string;[key: string]: unknown }>
    structuredContent?: unknown
  }

  const textParts = (data.content || [])
    .map((item) => {
      if (item.type === "text" && typeof item.text === "string") return item.text
      return JSON.stringify(item)
    })
    .filter(Boolean)

  const structured = data.structuredContent
    ? `\n\nStructured data:\n${JSON.stringify(data.structuredContent, null, 2)}`
    : ""

  return `${textParts.join("\n") || "No textual output."}${structured}`
}

const isAuthError = (message: string) => {
  const m = message.toLowerCase()
  return (
    m.includes("authentication required") ||
    m.includes("invalid_token") ||
    m.includes("unauthorized") ||
    m.includes("401")
  )
}

const normalizePrivateKey = (key: string) => key.replace(/\\n/g, "\n")

const parseServiceAccount = () => {
  const raw = process.env.GA4_SERVICE_ACCOUNT_JSON
  if (!raw) return undefined

  try {
    const parsed = JSON.parse(raw) as { client_email?: string; private_key?: string }
    if (parsed.private_key) parsed.private_key = normalizePrivateKey(parsed.private_key)
    return parsed
  } catch {
    return undefined
  }
}

export async function POST(request: NextRequest) {
  let client: Client | undefined
  let tempServiceAccountPath: string | undefined
  try {
    const body = (await request.json()) as { question?: string; mcpAuthToken?: string }
    const question = body.question?.trim()

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 })
    }

    const mcpUrl = process.env.STAPE_GA4_MCP_URL?.trim()
    const mcpToken =
      body.mcpAuthToken?.trim() ||
      process.env.STAPE_GA4_MCP_AUTH_TOKEN ||
      process.env.MCP_AUTH_TOKEN
    const ga4PropertyId = process.env.GA4_PROPERTY_ID

    client = new Client({ name: "bfsi-ga4-chat", version: "1.0.0" }, { capabilities: {} })

    let transport: StreamableHTTPClientTransport | StdioClientTransport

    if (mcpUrl && mcpToken) {
      transport = new StreamableHTTPClientTransport(new URL(mcpUrl), {
        authProvider: {
          token: async () => mcpToken,
        },
      })
    } else {
      const serviceAccount = parseServiceAccount()
      const childEnv: Record<string, string> = Object.fromEntries(
        Object.entries(process.env).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
      )

      if (serviceAccount) {
        tempServiceAccountPath = path.join("/tmp", `ga4-sa-${Date.now()}.json`)
        await fs.writeFile(tempServiceAccountPath, JSON.stringify(serviceAccount), "utf8")
        childEnv.GOOGLE_APPLICATION_CREDENTIALS = tempServiceAccountPath
      }

      transport = new StdioClientTransport({
        command: "node",
        args: [path.join(process.cwd(), "node_modules/ga4-mcp/dist/server.js"), "--tools", "ga4"],
        env: childEnv,
      })
    }

    await client.connect(transport)

    const listed = await client.listTools()
    const tools = listed.tools as ToolInfo[]

    if (!tools.length) {
      return NextResponse.json(
        {
          error: "Connected to MCP, but no tools were returned by the server.",
        },
        { status: 502 },
      )
    }

    const intent = detectIntent(question)
    const chosenTool = isRealtimeQuestion(question)
      ? tools.find((tool) => tool.name === "run_realtime_report") || pickBestTool(tools, intent)
      : pickBestTool(tools, intent)
    const candidateArgs = buildCandidateArgs(intent, question)

    let lastError = ""
    for (const rawArgs of candidateArgs) {
      const args = withKnownRequiredFields(rawArgs, chosenTool, ga4PropertyId, question)

      // If property_id is missing but required, and we still don't have it, throw a helpful error
      const required = chosenTool.inputSchema?.required || []
      if (required.some(f => f.toLowerCase().includes("property")) && !args.property_id && !args.propertyId) {
        throw new Error("GA4_PROPERTY_ID is not configured in the environment variables.")
      }

      try {
        const toolResult = await client.callTool({
          name: chosenTool.name,
          arguments: args,
        })

        const formattedToolResult = formatToolResult(toolResult)

        const answer = [
          `MCP tool used: ${chosenTool.name}`,
          `Intent detected: ${intent}`,
          `Arguments: ${JSON.stringify(args)}`,
          "",
          formattedToolResult,
        ].join("\n")

        if (
          answer.includes("MCP error") ||
          answer.includes("Failed to execute tool") ||
          answer.toLowerCase().includes("invalid request parameters") ||
          answer.toLowerCase().includes("unknown dimension") ||
          answer.toLowerCase().includes("unknown metric")
        ) {
          throw new Error(answer)
        }

        return NextResponse.json({ answer })
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error)
      }
    }

    return NextResponse.json(
      {
        error: `Connected to MCP but tool execution failed. Last error: ${lastError || "Unknown error"}`,
      },
      { status: 502 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error"

    return NextResponse.json(
      {
        error: isAuthError(message)
          ? "GA4 MCP authentication failed. Provide STAPE_GA4_MCP_AUTH_TOKEN for remote MCP, or use local GA4 MCP with GA4_SERVICE_ACCOUNT_JSON configured."
          : message,
      },
      { status: 500 },
    )
  } finally {
    if (client) {
      try {
        await client.close()
      } catch {
        // no-op
      }
    }
    if (tempServiceAccountPath) {
      try {
        await fs.unlink(tempServiceAccountPath)
      } catch {
        // no-op
      }
    }
  }
}
