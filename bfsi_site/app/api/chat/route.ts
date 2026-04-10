import { NextRequest, NextResponse } from "next/server";
import { ga4Tools } from "@/lib/ga4";
import { generateInsights } from "@/lib/vertex-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        // 1. Initialize Gemini with API Key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({
                error: "GEMINI_API_KEY is missing from Vercel settings.",
                tip: "Add GEMINI_API_KEY to your Vercel Environment Variables."
            }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const configPrompt = `
      You are a GA4 query planner for the Tatvic website.
      User Question: "${query}"

      ### Important Knowledge:
      - This system ONLY has access to the GA4 Data API.
      - It CANNOT perform complex raw-event SQL like deciles, NTILE, or custom user-level bucketizing.
      - If the user asks for a "distribution", try to provide a breakdown by "pagePath" or "sessionSource" instead, or explain the limitation in the final insight.
      
      Metric examples: sessions, activeUsers, bounceRate, conversions, screeningPageViews, averageSessionDuration.
      Dimension examples: pagePath, sessionSource, country, deviceCategory.

      Return ONLY a JSON object:
      {
        "metrics": ["sessions", "activeUsers"],
        "dimensions": ["pagePath"],
        "dateRange": { "startDate": "30daysAgo", "endDate": "today" }
      }
    `;

        const configResult = await model.generateContent(configPrompt);
        const configText = configResult.response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        const ga4Config = JSON.parse(configText.replace(/```json|```/g, "").trim());

        // Log the AI Plan
        try {
            const fs = await import('fs');
            const path = await import('path');
            const logPath = path.join(process.cwd(), 'logs.txt');
            const entry = `[${new Date().toISOString()}] [AI_PLAN] Query: "${query}"\nPlan: ${JSON.stringify(ga4Config, null, 2)}\n${'-'.repeat(50)}\n`;
            fs.appendFileSync(logPath, entry);
        } catch { }

        // 2. Call GA4 directly (In-process)
        const ga4Data = await ga4Tools.run_report({
            property_id: process.env.GA4_PROPERTY_ID,
            metrics: ga4Config.metrics || ["sessions"],
            dimensions: ga4Config.dimensions || ["pagePath"],
            date_ranges: [ga4Config.dateRange || { startDate: "30daysAgo", endDate: "today" }],
        });

        // 3. Generate final insights
        const insights = await generateInsights(query, ga4Data);

        return NextResponse.json({ insights, success: true });
    } catch (error: any) {
        console.error("API Chat Error:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred", success: false },
            { status: 500 }
        );
    }
}
