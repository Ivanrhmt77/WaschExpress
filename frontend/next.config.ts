import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["express", "genkit", "@genkit-ai/core"],
  },
  /* config options here */
};

export default nextConfig;
