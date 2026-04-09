import { NextRequest, NextResponse } from "next/server"

// MCP endpoint and token from env
const MCP_URL = process.env.STAPE_GA4_MCP_URL || "https://mcp-ga.stape.ai/mcp"
const MCP_AUTH_TOKEN = process.env.STAPE_GA4_MCP_AUTH_TOKEN || undefined





export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { question?: string }
    const question = body.question?.trim()

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 })
    }

    // Prepare MCP payload
    const payload = {
      question,
      property_id: process.env.GA4_PROPERTY_ID,
      service_account: process.env.GA4_SERVICE_ACCOUNT_JSON ? JSON.parse(process.env.GA4_SERVICE_ACCOUNT_JSON) : undefined,
      measurement_id: process.env.GA4_MEASUREMENT_ID,
      api_secret: process.env.GA4_API_SECRET,
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (MCP_AUTH_TOKEN) headers["Authorization"] = `Bearer ${MCP_AUTH_TOKEN}`

    // Forward to MCP
    const mcpRes = await fetch(MCP_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    const mcpJson = await mcpRes.json()
    if (!mcpRes.ok) {
      return NextResponse.json({ error: mcpJson.error || "MCP error" }, { status: mcpRes.status })
    }

    // Return MCP's answer as-is (or adapt as needed)
    return NextResponse.json({ answer: mcpJson })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unexpected server error" }, { status: 500 })
  }
}
