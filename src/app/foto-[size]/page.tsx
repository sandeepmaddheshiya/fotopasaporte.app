import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import { COUNTRIES_DATA, toCountrySlug } from '@/data/countries';
import { isIndexableCountry } from '@/data/country-seo-data';
import {
  Ruler,
  ArrowRight,
  ChevronRight,
  Globe2,
  CheckCircle2,
  Sparkles,
  Printer,
  FileCheck,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// SIZE FORMAT DEFINITIONS
// ---------------------------------------------------------------------------
interface SizeFormat {
  slug: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  sizeInches: string;
  sizeCm: string;
  standard: string;
  standardCode: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  countryCodes: string[];
  useCases: string[];
  faqs: { q: string; a: string }[];
}

const SIZE_FORMATS: SizeFormat[] = [
  {
    slug: '35x45-mm',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    sizeInches: '1,38 × 1,77 pulgadas',
    sizeCm: '3,5 × 4,5 cm',
    standard: 'OACI Doc 9303 / Estándar europeo e internacional',
    standardCode: 'OACI 9303',
    title: 'Foto 35×45 mm: países, medidas en cm, px y requisitos',
    h1: 'Foto 35 × 45 mm: medidas, píxeles y países que la exigen',
    description:
      'Guía completa sobre la foto de 35×45 mm (3,5×4,5 cm / 413×531 px a 300 DPI). Descubre qué países la exigen para pasaporte y visado, y prepara tu foto online.',
    intro:
      'El formato de 35 × 45 mm es el estándar biométrico más utilizado del mundo. Lo exige la Unión Europea, el espacio Schengen, el Reino Unido, México, Colombia, Ecuador y la mayoría de países latinoamericanos para pasaportes y visados.',
    countryCodes: ['ES', 'MX', 'CO', 'AR', 'PE', 'EC', 'CR', 'PA', 'UY', 'PY', 'GB', 'DE', 'FR', 'IT', 'PT', 'NL', 'CH', 'IE', 'AU', 'IN', 'JP', 'BR'],
    useCases: [
      'Pasaporte biométrico (UE, Schengen, LatAm)',
      'Visado Schengen (todos los países miembros)',
      'DNI / Cédula de identidad (España, Perú, Ecuador)',
      'Carnet de conducir europeo',
      'Solicitud de residencia (visado familiar / laboral)',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 35×45 mm?',
        a: 'A 300 DPI (la resolución estándar para impresión oficial), una foto de 35 × 45 mm equivale exactamente a 413 × 531 píxeles.',
      },
      {
        q: '¿35×45 mm es lo mismo que foto carnet?',
        a: 'No exactamente. La foto carnet tradicional española mide 30 × 40 mm (3 × 4 cm), que es 5 mm más estrecha y 5 mm más corta. La foto de pasaporte de 35×45 mm tiene requisitos biométricos más estrictos (proporción facial, fondo, expresión).',
      },
      {
        q: '¿Puedo usar una foto 35×45 mm para un visado de EE.UU.?',
        a: 'No. Estados Unidos exige un formato cuadrado de 2 × 2 pulgadas (51 × 51 mm / 600 × 600 px). Las medidas de 35×45 mm no son válidas para el formulario DS-160 ni para el pasaporte estadounidense.',
      },
    ],
  },
  {
    slug: '2x2-pulgadas',
    widthMm: 51,
    heightMm: 51,
    widthPx: 600,
    heightPx: 600,
    sizeInches: '2 × 2 pulgadas',
    sizeCm: '5,1 × 5,1 cm',
    standard: '22 CFR § 51.26 (Código de Regulaciones Federales de EE. UU.)',
    standardCode: '22 CFR § 51',
    title: 'Foto 2×2 pulgadas (51×51 mm): países, px y requisitos',
    h1: 'Foto 2 × 2 pulgadas (51 × 51 mm): medidas y países',
    description:
      'Guía completa de la foto de 2×2 pulgadas (51×51 mm / 600×600 px). Necesaria para pasaporte y visa de EE.UU. (DS-160), India, República Dominicana y más.',
    intro:
      'El formato cuadrado de 2 × 2 pulgadas (51 × 51 mm) es el estándar oficial de Estados Unidos, tanto para el pasaporte como para todas las categorías de visa (DS-160, inmigrante y no inmigrante). También lo exigen India, República Dominicana y El Salvador.',
    countryCodes: ['US', 'IN', 'DO', 'SV'],
    useCases: [
      'Pasaporte estadounidense (libreta y tarjeta)',
      'Visa de no inmigrante DS-160 (turista B1/B2, estudiante F-1, trabajo H-1B)',
      'Visa de inmigrante (Diversidad DV, familiar)',
      'Pasaporte indio y visa OCI',
      'Pasaporte dominicano y cédula',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 2×2 pulgadas?',
        a: 'A 300 DPI, una foto de 2 × 2 pulgadas equivale a 600 × 600 píxeles. Para la solicitud digital DS-160 de EE.UU., el archivo debe pesar entre 100 KB y 240 KB en formato JPEG.',
      },
      {
        q: '¿La foto de 2×2 es la misma que la de 51×51 mm?',
        a: 'Sí. 2 pulgadas equivalen a 50,8 mm, redondeado a 51 mm. Son el mismo formato expresado en distintas unidades de medida.',
      },
      {
        q: '¿El fondo tiene que ser blanco para la foto de 2×2?',
        a: 'Para EE.UU., el fondo debe ser blanco o blanco roto, liso y sin sombras. India exige blanco puro. Algunos países aceptan un fondo claro uniforme.',
      },
    ],
  },
  {
    slug: '50x70-mm',
    widthMm: 50,
    heightMm: 70,
    widthPx: 591,
    heightPx: 827,
    sizeInches: '2 × 2,75 pulgadas',
    sizeCm: '5,0 × 7,0 cm',
    standard: 'Canadian Passport Order (SOR/81-586)',
    standardCode: 'Passport Order',
    title: 'Foto 50×70 mm: requisitos del pasaporte canadiense',
    h1: 'Foto 50 × 70 mm (5 × 7 cm): pasaporte de Canadá',
    description:
      'Guía de la foto de 50×70 mm (5×7 cm / 591×827 px) para pasaporte y documentos canadienses. Medidas, fondo, proporción facial y cómo prepararla online.',
    intro:
      'El formato de 50 × 70 mm es exclusivo de Canadá. Es el más grande entre los estándares principales y se utiliza tanto para el pasaporte canadiense como para la tarjeta de residencia permanente (PR Card). Su orientación vertical y mayores dimensiones lo hacen incompatible con el estándar europeo o estadounidense.',
    countryCodes: ['CA'],
    useCases: [
      'Pasaporte canadiense (libreta)',
      'Tarjeta de residencia permanente (PR Card)',
      'Solicitud de ciudadanía canadiense',
      'Permiso de trabajo y estudio',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 50×70 mm?',
        a: 'A 300 DPI, una foto de 50 × 70 mm equivale a 591 × 827 píxeles.',
      },
      {
        q: '¿Puedo usar una foto 50×70 para un pasaporte europeo?',
        a: 'No. El estándar europeo es de 35 × 45 mm, que es significativamente más pequeño. Cada país exige su propio formato.',
      },
      {
        q: '¿Qué fondo necesita la foto canadiense?',
        a: 'El fondo debe ser blanco o de color claro uniforme, sin sombras ni texturas. Se recomienda blanco puro para máxima compatibilidad.',
      },
    ],
  },
  {
    slug: '33x48-mm',
    widthMm: 33,
    heightMm: 48,
    widthPx: 390,
    heightPx: 567,
    sizeInches: '1,3 × 1,89 pulgadas',
    sizeCm: '3,3 × 4,8 cm',
    standard: 'Administración Nacional de Inmigración (NIA) de China',
    standardCode: 'NIA / MPS',
    title: 'Foto 33×48 mm: requisitos del pasaporte chino y visado',
    h1: 'Foto 33 × 48 mm (3,3 × 4,8 cm): pasaporte y visa de China',
    description:
      'Guía de la foto de 33×48 mm (3,3×4,8 cm / 390×567 px) para pasaporte chino y solicitud de visado consular. Medidas, fondo blanco y requisitos.',
    intro:
      'El formato de 33 × 48 mm es exclusivo de la República Popular China. Se utiliza tanto para el pasaporte biométrico chino como para la solicitud de visado consular en embajadas y consulados de China en el extranjero. Sus medidas milimétricas no coinciden con ningún otro estándar principal.',
    countryCodes: ['CN'],
    useCases: [
      'Pasaporte biométrico chino',
      'Visado consular para China (turismo, negocios, estudios)',
      'Permiso de residencia en China',
      'Tarjeta de identidad de residencia temporal',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 33×48 mm?',
        a: 'A 300 DPI, una foto de 33 × 48 mm equivale a 390 × 567 píxeles.',
      },
      {
        q: '¿El fondo de la foto para China debe ser blanco?',
        a: 'Sí. La NIA (Administración Nacional de Inmigración) exige fondo blanco puro, liso y sin sombras, sin excepción.',
      },
      {
        q: '¿Puedo usar la foto de 33×48 para un pasaporte europeo?',
        a: 'No. El estándar europeo/OACI es de 35 × 45 mm. Aunque las medidas parezcan similares, difieren en anchura y altura, y serían rechazadas.',
      },
    ],
  },
];

function getSizeFormatBySlug(slug: string): SizeFormat | undefined {
  return SIZE_FORMATS.find((f) => f.slug === slug);
}

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return SIZE_FORMATS.map((f) => ({ size: f.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
interface SizePageProps {
  params: Promise<{ size: string }>;
}

export async function generateMetadata({ params }: SizePageProps): Promise<Metadata> {
  const { size } = await params;
  const format = getSizeFormatBySlug(size);

  if (!format) {
    return { title: 'Formato no encontrado — FotoPasaporte.app' };
  }

  return {
    title: format.title,
    description: format.description,
    keywords: [
      `foto ${format.slug}`,
      `foto ${format.widthMm}x${format.heightMm}`,
      `foto ${format.sizeCm.replace(/ /g, '')}`,
      `foto pasaporte ${format.slug}`,
      `${format.widthPx}x${format.heightPx} px`,
      `foto ${format.sizeInches}`,
      'foto pasaporte medidas',
    ],
    alternates: {
      canonical: `https://fotopasaporte.app/foto-${format.slug}`,
    },
    openGraph: {
      title: format.title,
      description: format.description,
      url: `https://fotopasaporte.app/foto-${format.slug}`,
      locale: 'es_ES',
      type: 'article',
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function SizeLandingPage({ params }: SizePageProps) {
  const { size } = await params;
  const format = getSizeFormatBySlug(size);

  if (!format) {
    notFound();
  }

  // Find countries that use this size from COUNTRIES_DATA
  const matchingCountries = COUNTRIES_DATA.filter((c) =>
    format.countryCodes.includes(c.code)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: format.h1,
        description: format.description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://fotopasaporte.app/foto-${format.slug}`,
        },
        author: {
          '@type': 'Organization',
          name: 'FotoPasaporte.app',
          url: 'https://fotopasaporte.app',
        },
        publisher: {
          '@type': 'Organization',
          name: 'FotoPasaporte.app',
          url: 'https://fotopasaporte.app',
          logo: { '@type': 'ImageObject', url: 'https://fotopasaporte.app/images/logo.png' },
        },
        datePublished: '2026-10-25',
        dateModified: '2026-10-25',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://fotopasaporte.app' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Medidas de Foto de Pasaporte',
            item: 'https://fotopasaporte.app/medidas-foto-pasaporte',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Foto ${format.widthMm}×${format.heightMm} mm`,
            item: `https://fotopasaporte.app/foto-${format.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: format.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-[#6E6E73]">
          <Link href="/" className="hover:text-[#0071E3] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/medidas-foto-pasaporte"
            className="hover:text-[#0071E3] transition-colors"
          >
            Medidas
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-[#1D1D1F]">
            Foto {format.widthMm}×{format.heightMm} mm
          </span>
        </nav>

        {/* Hero Header */}
        <header className="border-b border-[#E5E5EA] pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0071E3]/10 px-3 py-1 text-[12px] font-semibold tracking-wide text-[#0071E3]">
            <Ruler className="h-3.5 w-3.5" />
            <span>{format.standardCode}</span>
          </div>

          <h1 className="mt-4 text-[30px] font-bold tracking-tight text-[#1D1D1F] sm:text-[44px] sm:leading-[1.15]">
            {format.h1}
          </h1>

          <p className="mt-4 max-w-3xl text-[16px] sm:text-[19px] leading-relaxed text-[#6E6E73]">
            {format.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#creador"
              className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>Crear foto de {format.widthMm}×{format.heightMm} mm</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Specs Cards */}
        <section className="mt-12">
          <h2 className="text-[22px] sm:text-[28px] font-bold text-[#1D1D1F] tracking-tight">
            Especificaciones técnicas exactas
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Milímetros
              </span>
              <p className="mt-2 text-[26px] font-bold text-[#1D1D1F]">
                {format.widthMm} × {format.heightMm} mm
              </p>
              <p className="text-[13px] text-[#6E6E73]">{format.sizeCm}</p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Pulgadas
              </span>
              <p className="mt-2 text-[26px] font-bold text-[#1D1D1F]">
                {format.sizeInches}
              </p>
              <p className="text-[13px] text-[#6E6E73]">Imperial</p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Píxeles (300 DPI)
              </span>
              <p className="mt-2 text-[26px] font-bold text-[#0071E3]">
                {format.widthPx} × {format.heightPx} px
              </p>
              <p className="text-[13px] text-[#6E6E73]">Resolución mínima para impresión</p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Normativa
              </span>
              <p className="mt-2 text-[15px] font-bold text-[#1D1D1F] leading-snug">
                {format.standard}
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mt-14 rounded-3xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-6 sm:p-10">
          <h2 className="text-[22px] sm:text-[28px] font-bold text-[#1D1D1F] tracking-tight">
            ¿Para qué documentos se usa la foto de {format.widthMm}×{format.heightMm} mm?
          </h2>

          <ul className="mt-6 space-y-3">
            {format.useCases.map((uc, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[15px] text-[#424245]">
                <CheckCircle2 className="h-5 w-5 text-[#34C759] shrink-0 mt-0.5" />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Countries Grid */}
        <section className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-[22px] sm:text-[28px] font-bold text-[#1D1D1F] tracking-tight">
                Países que exigen foto de {format.widthMm}×{format.heightMm} mm
              </h2>
              <p className="mt-1 text-[15px] text-[#6E6E73]">
                Haz clic en cualquier país para ver todos sus requisitos fotográficos.
              </p>
            </div>
            <Link
              href="/medidas-foto-pasaporte"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0071E3] hover:underline shrink-0"
            >
              <span>Ver tabla completa</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {matchingCountries.map((c) => {
              const doc = c.documents[0];
              return (
                <Link
                  key={c.code}
                  href={`/foto-pasaporte/${toCountrySlug(c)}`}
                  className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
                >
                  <span className="text-[24px]">{c.flag}</span>
                  <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F] line-clamp-1">
                    {c.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#6E6E73]">
                    {doc.widthMm} × {doc.heightMm} mm
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-[#1D1D1F] text-center">
            Preguntas frecuentes sobre la foto de {format.widthMm}×{format.heightMm} mm
          </h2>

          <div className="mt-8 divide-y divide-[#E5E5EA] border-y border-[#E5E5EA]">
            {format.faqs.map((faq, idx) => (
              <details key={idx} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-left text-[16px] sm:text-[17px] font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                  <span>{faq.q}</span>
                  <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#6E6E73] transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Cross-links to other sizes */}
        <section className="mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1D1D1F] tracking-tight">
            Otros formatos de foto de pasaporte
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SIZE_FORMATS.filter((f) => f.slug !== format.slug).map((f) => (
              <Link
                key={f.slug}
                href={`/foto-${f.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-[#D2D2D7] bg-white p-4 transition-all hover:border-[#0071E3] hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F7] text-[#0071E3]">
                  <Ruler className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#1D1D1F]">
                    {f.widthMm} × {f.heightMm} mm
                  </p>
                  <p className="text-[12px] text-[#6E6E73]">{f.sizeCm} · {f.standardCode}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2C2C2E] p-8 sm:p-12 text-white shadow-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#0071E3]" />
              <span>RECORTADOR BIOMÉTRICO</span>
            </div>
            <h2 className="mt-4 text-[26px] sm:text-[36px] font-bold tracking-tight text-white">
              Recorta tu foto a {format.widthMm}×{format.heightMm} mm en segundos
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-[#A1A1A6] leading-relaxed">
              Sube tu foto, selecciona el país y descarga el archivo digital a {format.widthPx}×{format.heightPx} px con la hoja de impresión lista para recortar.
            </p>
            <div className="mt-6">
              <Link
                href="/#creador"
                className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>Crear foto de {format.widthMm}×{format.heightMm} mm</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
