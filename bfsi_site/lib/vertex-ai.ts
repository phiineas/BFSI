import { VertexAI } from "@google-cloud/vertexai";

// Move initialization inside the function to avoid build-time errors

export async function generateInsights(userQuery: string, ga4Data: any): Promise<string> {
    const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
        ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
        : undefined;

    const vertexAI = new VertexAI({
        project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
        location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
        googleAuthOptions: credentials ? { credentials } : undefined
    });
    const model = vertexAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const response = result.response;
        return response.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate insights.";
    } catch (error: any) {
        console.error("Vertex AI Error:", error);
        return `Error generating insights: ${error.message}`;
    }
}
