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
Objective: Provide a direct, data-driven analytics report for the Tatvic website based on GA4 data.

User Question: "${userQuery}"

Raw GA4 Data:
${JSON.stringify(ga4Data, null, 2)}

### STRICT RULES:
1. **NO INTRODUCTIONS**: Do not say "Of course," "As a lead," or "Here is the data."
2. **DATA FIRST**: Start immediately with the BLUF (Bottom Line Up Front).
3. **MANDATORY TABLES**: Present any multi-row dimension data in a clean Markdown Table.
4. **BRIEF ONLY**: Use concise bullet points for insights. Max 2-3 bullets.
5. **VISUAL TITLES**: Use bold headers with relevant emojis.

### Structure:
**[BLUF Summary in bold]**
---
### 📊 Data Detail
[Markdown Table here]
---
### 💡 Insights
- [Brief insight 1]
- [Brief insight 2]
---
### 🎯 Actions
- [Brief action 1]
- [Brief action 2]
  `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text() || "Could not generate insights.";
    } catch (error: any) {
        console.error("Gemini AI Error:", error);
        return `Error generating insights: ${error.message}`;
    }
}
