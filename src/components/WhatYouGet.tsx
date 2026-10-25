import React from 'react';
import { Check } from 'lucide-react';

export function WhatYouGet() {
  const items = [
    'Vista previa de tu foto con marca de agua, sin pagar y sin registrarte.',
    'Foto final en alta resolución (300 DPI) con las medidas del país y documento elegidos.',
    'Hoja de impresión (A4 o 10×15 cm) con varias copias y marcas de corte.',
    'Pack Estándar: 7,99 €. Pack Premium con revisión humana: 13,99 €. El precio se muestra antes de pagar.',
  ];

  return (
    <section id="que-obtienes" className="scroll-mt-16 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        <h2 className="text-center text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px]">
          Qué obtienes
        </h2>
        <p className="mt-3 text-center text-[15px] sm:text-[17px] text-[#6E6E73]">
          Qué es gratis y qué no, antes de empezar.
        </p>
        <ul className="mt-8 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] px-4 py-3.5 text-[14px] sm:text-[15px] text-[#1D1D1F]"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0071E3]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
