import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generate insights using the Google AI SDK (Gemini API Key).
 */
export async function generateInsights(userQuery: string, ga4Data: any): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return "GEMINI_API_KEY is missing. Insights cannot be generated.";
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

    const prompt = `
You are a Google Analytics 4 expert analyst and part of the Tatvic Analytics team, working with Tatvic's website data (https://www.tatvic.com).

User asked: "${userQuery}"

Raw GA4 Data from MCP:
${JSON.stringify(ga4Data, null, 2)}

Format your response EXACTLY like GA4 interface shows insights:
1. Show each metric like: **Sessions**: 12,450 ▲ 8.3% vs previous period
2. Show dimension breakdowns as markdown tables with proper headers
3. Use ▲ for increase (green context) and ▼ for decrease (red context)
4. Always show period comparison
5. End with ## Key Takeaways section with 3-4 bullet points in plain English
6. Be specific with numbers, never vague

If data is empty or error, say "No data available for this query. Try adjusting the date range or metrics."
  `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text() || "Could not generate insights.";
    } catch (error: any) {
        console.error("Gemini AI Error:", error);
        return `Error generating insights: ${error.message}`;
    }
}
