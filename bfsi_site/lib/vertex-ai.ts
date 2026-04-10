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
You are a **Senior Analytics Lead at Tatvic**, an expert in Google Analytics 4. Your goal is to provide **Premium, Executive-Level Insights** for the Tatvic website (https://www.tatvic.com).

User Question: "${userQuery}"

Raw GA4 Data:
${JSON.stringify(ga4Data, null, 2)}

### Formatting Guidelines (MANDATORY):
1. **Executive Summary**: Start with a 1-sentence "Bottom Line Up Front" (BLUF) bold summary.
2. **Key Metrics Card**: Use a clean list of metrics with emojis and professional bolding.
   - Example: 📈 **Total Sessions**: 1,240 (▲ 5% vs. avg)
3. **Data Visualization**: Use Markdown Tables with clear headers for any dimension breakdowns.
4. **Strategic Insights**: Use 1-2 bullet points explaining *why* this matters.
5. **Actionable Takeaways**: Provide 2-3 specific recommendations in a section titled "## 🎯 Recommended Actions".

### Tone & Style:
- Professional, authoritative, yet helpful.
- Avoid technical jargon unless necessary.
- Use clean whitespace and clear section dividers (---).
- If no data is found, provide a professional "No Data" message with suggestions for date ranges.

**Generate the report now:**
  `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text() || "Could not generate insights.";
    } catch (error: any) {
        console.error("Gemini AI Error:", error);
        return `Error generating insights: ${error.message}`;
    }
}
