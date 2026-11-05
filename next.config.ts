import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        // the hero showreel — served once, then replayed from the browser's
        // disk cache so the seamless loop never re-fetches over the network
        // (bump the filename whenever the film is replaced)
        source: "/video.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
