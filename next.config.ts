/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking for production
  },
  images: {
    unoptimized: true,
  },
  cacheComponents: true,
  async headers() {
    return [
      {
        source: "/carna-passenger",
        headers: [
          {
            key: "Content-Type",
            value: "application/vnd.android.package-archive",
          },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Carna-Passenger.apk"',
          },
        ],
      },
      {
        source: "/carna-driver",
        headers: [
          {
            key: "Content-Type",
            value: "application/vnd.android.package-archive",
          },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Carna-Driver.apk"',
          },
        ],
      },
    ]
  },
}

export default nextConfig
