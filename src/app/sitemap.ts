import { MetadataRoute } from 'next';
import { COUNTRIES_DATA, toCountrySlug } from '@/data/countries';
import { isIndexableCountry } from '@/data/country-seo-data';

// Last substantive content edit per country page (update when a country's content changes).
const COUNTRY_CONTENT_UPDATED: Record<string, string> = {
  PE: '2026-11-13', CO: '2026-11-13', EC: '2026-11-13', SV: '2026-11-13',
  CL: '2026-11-13', AR: '2026-11-13', VE: '2026-11-13', MX: '2026-11-13',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fotopasaporte.app';

  // 1. Homepage & Core Guides
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-11-21',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/medidas-foto-pasaporte`,
      lastModified: '2026-11-13',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/como-hacer-foto-pasaporte-en-casa`,
      lastModified: '2026-10-26',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donde-sacar-foto-pasaporte`,
      lastModified: '2026-10-26',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/como-verificamos-los-requisitos`,
      lastModified: '2026-10-26',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: '2026-11-21',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: '2026-10-26',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: '2026-10-26',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Size-based landing pages (targeting size-intent queries)
  const sizeSlugs = ['35x45-mm', '2x2-pulgadas', '50x70-mm', '33x48-mm'];
  for (const slug of sizeSlugs) {
    routes.push({
      url: `${baseUrl}/foto-${slug}`,
      lastModified: '2026-11-21',
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // 3. Canonical Country Pages (Curated Tier-1 destinations with bespoke Spanish content)
  // Prevents thin/templated programmatic pages from diluting sitewide quality signals.
  for (const country of COUNTRIES_DATA) {
    if (!isIndexableCountry(country.code)) continue;

    const slug = toCountrySlug(country);
    const dates = [
      '2026-11-21',
      COUNTRY_CONTENT_UPDATED[country.code],
      ...country.documents.map((d) => d.lastVerified),
    ].filter((d): d is string => Boolean(d));
    routes.push({
      url: `${baseUrl}/foto-pasaporte/${slug}`,
      lastModified: dates.sort().at(-1),
      changeFrequency: country.isPopular ? 'weekly' : 'monthly',
      priority: country.isPopular ? 0.9 : 0.7,
    });
  }

  return routes;
}

