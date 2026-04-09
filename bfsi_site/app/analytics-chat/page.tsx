"use client";

import React, { useState, useEffect, useRef } from 'react';

type Message = {
    role: 'assistant' | 'user';
    content: string;
};

export default function AnalyticsChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I can answer questions about your website analytics. Ask me about traffic, top pages, user locations, sales, events, and more.",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
        e?.preventDefault();
        const messageToSend = overrideInput || input;
        if (!messageToSend.trim() || loading) return;

        const newMessages = [...messages, { role: 'user', content: messageToSend } as Message];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            // Format history for Gemini (excluding the first greeting)
            const history = newMessages.slice(1, -1).map((msg) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            }));

            const res = await fetch('/api/analytics-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageToSend, history }),
            });

            const data = await res.json();
            if (data.error) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: `Error: ${data.error}` },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.answer },
                ]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "Sorry, I encountered an error connecting to the analytics engine." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const suggestedQuestions = [
        "How many users visited my site this week?",
        "What are my top 5 pages by traffic?",
        "Which country sends the most visitors?",
        "How many active users are on right now?",
        "What's my bounce rate this month?",
        "Which products are selling the most?",
    ];

    // Styles
    const containerStyle: React.CSSProperties = {
        maxWidth: '680px',
        margin: '40px auto',
        padding: '24px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(124, 106, 247, 0.12)',
        border: '1px solid #7c6af720',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
    };

    const headerStyle: React.CSSProperties = {
        fontSize: '20px',
        fontWeight: 700,
        color: '#2d2660',
        marginBottom: '20px',
        borderBottom: '1px solid #f0eeff',
        paddingBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    const chatContainerStyle: React.CSSProperties = {
        flex: 1,
        overflowY: 'auto',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '20px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#7c6af720 transparent',
    };

    const messageBubbleStyle = (msg: Message): React.CSSProperties => ({
        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        padding: '12px 16px',
        borderRadius: '16px',
        fontSize: '15px',
        lineHeight: 1.5,
        backgroundColor: msg.role === 'user' ? '#7c6af7' : '#f0eeff',
        color: msg.role === 'user' ? '#ffffff' : '#2d2660',
        borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
        borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    });

    const inputAreaStyle: React.CSSProperties = {
        display: 'flex',
        gap: '8px',
        padding: '4px',
    };

    const inputStyle: React.CSSProperties = {
        flex: 1,
        padding: '12px 16px',
        borderRadius: '12px',
        border: '2px solid #f0eeff',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    const buttonStyle: React.CSSProperties = {
        padding: '10px 20px',
        backgroundColor: '#7c6af7',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        opacity: loading ? 0.7 : 1,
    };

    const suggestionStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '12px',
    };

    const suggestionBtnStyle: React.CSSProperties = {
        padding: '8px 12px',
        fontSize: '13px',
        backgroundColor: 'white',
        color: '#7c6af7',
        border: '1px solid #7c6af7',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    };

    const dotStyle: React.CSSProperties = {
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: '#7c6af7',
        marginRight: '3px',
        animation: 'bounce 1.4s infinite ease-in-out both',
    };

    return (
        <div style={containerStyle}>
            <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        input:focus { border-color: #7c6af7 !important; }
        .suggestion:hover { background-color: #f0eeff !important; }
      `}</style>

            <div style={headerStyle}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                GA4 Analytics Chatbot
            </div>

            <div style={chatContainerStyle}>
                {messages.map((msg, i) => (
                    <div key={i} style={messageBubbleStyle(msg)}>
                        {msg.content}
                    </div>
                ))}
                {loading && (
                    <div style={messageBubbleStyle({ role: 'assistant', content: '' })}>
                        <div style={{ ...dotStyle, animationDelay: '-0.32s' }}></div>
                        <div style={{ ...dotStyle, animationDelay: '-0.16s' }}></div>
                        <div style={dotStyle}></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !loading && (
                <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8, marginLeft: 4 }}>Common questions</div>
                    <div style={suggestionStyle}>
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                className="suggestion"
                                style={suggestionBtnStyle}
                                onClick={() => handleSubmit(undefined, q)}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} style={inputAreaStyle}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your analytics..."
                    style={inputStyle}
                    disabled={loading}
                />
                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? 'Thinking...' : 'Send'}
                </button>
            </form>
        </div>
    );
}
