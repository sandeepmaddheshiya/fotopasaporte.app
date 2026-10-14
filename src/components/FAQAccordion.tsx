'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: '¿Cómo puedo hacer una foto para el pasaporte?',
      answer:
        'Selecciona el país y el documento, añade una foto reciente y ajusta la imagen según los requisitos disponibles.',
    },
    {
      question: '¿Puedo preparar una foto para un visado?',
      answer:
        'Sí, puedes utilizar las opciones de visado disponibles en la herramienta. Los requisitos dependen del país y del tipo de trámite.',
    },
    {
      question: '¿Puedo utilizar una foto hecha con el móvil?',
      answer:
        'En muchos casos, una foto tomada con el móvil puede servir como punto de partida si tiene buena iluminación, el rostro visible y un encuadre adecuado.',
    },
    {
      question: '¿La foto estará garantizada para su aceptación?',
      answer:
        'No. La herramienta ayuda a preparar la fotografía según los requisitos disponibles, pero la decisión final corresponde a la autoridad que tramita el documento.',
    },
    {
      question: '¿Puedo imprimir mi foto?',
      answer:
        'Puedes descargar el archivo individual en alta resolución (300 DPI) o generar la plantilla oficial en papel A4 con múltiples copias y marcas de corte listas para cualquier quiosco o impresora doméstica.',
    },
    {
      question: '¿Qué ocurre con la foto que subo?',
      answer:
        'El procesamiento se realiza directamente en la memoria de tu navegador web. Tu imagen nunca se envía a ningún servidor ni se almacena externamente.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px] lg:text-[42px]">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#6E6E73]">
            Respuestas claras y directas a las dudas habituales al preparar fotos para trámites oficiales.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mt-12 divide-y divide-[#E5E5EA] border-y border-[#E5E5EA]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between text-left transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="text-[15px] sm:text-[17px] font-semibold text-[#1D1D1F] pr-3 sm:pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[#6E6E73] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0071E3]/10 text-[#0071E3]' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className="mt-3 pr-2 sm:pr-8 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73] animate-fade-in"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
