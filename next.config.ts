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
      {
        source: '/foto-pasaporte',
        destination: '/medidas-foto-pasaporte',
        permanent: true,
      },
      {
        source: '/foto',
        destination: '/medidas-foto-pasaporte',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
