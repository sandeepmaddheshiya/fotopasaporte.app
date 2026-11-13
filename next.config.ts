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
      // Consolidate the www host onto the canonical apex domain (SEO-02).
      // Without this, www.fotopasaporte.app served 200 duplicates that Google indexed separately.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fotopasaporte.app' }],
        destination: 'https://fotopasaporte.app/:path*',
        permanent: true,
      },
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
