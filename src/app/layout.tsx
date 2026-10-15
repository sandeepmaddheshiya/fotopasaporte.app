import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
  title: 'FotoPasaporte.app — Tu foto de pasaporte, lista para usar',
  description:
    'Prepara tu foto para pasaporte, visado y documentos con las medidas y el encuadre exactos. Procesamiento privado en tu navegador, sin registros innecesarios.',
  keywords: [
    'foto pasaporte',
    'foto para pasaporte',
    'fotos para pasaporte',
    'fotos de pasaporte',
    'fotografias para pasaporte',
    'fotografias tamaño pasaporte',
    'convertir foto a tamaño pasaporte',
    'convertir foto a tamaño pasaporte online gratis',
    'convertir foto a tamaño pasaporte gratis',
    'foto pasaporte online',
    'foto tamaño pasaporte online',
    'foto pasaporte gratis',
    'foto tamaño pasaporte precio',
    'donde sacar foto pasaporte',
    'donde toman fotos para pasaporte',
    'foto para visa',
    'validar pasaporte online',
    'foto para pasaporte requisitos',
    'foto tipo pasaporte ejemplo',
    'foto carnet',
    'recortar foto 35x45',
    'foto 2x2 pulgadas',
  ],
  authors: [{ name: 'FotoPasaporte.app' }],
  metadataBase: new URL('https://fotopasaporte.app'),
  openGraph: {
    title: 'FotoPasaporte.app — Tu foto de pasaporte, lista para usar',
    description:
      'Prepara tu foto para pasaporte, visado y documentos con las medidas y el encuadre que necesitas.',
    url: 'https://fotopasaporte.app',
    siteName: 'FotoPasaporte',
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
        {children}
      </body>
    </html>
  );
}
