import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',       // ← Strapi が動いているポート
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
