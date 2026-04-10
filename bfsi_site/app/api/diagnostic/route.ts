import { NextRequest, NextResponse } from "next/server";
import { callGA4MCP } from "@/lib/ga4-mcp";

export const runtime = "nodejs";

export async function GET() {
    try {
        // Attempt to list all accessible properties
        const result = await callGA4MCP("get_account_summaries", {});

        return NextResponse.json({
            success: true,
            accessible_properties: result,
            note: "Compare the IDs below with your GA4_PROPERTY_ID in Vercel."
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
