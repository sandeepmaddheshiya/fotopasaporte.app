import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/estudio/'],
    },
    sitemap: 'https://fotopasaporte.app/sitemap.xml',
  };
}
