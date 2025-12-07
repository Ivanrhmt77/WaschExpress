import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["express", "genkit", "@genkit-ai/core"],

  experimental: {},
};

export default nextConfig;
