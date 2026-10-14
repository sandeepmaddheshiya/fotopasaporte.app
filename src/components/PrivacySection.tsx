'use client';

import React from 'react';
import { Lock, Cpu, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export function PrivacySection() {
  return (
    <section className="bg-[#F5F5F7] py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl sm:rounded-3xl border border-[#D2D2D7] bg-white p-5 sm:p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F5F7] text-[#0071E3]">
              <Lock className="h-5 w-5" />
            </div>
            <span className="text-[12px] font-semibold tracking-wider text-[#6E6E73] uppercase">
              Privacidad y seguridad
            </span>
          </div>

          <h2 className="mt-4 sm:mt-5 text-[22px] sm:text-[30px] md:text-[38px] font-semibold tracking-tight text-[#1D1D1F] leading-tight">
            Tu foto es personal. Trátala como tal.
          </h2>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] leading-relaxed text-[#6E6E73]">
            Queremos que preparar tu fotografía sea sencillo y transparente. Consulta cómo se procesa tu imagen y qué ocurre con tus archivos.
          </p>

          {/* Privacy Architecture Points */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 border-t border-[#E5E5EA] pt-8">
            <div>
              <div className="flex items-center gap-2 text-[#1D1D1F] font-semibold text-[15px]">
                <Cpu className="h-4 w-4 text-[#0071E3]" />
                <span>100% en tu navegador</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                El recorte, escalado y exportación de tu imagen se ejecutan en el motor de tu propio dispositivo.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#1D1D1F] font-semibold text-[15px]">
                <EyeOff className="h-4 w-4 text-[#0071E3]" />
                <span>Sin subidas al servidor</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                Tus archivos nunca se envían a bases de datos ni se almacenan en servidores externos.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#1D1D1F] font-semibold text-[15px]">
                <ShieldCheck className="h-4 w-4 text-[#0071E3]" />
                <span>Sin cuentas forzadas</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6E6E73]">
                Sin suscripciones ocultas ni necesidad de introducir datos bancarios para preparar tu foto.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-[#E5E5EA] pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[13px] text-[#8E8E93]">
              Compromiso de privacidad conforme al RGPD de la Unión Europea.
            </span>
            <a
              href="#faq"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0071E3] hover:underline"
            >
              <span>Conoce nuestra política de privacidad</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
