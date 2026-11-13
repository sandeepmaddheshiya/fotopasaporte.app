import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toCountrySlug } from '@/data/countries';
import {
  SIZE_FORMATS,
  getSizeFormat,
  getCountriesForFormat,
  type SizeFormatSlug,
} from '@/data/size-formats';
import { Ruler, ArrowRight, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

const MAX_COUNTRY_CARDS = 30;

function docTypeLabel(type: string): string {
  if (type === 'visa') return 'Visado';
  if (type === 'id_card') return 'Documento de identidad';
  return 'Pasaporte';
}

export function SizeFormatPage({ slug }: { slug: SizeFormatSlug }) {
  const format = getSizeFormat(slug);
  const url = `https://fotopasaporte.app/foto-${format.slug}`;

  // Derived from countries.json (single source of truth) — see src/data/size-formats.ts
  const matches = getCountriesForFormat(format);
  const shownMatches = matches.slice(0, MAX_COUNTRY_CARDS);
  const hiddenCount = matches.length - shownMatches.length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: format.h1,
        description: format.description,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@type': 'Organization', name: 'FotoPasaporte.app', url: 'https://fotopasaporte.app' },
        publisher: {
          '@type': 'Organization',
          name: 'FotoPasaporte.app',
          url: 'https://fotopasaporte.app',
          logo: { '@type': 'ImageObject', url: 'https://fotopasaporte.app/images/logo.png' },
        },
        datePublished: '2026-11-13',
        dateModified: '2026-11-13',
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
          { '@type': 'ListItem', position: 3, name: `Foto ${format.widthMm}×${format.heightMm} mm`, item: url },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />

      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-[#6E6E73]">
          <Link href="/" className="hover:text-[#0071E3] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/medidas-foto-pasaporte" className="hover:text-[#0071E3] transition-colors">
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

          <p className="mt-4 max-w-3xl text-[16px] sm:text-[19px] leading-relaxed text-[#6E6E73]">{format.intro}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#creador"
              className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>
                Crear foto de {format.widthMm}×{format.heightMm} mm
              </span>
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
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">Milímetros</span>
              <p className="mt-2 text-[26px] font-bold text-[#1D1D1F]">
                {format.widthMm} × {format.heightMm} mm
              </p>
              <p className="text-[13px] text-[#6E6E73]">{format.sizeCm}</p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">Pulgadas</span>
              <p className="mt-2 text-[26px] font-bold text-[#1D1D1F]">{format.sizeInches}</p>
              <p className="text-[13px] text-[#6E6E73]">Imperial</p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">Píxeles (300 DPI)</span>
              <p className="mt-2 text-[26px] font-bold text-[#0071E3]">
                {format.widthPx} × {format.heightPx} px
              </p>
              <p className="text-[13px] text-[#6E6E73]">Resolución mínima para impresión</p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">Normativa</span>
              <p className="mt-2 text-[15px] font-bold text-[#1D1D1F] leading-snug">{format.standard}</p>
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

        {/* Countries Grid (derived from countries.json) */}
        <section className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-[22px] sm:text-[28px] font-bold text-[#1D1D1F] tracking-tight">
                Países que usan la foto de {format.widthMm}×{format.heightMm} mm
              </h2>
              <p className="mt-1 text-[15px] text-[#6E6E73]">
                {matches.length} {matches.length === 1 ? 'país usa' : 'países usan'} este formato para al menos un
                documento según nuestra base de requisitos. Haz clic en un país para ver todos sus requisitos.
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
            {shownMatches.map(({ country, documents }) => (
              <Link
                key={country.code}
                href={`/foto-pasaporte/${toCountrySlug(country)}`}
                className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
              >
                <span className="text-[24px]">{country.flag}</span>
                <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F] line-clamp-1">{country.name}</span>
                <span className="text-[11px] text-[#6E6E73]">
                  {Array.from(new Set(documents.map((d) => docTypeLabel(d.documentType)))).join(' · ')}
                </span>
              </Link>
            ))}
          </div>

          {hiddenCount > 0 && (
            <p className="mt-4 text-[14px] text-[#6E6E73]">
              Y {hiddenCount} países más.{' '}
              <Link href="/medidas-foto-pasaporte" className="font-medium text-[#0071E3] hover:underline">
                Consulta las medidas de la foto de pasaporte por país
              </Link>
              .
            </p>
          )}
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
                  <p className="text-[12px] text-[#6E6E73]">
                    {f.sizeCm} · {f.standardCode}
                  </p>
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
              Sube tu foto, selecciona el país y descarga el archivo digital a {format.widthPx}×{format.heightPx} px con la
              hoja de impresión lista para recortar.
            </p>
            <div className="mt-6">
              <Link
                href="/#creador"
                className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>
                  Crear foto de {format.widthMm}×{format.heightMm} mm
                </span>
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
