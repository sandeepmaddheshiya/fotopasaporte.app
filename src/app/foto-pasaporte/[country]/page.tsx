import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCountryBySlugOrCode,
  POPULAR_COUNTRIES,
  toCountrySlug,
  COUNTRIES_DATA,
} from '@/data/countries';
import {
  getCountryAuthorityInfo,
  getCountryRejectionReasons,
  getCountryFAQs,
} from '@/data/country-seo-data';
import { Header } from '@/components/Header';
import { PhotoMaker } from '@/components/workspace/PhotoMaker';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import {
  Ruler,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Shield,
  FileCheck,
  ChevronRight,
  ArrowRight,
  Info,
  HelpCircle,
  Shirt,
  Sparkles,
  Camera,
} from 'lucide-react';

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

export async function generateStaticParams() {
  const topList = COUNTRIES_DATA.slice(0, 50);
  const params: { country: string }[] = [];

  for (const c of topList) {
    params.push({ country: toCountrySlug(c) });
    params.push({ country: c.code.toLowerCase() });
  }

  return params;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country: countryParam } = await params;
  const country = getCountryBySlugOrCode(countryParam);

  if (!country) {
    return {
      title: 'País no encontrado — FotoPasaporte.app',
    };
  }

  const primaryDoc = country.documents[0];
  const auth = getCountryAuthorityInfo(country);
  const title = `Foto de Pasaporte para ${country.name} (${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm) · Medidas Oficiales y Creador`;
  const description = `Guía oficial y herramienta para recortar tu foto de pasaporte o visado de ${country.name}. Medidas oficiales de ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm (${primaryDoc.widthPx} × ${primaryDoc.heightPx} px a 300 DPI), fondo ${primaryDoc.backgroundColor.toLowerCase()} y cumplimiento de las directrices de ${auth.authorityName}.`;

  return {
    title,
    description,
    keywords: [
      `foto pasaporte ${country.name.toLowerCase()}`,
      `foto visa ${country.name.toLowerCase()}`,
      `medidas foto pasaporte ${country.name.toLowerCase()}`,
      `requisitos foto ${country.name.toLowerCase()}`,
      `tamano foto ${country.name.toLowerCase()}`,
      `foto carnet ${country.name.toLowerCase()}`,
      `hacer foto pasaporte ${country.name.toLowerCase()} en casa`,
    ],
    openGraph: {
      title,
      description,
      locale: 'es_ES',
      type: 'website',
      url: `https://fotopasaporte.app/foto-pasaporte/${toCountrySlug(country)}`,
    },
    alternates: {
      canonical: `https://fotopasaporte.app/foto-pasaporte/${toCountrySlug(country)}`,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countryParam } = await params;
  const country = getCountryBySlugOrCode(countryParam);

  if (!country) {
    notFound();
  }

  const primaryDoc = country.documents[0];
  const auth = getCountryAuthorityInfo(country);
  const rejectionReasons = getCountryRejectionReasons(country);
  const faqs = getCountryFAQs(country);

  // Schema.org JSON-LD structured data for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://fotopasaporte.app/foto-pasaporte/${toCountrySlug(country)}`,
        name: `Foto de Pasaporte para ${country.name} · Medidas Oficiales y Creador`,
        description: `Prepara tu fotografía para pasaporte o visado de ${country.name} con las medidas oficiales de ${primaryDoc.widthMm}x${primaryDoc.heightMm} mm.`,
        inLanguage: 'es',
        breadcrumb: {
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
              name: 'Requisitos por País',
              item: 'https://fotopasaporte.app/#requisitos',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: country.name,
              item: `https://fotopasaporte.app/foto-pasaporte/${toCountrySlug(country)}`,
            },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: `Creador de Foto de Pasaporte para ${country.name}`,
        operatingSystem: 'All',
        applicationCategory: 'MultimediaApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        name: `Cómo hacer la foto de pasaporte para ${country.name} en casa`,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Preparar iluminación y fondo',
            text: `Colócate frente a una ventana con luz natural y con fondo ${primaryDoc.backgroundColor.toLowerCase()} sin sombras.`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Tomar la fotografía a la distancia adecuada',
            text: 'Pide a otra persona que te tome la foto a 1,5–2 metros de distancia, mirando de frente y con expresión neutra.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Ajustar con el editor biométrico',
            text: `Sube tu imagen a FotoPasaporte.app para encuadrarla exactamente a ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm a 300 DPI.`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Descargar e imprimir',
            text: 'Descarga el archivo digital JPEG o la hoja de 10×15 cm para imprimir al 100% de escala.',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header */}
      <Header />

      {/* 2. Breadcrumbs & Editorial Hero */}
      <section className="border-b border-[#E5E5EA] bg-[#F5F5F7]/70 py-8 sm:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-[12px] text-[#6E6E73]">
            <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#8E8E93]" />
            <Link href="/#requisitos" className="hover:text-[#1D1D1F] transition-colors">
              Requisitos
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#8E8E93]" />
            <span className="font-medium text-[#1D1D1F]">
              {country.flag} {country.name}
            </span>
          </nav>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-3.5 py-1 text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase shadow-2xs">
                <span>{country.flag}</span>
                <span>{country.region} · Especificaciones Verificadas</span>
              </div>

              <h1 className="mt-3 text-[32px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[44px]">
                Foto de Pasaporte y Visado para {country.name}
              </h1>

              <p className="mt-3 text-[16px] leading-relaxed text-[#6E6E73] sm:text-[18px]">
                Guía completa y herramienta online para recortar y ajustar tu fotografía con las medidas oficiales de{' '}
                <strong className="text-[#1D1D1F]">
                  {primaryDoc.widthMm} × {primaryDoc.heightMm} mm
                </strong>
                , fondo {primaryDoc.backgroundColor.toLowerCase()} y proporción biométrica según las normas de{' '}
                <span className="text-[#1D1D1F]">{auth.authorityName}</span>.
              </p>
            </div>

            {/* Quick Specs Pill Box */}
            <div className="flex shrink-0 flex-wrap gap-2.5 rounded-2xl border border-[#D2D2D7] bg-white p-4 text-[13px] shadow-xs">
              <div className="flex items-center gap-2 px-2">
                <Ruler className="h-4 w-4 text-[#0071E3]" />
                <div>
                  <span className="block text-[11px] text-[#8E8E93]">Medidas</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    {primaryDoc.widthMm} × {primaryDoc.heightMm} mm
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-[#E5E5EA]" />
              <div className="flex items-center gap-2 px-2">
                <FileCheck className="h-4 w-4 text-[#34C759]" />
                <div>
                  <span className="block text-[11px] text-[#8E8E93]">Densidad</span>
                  <span className="font-semibold text-[#1D1D1F]">300 DPI</span>
                </div>
              </div>
              <div className="h-8 w-px bg-[#E5E5EA]" />
              <div className="flex items-center gap-2 px-2">
                <Shield className="h-4 w-4 text-[#0071E3]" />
                <div>
                  <span className="block text-[11px] text-[#8E8E93]">Documentos</span>
                  <span className="font-semibold text-[#1D1D1F]">{country.documents.length} tipos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Workspace pre-configured for this country */}
      <section className="bg-white">
        <PhotoMaker initialCountryCode={country.code} />
      </section>

      {/* 4. Institutional Authority & Legal Framework */}
      <section className="border-t border-[#E5E5EA] bg-[#F5F5F7] py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-2.5 text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase">
              <Info className="h-4 w-4 text-[#0071E3]" />
              <span>Marco Legal y Organismo Emisor</span>
            </div>

            <h2 className="mt-3 text-[24px] font-semibold text-[#1D1D1F] sm:text-[30px]">
              Entidad reguladora de la fotografía en {country.name}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 border-y border-[#E5E5EA] py-6 text-[14px]">
              <div>
                <span className="text-[12px] font-medium text-[#8E8E93]">Organismo emisor</span>
                <p className="mt-1 font-semibold text-[#1D1D1F]">{auth.authorityName}</p>
                <p className="text-[12px] text-[#6E6E73]">{auth.department}</p>
              </div>

              <div>
                <span className="text-[12px] font-medium text-[#8E8E93]">Estándar aplicado</span>
                <p className="mt-1 font-semibold text-[#1D1D1F]">{auth.regulationsStandard}</p>
                <p className="text-[12px] text-[#6E6E73]">Biometría de lectura mecánica (OACI Doc 9303)</p>
              </div>

              <div>
                <span className="text-[12px] font-medium text-[#8E8E93]">Documento oficial</span>
                <p className="mt-1 font-semibold text-[#1D1D1F]">{auth.officialDocName}</p>
                <p className="text-[12px] text-[#6E6E73]">{auth.typicalProcessingTime}</p>
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-[#424245]">
              {auth.keyDifferencesText}
            </p>

            <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-5">
              <h3 className="text-[14px] font-semibold text-[#1D1D1F]">
                Puntos clave a tener en cuenta para {country.name}:
              </h3>
              <ul className="mt-3 space-y-2 text-[13px] text-[#6E6E73]">
                {auth.specificPeculiarities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0071E3] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Technical Specification Matrix from countries.json */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[28px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
              Especificaciones oficiales detalladas para {country.name}
            </h2>
            <p className="mt-3 text-[16px] text-[#6E6E73]">
              Parámetros técnicos extraídos de la base de datos oficial consular para cada tipo de documento.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {country.documents.map((doc) => (
              <div
                key={doc.id}
                className="overflow-hidden rounded-3xl border border-[#D2D2D7] bg-white p-6 shadow-sm sm:p-8"
              >
                {/* Document Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E5EA] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5F5F7] text-[22px]">
                      {country.flag}
                    </div>
                    <div>
                      <h3 className="text-[22px] font-semibold text-[#1D1D1F]">
                        {doc.name}
                      </h3>
                      <p className="text-[13px] text-[#6E6E73]">
                        {doc.documentType === 'passport'
                          ? 'Pasaporte oficial del país'
                          : doc.documentType === 'visa'
                          ? 'Visado consular o permiso de entrada'
                          : 'Documento nacional de identidad'}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-[#D2D2D7] bg-[#F5F5F7] px-4 py-1.5 text-[14px] font-mono font-semibold text-[#1D1D1F]">
                    {doc.widthMm} × {doc.heightMm} mm ({doc.widthPx} × {doc.heightPx} px)
                  </span>
                </div>

                {/* 4-Card Summary Grid */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-4">
                    <span className="text-[12px] font-medium text-[#8E8E93]">Dimensiones exactas</span>
                    <p className="mt-1 text-[19px] font-semibold text-[#1D1D1F]">
                      {doc.widthMm} × {doc.heightMm} mm
                    </p>
                    {doc.sizeInches && (
                      <p className="text-[12px] text-[#6E6E73]">
                        {doc.sizeInches[0]} × {doc.sizeInches[1]} pulgadas
                      </p>
                    )}
                    <p className="mt-1 font-mono text-[11px] text-[#8E8E93]">
                      {doc.widthPx} × {doc.heightPx} px @ {doc.dpi} DPI
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-4">
                    <span className="text-[12px] font-medium text-[#8E8E93]">Altura del rostro (OACI)</span>
                    <p className="mt-1 text-[19px] font-semibold text-[#1D1D1F]">
                      {Math.round(doc.faceHeightMinRatio * 100)}% – {Math.round(doc.faceHeightMaxRatio * 100)}%
                    </p>
                    <p className="text-[12px] text-[#6E6E73]">Barbilla a coronilla</p>
                    <p className="mt-1 text-[11px] text-[#8E8E93]">
                      Ojos: {Math.round(doc.eyeHeightMinRatio * 100)}% – {Math.round(doc.eyeHeightMaxRatio * 100)}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-4">
                    <span className="text-[12px] font-medium text-[#8E8E93]">Color de fondo</span>
                    <p className="mt-1 text-[17px] font-semibold text-[#1D1D1F]">
                      {doc.backgroundColor}
                    </p>
                    <p className="mt-1 text-[12px] text-[#6E6E73]">{doc.bgNotes}</p>
                  </div>

                  <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-4">
                    <span className="text-[12px] font-medium text-[#8E8E93]">Archivo digital</span>
                    <p className="mt-1 text-[17px] font-semibold text-[#1D1D1F]">
                      {doc.fileSizeKbMax ? `Máx. ${doc.fileSizeKbMax} KB` : 'Formato JPEG'}
                    </p>
                    {doc.fileSizeKbMin && (
                      <p className="text-[12px] text-[#6E6E73]">Mínimo: {doc.fileSizeKbMin} KB</p>
                    )}
                    <p className="mt-1 text-[11px] text-[#8E8E93]">Espacio: {doc.colorSpace || 'sRGB'}</p>
                  </div>
                </div>

                {/* Checklist Rules & Tolerances */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#E5E5EA] pt-6 text-[13px]">
                  <div className="flex items-start gap-2.5">
                    {doc.glassesAllowed ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#34C759] mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0 text-[#FF3B30] mt-0.5" />
                    )}
                    <div>
                      <span className="font-semibold text-[#1D1D1F]">
                        Gafas: {doc.glassesAllowed ? 'Permitidas con cautela' : 'No permitidas'}
                      </span>
                      <p className="text-[12px] text-[#6E6E73]">
                        {doc.glassesNotes ||
                          (doc.glassesAllowed
                            ? 'Solo cristales transparentes sin reflejos.'
                            : 'Debes quitártelas para evitar reflejos.')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3] mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1D1D1F]">
                        Expresión: {doc.mouthClosed ? 'Neutra y boca cerrada' : 'Neutra'}
                      </span>
                      <p className="text-[12px] text-[#6E6E73]">
                        {doc.teethNotes || 'Labios juntos sin mostrar dientes ni sonreír.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3] mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1D1D1F]">Prendas en la cabeza</span>
                      <p className="text-[12px] text-[#6E6E73]">
                        {doc.headCoveringNotes || 'Solo por motivos religiosos o médicos acreditados.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3] mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1D1D1F]">Antigüedad y acabado</span>
                      <p className="text-[12px] text-[#6E6E73]">
                        Máximo {doc.recencyMonths || 6} meses. Papel{' '}
                        {doc.printFinish === 'matte_or_glossy' ? 'mate o brillo' : 'fotográfico de alta calidad'}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Official Source & Verification Footer */}
                {(doc.notes || doc.sourceUrl) && (
                  <div className="mt-6 rounded-2xl border border-[#D2D2D7]/80 bg-[#F5F5F7] p-4 text-[12px] text-[#6E6E73]">
                    {doc.notes && <p className="mb-2 leading-relaxed">{doc.notes}</p>}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E5EA] pt-2">
                      {doc.sourceUrl && (
                        <a
                          href={doc.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-[#0071E3] hover:underline"
                        >
                          <span>Consultar directriz en el portal oficial de {country.name}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {doc.lastVerified && (
                        <span className="text-[#8E8E93]">
                          Última verificación de normativa: {doc.lastVerified}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Critical Section: 6 Common Rejection Reasons in this Country */}
      <section className="bg-[#F5F5F7] py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#FF9500] uppercase">
              <AlertTriangle className="h-4 w-4" />
              <span>Evita retrasos en tu trámite</span>
            </div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
              6 Errores frecuentes por los que se rechazan fotos en {country.name}
            </h2>
            <p className="mt-3 text-[16px] text-[#6E6E73]">
              Los consulados y oficinas de pasaportes aplican validaciones algorítmicas estrictas. Conoce los motivos más comunes de denegación:
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rejectionReasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-[#D2D2D7] bg-white p-6 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[13px] font-bold text-[#8E8E93]">0{idx + 1}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        reason.riskLevel === 'Crítico'
                          ? 'bg-[#FF3B30]/10 text-[#FF3B30]'
                          : reason.riskLevel === 'Alto'
                          ? 'bg-[#FF9500]/10 text-[#FF9500]'
                          : 'bg-[#6E6E73]/10 text-[#6E6E73]'
                      }`}
                    >
                      Riesgo {reason.riskLevel}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[17px] font-semibold text-[#1D1D1F]">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-[14px] leading-relaxed text-[#6E6E73]">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E5E5EA] pt-3 text-[12px] text-[#0071E3] font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>FotoPasaporte te ayuda a evitarlo automáticamente</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Clothing, Contrast & Studio Tips */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2 text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase">
              <Shirt className="h-4 w-4 text-[#0071E3]" />
              <span>Vestimenta y Preparación</span>
            </div>

            <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
              Qué ponerte para la foto de {country.name}
            </h2>

            <p className="mt-3 text-[16px] text-[#6E6E73]">
              El contraste entre tu ropa y el fondo es indispensable para que los sistemas de lectura biométrica detecten con precisión la silueta de los hombros y el contorno del cuello.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#34C759]/30 bg-[#34C759]/5 p-5">
                <div className="flex items-center gap-2 text-[#34C759] font-semibold text-[15px]">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Recomendado</span>
                </div>
                <ul className="mt-3 space-y-2 text-[13px] text-[#424245]">
                  <li>• Ropa de tonos oscuros o sólidos (azul marino, negro, burdeos, verde oscuro).</li>
                  <li>• Camisas con cuello clásico o camisetas de cuello redondo que no queden ocultas.</li>
                  <li>• Cabello peinado detrás de las orejas y frente completamente despejada.</li>
                  <li>• Iluminación natural frontal sin bombillas que proyecten sombras en el cuello.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#FF3B30]/30 bg-[#FF3B30]/5 p-5">
                <div className="flex items-center gap-2 text-[#FF3B30] font-semibold text-[15px]">
                  <XCircle className="h-5 w-5" />
                  <span>Prohibido o desaconsejado</span>
                </div>
                <ul className="mt-3 space-y-2 text-[13px] text-[#424245]">
                  <li>• Ropa blanca o muy clara que se funda con el fondo oficial.</li>
                  <li>• Uniformes militares o corporativos (salvo vestimenta religiosa acreditada).</li>
                  <li>• Pendientes grandes, collares vistosos, piercings faciales o diademas anchas.</li>
                  <li>• Auriculares inalámbricos en los oídos o gafas de sol/tintadas.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Detailed FAQs for this Country */}
      <section className="bg-[#F5F5F7] py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#0071E3] uppercase">
              <HelpCircle className="h-4 w-4" />
              <span>Dudas frecuentes</span>
            </div>
            <h2 className="mt-2 text-[30px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[38px]">
              Preguntas frecuentes sobre la foto para {country.name}
            </h2>
            <p className="mt-3 text-[16px] text-[#6E6E73]">
              Respuestas prácticas sobre normativas consulares, impresiones y trámites para {country.name}.
            </p>
          </div>

          <div className="mt-12 divide-y divide-[#E5E5EA] border-y border-[#E5E5EA] bg-white rounded-3xl p-6 sm:p-8 shadow-xs">
            {faqs.map((faq, index) => (
              <details key={index} className="group py-4 first:pt-0 last:pb-0" open={index === 0}>
                <summary className="flex cursor-pointer items-center justify-between text-[16px] font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors select-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#6E6E73] transition-transform group-open:rotate-180">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </span>
                </summary>
                <div className="mt-3 text-[14px] leading-relaxed text-[#6E6E73] pr-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Related Countries from the same region */}
      <section className="bg-white py-16 sm:py-20 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[22px] font-semibold text-[#1D1D1F]">
                Otros destinos en {country.region} y países frecuentes
              </h2>
              <p className="text-[14px] text-[#6E6E73]">
                Consulta las directrices consulares de otros países con medidas oficiales verificadas
              </p>
            </div>
            <Link
              href="/#requisitos"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0071E3] hover:underline"
            >
              <span>Ver todos los países</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {COUNTRIES_DATA.filter((c) => c.code !== country.code && (c.region === country.region || c.isPopular))
              .slice(0, 12)
              .map((c) => {
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
        </div>
      </section>

      {/* 10. Final Call to Action & Footer */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
