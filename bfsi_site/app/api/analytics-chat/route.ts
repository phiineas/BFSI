// app/api/analytics-chat/route.ts
import { NextRequest } from 'next/server';
import { callMCPTool, formatMCPResultForLLM, getGoogleAccessToken } from '@/lib/ga4';

export const runtime = 'nodejs';

const LOCATION = process.env.VERTEX_AI_LOCATION || 'us-central1';
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-001';

const MCP_ROUTER_PROMPT = `
You are an MCP-compliant analytics agent. Your task is to select the correct tool to answer the user's question.
Available Tools:
- "run_report": JSON arguments { "property_id", "date_ranges": [{ "startDate", "endDate" }], "dimensions", "metrics", "limit" }
- "run_realtime_report": JSON arguments { "property_id", "dimensions", "metrics", "limit" }
- "get_account_summaries": No arguments.

Return ONLY a JSON object in this format: { "name": "tool_name", "arguments": { ... } }
If no tool is needed, return { "name": "none", "arguments": {} }
`;

const MCP_ANSWER_PROMPT = `
You are a GA4 analytics expert. Below is the data retrieved via the Model Context Protocol (MCP).
Provide a professional, data-driven answer to the user's original question.
Include trends, comparisons, or notable insights if present in the data.
`;

async function callVertexAI(prompt: string, message: string, history: any[] = []) {
    if (!PROJECT_ID) throw new Error('GOOGLE_CLOUD_PROJECT_ID configuration is missing');

    // Use the same Service Account to get a token for Vertex AI
    const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/cloud-platform']);

    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    const contents = [
        ...history,
        { role: 'user', parts: [{ text: `${prompt}\n\nUser Question: ${message}` }] },
    ];

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ contents }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Vertex AI Error: ${JSON.stringify(error)}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from model');
    return text;
}

export async function POST(req: NextRequest) {
    try {
        const { message, history = [] } = await req.json();
        if (!message) return Response.json({ error: 'Message is required' }, { status: 400 });

        // 1. Tool Selection (MCP Routing)
        const routerResponse = await callVertexAI(MCP_ROUTER_PROMPT, message);
        let mcpRequest;
        try {
            mcpRequest = JSON.parse(routerResponse.replace(/```json|```/g, '').trim());
        } catch (e) {
            return Response.json({ answer: "I couldn't decide which tool to use. Could you be more specific?" });
        }

        let toolData = 'No tool called.';

        // 2. Tool Execution (MCP Call)
        if (mcpRequest.name && mcpRequest.name !== 'none') {
            const mcpResult = await callMCPTool(mcpRequest.name, mcpRequest.arguments || {});
            toolData = formatMCPResultForLLM(mcpResult);
        }

        // 3. Final Answer (MCP Synthesis)
        const context = `MCP Tool Outputs:\n${toolData}`;
        const answer = await callVertexAI(MCP_ANSWER_PROMPT + '\n' + context, message, history);

        return Response.json({ answer, mcpRequest });
    } catch (error: any) {
        console.error('MCP Chat Error:', error);
        return Response.json({ error: error.message || 'Internal error' }, { status: 500 });
    }
}
