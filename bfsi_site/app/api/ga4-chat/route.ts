import { NextRequest, NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { AnalyticsAdminServiceClient } from "@google-analytics/admin"
import { searchconsole_v1 } from "@googleapis/searchconsole"
import { GoogleAuth } from "google-auth-library"

type Intent = "sessions" | "top_pages" | "top_country" | "events" | "property_metadata" | "general"

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
  if (q.includes("property name") || q.includes("account info") || q.includes("what is the name") || q.includes("which property")) {
    return "property_metadata"
  }
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
  if (intent === "property_metadata") return { name: "get_property" } as ToolInfo

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
    property_metadata: ["property", "account", "name", "info"],
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
  if (intent === "property_metadata") return [{}]

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
    ]
  }

  if (intent === "top_country") {
    return [
      {
        ...commonReport,
      }
    ]
  }

  if (intent === "events") {
    return [
      {
        ...commonReport,
      }
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
    }
  ]
}

const formatToolResult = (result: any) => {
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

async function executeGa4Tool(
  toolName: string,
  args: any,
  auth: GoogleAuth,
  propertyId?: string
): Promise<any> {
  const pid = args.property_id || args.propertyId || propertyId
  if (!pid && toolName !== "ping" && toolName !== "get_account_summaries") {
    throw new Error("GA4_PROPERTY_ID is required for this tool.")
  }

  const formattedPid = pid?.toString().startsWith("properties/") ? pid : `properties/${pid}`

  switch (toolName) {
    case "ping":
      return { content: [{ type: "text", text: "pong" }] }

    case "get_property": {
      const client = new AnalyticsAdminServiceClient({ auth })
      const [property] = await client.getProperty({ name: formattedPid })
      return { content: [{ type: "text", text: JSON.stringify(property, null, 2) }] }
    }

    case "run_report": {
      const client = new BetaAnalyticsDataClient({ auth })
      const [response] = await client.runReport({
        property: formattedPid,
        dateRanges: args.date_ranges?.map((dr: any) => ({
          startDate: dr.start_date || dr.startDate,
          endDate: dr.end_date || dr.endDate,
        })),
        dimensions: args.dimensions?.map((d: string) => ({ name: d })),
        metrics: args.metrics?.map((m: string) => ({ name: m })),
        limit: args.limit,
        offset: args.offset,
        dimensionFilter: args.dimension_filter,
        metricFilter: args.metric_filter,
      })
      return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] }
    }

    case "run_realtime_report": {
      const client = new BetaAnalyticsDataClient({ auth })
      const [response] = await client.runRealtimeReport({
        property: formattedPid,
        dimensions: args.dimensions?.map((d: string) => ({ name: d })),
        metrics: args.metrics?.map((m: string) => ({ name: m })),
        limit: args.limit,
        dimensionFilter: args.dimension_filter,
        metricFilter: args.metric_filter,
      })
      return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] }
    }

    case "get_account_summaries": {
      const client = new AnalyticsAdminServiceClient({ auth })
      const summaries: any[] = []
      const iterable = client.listAccountSummariesAsync({})
      for await (const summary of iterable) {
        summaries.push(summary)
      }
      return { content: [{ type: "text", text: JSON.stringify(summaries, null, 2) }] }
    }

    default:
      throw new Error(`Tool ${toolName} is not yet implemented in direct mode.`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { question?: string }
    const question = body.question?.trim()

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 })
    }

    const ga4PropertyId = process.env.GA4_PROPERTY_ID
    const serviceAccount = parseServiceAccount()

    if (!serviceAccount) {
      return NextResponse.json(
        { error: "GA4_SERVICE_ACCOUNT_JSON is not configured." },
        { status: 500 }
      )
    }

    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    })

    const intent = detectIntent(question)
    const isRealtime = isRealtimeQuestion(question)
    const toolName = intent === "property_metadata" ? "get_property" : (isRealtime ? "run_realtime_report" : "run_report")
    const candidateArgs = buildCandidateArgs(intent, question)

    // Mock ToolInfo for withKnownRequiredFields logic
    const mockTool: ToolInfo = {
      name: toolName,
      inputSchema: { required: ["property_id", "date_ranges", "dimensions", "metrics"] }
    }

    let lastError = ""
    for (const rawArgs of candidateArgs) {
      const args = withKnownRequiredFields(rawArgs, mockTool, ga4PropertyId, question)

      try {
        const result = await executeGa4Tool(toolName, args, auth, ga4PropertyId)
        const formattedToolResult = formatToolResult(result)

        const answer = [
          `Tool used: ${toolName}`,
          `Intent detected: ${intent}`,
          `Arguments: ${JSON.stringify(args)}`,
          "",
          formattedToolResult,
        ].join("\n")

        return NextResponse.json({ answer })
      } catch (error: any) {
        lastError = error.message
      }
    }

    return NextResponse.json(
      { error: `Tool execution failed. Last error: ${lastError}` },
      { status: 502 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unexpected server error" },
      { status: 500 }
    )
  }
}
