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
      You are an Analytics Orchestrator for Tatvic. Decide whether to use GA4 Data API or BigQuery SQL for the user's question.

      User Question: "${query}"

      **Decision Criteria:**
      - USE "run_report" (GA4) for: Sessions, Users, Page Views, Bounce Rate, basic breakdowns.
      - USE "run_sql" (BigQuery) for: Deciles, NTILE, User-level paths, advanced math, or any query comparing raw event data.

      **Available Tools:**
      1. run_report (GA4): { metrics: string[], dimensions: string[], dateRange: { startDate, endDate } }
      2. run_sql (BigQuery): { sql: string }
         - BigQuery Dataset: \`${process.env.GOOGLE_CLOUD_PROJECT_ID}.analytics_${process.env.GA4_PROPERTY_ID}.events_*\`
         - Common fields: event_name, event_params (key, value.int_value, value.string_value), user_pseudo_id, event_date.

      Return ONLY a JSON object:
      {
        "tool": "run_report" | "run_sql",
        "params": { ... }
      }
    `;

        const configResult = await model.generateContent(configPrompt);
        const configText = configResult.response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        const plan = JSON.parse(configText.replace(/```json|```/g, "").trim());

        let ga4Data;
        if (plan.tool === "run_sql") {
            const { bigqueryTools } = await import("@/lib/ga4");
            ga4Data = await bigqueryTools.run_sql(plan.params);
        } else {
            ga4Data = await ga4Tools.run_report({
                property_id: process.env.GA4_PROPERTY_ID,
                metrics: plan.params.metrics || ["sessions"],
                dimensions: plan.params.dimensions || ["pagePath"],
                date_ranges: [plan.params.dateRange || { startDate: "30daysAgo", endDate: "today" }],
            });
        }

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
