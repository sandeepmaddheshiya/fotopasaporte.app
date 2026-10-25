import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  MapPin,
  Building2,
  Store,
  Home,
  Clock,
  Euro,
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Printer,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dónde Sacar la Foto del Pasaporte: En Casa, Tiendas u Oficinas (2026)',
  description:
    'Descubre dónde tomar o sacar la foto para el pasaporte: en casa con el móvil, en fotomatón, estudio fotográfico o si te toman la foto en la propia oficina según tu país.',
  keywords: [
    'donde sacar foto pasaporte',
    'donde tomar fotos para pasaporte',
    'donde hacen fotos para pasaporte',
    'donde sacar foto de pasaporte cerca de mi',
    'te toman la foto en la oficina de pasaportes',
    'donde sacar la foto del pasaporte',
    'fotos pasaporte farmacia estudio fotomaton',
  ],
  alternates: {
    canonical: 'https://fotopasaporte.app/donde-sacar-foto-pasaporte',
  },
  openGraph: {
    title: 'Dónde Sacar la Foto del Pasaporte: En Casa, Tiendas u Oficinas (2026)',
    description:
      'Comparativa de opciones: precios, ventajas e información país por país sobre si debes llevar tu foto o si te la toman en la oficina del pasaporte.',
    url: 'https://fotopasaporte.app/donde-sacar-foto-pasaporte',
    type: 'article',
    locale: 'es_ES',
  },
};

const FAQS = [
  {
    q: '¿Dónde puedo sacar la foto del pasaporte cerca de mí?',
    a: 'Tienes 4 opciones principales: 1) En casa con tu móvil usando FotoPasaporte.app (la opción más cómoda y rápida); 2) Tiendas de fotografía o estudios de barrio; 3) Cabinas o fotomatones automáticos en estaciones de tren o metro; 4) En la propia comisaría u oficina de pasaportes si tu país realiza la captura biométrica in situ.',
  },
  {
    q: '¿Cuánto cuesta sacar fotos para pasaporte?',
    a: 'En un estudio fotográfico profesional el precio suele oscilar entre 8 € y 18 € por un lote de 4 a 6 fotos impresas. Los fotomatones automáticos cobran entre 5 € y 10 € (sin garantía de aceptación si la iluminación falla). Con FotoPasaporte.app puedes preparar tu foto gratis y descargar la plantilla para imprimir por menos de 0,30 € en cualquier copistería.',
  },
  {
    q: '¿Te toman la foto directamente en la oficina de pasaportes?',
    a: 'Depende estrictamente de la normativa del país: en España debes aportar tú la foto en papel de 35×45 mm para el pasaporte; en México la SRE toma la foto digital en la cita para la mayoría de trámites ordinarios; en Colombia la Cancillería captura la foto digital en sede pero exige fotos impresas en varios trámites consulares; en EE.UU. debes llevar tu foto impresa de 2×2 pulgadas a la cita de solicitud.',
  },
  {
    q: '¿Dónde puedo imprimir la foto si la hago con el móvil en casa?',
    a: 'Descarga la hoja de impresión generada por FotoPasaporte.app y llévala en una memoria USB o desde tu móvil a cualquier copistería, papelería, tienda de fotografía o quiosco de revelado digital (como quioscos Kodak o fotolibros de supermercados). Solo debes pedir impresión en «papel fotográfico a tamaño real 100%».',
  },
  {
    q: '¿Sirven las fotos de fotomatón para el pasaporte?',
    a: 'Muchos fotomatones modernos anuncian fotos conformes a la OACI, pero con frecuencia son rechazadas por los consulados debido a flash frontal excesivo que produce sombras marcadas, fondos descalibrados o encuadres con el rostro demasiado pequeño.',
  },
];

export default function DondeSacarFotoPasaportePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://fotopasaporte.app/donde-sacar-foto-pasaporte#article',
        headline: 'Dónde Sacar la Foto del Pasaporte: En Casa, Tiendas u Oficinas (2026)',
        description:
          'Comparativa completa de lugares donde sacar fotos de pasaporte: precios, tiempos y normas de cada país sobre si se aporta foto o se toma en la cita.',
        inLanguage: 'es',
        datePublished: '2026-10-25',
        dateModified: '2026-10-25',
        author: {
          '@type': 'Organization',
          name: 'FotoPasaporte.app',
          url: 'https://fotopasaporte.app',
        },
      },
      {
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
            name: 'Guías',
            item: 'https://fotopasaporte.app/medidas-foto-pasaporte',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Dónde sacar la foto del pasaporte',
            item: 'https://fotopasaporte.app/donde-sacar-foto-pasaporte',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
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

      {/* Breadcrumbs & Hero */}
      <section className="border-b border-[#E5E5EA] bg-[#F5F5F7]/70 py-8 sm:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-[12px] text-[#6E6E73]">
            <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#8E8E93]" />
            <Link href="/medidas-foto-pasaporte" className="hover:text-[#1D1D1F] transition-colors">
              Medidas oficiales
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#8E8E93]" />
            <span className="font-medium text-[#1D1D1F]">
              Dónde sacar la foto del pasaporte
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-3.5 py-1 text-[11px] sm:text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase shadow-2xs">
              <MapPin className="h-3.5 w-3.5 text-[#0071E3]" />
              <span>Guía de Opciones y Comparativa</span>
            </div>

            <h1 className="mt-4 text-[28px] sm:text-[40px] md:text-[46px] font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Dónde sacar la foto del pasaporte: comparativa y opciones por país
            </h1>

            <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-[#6E6E73]">
              Antes de acudir a tu cita de pasaporte o visado, es fundamental saber <strong>dónde sacar la foto del pasaporte</strong> y, sobre todo, si la oficina oficial exige que lleves fotografías impresas o si te la toman allí mismo in situ.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison: 4 Options */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[34px]">
              Las 4 formas de conseguir tu foto de pasaporte
            </h2>
            <p className="mt-3 text-[15px] text-[#6E6E73]">
              Compara precios, tiempo de espera y comodidad para elegir la que mejor se adapte a tu situación:
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Option 1: Online at Home */}
            <div className="rounded-3xl border-2 border-[#0071E3] bg-[#0071E3]/5 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0071E3] px-3 py-0.5 text-[11px] font-semibold text-white">
                  Recomendada
                </div>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#0071E3]">
                  <Home className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-[#1D1D1F]">
                  En casa con el móvil
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                  Haces la foto con tu smartphone en casa y FotoPasaporte.app ajusta la biometría, fondo blanco y tamaño de tu país al milímetro.
                </p>
                <div className="mt-4 space-y-2 text-[12px] text-[#1D1D1F]">
                  <p><strong>Tiempo:</strong> 2 minutos</p>
                  <p><strong>Repeticiones:</strong> Ilimitadas</p>
                  <p><strong>Coste:</strong> Desde 0 € a 7,99 €</p>
                </div>
              </div>
              <div className="mt-6 border-t border-[#0071E3]/20 pt-4">
                <Link
                  href="/como-hacer-foto-pasaporte-en-casa"
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0071E3] hover:underline"
                >
                  <span>cómo hacer tu foto en casa</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Option 2: Studio */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 flex flex-col justify-between hover:bg-[#F5F5F7] transition-colors">
              <div>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#6E6E73]">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-[#1D1D1F]">
                  Estudio de fotografía
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                  Un fotógrafo profesional toma la foto con equipo de iluminación en su local comercial.
                </p>
                <div className="mt-4 space-y-2 text-[12px] text-[#1D1D1F]">
                  <p><strong>Tiempo:</strong> 30–60 min (desplazamiento)</p>
                  <p><strong>Repeticiones:</strong> Pocas tomas</p>
                  <p><strong>Coste:</strong> 10 € – 20 €</p>
                </div>
              </div>
              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[12px] text-[#8E8E93]">
                Buena iluminación pero mayor coste y requiere cita
              </div>
            </div>

            {/* Option 3: Photo booth */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 flex flex-col justify-between hover:bg-[#F5F5F7] transition-colors">
              <div>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#6E6E73]">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-[#1D1D1F]">
                  Fotomatón automático
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                  Cabinas automatizadas en estaciones de metro, centros comerciales o cerca de comisarías.
                </p>
                <div className="mt-4 space-y-2 text-[12px] text-[#1D1D1F]">
                  <p><strong>Tiempo:</strong> 5 minutos</p>
                  <p><strong>Repeticiones:</strong> 2–3 intentos fijos</p>
                  <p><strong>Coste:</strong> 5 € – 9 €</p>
                </div>
              </div>
              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[12px] text-[#8E8E93]">
                Riesgo de sombras duras y descalibración de color
              </div>
            </div>

            {/* Option 4: On-site office */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 flex flex-col justify-between hover:bg-[#F5F5F7] transition-colors">
              <div>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#6E6E73]">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-[#1D1D1F]">
                  Oficina oficial (in situ)
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                  Captura digital directa por el funcionario en ventanilla durante la cita del trámite.
                </p>
                <div className="mt-4 space-y-2 text-[12px] text-[#1D1D1F]">
                  <p><strong>Disponibilidad:</strong> Solo ciertos países</p>
                  <p><strong>Repeticiones:</strong> 1 toma rápida</p>
                  <p><strong>Coste:</strong> Incluido en tasa del trámite</p>
                </div>
              </div>
              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[12px] text-[#8E8E93]">
                Aplica según la legislación de tu país
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Breakdown: Do they take the photo in the office? (Includes L-30 and country anchors) */}
      <section className="bg-[#F5F5F7] py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[34px]">
              ¿Te toman la foto en la oficina o tienes que llevarla tú?
            </h2>
            <p className="mt-3 text-[15px] text-[#6E6E73]">
              Consulta el funcionamiento oficial de los principales países hispanohablantes y destinos internacionales:
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {/* Spain */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[28px]">🇪🇸</span>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                      España — Cuerpo Nacional de Policía
                    </h3>
                    <span className="text-[12px] text-[#8E8E93]">Pasaporte Ordinario Español (35 × 45 mm)</span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#FF9500]/10 px-3 py-1 text-[12px] font-semibold text-[#FF9500]">
                  Debes llevar tu foto impresa
                </span>
              </div>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                Para renovar o expedir el pasaporte español en comisarías de la Policía Nacional, <strong>es obligatorio aportar una fotografía reciente en papel fotográfico</strong> de tamaño 35 × 45 mm con fondo blanco liso. Aunque para el DNI en algunas comisarías se está implantando el sistema de captura fotográfica en el módulo de expedición, para el pasaporte la normativa sigue exigiendo la foto física.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px]">
                <Link
                  href="/foto-pasaporte/espana"
                  className="font-medium text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  <span>foto de pasaporte de España</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[#D2D2D7]">·</span>
                <Link
                  href="/medidas-foto-pasaporte"
                  className="text-[#6E6E73] hover:underline"
                >
                  diferencias entre foto carnet y foto de pasaporte
                </Link>
              </div>
            </div>

            {/* Colombia (L-30) */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[28px]">🇨🇴</span>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                      Colombia — Ministerio de Relaciones Exteriores (Cancillería)
                    </h3>
                    <span className="text-[12px] text-[#8E8E93]">Pasaporte Colombiano (30 × 40 mm / 35 × 45 mm)</span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#34C759]/10 px-3 py-1 text-[12px] font-semibold text-[#34C759]">
                  Toman la foto en sede (con excepciones)
                </span>
              </div>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                En las sedes de la Cancillería en Bogotá y gobernaciones de Colombia, la fotografía del pasaporte se toma de forma digital y directa en la cabina de atención durante tu cita. Sin embargo, en ciertos consulados de Colombia en el exterior, trámites de visas para terceros países o duplicados consulares se exige aportar fotografías físicas de 30 × 40 mm o 35 × 45 mm fondo blanco.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px]">
                <Link
                  href="/foto-pasaporte/colombia"
                  className="font-medium text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  <span>foto de pasaporte de Colombia</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Mexico (L-24) */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[28px]">🇲🇽</span>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                      México — Secretaría de Relaciones Exteriores (SRE)
                    </h3>
                    <span className="text-[12px] text-[#8E8E93]">Pasaporte Mexicano Biométrico (35 × 45 mm)</span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#34C759]/10 px-3 py-1 text-[12px] font-semibold text-[#34C759]">
                  Toman foto en cita ordinaria
                </span>
              </div>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                Muchos ciudadanos se preguntan <strong>dónde se toma la foto del pasaporte en México</strong>: en las delegaciones de la SRE en territorio nacional la foto se toma directamente en la ventanilla durante la cita biométrica. Sin embargo, debes llevar <strong>dos fotografías impresas de 35 × 45 mm</strong> si el solicitante es menor de edad sin ambos padres presentes, si hay corrección de apellidos, o en trámites realizados ante consulados mexicanos en el extranjero.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px]">
                <Link
                  href="/foto-pasaporte/mexico"
                  className="font-medium text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  <span>foto de pasaporte de México</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* United States */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[28px]">🇺🇸</span>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                      Estados Unidos — Departamento de Estado / USPS
                    </h3>
                    <span className="text-[12px] text-[#8E8E93]">U.S. Passport & Visa DS-160 (2 × 2 pulgadas / 51 × 51 mm)</span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#FF9500]/10 px-3 py-1 text-[12px] font-semibold text-[#FF9500]">
                  Debes aportar tu foto (impresa o digital)
                </span>
              </div>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                Para el pasaporte estadounidense tramitado en oficinas de correos (USPS) o juzgados locales, debes aportar una foto impresa de 2 × 2 pulgadas (51 × 51 mm). En algunas sucursales de USPS ofrecen servicio de foto por un recargo de 15 $. Para solicitudes de visado online (formulario DS-160) debes subir obligatoriamente el archivo digital calibrado a 600×600 px.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px]">
                <Link
                  href="/foto-pasaporte/estados-unidos"
                  className="font-medium text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  <span>foto de pasaporte y visa de Estados Unidos</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Argentina, Chile, Perú, Ecuador, Uruguay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">🇦🇷</span>
                  <h4 className="font-semibold text-[#1D1D1F]">Argentina (Renaper)</h4>
                </div>
                <p className="mt-2 text-[13px] text-[#6E6E73]">
                  En los centros del Renaper la foto se captura digitalmente in situ. En trámites consulares en el exterior se requiere foto 40 × 40 mm o 35 × 45 mm.
                </p>
                <Link href="/foto-pasaporte/argentina" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#0071E3] hover:underline">
                  <span>foto de pasaporte de Argentina</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">🇵🇪</span>
                  <h4 className="font-semibold text-[#1D1D1F]">Perú (Migraciones)</h4>
                </div>
                <p className="mt-2 text-[13px] text-[#6E6E73]">
                  En la Superintendencia Nacional de Migraciones se toma en ventanilla en territorio peruano. Para trámites consulares se exigen fotos 35 × 45 mm fondo blanco.
                </p>
                <Link href="/foto-pasaporte/peru" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#0071E3] hover:underline">
                  <span>foto de pasaporte de Perú</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">🇨🇱</span>
                  <h4 className="font-semibold text-[#1D1D1F]">Chile (Registro Civil)</h4>
                </div>
                <p className="mt-2 text-[13px] text-[#6E6E73]">
                  El Servicio de Registro Civil e Identificación captura la fotografía directamente durante la solicitud en sus oficinas.
                </p>
                <Link href="/foto-pasaporte/chile" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#0071E3] hover:underline">
                  <span>foto de pasaporte de Chile</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">🇺🇾</span>
                  <h4 className="font-semibold text-[#1D1D1F]">Uruguay (DNIC)</h4>
                </div>
                <p className="mt-2 text-[13px] text-[#6E6E73]">
                  En la Dirección Nacional de Identificación Civil la fotografía se captura digitalmente, mientras que en consulados en el exterior se solicitan fotos 35 × 45 mm.
                </p>
                <Link href="/foto-pasaporte/uruguay" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#0071E3] hover:underline">
                  <span>foto de pasaporte de Uruguay</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Printing Guide: Where to print near you */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2.5 text-[12px] font-semibold tracking-wider text-[#0071E3] uppercase">
                <Printer className="h-4 w-4" />
                <span>Impresión Local</span>
              </div>
              <h2 className="mt-3 text-[24px] font-bold text-[#1D1D1F] sm:text-[30px]">
                Dónde imprimir tu foto de pasaporte por menos de 1 euro
              </h2>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                Si preparas tu foto con FotoPasaporte.app, descargas una plantilla de impresión 10 × 15 cm con 4 o 6 fotos idénticas. Para imprimirla con calidad profesional tienes varias opciones cerca de ti:
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                <div className="rounded-2xl bg-white p-4 border border-[#D2D2D7]">
                  <span className="font-semibold text-[#1D1D1F] block mb-1">Copisterías y papelerías</span>
                  <p className="text-[#6E6E73]">Cuestan habitualmente entre 0,20 € y 0,50 € por copia en papel fotográfico satinado.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 border border-[#D2D2D7]">
                  <span className="font-semibold text-[#1D1D1F] block mb-1">Quioscos fotográficos</span>
                  <p className="text-[#6E6E73]">En farmacias (EE.UU.), supermercados o grandes superficies con revelado instantáneo.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 border border-[#D2D2D7]">
                  <span className="font-semibold text-[#1D1D1F] block mb-1">Impresora propia</span>
                  <p className="text-[#6E6E73]">Si tienes impresora de tinta y papel fotográfico a 300 DPI, seleccionando escala 100%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-[#F5F5F7] py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#0071E3] uppercase">
              <HelpCircle className="h-4 w-4" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
              Dudas sobre dónde tomar o imprimir tu foto
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#E5E5EA] border-y border-[#E5E5EA] bg-white rounded-3xl p-6 sm:p-8 shadow-xs">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group py-4 first:pt-0 last:pb-0" open={idx === 0}>
                <summary className="flex cursor-pointer items-center justify-between text-[16px] font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors select-none">
                  <span className="pr-4">{faq.q}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#6E6E73] transition-transform group-open:rotate-180">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </span>
                </summary>
                <div className="mt-3 text-[14px] leading-relaxed text-[#6E6E73] pr-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1D1D1F] py-16 text-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <h2 className="text-[26px] sm:text-[36px] font-semibold tracking-tight">
            Prepara tu foto ahora en 1 minuto
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#A1A1A6]">
            Evita desplazamientos innecesarios. Sube tu imagen y obtén la hoja de impresión calibrada con las medidas oficiales de tu país.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#creador"
              className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#0077ED]"
            >
              <span>herramienta para ajustar tu foto</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
