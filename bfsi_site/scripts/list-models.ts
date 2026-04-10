import fs from "fs";

async function listModels() {
    let apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey && fs.existsSync(".env.local")) {
        const env = fs.readFileSync(".env.local", "utf8");
        const match = env.match(/GEMINI_API_KEY=([^\s]+)/);
        if (match) {
            apiKey = match[1];
        }
    }

    if (!apiKey) {
        console.error("ERROR: GEMINI_API_KEY could not be found.");
        return;
    }

    console.log("Fetching available models from Google AI REST API...");

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("AVAILABLE MODELS:");
            data.models.forEach((m: any) => {
                console.log(`- ${m.name}`);
            });
        } else {
            console.log("Unexpected response format:", JSON.stringify(data, null, 2));
        }
    } catch (error: any) {
        console.error("FAILED TO LIST MODELS:", error.message);
    }
}

listModels();
