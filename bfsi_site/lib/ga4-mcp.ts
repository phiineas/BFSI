import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";
import path from "path";
import os from "os";

/**
 * Calls the GA4 MCP server using stdio transport.
 * Uses the 'ga4-mcp' package as a fallback for the potentially unavailable '@googleanalytics/google-analytics-mcp'.
 */
export async function callGA4MCP(toolName: string, params: object) {
    const packageName = "ga4-mcp";

    let credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "";

    // Handle Vercel's credential limitation (no file system) using JSON string env var
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        const tempKeyPath = path.join(os.tmpdir(), "ga4-key.json");
        fs.writeFileSync(tempKeyPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        credentialsPath = tempKeyPath;
    }

    const transport = new StdioClientTransport({
        command: "npx",
        args: ["-y", packageName],
        env: {
            ...process.env,
            GOOGLE_APPLICATION_CREDENTIALS: credentialsPath,
        },
    });

    const client = new Client({ name: "gbia-client", version: "1.0.0" });

    try {
        await client.connect(transport);
        const result = await client.callTool({ name: toolName, arguments: params as any });
        return result;
    } finally {
        try {
            await client.close();
        } catch (e) {
            // Ignore close errors
        }
    }
}
