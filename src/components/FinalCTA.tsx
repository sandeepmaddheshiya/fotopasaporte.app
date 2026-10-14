'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onStartClick?: () => void;
}

export function FinalCTA({ onStartClick }: FinalCTAProps) {
  const handleClick = () => {
    if (onStartClick) {
      onStartClick();
    } else {
      const el = document.getElementById('creador');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#F5F5F7] py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-[34px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[46px]">
            Empieza con tu foto. Nosotros te guiamos.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#6E6E73] sm:text-[19px]">
            Selecciona tu documento y prepara tu imagen paso a paso.
          </p>

          <div className="mt-9 flex justify-center">
            <button
              onClick={handleClick}
              className="group inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-8 py-3.5 text-[16px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>Crear mi foto</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
