import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  FileText,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medidas de Foto de Pasaporte y Tamaño Oficial (cm, mm, px) · Guía Completa 2026',
  description:
    'Descubre las medidas exactas de la foto de pasaporte en cm, mm y píxeles a 300 DPI. Tabla comparativa por países, dimensiones de la libreta en cm (12,5 × 8,8 cm), diferencias con foto carnet o cédula y visas.',
  keywords: [
    'tamaño pasaporte',
    'medida de pasaporte',
    'medida pasaporte',
    'pasaporte tamaño',
    'medidas pasaporte',
    'tamaño de foto pasaporte',
    'tamaño foto pasaporte',
    'tamaño de foto de pasaporte',
    'medida del pasaporte',
    'medidas de un pasaporte',
    'medidas de tamaño pasaporte',
    'medidas de foto pasaporte',
    'medidas de foto para pasaporte',
    'tamaño foto de pasaporte',
    'tamaño de fotos pasaporte',
    'tamaño de la foto pasaporte',
    'pasaporte medida',
    'foto tamaño pasaporte medidas',
    'foto tamaño pasaporte',
    'cuanto mide un pasaporte en cm',
    'visado y pasaporte es lo mismo',
    'visa y pasaporte diferencias',
    'tamaño de foto carnet',
    'fotografia tamaño cedula',
    'tamaño cedula',
  ],
  alternates: {
    canonical: 'https://fotopasaporte.app/medidas-foto-pasaporte',
  },
  openGraph: {
    title: 'Medidas de Foto de Pasaporte y Tamaño Oficial (cm, mm, px) · Guía Completa',
    description:
      'Guía oficial de dimensiones de fotos de pasaporte (35×45 mm, 2×2", 50×70 mm, 33×48 mm), tamaño de libreta en cm y diferencias entre visa, pasaporte y foto carnet.',
    url: 'https://fotopasaporte.app/medidas-foto-pasaporte',
    type: 'article',
    locale: 'es_ES',
  },
};

interface DimensionRow {
  region: string;
  country: string;
  slug: string;
  sizeMm: string;
  sizeCm: string;
  sizeInches: string;
  sizePx: string;
  bg: string;
  faceRatio: string;
}

const PASSPORT_SIZES_TABLE: DimensionRow[] = [
  {
    region: 'Estándar Europeo / ICAO',
    country: 'España',
    slug: 'espana',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco puro',
    faceRatio: '70% – 80% (32–36 mm)',
  },
  {
    region: 'América del Norte',
    country: 'Estados Unidos',
    slug: 'estados-unidos',
    sizeMm: '51 × 51 mm',
    sizeCm: '5,1 × 5,1 cm',
    sizeInches: '2 × 2 in',
    sizePx: '600 × 600 px',
    bg: 'Blanco / Blanco roto',
    faceRatio: '50% – 69% (25–35 mm)',
  },
  {
    region: 'América Latina',
    country: 'México',
    slug: 'mexico',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco liso',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América del Norte',
    country: 'Canadá',
    slug: 'canada',
    sizeMm: '50 × 70 mm',
    sizeCm: '5,0 × 7,0 cm',
    sizeInches: '2 × 2,75 in',
    sizePx: '591 × 827 px',
    bg: 'Blanco / Claro',
    faceRatio: '31 – 36 mm',
  },
  {
    region: 'Reino Unido',
    country: 'Reino Unido',
    slug: 'reino-unido',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Crema / Gris claro',
    faceRatio: '29 – 34 mm',
  },
  {
    region: 'Unión Europea',
    country: 'Alemania',
    slug: 'alemania',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Gris claro neutro',
    faceRatio: '32 – 36 mm (Fotomuster)',
  },
  {
    region: 'Unión Europea',
    country: 'Francia',
    slug: 'francia',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Gris claro / Azul pastel',
    faceRatio: '32 – 36 mm',
  },
  {
    region: 'Asia',
    country: 'China',
    slug: 'china',
    sizeMm: '33 × 48 mm',
    sizeCm: '3,3 × 4,8 cm',
    sizeInches: '1,3 × 1,89 in',
    sizePx: '390 × 567 px',
    bg: 'Blanco puro',
    faceRatio: '28 – 33 mm',
  },
  {
    region: 'América Central',
    country: 'Costa Rica',
    slug: 'costa-rica',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco uniforme',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América del Sur',
    country: 'Ecuador',
    slug: 'ecuador',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco liso',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América Central',
    country: 'El Salvador',
    slug: 'el-salvador',
    sizeMm: '51 × 51 mm / 35 × 45 mm',
    sizeCm: '5,1 × 5,1 cm',
    sizeInches: '2 × 2 in',
    sizePx: '600 × 600 px',
    bg: 'Blanco puro',
    faceRatio: '50% – 69%',
  },
  {
    region: 'América Central',
    country: 'Nicaragua',
    slug: 'nicaragua',
    sizeMm: '50 × 50 mm / 35 × 45 mm',
    sizeCm: '5,0 × 5,0 cm',
    sizeInches: '2 × 2 in',
    sizePx: '600 × 600 px',
    bg: 'Blanco sólido',
    faceRatio: '60% – 75%',
  },
  {
    region: 'América Central',
    country: 'Panamá',
    slug: 'panama',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco nítido',
    faceRatio: '32 – 36 mm',
  },
  {
    region: 'América del Sur',
    country: 'Argentina',
    slug: 'argentina',
    sizeMm: '40 × 40 mm / 35 × 45 mm',
    sizeCm: '4,0 × 4,0 cm',
    sizeInches: '1,57 × 1,57 in',
    sizePx: '472 × 472 px',
    bg: 'Blanco liso',
    faceRatio: '70% – 80%',
  },
  {
    region: 'Caribe',
    country: 'Cuba',
    slug: 'cuba',
    sizeMm: '45 × 45 mm / 35 × 45 mm',
    sizeCm: '4,5 × 4,5 cm',
    sizeInches: '1,77 × 1,77 in',
    sizePx: '531 × 531 px',
    bg: 'Blanco puro',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América del Sur',
    country: 'Chile',
    slug: 'chile',
    sizeMm: '45 × 45 mm',
    sizeCm: '4,5 × 4,5 cm',
    sizeInches: '1,77 × 1,77 in',
    sizePx: '531 × 531 px',
    bg: 'Blanco parejo',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América del Sur',
    country: 'Perú',
    slug: 'peru',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco liso',
    faceRatio: '70% – 80% (32–36 mm)',
  },
  {
    region: 'América del Sur',
    country: 'Uruguay',
    slug: 'uruguay',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco liso',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América del Sur',
    country: 'Colombia',
    slug: 'colombia',
    sizeMm: '30 × 40 mm / 35 × 45 mm',
    sizeCm: '3,0 × 4,0 cm',
    sizeInches: '1,18 × 1,57 in',
    sizePx: '354 × 472 px',
    bg: 'Blanco liso',
    faceRatio: '70% – 80%',
  },
  {
    region: 'América del Sur',
    country: 'Paraguay',
    slug: 'paraguay',
    sizeMm: '35 × 45 mm',
    sizeCm: '3,5 × 4,5 cm',
    sizeInches: '1,38 × 1,77 in',
    sizePx: '413 × 531 px',
    bg: 'Blanco sólido',
    faceRatio: '70% – 80%',
  },
];

const FAQS = [
  {
    q: '¿Cuál es el tamaño oficial y estándar de una foto de pasaporte?',
    a: 'A nivel global existen dos normas dominantes: el estándar internacional OACI (adoptado por España, toda la Unión Europea, Reino Unido y la mayoría de países latinoamericanos) de 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 px a 300 DPI); y el estándar estadounidense de 2 × 2 pulgadas cuadradas (51 × 51 mm / 5,1 × 5,1 cm / 600 × 600 px a 300 DPI), utilizado por EE.UU., República Dominicana y trámites consulares en Norteamérica.',
  },
  {
    q: '¿Cuánto mide un pasaporte físico en cm? (Dimensiones de la libreta)',
    a: 'La libreta oficial física del pasaporte ordinario cumple en prácticamente todo el mundo la norma internacional ISO/IEC 7810 y el documento OACI 9303 (Formato ID-3 o tamaño de papel B7). Mide exactamente 12,5 × 8,8 cm (125 × 88 mm) cuando está cerrada, con esquinas redondeadas de 3,18 mm de radio y normalmente entre 32 y 48 páginas.',
  },
  {
    q: '¿Cuál es la diferencia entre foto tamaño carnet, pasaporte y cédula?',
    a: 'La foto tamaño carnet tradicional (utilizada para carnets de conducir, DNI físico en España o colegios) suele medir 30 × 40 mm (3 × 4 cm). La foto de pasaporte es más amplia (35 × 45 mm o 51 × 51 mm) y exige normas biométricas internacionales mucho más rigurosas (proporción milimétrica del rostro entre 70% y 80%, fondo sin texturas ni sombras, expresión facial neutra). La fotografía para cédula de identidad nacional (como en Colombia, Ecuador o El Salvador) oscila entre los 30×40 mm y los 35×45 mm.',
  },
  {
    q: '¿Visado y pasaporte es lo mismo? ¿Qué diferencias existen en sus fotos?',
    a: 'No, no son lo mismo. El pasaporte es el documento oficial de identidad y nacionalidad emitido por el gobierno de tu propio país para viajar al exterior. El visado (visa) es una autorización de entrada o estancia emitida por el gobierno de un país extranjero. En cuanto a las fotos, el país que otorga la visa exige sus propias especificaciones fotográficas: por ejemplo, un ciudadano europeo con pasaporte de 35×45 mm necesitará una foto cuadrada de 2×2 pulgadas si solicita una visa para EE.UU. (DS-160), o de 33×48 mm para una visa de China.',
  },
  {
    q: '¿A cuántos píxeles y qué resolución debe exportarse la foto de pasaporte?',
    a: 'Para impresión física, la resolución obligatoria es de 300 DPI (puntos por pulgada). Una foto de 35 × 45 mm equivale a 413 × 531 píxeles a 300 DPI. Una foto de 2 × 2 pulgadas (51 × 51 mm) equivale a 600 × 600 píxeles a 300 DPI. Para solicitudes consulares digitales (como el formulario DS-160 de EE.UU.), se exige resolución exacta de 600×600 px y un peso de archivo entre 100 KB y 240 KB.',
  },
  {
    q: '¿Cómo convertir una foto a tamaño pasaporte online gratis?',
    a: 'Con FotoPasaporte.app puedes subir cualquier selfie o retrato desde tu teléfono. Seleccionas el país de destino y la herramienta calibra la escala biométrica, recorta la imagen al milímetro oficial (35×45 mm o 2×2"), reemplaza el fondo por el blanco reglamentario y te permite descargar la foto digital en alta resolución o la plantilla con marcas de corte lista para imprimir.',
  },
];

export default function MedidasPasaportePage() {
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Medidas de Foto de Pasaporte y Tamaño Oficial (cm, mm, px): Guía Completa 2026',
    description:
      'Guía oficial y técnica sobre las dimensiones de la foto de pasaporte en cm, mm y píxeles, medidas de la libreta física de pasaporte (12,5 × 8,8 cm) y diferencias con foto carnet, cédula y visas.',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fotopasaporte.app/medidas-foto-pasaporte',
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://fotopasaporte.app/images/logo.png',
      },
    },
    datePublished: '2026-10-14',
    dateModified: '2026-10-15',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://fotopasaporte.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Medidas de Foto de Pasaporte',
        item: 'https://fotopasaporte.app/medidas-foto-pasaporte',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Header />

      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:py-14">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[13px] text-[#6E6E73]"
        >
          <Link href="/" className="hover:text-[#0071E3] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#1D1D1F] font-medium">Medidas de Foto de Pasaporte</span>
        </nav>

        {/* Hero Header */}
        <header className="border-b border-[#E5E5EA] pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0071E3]/10 px-3 py-1 text-[12px] font-semibold tracking-wide text-[#0071E3]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>GUÍA OFICIAL 2026 · NORMATIVA OACI / ICAO DOC 9303</span>
          </div>

          <h1 className="mt-4 text-[30px] font-bold tracking-tight text-[#1D1D1F] sm:text-[44px] sm:leading-[1.15]">
            Medidas de Foto de Pasaporte y Tamaño Oficial: Guía Completa en cm, mm y px
          </h1>

          <p className="mt-4 max-w-3xl text-[16px] sm:text-[19px] leading-relaxed text-[#6E6E73]">
            Conoce con precisión milimétrica las dimensiones oficiales exigidas para fotografías de pasaporte, visas y documentos de identidad en todo el mundo. Compara medidas en <strong>centímetros (cm)</strong>, <strong>milímetros (mm)</strong>, <strong>pulgadas</strong> y <strong>píxeles</strong>, y descubre las diferencias clave con la foto carnet, la cédula y la libreta física de pasaporte.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#creador"
              className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>Convertir mi foto a tamaño oficial ahora</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* 4 Primary Format Cards */}
        <section className="mt-12">
          <h2 className="text-[22px] sm:text-[28px] font-bold text-[#1D1D1F] tracking-tight">
            Los 4 Grandes Estándares de Medidas en el Mundo
          </h2>
          <p className="mt-2 text-[15px] text-[#6E6E73]">
            El 98% de los países del mundo utilizan uno de estos cuatro formatos oficiales para sus pasaportes y visados.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: 35x45 mm */}
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5 transition-all hover:border-[#0071E3]/40 hover:bg-white hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#0071E3] uppercase tracking-wider">
                  Europa y Latinoamérica
                </span>
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#6E6E73] border border-[#E5E5EA]">
                  OACI 9303
                </span>
              </div>
              <p className="mt-3 text-[26px] font-bold text-[#1D1D1F]">35 × 45 mm</p>
              <p className="text-[13px] text-[#6E6E73]">3,5 × 4,5 cm · 1,38 × 1,77 in</p>
              <p className="mt-2 text-[12px] font-mono text-[#0071E3]">413 × 531 px a 300 DPI</p>
              <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                Utilizado por España, Unión Europea, Reino Unido, México, Ecuador, Costa Rica y la mayoría de países hispanohablantes.
              </p>
            </div>

            {/* Card 2: 2x2 in */}
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5 transition-all hover:border-[#0071E3]/40 hover:bg-white hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#0071E3] uppercase tracking-wider">
                  Estados Unidos y Caribe
                </span>
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#6E6E73] border border-[#E5E5EA]">
                  22 CFR § 51
                </span>
              </div>
              <p className="mt-3 text-[26px] font-bold text-[#1D1D1F]">51 × 51 mm</p>
              <p className="text-[13px] text-[#6E6E73]">5,1 × 5,1 cm · 2 × 2 pulgadas</p>
              <p className="mt-2 text-[12px] font-mono text-[#0071E3]">600 × 600 px a 300 DPI</p>
              <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                Exigido para pasaporte de EE.UU., visa DS-160, República Dominicana, India y consulados salvadoreños en EE.UU.
              </p>
            </div>

            {/* Card 3: 50x70 mm */}
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5 transition-all hover:border-[#0071E3]/40 hover:bg-white hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#0071E3] uppercase tracking-wider">
                  Canadá
                </span>
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#6E6E73] border border-[#E5E5EA]">
                  Passport Order
                </span>
              </div>
              <p className="mt-3 text-[26px] font-bold text-[#1D1D1F]">50 × 70 mm</p>
              <p className="text-[13px] text-[#6E6E73]">5,0 × 7,0 cm · 2 × 2,75 in</p>
              <p className="mt-2 text-[12px] font-mono text-[#0071E3]">591 × 827 px a 300 DPI</p>
              <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                Formato vertical exclusivo de gran tamaño para el pasaporte canadiense y tarjeta de residencia permanente de Canadá.
              </p>
            </div>

            {/* Card 4: 33x48 mm */}
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/50 p-5 transition-all hover:border-[#0071E3]/40 hover:bg-white hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#0071E3] uppercase tracking-wider">
                  China
                </span>
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#6E6E73] border border-[#E5E5EA]">
                  NIA / MPS
                </span>
              </div>
              <p className="mt-3 text-[26px] font-bold text-[#1D1D1F]">33 × 48 mm</p>
              <p className="text-[13px] text-[#6E6E73]">3,3 × 4,8 cm · 1,3 × 1,89 in</p>
              <p className="mt-2 text-[12px] font-mono text-[#0071E3]">390 × 567 px a 300 DPI</p>
              <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                Estándar milimétrico único para pasaporte chino biométrico y solicitud de visado consular para la República Popular China.
              </p>
            </div>
          </div>
        </section>

        {/* Booklet Dimensions: ¿Cuánto mide un pasaporte en cm? */}
        <section className="mt-16 rounded-3xl bg-[#F5F5F7] p-6 sm:p-10 border border-[#E5E5EA]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-3 py-1 text-[12px] font-medium text-white">
              <FileText className="h-3.5 w-3.5" />
              <span>DIMENSIONES DE LA LIBRETA FÍSICA</span>
            </div>

            <h2 className="mt-4 text-[24px] sm:text-[32px] font-bold tracking-tight text-[#1D1D1F]">
              ¿Cuánto mide un pasaporte físico en cm? (Dimensiones de la libreta oficial)
            </h2>

            <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-[#6E6E73]">
              Es común que los usuarios busquen <em>«cuánto mide un pasaporte en cm»</em> o <em>«tamaño pasaporte»</em> refiriéndose no a la foto, sino a la <strong>libreta física</strong> de viaje.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-4 border border-[#E5E5EA]/80 shadow-xs">
                <p className="text-[12px] font-semibold text-[#6E6E73] uppercase">Medidas en cm</p>
                <p className="mt-1 text-[22px] font-bold text-[#1D1D1F]">12,5 × 8,8 cm</p>
                <p className="text-[12px] text-[#8E8E93]">Cerrado (125 × 88 mm)</p>
              </div>

              <div className="rounded-xl bg-white p-4 border border-[#E5E5EA]/80 shadow-xs">
                <p className="text-[12px] font-semibold text-[#6E6E73] uppercase">Formato Internacional</p>
                <p className="mt-1 text-[22px] font-bold text-[#0071E3]">ID-3 / Tamaño B7</p>
                <p className="text-[12px] text-[#8E8E93]">Norma ISO/IEC 7810</p>
              </div>

              <div className="rounded-xl bg-white p-4 border border-[#E5E5EA]/80 shadow-xs">
                <p className="text-[12px] font-semibold text-[#6E6E73] uppercase">Esquinas y Páginas</p>
                <p className="mt-1 text-[22px] font-bold text-[#1D1D1F]">3,18 mm radio</p>
                <p className="text-[12px] text-[#8E8E93]">Libreta de 32 a 48 páginas</p>
              </div>
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-[#6E6E73]">
              De acuerdo con la Organización de Aviación Civil Internacional (OACI Doc 9303), todas las libretas de pasaporte biométrico (e-passports) deben respetar este tamaño estándar <strong>ID-3</strong> para encajar con precisión en las ranuras de lectura óptica y puertas automáticas (e-Gates) de los controles fronterizos aeroportuarios de todo el mundo.
            </p>
          </div>
        </section>

        {/* Global Comparison Table */}
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-[22px] sm:text-[30px] font-bold tracking-tight text-[#1D1D1F]">
                Tabla Comparativa de Medidas de Foto de Pasaporte por País
              </h2>
              <p className="mt-1 text-[15px] text-[#6E6E73]">
                Consulta las dimensiones milimétricas, en cm, pulgadas, píxeles y color de fondo exigidos por las autoridades oficiales.
              </p>
            </div>
            <Link
              href="/#creador"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0071E3] hover:underline shrink-0"
            >
              <span>herramienta para ajustar tu foto</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#E5E5EA] shadow-xs">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#F5F5F7] text-[12px] font-semibold text-[#1D1D1F] uppercase tracking-wider border-b border-[#E5E5EA]">
                <tr>
                  <th scope="col" className="px-4 py-3.5">País / Destino</th>
                  <th scope="col" className="px-4 py-3.5">Tamaño mm</th>
                  <th scope="col" className="px-4 py-3.5">Tamaño cm</th>
                  <th scope="col" className="px-4 py-3.5">Pulgadas</th>
                  <th scope="col" className="px-4 py-3.5">Píxeles (300 DPI)</th>
                  <th scope="col" className="px-4 py-3.5">Fondo Oficial</th>
                  <th scope="col" className="px-4 py-3.5 text-right">Guía y Recorte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5EA] bg-white">
                {PASSPORT_SIZES_TABLE.map((row) => (
                  <tr key={row.country} className="hover:bg-[#F9F9FB] transition-colors">
                    <td className="px-4 py-3.5 font-medium text-[#1D1D1F]">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/foto-pasaporte/${row.slug}`}
                          className="font-medium text-[#1D1D1F] hover:text-[#0071E3] hover:underline"
                        >
                          foto de pasaporte de {row.country}
                        </Link>
                        <span className="hidden sm:inline text-[11px] text-[#8E8E93]">({row.region})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-[#1D1D1F]">{row.sizeMm}</td>
                    <td className="px-4 py-3.5 text-[#6E6E73]">{row.sizeCm}</td>
                    <td className="px-4 py-3.5 text-[#6E6E73]">{row.sizeInches}</td>
                    <td className="px-4 py-3.5 font-mono text-[13px] text-[#0071E3]">{row.sizePx}</td>
                    <td className="px-4 py-3.5 text-[#6E6E73]">{row.bg}</td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        href={`/foto-pasaporte/${row.slug}`}
                        className="inline-flex items-center gap-1 rounded-full bg-[#0071E3]/10 px-2.5 py-1 text-[12px] font-medium text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-colors"
                      >
                        <span>Ver foto</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Differences: Carnet vs Pasaporte vs Cédula */}
        <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E5E5EA] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
                <Maximize2 className="h-5 w-5" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1D1D1F]">
                Foto Carnet vs Foto Pasaporte vs Cédula: Diferencias
              </h2>
            </div>

            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
              Existe gran confusión entre <strong>foto carnet</strong>, <strong>fotografía tamaño cédula</strong> y <strong>foto de pasaporte</strong>. Aunque en el lenguaje común a menudo se usan indistintamente, sus requisitos biométricos y dimensiones son notablemente diferentes:
            </p>

            <ul className="mt-5 space-y-3.5 text-[14px] text-[#6E6E73]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1D1D1F]">Foto Carnet (30 × 40 mm / 3 × 4 cm):</strong> Utilizada tradicionalmente en España para el DNI físico, carnets de conducir o fichas estudiantiles. Es 5 mm más baja y más estrecha que la foto de pasaporte.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1D1D1F]">Foto Cédula / DUI (35 × 45 mm o 30 × 40 mm):</strong> En países como El Salvador (DUI), Ecuador o Colombia, el documento nacional de identidad civil exige fotos de 35 × 45 mm con fondo blanco liso, sin gafas y orejas despejadas.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1D1D1F]">Foto de Pasaporte (35 × 45 mm o 51 × 51 mm):</strong> Regulada internacionalmente por la OACI. El rostro debe ocupar obligatoriamente entre el 70% y el 80% del cuadro, con iluminación calibrada y verificación biométrica algorítmica.
                </span>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-[#D2D2D7]/80 bg-[#F5F5F7] p-3.5 text-[13px] text-[#6E6E73]">
              <span>¿No sabes si debes llevar fotos físicas a tu cita? Comprueba </span>
              <Link
                href="/donde-sacar-foto-pasaporte"
                className="text-[#0071E3] font-semibold hover:underline"
              >
                si te toman la foto en la oficina
              </Link>
              <span> o si estás obligado a aportarlas según tu país.</span>
            </div>
          </div>

          {/* Visa vs Passport Difference */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34C759]/10 text-[#34C759]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1D1D1F]">
                ¿Visado y Pasaporte es lo mismo? Diferencias Clave
              </h2>
            </div>

            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
              <strong>No, visado y pasaporte son documentos completamente diferentes</strong>, aunque están íntimamente relacionados en los viajes internacionales:
            </p>

            <div className="mt-4 space-y-4 text-[14px] text-[#6E6E73]">
              <div className="rounded-xl bg-[#F5F5F7] p-3.5">
                <p className="font-semibold text-[#1D1D1F]">1. Pasaporte (Tu identidad nacional):</p>
                <p className="mt-1 text-[13px] leading-relaxed">
                  Lo emite el gobierno de tu país de origen. Certifica tu identidad, tu nacionalidad y te permite salir de tu país y regresar a él legalmente.
                </p>
              </div>

              <div className="rounded-xl bg-[#F5F5F7] p-3.5">
                <p className="font-semibold text-[#1D1D1F]">2. Visado / Visa (Permiso de entrada foráneo):</p>
                <p className="mt-1 text-[13px] leading-relaxed">
                  Lo emite la embajada o consulado del país extranjero que deseas visitar. Es una autorización para solicitar la entrada en su territorio por un motivo concreto (turismo, trabajo, estudios).
                </p>
              </div>

              <div className="rounded-xl bg-[#0071E3]/5 p-3.5 border border-[#0071E3]/20">
                <p className="font-semibold text-[#0071E3]">Diferencia en el formato de fotografía:</p>
                <p className="mt-1 text-[13px] text-[#1D1D1F] leading-relaxed">
                  El país de destino impone sus propias normas. Si un ciudadano español con pasaporte nacional de 35×45 mm solicita una visa para Estados Unidos, <strong>la foto debe ser obligatoriamente de 2×2 pulgadas (51×51 mm)</strong>, adaptándose al país receptor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Biometric Criteria Checklist */}
        <section className="mt-16 rounded-3xl border border-[#E5E5EA] bg-white p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <h2 className="text-[22px] sm:text-[30px] font-bold text-[#1D1D1F] tracking-tight">
              Requisitos Biométricos Universales para Cualquier Foto de Pasaporte
            </h2>
            <p className="mt-2 text-[15px] text-[#6E6E73]">
              Independientemente de las medidas en cm o mm, todos los consulados y organismos emisores aplican estas directrices fundamentales:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-5">
              <span className="text-[20px]">📐</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1D1D1F]">Proporción Facial (70%–80%)</h3>
              <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                La distancia desde la base de la barbilla hasta la parte superior de la cabeza debe ocupar entre el 70% y el 80% de la altura total de la foto.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-5">
              <span className="text-[20px]">⚪</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1D1D1F]">Fondo Blanco Liso</h3>
              <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                Fondo monocromático liso y sin sombras (o gris claro/crema según el país). No se admiten estampados, texturas de pared ni objetos de fondo.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-5">
              <span className="text-[20px]">😐</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1D1D1F]">Expresión Facial Neutra</h3>
              <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                Boca cerrada sin sonreír ni mostrar dientes, mirada frontal directa a la lente con ambos ojos plenamente abiertos y nivelados.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-5">
              <span className="text-[20px]">👓</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1D1D1F]">Sin Gafas ni Reflejos</h3>
              <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                Estados Unidos y muchos países prohíben gafas por completo. En países donde se permiten, los cristales no pueden tener brillos ni la montura cubrir los ojos.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-5">
              <span className="text-[20px]">👂</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1D1D1F]">Frente y Orejas Despejadas</h3>
              <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                El cabello no debe ocultar las cejas, los ojos ni el contorno de las orejas. Evita diademas llamativas, aretes colgantes o collares gruesos.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/40 p-5">
              <span className="text-[20px]">🖨️</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1D1D1F]">Resolución 300 DPI</h3>
              <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                Toda fotografía impresa debe tener una densidad mínima de 300 puntos por pulgada sobre papel fotográfico de alta calidad en brillo o mate.
              </p>
            </div>
          </div>

          {/* L-11 Contextual Link callout */}
          <div className="mt-8 rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-5 text-[14px] text-[#6E6E73] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="text-[#1D1D1F]">¿Vas a preparar tu foto tú mismo?</strong>
              <p className="mt-1">
                Consulta nuestra guía detallada con el móvil sobre{' '}
                <Link
                  href="/como-hacer-foto-pasaporte-en-casa"
                  className="font-semibold text-[#0071E3] hover:underline"
                >
                  cómo tomar la foto en casa
                </Link>{' '}
                para asegurar la iluminación y postura adecuadas sin cometer errores biométricos.
              </p>
            </div>
            <Link
              href="/como-hacer-foto-pasaporte-en-casa"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white border border-[#D2D2D7] px-4 py-2 font-medium text-[#1D1D1F] hover:bg-[#E5E5EA] transition-colors"
            >
              <span>Ver guía paso a paso</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#1D1D1F]">
              Preguntas Frecuentes sobre Tamaños y Medidas de Pasaporte
            </h2>
            <p className="mt-2 text-[15px] text-[#6E6E73]">
              Resolvemos las dudas más frecuentes sobre dimensiones de fotografías y libretas de pasaporte.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#E5E5EA] border-y border-[#E5E5EA]">
            {FAQS.map((faq, index) => (
              <details key={index} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
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

        {/* Final Conversion Banner */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2C2C2E] p-8 sm:p-12 text-white shadow-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#0071E3]" />
              <span>RECORTADOR BIOMÉTRICO GRATIS</span>
            </div>
            <h2 className="mt-4 text-[26px] sm:text-[36px] font-bold tracking-tight text-white">
              Convierte tu foto a las medidas oficiales en segundos
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-[#A1A1A6] leading-relaxed">
              No arriesgues el rechazo de tu pasaporte o visa por un error de milímetros. Sube tu foto ahora y obtén el recorte exacto, fondo blanco calibrado y plantilla para imprimir con marcas de corte.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/#creador"
                className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>Crear foto de pasaporte gratis</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="text-[13px] font-medium text-[#A1A1A6] hover:text-white transition-colors"
              >
                Volver a la página principal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
