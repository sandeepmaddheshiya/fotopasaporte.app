import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileQuestion, ArrowRight, Home, Ruler, BookOpen, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] flex flex-col justify-between">
      <Header />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F5F7] text-[#0071E3] shadow-xs">
            <FileQuestion className="h-8 w-8" />
          </div>

          <span className="mt-6 inline-block text-[12px] font-semibold tracking-wider text-[#8E8E93] uppercase">
            Error 404
          </span>

          <h1 className="mt-2 text-[32px] sm:text-[40px] font-semibold tracking-tight text-[#1D1D1F]">
            Página no encontrada
          </h1>

          <p className="mt-3 text-[16px] text-[#6E6E73] leading-relaxed">
            La página que buscas no existe o ha cambiado de dirección. Puedes volver al inicio o consultar nuestras guías de medidas oficiales.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#0071E3] px-6 py-3 text-[14px] font-medium text-white shadow-2xs transition-all hover:bg-[#0077ED]"
            >
              <Home className="h-4 w-4" />
              <span>Ir al creador de fotos</span>
            </Link>

            <Link
              href="/medidas-foto-pasaporte"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#D2D2D7] bg-white px-6 py-3 text-[14px] font-medium text-[#1D1D1F] transition-colors hover:border-[#0071E3] hover:text-[#0071E3]"
            >
              <Ruler className="h-4 w-4 text-[#0071E3]" />
              <span>Ver medidas por país</span>
            </Link>
          </div>

          <div className="mt-12 border-t border-[#E5E5EA] pt-8 text-left">
            <h2 className="text-[14px] font-semibold text-[#1D1D1F]">
              Guías y recursos recomendados:
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <Link
                href="/como-hacer-foto-pasaporte-en-casa"
                className="flex items-center justify-between rounded-xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-3 hover:border-[#0071E3] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-[#0071E3]" />
                  <span className="font-medium text-[#1D1D1F] group-hover:text-[#0071E3]">Cómo tomar la foto en casa</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#8E8E93] group-hover:text-[#0071E3]" />
              </Link>

              <Link
                href="/donde-sacar-foto-pasaporte"
                className="flex items-center justify-between rounded-xl border border-[#E5E5EA] bg-[#F5F5F7]/60 p-3 hover:border-[#0071E3] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#0071E3]" />
                  <span className="font-medium text-[#1D1D1F] group-hover:text-[#0071E3]">Dónde sacar la foto oficial</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#8E8E93] group-hover:text-[#0071E3]" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
