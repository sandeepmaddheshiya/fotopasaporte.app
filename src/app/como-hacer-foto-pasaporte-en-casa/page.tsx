import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Camera,
  Sun,
  Smile,
  Maximize2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Baby,
  Sparkles,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo Hacer la Foto de Pasaporte en Casa con el Móvil (Guía 2026)',
  description:
    'Guía práctica y paso a paso para tomar tu foto de pasaporte en casa con el smartphone. Iluminación, fondo, vestimenta, errores frecuentes y cómo recortarla al tamaño oficial de tu país.',
  keywords: [
    'como hacer foto pasaporte en casa',
    'como tomar foto de pasaporte con el celular',
    'foto pasaporte casera',
    'hacer foto carnet con el movil',
    'foto de pasaporte en casa',
    'requisitos foto pasaporte casera',
    'foto pasaporte fondo blanco casera',
    'como sacarse una foto de pasaporte',
  ],
  alternates: {
    canonical: 'https://fotopasaporte.app/como-hacer-foto-pasaporte-en-casa',
  },
  openGraph: {
    title: 'Cómo Hacer la Foto de Pasaporte en Casa con el Móvil (Guía 2026)',
    description:
      'Aprende a tomar una foto válida para tu pasaporte o visa con tu teléfono móvil. Evita rechazos consulares con estos 4 sencillos pasos.',
    url: 'https://fotopasaporte.app/como-hacer-foto-pasaporte-en-casa',
    type: 'article',
    locale: 'es_ES',
  },
};

const FAQS = [
  {
    q: '¿Puedo usar la cámara frontal (selfie) para la foto de pasaporte?',
    a: 'No es recomendable. Las cámaras frontales tienen lentes gran angular de menor distancia focal que deforman la perspectiva facial (hacen que la nariz parezca más ancha y las orejas queden ocultas). Además, al sostener el teléfono con el brazo, el ángulo del torso queda inclinado. Lo ideal es pedirle a otra persona que te tome la foto a 1,5–2 metros de distancia con la cámara trasera o colocar el móvil en un soporte a la altura de tus ojos.',
  },
  {
    q: '¿Qué ropa debo llevar para la foto de pasaporte?',
    a: 'Viste ropa informal elegante o formal de color oscuro o contrastado (azul marino, negro, gris oscuro, verde botella). Evita prendas blancas o beige porque se funden con el fondo claro obligatorio. Tampoco uses uniformes (militares o corporativos), escotes excesivamente pronunciados que parezcan no llevar ropa tras el recorte, ni tirantes finos.',
  },
  {
    q: '¿Qué hago si no tengo una pared completamente blanca?',
    a: 'Ponte delante de la pared más clara y uniforme que tengas (blanco roto, beige o gris claro) a unos 50 cm para que no se proyecte tu sombra. Al subir la imagen a FotoPasaporte.app, nuestra herramienta calibra el fondo, elimina sombras residuales y lo sustituye por el blanco o gris exacto que exige la normativa de tu país.',
  },
  {
    q: '¿Cómo hacer la foto de pasaporte a un bebé o niño inquieto?',
    a: 'Para bebés que aún no se sientan solos, coloca una sábana o toalla blanca lisa sobre la cama o el suelo y tumba al bebé boca arriba. Toma la foto desde arriba colocándote de pie sobre él, asegurándote de no proyectar tu sombra sobre su carita. Sus ojos deben estar abiertos y mirando hacia la cámara. En menores de 1 año las autoridades son más comprensivas con la expresión neutra o boca ligeramente entreabierta, pero el fondo y las proporciones deben cumplirse.',
  },
  {
    q: '¿Se pueden llevar gafas graduadas en la fotografía?',
    a: 'En la gran mayoría de países (incluyendo Estados Unidos, España, México, Colombia, etc.), las gafas graduadas están totalmente prohibidas en la foto de pasaporte para evitar reflejos de luz y destellos sobre los ojos en los lectores biométricos. Si tu país las permite por excepción médica justificada, las monturas deben ser muy finas y los cristales totalmente transparentes sin reflejos. Nuestra recomendación general: quítatelas siempre para garantizar la aprobación.',
  },
  {
    q: '¿Cómo imprimo la foto una vez recortada en casa?',
    a: 'Descarga la hoja de impresión fotográfica (A4 o 10×15 cm) generada por FotoPasaporte.app. Al imprimirla en tu impresora doméstica de fotos o llevarla a una tienda de fotografía o papelería, asegúrate de seleccionar «Tamaño real / Escala 100%» en papel fotográfico brillante o satinado a 300 DPI.',
  },
];

export default function ComoHacerFotoPasaporteEnCasaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://fotopasaporte.app/como-hacer-foto-pasaporte-en-casa#article',
        headline: 'Cómo Hacer la Foto de Pasaporte en Casa con el Móvil (Guía 2026)',
        description:
          'Guía completa para tomar tu fotografía de pasaporte en casa con el móvil cumpliendo los estándares biométricos internacionales de la OACI.',
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
            name: 'Cómo hacer foto de pasaporte en casa',
            item: 'https://fotopasaporte.app/como-hacer-foto-pasaporte-en-casa',
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
              Cómo hacer tu foto en casa
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-3.5 py-1 text-[11px] sm:text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase shadow-2xs">
              <Camera className="h-3.5 w-3.5 text-[#0071E3]" />
              <span>Guía Práctica Paso a Paso</span>
            </div>

            <h1 className="mt-4 text-[28px] sm:text-[40px] md:text-[46px] font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Cómo hacer tu foto de pasaporte en casa con el móvil paso a paso
            </h1>

            <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-[#6E6E73]">
              Atrás quedaron las visitas forzadas al fotomatón o al estudio. Hoy en día cualquier teléfono moderno tiene suficiente calidad óptica para capturar una foto biométrica 100% válida ante consulados y autoridades de pasaportes. Sigue estas pautas sencillas de iluminación, postura y encuadre.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#D2D2D7]/80 bg-white p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#8E8E93] uppercase block">Tiempo</span>
                <span className="text-[16px] font-bold text-[#1D1D1F]">5 minutos</span>
              </div>
              <div className="rounded-2xl border border-[#D2D2D7]/80 bg-white p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#8E8E93] uppercase block">Dispositivo</span>
                <span className="text-[16px] font-bold text-[#1D1D1F]">Cámara móvil</span>
              </div>
              <div className="rounded-2xl border border-[#D2D2D7]/80 bg-white p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#8E8E93] uppercase block">Dificultad</span>
                <span className="text-[16px] font-bold text-[#34C759]">Muy fácil</span>
              </div>
              <div className="rounded-2xl border border-[#D2D2D7]/80 bg-white p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#8E8E93] uppercase block">Normativa</span>
                <span className="text-[16px] font-bold text-[#0071E3]">OACI Doc 9303</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
              Los 4 pasos para lograr una foto biométrica impecable
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-[#6E6E73]">
              No necesitas iluminación de estudio ni focos profesionales: la luz natural de una ventana y una pared clara bastan.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Step 1 */}
            <div className="flex flex-col justify-between rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 sm:p-8 hover:bg-[#F5F5F7]/70 transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#0071E3]">
                    <Sun className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[20px] font-bold text-[#8E8E93]">Paso 01</span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold text-[#1D1D1F]">
                  Luz natural difusa y pared de fondo
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                  Colócate frente a una ventana bien iluminada durante el día para que la luz bañe tu rostro de forma homogénea. Evita el sol directo que genere sombras marcadas bajo la nariz o la barbilla. Sitúate a <strong>unos 50 cm de una pared blanca o clara</strong>: esa distancia evita que tu cuerpo proyecte sombras en la pared.
                </p>
              </div>
              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[13px] text-[#0071E3] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Sin flash directo ni lámparas laterales que amarilleen la piel</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col justify-between rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 sm:p-8 hover:bg-[#F5F5F7]/70 transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#0071E3]">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[20px] font-bold text-[#8E8E93]">Paso 02</span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold text-[#1D1D1F]">
                  Cámara a 1,5–2 metros a la altura de los ojos
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                  Pídele a un amigo o familiar que te tome la fotografía sosteniendo el móvil exactamente a la altura de tu mirada. No uses la cámara de selfies frontal ni tomes la foto desde arriba o abajo (ángulo picado o contrapicado). Mantén la cabeza erguida, los hombros relajados y el cuerpo mirando de frente.
                </p>
              </div>
              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[13px] text-[#0071E3] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Encuadre desde el pecho hacia arriba para dar margen de recorte</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col justify-between rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7]/40 p-6 sm:p-8 hover:bg-[#F5F5F7]/70 transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-2xs text-[#0071E3]">
                    <Smile className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[20px] font-bold text-[#8E8E93]">Paso 03</span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold text-[#1D1D1F]">
                  Expresión neutra, rostro despejado y ropa oscura
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                  Mira directamente a la lente de la cámara con la boca cerrada y expresión natural y neutra (sin sonreír mostrando dientes). Retira el flequillo o cabello que tape las cejas, ojos u orejas. Viste ropa de color oscuro o intenso (azul, negro, rojo, marrón) para que contraste nítidamente con el fondo blanco. Quítate las gafas para evitar reflejos.
                </p>
              </div>
              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[13px] text-[#0071E3] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Sin aretes voluminosos, collares llamativos ni piercings visibles</span>
              </div>
            </div>

            {/* Step 4 (Includes L-29 CTA) */}
            <div className="flex flex-col justify-between rounded-3xl border border-[#0071E3]/40 bg-[#0071E3]/5 p-6 sm:p-8 hover:bg-[#0071E3]/10 transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071E3] text-white shadow-xs">
                    <Maximize2 className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[20px] font-bold text-[#0071E3]">Paso 04</span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold text-[#1D1D1F]">
                  Ajuste milimétrico y recorte biométrico
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                  Una vez capturada la toma, el último paso es encuadrar la cabeza entre el 70% y el 80% de la altura total y fijar los milímetros exactos según el documento que vayas a tramitar (35×45 mm en Europa y LatAm, 2×2 pulgadas para EE.UU., etc.).
                </p>

                {/* L-29 Action CTA */}
                <div className="mt-6 rounded-2xl bg-white p-5 border border-[#D2D2D7]/80 shadow-xs">
                  <span className="text-[13px] font-semibold text-[#1D1D1F] block">
                    ¿Ya tienes tu foto hecha con el móvil?
                  </span>
                  <p className="mt-1 text-[12px] text-[#6E6E73]">
                    Súbela ahora y nuestra herramienta online ajusta el encuadre, limpia el fondo y genera la plantilla lista para imprimir:
                  </p>
                  <Link
                    href="/#creador"
                    className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-[#0071E3] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-[#0077ED] transition-colors"
                  >
                    <span>ajusta tu foto al tamaño de tu documento</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="mt-6 border-t border-[#0071E3]/20 pt-4 text-[13px] text-[#0071E3] font-medium flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>Genera hoja de impresión a 300 DPI en escala 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Cases: Baby & Religious Head Coverings */}
      <section className="bg-[#F5F5F7] py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Baby card */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
                  <Baby className="h-5 w-5" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                  Fotos para bebés y niños pequeños
                </h3>
              </div>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                Hacer la foto a un bebé puede resultar frustrante en un estudio. En casa tienes más tiempo y calma:
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px] text-[#6E6E73]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
                  <span><strong>Técnica de la sábana:</strong> Tumba al recién nacido sobre una sábana blanca sin arrugas y toma la foto desde arriba.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
                  <span><strong>Manos y apoyos:</strong> Si sostienes su cabecita por detrás, asegúrate de que tus manos no aparezcan en la foto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
                  <span><strong>Chupetes y juguetes:</strong> No se admiten chupetes, baberos, cintas en el pelo ni muñecos visibles.</span>
                </li>
              </ul>
            </div>

            {/* Religious / Medical card */}
            <div className="rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1D1D1F]">
                  Prendas religiosas y médicas
                </h3>
              </div>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73]">
                Prendas como el hiyab, turbante o kipa están admitidas bajo el estándar internacional OACI (ICAO Doc 9303):
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px] text-[#6E6E73]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
                  <span><strong>Óvalo facial descubierto:</strong> La cara debe quedar visible desde la parte superior de la frente hasta la barbilla.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
                  <span><strong>Bordes laterales:</strong> Ambos bordes de las mejillas deben distinguirse claramente sin sombras del tejido sobre la piel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
                  <span><strong>Color de la prenda:</strong> Preferiblemente colores oscuros o lisos que no se confundan con el fondo claro oficial.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Table */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#FF9500] uppercase">
              <AlertTriangle className="h-4 w-4" />
              <span>Evita devoluciones</span>
            </div>
            <h2 className="mt-2 text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[34px]">
              Los 5 errores más comunes en fotos caseras (y cómo solucionarlos)
            </h2>
            <p className="mt-3 text-[15px] text-[#6E6E73]">
              El 85% de los rechazos consulares en fotos domésticas se deben a estos pequeños detalles:
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-[#D2D2D7] bg-white shadow-xs">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#F5F5F7] text-[12px] font-semibold uppercase tracking-wider text-[#6E6E73] border-b border-[#D2D2D7]">
                <tr>
                  <th className="px-5 py-4">Error frecuente</th>
                  <th className="px-5 py-4">Por qué lo rechazan</th>
                  <th className="px-5 py-4">Solución correcta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5EA]">
                <tr className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#FF3B30] flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Sombras en la pared o rostro</span>
                  </td>
                  <td className="px-5 py-4 text-[#6E6E73]">
                    El software biométrico confunde las sombras con siluetas faciales.
                  </td>
                  <td className="px-5 py-4 text-[#1D1D1F]">
                    Aléjate 50 cm de la pared y usa luz natural difusa de una ventana.
                  </td>
                </tr>
                <tr className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#FF3B30] flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Selfie con la cámara frontal</span>
                  </td>
                  <td className="px-5 py-4 text-[#6E6E73]">
                    Deformación de perspectiva (nariz ensanchada y orejas ocultas).
                  </td>
                  <td className="px-5 py-4 text-[#1D1D1F]">
                    Que otra persona te tome la foto a 1,5–2 metros con la cámara trasera.
                  </td>
                </tr>
                <tr className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#FF3B30] flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Camisa o camiseta blanca</span>
                  </td>
                  <td className="px-5 py-4 text-[#6E6E73]">
                    Se camufla con el fondo blanco; la persona parece «flotar».
                  </td>
                  <td className="px-5 py-4 text-[#1D1D1F]">
                    Viste prendas oscuras o de color vivo (azul, gris, negro).
                  </td>
                </tr>
                <tr className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#FF3B30] flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Gafas con reflejo en el cristal</span>
                  </td>
                  <td className="px-5 py-4 text-[#6E6E73]">
                    Los sensores del pasaporte no pueden verificar el iris ni la pupila.
                  </td>
                  <td className="px-5 py-4 text-[#1D1D1F]">
                    Quítate siempre las gafas para la fotografía de pasaporte.
                  </td>
                </tr>
                <tr className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#FF3B30] flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>Sonreír mostrando dientes</span>
                  </td>
                  <td className="px-5 py-4 text-[#6E6E73]">
                    Altera la distancia entre labios y barbilla registrada en el chip biométrico.
                  </td>
                  <td className="px-5 py-4 text-[#1D1D1F]">
                    Expresión facial neutra, boca cerrada y mirada fija al frente.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cross-linking to official countries & guides */}
      <section className="bg-[#F5F5F7] py-16 sm:py-20 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-semibold text-[#1D1D1F]">
                Requisitos específicos por país
              </h2>
              <p className="text-[14px] text-[#6E6E73]">
                Cada país tiene sus propias dimensiones oficiales y normativa de fondo:
              </p>
            </div>
            <Link
              href="/medidas-foto-pasaporte"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0071E3] hover:underline"
            >
              <span>consulta las medidas de la foto de pasaporte por país</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <Link
              href="/foto-pasaporte/colombia"
              className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
            >
              <span className="text-[24px]">🇨🇴</span>
              <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F]">Colombia</span>
              <span className="text-[11px] text-[#6E6E73]">foto de pasaporte de Colombia</span>
            </Link>
            <Link
              href="/foto-pasaporte/espana"
              className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
            >
              <span className="text-[24px]">🇪🇸</span>
              <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F]">España</span>
              <span className="text-[11px] text-[#6E6E73]">foto de pasaporte de España</span>
            </Link>
            <Link
              href="/foto-pasaporte/mexico"
              className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
            >
              <span className="text-[24px]">🇲🇽</span>
              <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F]">México</span>
              <span className="text-[11px] text-[#6E6E73]">foto de pasaporte de México</span>
            </Link>
            <Link
              href="/foto-pasaporte/estados-unidos"
              className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
            >
              <span className="text-[24px]">🇺🇸</span>
              <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F]">EE. UU.</span>
              <span className="text-[11px] text-[#6E6E73]">foto de visa y pasaporte EE.UU.</span>
            </Link>
            <Link
              href="/foto-pasaporte/argentina"
              className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
            >
              <span className="text-[24px]">🇦🇷</span>
              <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F]">Argentina</span>
              <span className="text-[11px] text-[#6E6E73]">foto de pasaporte de Argentina</span>
            </Link>
            <Link
              href="/foto-pasaporte/peru"
              className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-3.5 transition-all hover:border-[#0071E3] hover:shadow-md"
            >
              <span className="text-[24px]">🇵🇪</span>
              <span className="mt-2 text-[14px] font-semibold text-[#1D1D1F]">Perú</span>
              <span className="text-[11px] text-[#6E6E73]">foto de pasaporte de Perú</span>
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-[#D2D2D7]/80 bg-white p-5 text-[13px] leading-relaxed text-[#6E6E73] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="text-[#1D1D1F]">¿Prefieres que te hagan la foto o no quieres tomarla en casa?</strong>
              <p className="mt-1">
                Comprueba las opciones de estudios, cabinas automáticas o consulta nuestra guía sobre <Link href="/donde-sacar-foto-pasaporte" className="text-[#0071E3] hover:underline font-medium">dónde sacar la foto del pasaporte</Link> y cuándo te la toman directamente en la oficina oficial.
              </p>
            </div>
            <Link
              href="/donde-sacar-foto-pasaporte"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] px-4 py-2 font-medium text-[#1D1D1F] hover:bg-[#E5E5EA] transition-colors"
            >
              <span>Ver comparativa</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E5E5EA]">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#0071E3] uppercase">
              <HelpCircle className="h-4 w-4" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
              Dudas habituales al hacer tu foto de pasaporte en casa
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#E5E5EA] border-y border-[#E5E5EA]">
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

      {/* Final Tool CTA Banner */}
      <section className="bg-[#1D1D1F] py-16 text-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <h2 className="text-[26px] sm:text-[36px] font-semibold tracking-tight">
            ¿Listo para recortar tu foto?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#A1A1A6]">
            Sube tu retrato y FotoPasaporte.app ajustará la escala milimétrica exacta para tu país en menos de 1 minuto.
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
