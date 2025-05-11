import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  }
};

export default nextConfig;
