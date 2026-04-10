import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";
import path from "path";
import os from "os";
import { initGoogleAuth } from "./auth";

/**
 * Calls the GA4 MCP server using stdio transport.
 * Uses the 'ga4-mcp' package as a fallback for the potentially unavailable '@googleanalytics/google-analytics-mcp'.
 */
const transport = new StdioClientTransport({
    command: "node",
    args: [path.join(process.cwd(), "node_modules/ga4-mcp/dist/server.js")],
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
