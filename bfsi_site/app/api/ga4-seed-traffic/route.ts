import { NextResponse } from "next/server"

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect"

function randomClientId() {
  return `${Math.floor(Math.random() * 1_000_000_000)}.${Date.now()}`
}

export async function POST() {
  try {
    const measurementId = process.env.GA4_MEASUREMENT_ID
    const apiSecret = process.env.GA4_API_SECRET

    if (!measurementId || !apiSecret) {
      return NextResponse.json(
        {
          error: "Missing GA4_MEASUREMENT_ID or GA4_API_SECRET in environment.",
        },
        { status: 400 },
      )
    }

    const now = Date.now()
    const events = Array.from({ length: 15 }).map((_, i) => ({
      name: i % 3 === 0 ? "view_item" : "page_view",
      params: {
        page_title: "GA4 MCP Chat Test",
        page_location: `https://local-test/ga4-chat?hit=${i}`,
        engagement_time_msec: 1000 + i * 100,
        session_id: `${now}`,
        debug_mode: 1,
      },
    }))

    const response = await fetch(
      `${GA_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: randomClientId(),
          events,
        }),
        cache: "no-store",
      },
    )

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json(
        { error: `GA4 seed request failed: ${response.status} ${text}` },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      sentEvents: events.length,
      note: "Traffic sent. Realtime should update quickly; standard reports may take longer.",
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
