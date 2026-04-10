"use client"

import ReactMarkdown from "react-markdown"
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

      const text = await response.text()
      let payload: { insights?: string; error?: string } = {}

      try {
        payload = JSON.parse(text)
      } catch {
        // Fallback for non-JSON errors (like Vercel 500 pages)
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 200)}`)
      }

      if (!response.ok) {
        throw new Error(payload.error || "Request failed")
      }

      setMessages((prev: ChatMessage[]) => [
        ...prev,
        {
          role: "assistant",
          content: payload.insights || "I could not produce an answer.",
        },
      ])
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      setMessages((prev: ChatMessage[]) => [
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
        <div className="w-[420px] max-w-[95vw] rounded-xl border bg-background shadow-xl flex flex-col overflow-hidden bg-card">
          <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
            <h3 className="text-sm font-semibold tracking-tight">GA4 Analytics Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1.5 transition-colors hover:bg-muted"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 max-h-[480px] space-y-4 overflow-y-auto p-4 text-sm leading-relaxed scrollbar-thin">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-200 ${message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted/50 text-foreground rounded-tl-none border border-border/50"
                    }`}
                >
                  <ReactMarkdown
                    className="prose prose-sm dark:prose-invert max-w-none 
                    prose-p:leading-normal prose-p:my-1
                    prose-table:border prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-2
                    prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-xs prose-th:uppercase 
                    prose-td:px-3 prose-td:py-2 prose-td:border-t prose-td:border-border/50"
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-2 italic text-muted-foreground text-xs">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                  Processing Analytics...
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-3 bg-muted/10">
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
                placeholder="Ask about traffic, users, or pages..."
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-primary/20 transition-all focus:ring-2 focus:border-primary"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-12"><path d="m21 15-3.5-3.5L14 15" /><path d="M21 9v6" /><path d="M3 3v18h18" /><path d="m11 9-5 5" /><path d="m15 13-4-4" /></svg>
          Ask GA4 AI
        </button>
      )}
    </div>
  )
}
