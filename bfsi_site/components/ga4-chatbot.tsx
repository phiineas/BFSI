"use client"

import { useMemo, useState } from "react"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export function Ga4Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! Ask me GA4 questions (sessions, events, traffic sources, pages, countries).",
    },
  ])

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading])

  const askQuestion = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { role: "user", content: trimmed }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      })

      const payload = (await response.json()) as { insights?: string; error?: string }
      if (!response.ok) {
        throw new Error(payload.error || "Request failed")
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: payload.insights || "I could not produce an answer.",
        },
      ])
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${message}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[360px] max-w-[90vw] rounded-xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold">GA4 MCP Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
            >
              Close
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto p-3 text-sm">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 ${message.role === "user"
                    ? "ml-6 bg-primary text-primary-foreground"
                    : "mr-6 bg-muted"
                  }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && <div className="mr-6 rounded-lg bg-muted px-3 py-2">Thinking…</div>}
          </div>

          <div className="border-t p-3">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                void askQuestion(input)
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about sessions, events, pages..."
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg"
        >
          GA4 Chat
        </button>
      )}
    </div>
  )
}
