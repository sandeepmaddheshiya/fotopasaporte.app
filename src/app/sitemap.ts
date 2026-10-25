import { MetadataRoute } from 'next';
import { COUNTRIES_DATA, toCountrySlug } from '@/data/countries';
import { isIndexableCountry } from '@/data/country-seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fotopasaporte.app';

  // 1. Homepage & Core Guides
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-10-25',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/medidas-foto-pasaporte`,
      lastModified: '2026-10-25',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/como-hacer-foto-pasaporte-en-casa`,
      lastModified: '2026-10-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donde-sacar-foto-pasaporte`,
      lastModified: '2026-10-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/como-verificamos-los-requisitos`,
      lastModified: '2026-10-25',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: '2026-10-25',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: '2026-10-25',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Size-based landing pages (targeting size-intent queries)
  const sizeSlugs = ['35x45-mm', '2x2-pulgadas', '50x70-mm', '33x48-mm'];
  for (const slug of sizeSlugs) {
    routes.push({
      url: `${baseUrl}/foto-${slug}`,
      lastModified: '2026-10-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // 3. Canonical Country Pages - Curated high-authority destinations only
  // (Prevents mass programmatic thin content penalties from search engines)
  for (const country of COUNTRIES_DATA) {
    if (!isIndexableCountry(country.code)) continue;

    const slug = toCountrySlug(country);
    routes.push({
      url: `${baseUrl}/foto-pasaporte/${slug}`,
      lastModified: '2026-10-25',
      changeFrequency: country.isPopular ? 'weekly' : 'monthly',
      priority: country.isPopular ? 0.9 : 0.7,
    });
  }

  return routes;
}

