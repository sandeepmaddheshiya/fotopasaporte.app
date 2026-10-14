'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Crop, ShieldCheck, Download, Sliders, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
  onSelectSamplePhoto?: (sampleUrl: string) => void;
}

export function HeroSection({ onStartClick, onSelectSamplePhoto }: HeroSectionProps) {
  const scrollToRequirements = () => {
    const el = document.getElementById('requisitos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Editorial Copy */}
          <div className="flex flex-col items-start lg:col-span-6 lg:pr-4">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D2D2D7]/80 bg-[#F5F5F7] px-3.5 py-1 text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071E3]" />
              FOTOS PARA DOCUMENTOS
            </div>

            {/* Headline */}
            <h1 className="text-[38px] leading-[1.08] font-semibold tracking-tight text-[#1D1D1F] sm:text-[52px] lg:text-[58px]">
              Tu foto de pasaporte, perfecta a la primera.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 text-[17px] leading-relaxed text-[#6E6E73] sm:text-[19px]">
              Prepara tu foto para pasaporte o visado en unos sencillos pasos. Ajusta el encuadre, el
              fondo y las dimensiones según los requisitos de tu documento.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <button
                onClick={onStartClick}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] px-7 py-3.5 text-[16px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>Crear mi foto</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={scrollToRequirements}
                className="inline-flex items-center justify-center rounded-full border border-[#D2D2D7] bg-white px-6 py-3.5 text-[16px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#F5F5F7] active:scale-[0.98]"
              >
                Consultar requisitos
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-10 grid w-full grid-cols-1 gap-3 border-t border-[#E5E5EA] pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#0071E3]">
                  <Crop className="h-3.5 w-3.5" />
                </div>
                <span className="text-[13px] font-medium text-[#424245]">
                  Ajuste de tamaño y encuadre
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#0071E3]">
                  <Download className="h-3.5 w-3.5" />
                </div>
                <span className="text-[13px] font-medium text-[#424245]">
                  Preparada para descargar
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#0071E3]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-[13px] font-medium text-[#424245]">
                  Tus fotos, bajo tu control
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Product Preview */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[460px] rounded-3xl border border-[#D2D2D7] bg-[#F5F5F7] p-4 shadow-xl sm:p-6">
              {/* Product window header */}
              <div className="mb-4 flex items-center justify-between border-b border-[#E5E5EA] pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-[12px] font-medium text-[#6E6E73]">
                    Editor biométrico · 35 × 45 mm
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#34C759] shadow-2xs">
                  <CheckCircle2 className="h-3 w-3" />
                  Listo
                </span>
              </div>

              {/* Main Canvas Simulation */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-[#D2D2D7] bg-white shadow-inner">
                {/* Portrait photograph */}
                <Image
                  src="/images/sample-portrait.jpg"
                  alt="Vista previa de foto de pasaporte con medidas biométricas"
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-cover object-center"
                  priority
                />

                {/* Biometric overlay guides */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  {/* Head oval guide */}
                  <div className="relative h-[68%] w-[58%] rounded-[50%] border-2 border-dashed border-[#0071E3]/70">
                    {/* Top Crown indicator */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-[#0071E3] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                      Coronilla
                    </div>
                    {/* Eye line */}
                    <div className="absolute top-[42%] right-[-15%] left-[-15%] border-t border-dashed border-[#34C759]">
                      <span className="absolute -top-3 right-0 rounded bg-[#34C759] px-1.5 py-0.5 text-[9px] font-medium text-white">
                        Ojos
                      </span>
                    </div>
                    {/* Chin indicator */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded bg-[#0071E3] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                      Barbilla
                    </div>
                  </div>

                  {/* Vertical centerline */}
                  <div className="absolute inset-y-0 left-1/2 w-px border-l border-dashed border-[#0071E3]/40" />
                </div>

                {/* Live Dimension Badges */}
                <div className="absolute top-3 left-3 rounded-lg bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  35 mm × 45 mm
                </div>
                <div className="absolute top-3 right-3 rounded-lg bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  300 DPI
                </div>

                {/* Final crop mini-thumbnail */}
                <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-xl border border-white/40 bg-white/90 p-1.5 shadow-lg backdrop-blur-md">
                  <div className="relative h-12 w-9 overflow-hidden rounded-md border border-[#D2D2D7]">
                    <Image
                      src="/images/sample-portrait.jpg"
                      alt="Miniatura procesada"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="pr-1 text-left">
                    <p className="text-[11px] font-semibold text-[#1D1D1F]">España</p>
                    <p className="text-[10px] text-[#6E6E73]">Pasaporte / DNI</p>
                  </div>
                </div>
              </div>

              {/* Discreet Editing Toolbar */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#D2D2D7] bg-white px-3.5 py-2.5 text-[12px] text-[#6E6E73] shadow-xs">
                <div className="flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-[#0071E3]" />
                  <span>Encuadre: Automático</span>
                </div>

                <div className="flex items-center gap-2">
                  {onSelectSamplePhoto && (
                    <button
                      onClick={() => onSelectSamplePhoto('/images/sample-portrait.jpg')}
                      className="rounded-full bg-[#0071E3]/10 px-3 py-1 font-medium text-[#0071E3] transition-colors hover:bg-[#0071E3] hover:text-white"
                    >
                      Probar con esta foto
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
