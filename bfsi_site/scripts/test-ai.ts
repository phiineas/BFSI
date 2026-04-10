import { VertexAI } from "@google-cloud/vertexai";
import * as fs from "fs";

// Simple test to see if the model even exists and our credentials work
async function test() {
    const projectId = "level-elevator-748"; // Hardcoding for the test script
    const keyPath = "./ga4-service-account.json";

    console.log(`Checking project: ${projectId} with key: ${keyPath}`);

    if (!fs.existsSync(keyPath)) {
        console.error("ERROR: ga4-service-account.json not found in this folder!");
        return;
    }

    process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

    const vertexAI = new VertexAI({
        project: projectId,
        location: "us-central1",
    });

    // Trying the user's requested "top tier" model
    console.log("Requesting Gemini 2.0 Pro Experimental...");
    const model = vertexAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

    try {
        const result = await model.generateContent("Hello, are you working? Please respond with 'CONNECTED'.");
        const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("RESPONSE SUCCESS:", text);
    } catch (error: any) {
        console.error("!!! MODEL FAILED !!!");
        console.error("Status:", error.status);
        console.error("Message:", error.message);

        console.log("\nAttempting Fallback to 1.5 Flash to compare...");
        const fallbackModel = vertexAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        try {
            const fbResult = await fallbackModel.generateContent("Hello?");
            console.log("FALLBACK SUCCESS: 1.5 Flash is working.");
        } catch (fbError: any) {
            console.error("FALLBACK ALSO FAILED:", fbError.message);
        }
    }
}

test();
