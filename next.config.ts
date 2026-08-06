import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // আসল মারাত্মক টাইপ এরর থাকলে বিল্ড থামাবে
  },
};

export default nextConfig;