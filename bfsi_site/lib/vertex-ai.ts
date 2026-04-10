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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
Objective: Mimic the Google Analytics 4 (GA4) interface style. Present data directly and cleanly.

User Question: "${userQuery}"

Raw GA4 Data:
${JSON.stringify(ga4Data, null, 2)}

### OUTPUT RULES (CRITICAL):
1. **NO FILLER**: No "Based on the data," "Here is the report," or intros/outros.
2. **CONDITIONAL FORMATTING**:
   - **Scenario A (List/Table)**: If the data has multiple rows/dimensions (e.g., top pages, sources, countries), use a **Markdown Table** with GA4-standard headers (e.g., "Page path and screen class", "Views", "Active users").
   - **Scenario B (Single Metric)**: If the answer is a single number or simple count (e.g., "How many users?"), provide a **single concise sentence** (e.g., "There were 1,240 active users yesterday.").

3. **STYLE**:
   - Use bold for key numbers.
   - Use standard GA4 terminology.
   - Do NOT include "Insights" or "Actions" sections unless the user specifically asks "Why?" or "What should I do?". Just provide the data requested.

Start Output Now:
  `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text() || "Could not generate insights.";
    } catch (error: any) {
        console.error("Gemini AI Error:", error);
        return `Error generating insights: ${error.message}`;
    }
}
