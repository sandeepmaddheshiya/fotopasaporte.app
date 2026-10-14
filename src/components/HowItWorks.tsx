'use client';

import React from 'react';
import { Globe, Sliders, ArrowDownToLine } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Elige tu documento',
      description:
        'Indica el país y el tipo de documento para consultar sus requisitos de dimensiones, fondo y proporción.',
      icon: <Globe className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      number: '02',
      title: 'Añade y ajusta tu foto',
      description:
        'Sube tu imagen y adapta el encuadre, la rotación y el tamaño utilizando nuestras guías biométricas interactivas.',
      icon: <Sliders className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      number: '03',
      title: 'Descarga el resultado',
      description:
        'Revisa la imagen final y descarga el archivo individual a 300 DPI o la plantilla oficial A4 lista para imprimir.',
      icon: <ArrowDownToLine className="h-5 w-5 text-[#0071E3]" />,
    },
  ];

  return (
    <section id="como-funciona" className="scroll-mt-16 bg-[#F5F5F7] py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px] lg:text-[42px]">
            De tu foto al documento, en pocos pasos.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#6E6E73]">
            Un flujo de trabajo guiado para obtener una imagen limpia, bien proporcionada y con las medidas oficiales.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#D2D2D7] bg-white p-5 sm:p-8 shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                    {step.icon}
                  </div>
                  <span className="font-mono text-[18px] font-semibold text-[#8E8E93]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-[20px] font-semibold text-[#1D1D1F]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6E6E73]">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#E5E5EA] pt-4 text-[12px] text-[#8E8E93]">
                Paso guiado e interactivo
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
