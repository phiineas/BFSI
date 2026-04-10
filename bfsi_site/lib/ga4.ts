import { BigQuery } from '@google-cloud/bigquery';

/**
 * GA4 MCP Provider (In-Process)
 * Implements the Model Context Protocol (MCP) tool interface for GA4.
 */

let cachedToken: { token: string; expiry: number } | null = null;

function base64UrlEncode(str: string | object): string {
    const input = typeof str === 'string' ? str : JSON.stringify(str);
    return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
    const b64 = pem.replace('-----BEGIN PRIVATE KEY-----', '').replace('-----END PRIVATE KEY-----', '').replace(/\s/g, '');
    const binary = atob(b64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    return buffer.buffer;
}

/**
 * Gets a Google OAuth 2.0 Access Token using a Service Account
 */
export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
    const scopeKey = scopes.sort().join(',');
    const now = Math.floor(Date.now() / 1000);

    // Note: For simplicity in this demo, we cache only one token.
    // In production, you'd cache per scope combination.
    if (cachedToken && cachedToken.expiry > now + 60) return cachedToken.token;

    const saJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (!saJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON is missing');

    const sa = JSON.parse(saJson);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
        iss: sa.client_email,
        scope: scopes.join(' '),
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    };

    const encodedHeader = base64UrlEncode(header);
    const encodedPayload = base64UrlEncode(payload);
    const dataToSign = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);

    const privateKeyBuffer = pemToArrayBuffer(sa.private_key);
    const key = await crypto.subtle.importKey(
        'pkcs8',
        privateKeyBuffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, dataToSign);
    const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const data = await res.json();
    if (!data.access_token) throw new Error(`Auth failed: ${JSON.stringify(data)}`);

    cachedToken = { token: data.access_token, expiry: now + data.expires_in };
    return data.access_token;
}

// Internal helper for GA4
async function getGA4Token() {
    return getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
}

/**
 * GA4 MCP Tools Implementation
 */
export const ga4Tools = {
    get_account_summaries: async () => {
        const token = await getGA4Token();
        const res = await fetch('https://analyticsadmin.googleapis.com/v1alpha/accountSummaries', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    run_report: async (args: {
        property_id?: string;
        date_ranges: Array<{ startDate: string; endDate: string }>;
        dimensions?: string[];
        metrics?: string[];
        limit?: number;
        offset?: number;
        dimension_filter?: any;
        metric_filter?: any;
    }) => {
        const pid = args.property_id || process.env.GA4_PROPERTY_ID;
        if (!pid) throw new Error('property_id is required');

        const token = await getGA4Token();
        const formattedPid = pid.startsWith('properties/') ? pid : `properties/${pid}`;
        const url = `https://analyticsdata.googleapis.com/v1beta/${formattedPid}:runReport`;

        const body = {
            dateRanges: args.date_ranges,
            dimensions: args.dimensions?.map(name => ({ name })),
            metrics: args.metrics?.map(name => ({ name })),
            limit: args.limit || 10,
            offset: args.offset || 0,
            dimensionFilter: args.dimension_filter,
            metricFilter: args.metric_filter,
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return res.json();
    },

    run_realtime_report: async (args: {
        property_id?: string;
        dimensions?: string[];
        metrics?: string[];
        limit?: number;
        dimension_filter?: any;
        metric_filter?: any;
    }) => {
        const pid = args.property_id || process.env.GA4_PROPERTY_ID;
        if (!pid) throw new Error('property_id is required');

        const token = await getGA4Token();
        const formattedPid = pid.startsWith('properties/') ? pid : `properties/${pid}`;
        const url = `https://analyticsdata.googleapis.com/v1beta/${formattedPid}:runRealtimeReport`;

        const body = {
            dimensions: args.dimensions?.map(name => ({ name })),
            metrics: args.metrics?.map(name => ({ name })),
            limit: args.limit || 10,
            dimensionFilter: args.dimension_filter,
            metricFilter: args.metric_filter,
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return res.json();
    },
};

/**
 * BigQuery Tools Implementation
 */
export const bigqueryTools = {
    run_sql: async (args: { sql: string }) => {
        const saJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
        if (!saJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON is missing');

        const sa = JSON.parse(saJson);
        const bq = new BigQuery({
            projectId: process.env.GOOGLE_BIGQUERY_PROJECT_ID || sa.project_id,
            credentials: sa,
        });

        const [rows] = await bq.query({ query: args.sql });
        return rows;
    },
};

/**
 * MCP-compliant tool execution wrapper
 */
export async function callMCPTool(name: string, args: any) {
    const tool = (ga4Tools as any)[name] || (bigqueryTools as any)[name];
    if (!tool) throw new Error(`Tool ${name} not found`);

    const result = await tool(args);

    // Format as MCP ToolResult
    return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        isError: result.error ? true : false,
    };
}

/**
 * Human-readable formatter for LLM context
 */
export function formatMCPResultForLLM(mcpResult: any): string {
    try {
        const data = JSON.parse(mcpResult.content[0].text);
        if (!data.rows) return mcpResult.content[0].text;

        const headers = [
            ...(data.dimensionHeaders || []).map((h: any) => h.name),
            ...(data.metricHeaders || []).map((h: any) => h.name),
        ];
        const rows = data.rows.map((row: any) => [
            ...(row.dimensionValues || []).map((v: any) => v.value),
            ...(row.metricValues || []).map((v: any) => v.value),
        ].join(' | '));

        return [headers.join(' | '), ...rows].join('\n');
    } catch {
        return mcpResult.content[0].text;
    }
}
