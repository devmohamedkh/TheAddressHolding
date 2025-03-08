import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL
  },
  images: {
    domains : ['*', 'localhost']
  },
};

export default nextConfig;
