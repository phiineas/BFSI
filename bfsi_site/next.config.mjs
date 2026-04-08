<<<<<<< HEAD
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

=======
>>>>>>> origin/main
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
<<<<<<< HEAD
  turbopack: {
    root: __dirname,
  },
=======
>>>>>>> origin/main
}

export default nextConfig
