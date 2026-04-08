"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function Ga4ChatPage() {
  const [seedStatus, setSeedStatus] = useState("")
  const [isSeeding, setIsSeeding] = useState(false)

  const seedTraffic = async () => {
    setIsSeeding(true)
    setSeedStatus("Sending temporary GA4 traffic...")
    try {
      const res = await fetch("/api/ga4-seed-traffic", { method: "POST" })
      const data = (await res.json()) as { ok?: boolean; sentEvents?: number; note?: string; error?: string }
      if (!res.ok) throw new Error(data.error || "Failed to seed traffic")
      setSeedStatus(`Seeded ${data.sentEvents || 0} events. Check GA4 Realtime and then ask chatbot again.`)
    } catch (error) {
      setSeedStatus(error instanceof Error ? error.message : "Failed to seed traffic")
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16 sm:px-8">
        <h1 className="text-3xl font-bold tracking-tight">GA4 MCP Chat</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The chatbot is now shown on the home page. Use this page only for temporary GA4 traffic generation.
        </p>
        <div className="mt-6 rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Need quick validation data? Send temporary events to your GA4 property.
          </p>
          <button
            onClick={() => void seedTraffic()}
            disabled={isSeeding}
            className="mt-3 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
          >
            {isSeeding ? "Seeding..." : "Generate temporary GA4 traffic"}
          </button>
          {seedStatus ? <p className="mt-3 text-sm">{seedStatus}</p> : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}
