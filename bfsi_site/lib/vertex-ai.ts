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
Objective: Provide a direct, sentence-based analytics response for the Tatvic website. 

User Question: "${userQuery}"

Raw GA4 Data:
${JSON.stringify(ga4Data, null, 2)}

### FORMATTING RULES (STRICT):
1. **NO TABLES or CHARTS**: Do not use markdown tables, bars, or any chart-like formatting.
2. **SENTENCES ONLY**: Present all data in clear, professional sentences. 
3. **USE LISTS FOR RANKINGS**: If there are multiple items (like top pages), use a simple bulleted list with sentences.
   - Example: 1. The most viewed page was /career/ with 535 views.
4. **NO INTRODUCTIONS**: Start immediately with the answer. Skip "Based on the data," "Of course," etc.
5. **KEY NUMBERS**: Bold the numbers for readability.

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
