import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Lock,
  Coins,
  FileCheck,
  Building2,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros: Qué es FotoPasaporte.app, Identidad y Principios',
  description:
    'Conoce FotoPasaporte.app: qué hace la herramienta, qué no hace, modelo de privacidad, política de precios y límites y metodología técnica independiente.',
  alternates: {
    canonical: 'https://fotopasaporte.app/sobre-nosotros',
  },
  openGraph: {
    title: 'Sobre Nosotros: Qué es FotoPasaporte.app, Identidad y Principios',
    description:
      'Descripción oficial, modelo de privacidad, política de precios y límites de FotoPasaporte.app, herramienta online independiente de fotos para documentos.',
    url: 'https://fotopasaporte.app/sobre-nosotros',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function SobreNosotrosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://fotopasaporte.app/sobre-nosotros#webpage',
        url: 'https://fotopasaporte.app/sobre-nosotros',
        name: 'Sobre Nosotros: Qué es FotoPasaporte.app, Identidad y Principios',
        description:
          'FotoPasaporte.app es una herramienta online independiente para recortar, calibrar y preparar fotografías de pasaporte, visado y documentos de identidad conforme a los requisitos biométricos de más de 400 países y normativas OACI Doc 9303.',
        inLanguage: 'es',
        isPartOf: {
          '@id': 'https://fotopasaporte.app/#website',
        },
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
              name: 'Sobre Nosotros',
              item: 'https://fotopasaporte.app/sobre-nosotros',
            },
          ],
        },
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

      <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:py-14">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[13px] text-[#6E6E73]"
        >
          <Link href="/" className="hover:text-[#0071E3] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#8E8E93]" />
          <span className="text-[#1D1D1F] font-medium">Sobre nosotros</span>
        </nav>

        {/* Hero Section */}
        <header className="border-b border-[#E5E5EA] pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0071E3]/10 px-3.5 py-1 text-[12px] font-semibold tracking-wide text-[#0071E3]">
            <Building2 className="h-3.5 w-3.5" />
            <span>IDENTIDAD DE LA ENTIDAD Y TRANSPARENCIA</span>
          </div>

          <h1 className="mt-4 text-[30px] font-bold tracking-tight text-[#1D1D1F] sm:text-[42px] sm:leading-[1.18]">
            Sobre FotoPasaporte.app: qué hacemos, qué no hacemos y cómo trabajamos
          </h1>

          {/* Canonical Product Description Box (AG-01) */}
          <div className="mt-6 rounded-2xl border-2 border-[#0071E3]/30 bg-[#0071E3]/5 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#0071E3] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-[#0071E3] uppercase tracking-wider">
                  Descripción oficial del producto y servicio
                </p>
                <p className="mt-2 text-[15px] sm:text-[17px] leading-relaxed text-[#1D1D1F]">
                  <strong>FotoPasaporte.app</strong> es una herramienta online independiente para recortar, calibrar y preparar fotografías de pasaporte, visado y documentos de identidad conforme a los requisitos biométricos de más de 400 países y normativas OACI Doc 9303. No emite ni tramita documentos oficiales ni está afiliada a ninguna entidad gubernamental ni consular. Permite encuadrar y previsualizar tu foto de forma gratuita, y adquirir la descarga digital en alta resolución (300 DPI) o la plantilla de impresión con marcas de corte sin marcas de agua. Las fotografías se procesan de forma segura y temporal para el recorte y validación biométrica, y se eliminan automáticamente según nuestra política de privacidad.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Section 1: Qué hace y qué NO hace FotoPasaporte.app */}
        <section className="mt-12">
          <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
            Qué hace y qué no hace nuestra herramienta
          </h2>
          <p className="mt-2 text-[15px] text-[#6E6E73]">
            La claridad es fundamental. Queremos que sepas exactamente qué esperar y qué queda fuera de nuestro alcance técnico:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Qué HACE */}
            <div className="rounded-2xl border border-[#34C759]/40 bg-[#34C759]/5 p-6">
              <div className="flex items-center gap-2 text-[#34C759] font-bold text-[18px]">
                <CheckCircle2 className="h-5 w-5" />
                <span>Lo que SÍ hace FotoPasaporte.app</span>
              </div>
              <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#1D1D1F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span><strong>Ajuste milimétrico y píxel exacto:</strong> Recorta tu imagen a los tamaños oficiales (35×45 mm, 2×2", 50×70 mm, 33×48 mm, etc.) a 300 DPI.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span><strong>Comprobación biométrica OACI:</strong> Verifica la proporción de la cabeza (70%–80%), ojos centrados y posición frontal según el ICAO Doc 9303.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span><strong>Calibración de fondo:</strong> Sustituye fondos desordenados por el color reglamentario de cada país (blanco puro, gris claro, crema).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span><strong>Plantilla para imprimir:</strong> Genera hojas de impresión estándar (10×15 cm o A4) con marcas de corte para llevar a cualquier copistería o imprimir en casa a escala 100%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span><strong>Requisitos verificados con fecha:</strong> Publicamos las fuentes normativas oficiales y la fecha de última comprobación de cada país.</span>
                </li>
              </ul>
            </div>

            {/* Qué NO HACE */}
            <div className="rounded-2xl border border-[#FF3B30]/40 bg-[#FF3B30]/5 p-6">
              <div className="flex items-center gap-2 text-[#FF3B30] font-bold text-[18px]">
                <XCircle className="h-5 w-5" />
                <span>Lo que NO hace FotoPasaporte.app</span>
              </div>
              <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#1D1D1F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF3B30] font-bold">✕</span>
                  <span><strong>No tramita ni emite pasaportes:</strong> No somos un organismo oficial ni una oficina de expedición gubernamental.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF3B30] font-bold">✕</span>
                  <span><strong>No gestiona citas previas:</strong> Debes solicitar tu cita en el portal oficial del organismo competente de tu país (Policía, Cancillería, SRE, etc.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF3B30] font-bold">✕</span>
                  <span><strong>No garantiza la aprobación administrativa:</strong> La decisión final de aceptar un documento o fotografía corresponde en exclusiva a la autoridad oficial que tramite tu expediente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF3B30] font-bold">✕</span>
                  <span><strong>No vende tus datos a terceros:</strong> Jamás comercializamos tus fotografías ni tus datos personales con fines publicitarios o de rastreo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF3B30] font-bold">✕</span>
                  <span><strong>No aplica suscripciones ocultas:</strong> Nuestros cobros son pagos únicos por descarga, sin cargos recurrentes sorpresa.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Modelo de Privacidad */}
        <section className="mt-14 rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1D1D1F]">
              Modelo de privacidad y protección de datos
            </h2>
          </div>

          <p className="mt-3 text-[15px] leading-relaxed text-[#6E6E73]">
            Tratamos fotografías de retratos personales y documentos de identidad, por lo que la privacidad y el cumplimiento estricto del Reglamento General de Protección de Datos (RGPD / GDPR) son pilares fundamentales de nuestro diseño técnico:
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
              <p className="font-semibold text-[#1D1D1F] text-[15px]">Procesamiento seguro</p>
              <p className="mt-1 text-[13px] text-[#6E6E73] leading-relaxed">
                Las imágenes se transfieren cifradas mediante HTTPS (TLS 1.3) y se analizan en servidores seguros para calcular proporciones y recorte.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
              <p className="font-semibold text-[#1D1D1F] text-[15px]">Eliminación automática</p>
              <p className="mt-1 text-[13px] text-[#6E6E73] leading-relaxed">
                Tus imágenes temporales no se conservan permanentemente. Se eliminan automáticamente tras el procesamiento según los plazos de nuestra política.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
              <p className="font-semibold text-[#1D1D1F] text-[15px]">Sin perfilado comercial</p>
              <p className="mt-1 text-[13px] text-[#6E6E73] leading-relaxed">
                No realizamos reconocimiento facial de identidad para fines comerciales ni vendemos datos a empresas de publicidad o bases de datos de IA.
              </p>
            </div>
          </div>

          <p className="mt-4 text-[13px] text-[#6E6E73]">
            Puedes consultar todos los detalles técnicos, derechos de acceso y supresión en nuestra{' '}
            <Link href="/privacidad" className="text-[#0071E3] font-medium hover:underline">
              política de privacidad completa
            </Link>.
          </p>
        </section>

        {/* Section 3: Modelo de Precios y Límites */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
              <Coins className="h-5 w-5" />
            </div>
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1D1D1F]">
              Modelo de precios, gratuidad y límites transparentes
            </h2>
          </div>

          <p className="mt-3 text-[15px] leading-relaxed text-[#6E6E73]">
            Creemos en precios transparentes antes de cualquier compra, sin registros forzados ni cargos recurrentes:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E5E5EA] bg-white p-6 shadow-xs">
              <span className="rounded-full bg-[#F5F5F7] px-3 py-1 text-[12px] font-semibold text-[#6E6E73]">
                Fase gratuita
              </span>
              <p className="mt-3 text-[22px] font-bold text-[#1D1D1F]">0 € · Acceso libre</p>
              <ul className="mt-4 space-y-2 text-[14px] text-[#6E6E73]">
                <li>• Consulta completa de requisitos de más de 400 países.</li>
                <li>• Subida de imagen y detección biométrica.</li>
                <li>• Ajuste manual y previsualización con marca de agua.</li>
                <li>• Verificación de reglas (gafas, fondo, proporción).</li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-[#0071E3] bg-[#0071E3]/5 p-6 shadow-xs">
              <span className="rounded-full bg-[#0071E3] px-3 py-1 text-[12px] font-semibold text-white">
                Descarga final sin marcas de agua
              </span>
              <p className="mt-3 text-[22px] font-bold text-[#1D1D1F]">Pago único desde 7,99 €</p>
              <ul className="mt-4 space-y-2 text-[14px] text-[#1D1D1F]">
                <li>• Archivo JPEG digital a 300 DPI exactos sin marca de agua.</li>
                <li>• Hoja de impresión (A4 o 10×15 cm) con marcas de corte.</li>
                <li>• Opción Premium (13,99 €) con revisión manual por experto.</li>
                <li>• Sin suscripciones mensuales ni renovaciones automáticas.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Cómo verificamos los requisitos */}
        <section className="mt-14 rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1D1D1F]">
                Verificación técnica y fuentes de datos oficiales
              </h2>
              <p className="text-[13px] text-[#6E6E73]">
                Nuestra base de datos de 400+ países se revisa periódicamente contra fuentes gubernamentales públicas.
              </p>
            </div>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-[#6E6E73]">
            Cada especificación de medida, fondo y reglas faciales está contrastada con la legislación y directrices de organismos oficiales (como el Ministerio del Interior de España, el U.S. Department of State, HMPO en el Reino Unido, IRCC en Canadá, o la norma internacional OACI Doc 9303).
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/como-verificamos-los-requisitos"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-[#D2D2D7] px-4 py-2 text-[13px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
            >
              <span>Leer nuestra metodología de verificación</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/medidas-foto-pasaporte"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-[#D2D2D7] px-4 py-2 text-[13px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
            >
              <span>Ver tabla de medidas por país</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* CTA to PhotoMaker */}
        <div className="mt-14 text-center">
          <Link
            href="/#creador"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] px-8 py-4 text-[16px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
          >
            <span>Preparar mi foto de pasaporte ahora</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
