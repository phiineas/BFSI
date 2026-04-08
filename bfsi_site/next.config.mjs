import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  outputFileTracingIncludes: {
    "/api/ga4-chat": [
      "./node_modules/@google-analytics/admin/**/*",
      "./node_modules/@google-analytics/data/**/*",
      "./node_modules/@googleapis/searchconsole/**/*",
      "./node_modules/google-auth-library/**/*",
      "./node_modules/ga4-mcp/**/*",
      "./node_modules/@modelcontextprotocol/sdk/**/*",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/g/collect",
        destination: "https://ylawukyi.apd.stape.io/g/collect",
      },
    ]
  },
}

export default nextConfig
