import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StudioClient } from './StudioClient';

interface StudioPageProps {
  params: Promise<{
    photoId: string;
  }>;
}

export async function generateMetadata({
  params,
}: StudioPageProps): Promise<Metadata> {
  const { photoId } = await params;
  return {
    title: `Foto Oficial de Pasaporte #${photoId.slice(0, 8)} | FotoPasaporte.app`,
    description:
      'Tu fotografía oficial de pasaporte o visado ha sido procesada y calibrada según los requisitos biométricos OACI.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { photoId } = await params;

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col justify-between">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center text-sm font-medium text-[#6E6E73]">
              Cargando tu estudio biométrico...
            </div>
          }
        >
          <StudioClient photoId={photoId} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
