'use client';

import React from 'react';
import { Lock, Check, User } from 'lucide-react';
import { CountryInfo, DocumentSpec } from '@/types';

interface ProcessingStepperProps {
  previewUrl: string | null;
  currentStepIndex: number;
  country: CountryInfo;
  spec: DocumentSpec;
}

export function ProcessingStepper({
  previewUrl,
  currentStepIndex,
  country,
  spec,
}: ProcessingStepperProps) {
  const steps = [
    {
      title: 'Detectando rostro y puntos biométricos',
      subtitle: 'Localizando ojos, nariz, barbilla y óvalo facial',
    },
    {
      title: 'Verificando y sustituyendo fondo oficial',
      subtitle: `Aplicando fondo ${spec.backgroundColor || 'blanco liso'} uniforme reglamentario`,
    },
    {
      title: `Calibrando medidas oficiales (${spec.widthMm}×${spec.heightMm} mm)`,
      subtitle: 'Ajustando proporciones del rostro según norma OACI Doc 9303',
    },
    {
      title: 'Optimizando iluminación y balance de blancos',
      subtitle: 'Eliminando sombras duras y calibrando contraste para 300 DPI',
    },
    {
      title: 'Auditoría final de conformidad consular',
      subtitle: `Comprobación rigurosa de los requisitos de ${country.name}`,
    },
  ];

  return (
    <div className="mx-auto max-w-lg py-6 animate-fade-in">
      <div className="overflow-hidden rounded-2xl border border-[#D2D2D7]/80 bg-white shadow-xl">
        <div className="flex flex-col items-center p-7 sm:p-9">
          {/* Animated Avatar Container with Face Scan & Rotating Spinner Ring */}
          <div className="relative mb-6">
            {/* Outer Soft Glowing Spinner Ring */}
            <div className="absolute -inset-3 rounded-full border-2 border-transparent border-t-[#0071E3] border-r-[#0071E3]/30 animate-spin" />
            <div className="absolute -inset-3 rounded-full border-2 border-[#0071E3]/15" />

            {/* Circular Photo / Avatar Container */}
            <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-50/50 shadow-md">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Procesando foto"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-[#0071E3]/80" />
              )}
              {/* Subtle Blue Scan Beam Animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-[#0071E3] shadow-[0_0_8px_#0071E3] animate-pulse" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Procesando tu foto oficial
          </h2>
          <p className="mt-1 text-center text-xs sm:text-sm font-medium text-[#6E6E73] mb-7">
            Ajustando según la normativa de {country.flag} {country.name} · {spec.name}
          </p>

          {/* Stepper Timeline */}
          <div className="w-full relative space-y-4.5 pl-1">
            {steps.map((step, i) => {
              const done = i < currentStepIndex;
              const active = i === currentStepIndex;
              const isLast = i === steps.length - 1;

              return (
                <div key={i} className="relative flex items-start gap-3.5">
                  {/* Connecting Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-2.5 top-6 bottom-0 w-0.5 border-l-2 transition-colors ${
                        done
                          ? 'border-solid border-[#0071E3]'
                          : 'border-dashed border-[#E5E5EA]'
                      }`}
                    />
                  )}

                  {/* Step Node */}
                  <div className="relative z-10 shrink-0 mt-0.5">
                    {done ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0071E3] text-white shadow-xs">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    ) : active ? (
                      <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0071E3] bg-white shadow-xs">
                        <div className="absolute h-2 w-2 rounded-full bg-[#0071E3] animate-ping opacity-75" />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0071E3]" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D2D2D7] bg-white" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-xs sm:text-sm truncate transition-colors ${
                          done || active
                            ? 'font-bold text-[#1D1D1F]'
                            : 'font-medium text-[#8E8E93]'
                        }`}
                      >
                        {step.title}
                      </h3>
                      {active && (
                        <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0071E3]">
                          En curso...
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        done || active ? 'text-[#6E6E73]' : 'text-[#8E8E93]/70'
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Security Banner */}
        <div className="flex items-center gap-3 border-t border-[#E5E5EA] bg-[#F5F5F7] p-4 sm:px-8">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0071E3]">
            <Lock className="h-3.5 w-3.5 text-[#0071E3]" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1D1D1F]">Procesamiento 100% seguro</h4>
            <p className="text-[11px] leading-snug text-[#6E6E73]">
              Tus fotos se procesan mediante cifrado SSL de extremo a extremo y se eliminan automáticamente tras la descarga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
