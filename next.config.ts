import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match requests starting with /api/
        destination: 'http://localhost:5000/:path*', // Proxy these requests to the backend
      },
    ];
  },
};


export default nextConfig;