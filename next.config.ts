/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking for production
  },
  images: {
    unoptimized: true,
  },
  cacheComponents: true,
}

export default nextConfig
