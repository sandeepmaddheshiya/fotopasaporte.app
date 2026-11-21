import { VisitTracker } from '@/components/VisitTracker';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0071E3',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Foto de pasaporte online: recorta tu foto al tamaño de tu país',
  description:
    'FotoPasaporte.app es la herramienta online independiente para recortar y preparar fotos de pasaporte y visado con las medidas oficiales de más de 200 países y 400 formatos (300 DPI).',
  authors: [{ name: 'FotoPasaporte.app' }],
  metadataBase: new URL('https://fotopasaporte.app'),
  alternates: {
    canonical: 'https://fotopasaporte.app',
  },
  openGraph: {
    title: 'Foto de pasaporte online: recorta tu foto al tamaño de tu país',
    description:
      'FotoPasaporte.app es la herramienta online independiente para recortar y preparar fotos de pasaporte y visado con las medidas oficiales de más de 200 países y 400 formatos (300 DPI).',
    url: 'https://fotopasaporte.app',
    siteName: 'FotoPasaporte.app',
    locale: 'es_ES',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo.svg', type: 'image/svg+xml' },
      { url: '/images/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#1D1D1F] antialiased selection:bg-[#0071E3]/20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://fotopasaporte.app/#organization',
                  name: 'FotoPasaporte.app',
                  url: 'https://fotopasaporte.app',
                  logo: 'https://fotopasaporte.app/images/logo.png',
                  email: 'soporte@fotopasaporte.app',
                  description:
                    'Herramienta online independiente para recortar, calibrar y preparar fotografías de pasaporte, visado y documentos de identidad conforme a los requisitos biométricos de más de 200 países (400+ formatos oficiales) y normativas OACI Doc 9303.',
                  knowsAbout: [
                    'Fotografía para pasaporte',
                    'Medidas biométricas OACI Doc 9303',
                    'Fotografía para visados',
                    'Calibración de fotos para documentos oficiales',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://fotopasaporte.app/#website',
                  url: 'https://fotopasaporte.app',
                  name: 'FotoPasaporte.app',
                  inLanguage: 'es',
                  publisher: { '@id': 'https://fotopasaporte.app/#organization' },
                },
              ],
            }),
          }}
        />
        <VisitTracker />
        {children}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z1hgieyu14");
            `,
          }}
        />
      </body>
    </html>
  );
}
