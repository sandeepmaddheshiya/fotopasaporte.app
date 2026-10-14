import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/requisitos/:country',
        destination: '/foto-pasaporte/:country',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
