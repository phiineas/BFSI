import { NextRequest, NextResponse } from "next/server";
import { callGA4MCP } from "@/lib/ga4-mcp";
import { generateInsights } from "@/lib/vertex-ai";
import { VertexAI } from "@google-cloud/vertexai";

export const runtime = "nodejs";

const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
    location: process.env.GOOGLE_CLOUD_LOCATION || "asia-south1",
});

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        // 1. Quick Gemini call to decide GA4 parameters
        const model = vertexAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const configPrompt = `
      You are a GA4 query planner. Based on the user's question, decide the best metrics, dimensions, and date ranges.
      User Question: "${query}"

      Return ONLY a JSON object:
      {
        "metrics": ["metricName1", "metricName2"],
        "dimensions": ["dimensionName1", "dimensionName2"],
        "dateRange": { "startDate": "30daysAgo", "endDate": "today" }
      }
      
      Metric examples: sessions, activeUsers, bounceRate, conversions, totalRevenue, screenPageViews.
      Dimension examples: pagePath, sessionSource, country, deviceCategory, date.
      Use standard GA4 API naming conventions.
    `;

        const configResult = await model.generateContent(configPrompt);
        const configText = configResult.response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        const ga4Config = JSON.parse(configText.replace(/```json|```/g, "").trim());

        // 2. Call GA4 MCP runReport
        const mcpParams = {
            property_id: process.env.GA4_PROPERTY_ID, // Should be "262420034"
            metrics: ga4Config.metrics || ["sessions"],
            dimensions: ga4Config.dimensions || ["pagePath"],
            dateRanges: [ga4Config.dateRange || { startDate: "30daysAgo", endDate: "today" }],
        };

        const ga4Data = await callGA4MCP("runReport", mcpParams);

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
