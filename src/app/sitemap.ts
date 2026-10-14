import { MetadataRoute } from 'next';
import { COUNTRIES_DATA, toCountrySlug } from '@/data/countries';
import { isIndexableCountry } from '@/data/country-seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fotopasaporte.app';

  // 1. Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-10-14',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // 2. Canonical Country Pages - Curated high-authority destinations only
  // (Prevents mass programmatic thin content penalties from search engines)
  for (const country of COUNTRIES_DATA) {
    if (!isIndexableCountry(country.code)) continue;

    const slug = toCountrySlug(country);
    routes.push({
      url: `${baseUrl}/foto-pasaporte/${slug}`,
      lastModified: '2026-10-14',
      changeFrequency: country.isPopular ? 'weekly' : 'monthly',
      priority: country.isPopular ? 0.9 : 0.7,
    });
  }

  return routes;
}
