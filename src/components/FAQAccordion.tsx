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
      question: '¿Dónde sacar o dónde toman fotos para pasaporte?',
      answer:
        'Puedes tomar tu foto de pasaporte directamente en casa con la cámara de tu teléfono móvil utilizando FotoPasaporte.app. No necesitas desplazarte a un estudio fotográfico ni pagar tarifas elevadas en cabinas o farmacias. Nuestra herramienta ajusta el encuadre biométrico, elimina sombras, calibra el fondo reglamentario y genera tanto el archivo digital como la plantilla de impresión de 10×15 cm con múltiples fotos listas para imprimir por céntimos en cualquier tienda de fotografía o papelería.',
    },
    {
      question: '¿Cuál es el precio de una foto tamaño pasaporte?',
      answer:
        'En estudios profesionales tradicionales o cabinas fotográficas (fotomatones), un paquete de 4 a 6 fotos de pasaporte suele costar entre 8 € y 15 € en España y Europa, o entre 15 $ y 22 $ en Estados Unidos (como Walgreens o CVS). Con FotoPasaporte.app puedes preparar y validar tu foto para pasaporte o visa online gratis, y descargar una plantilla de alta resolución a 300 DPI que puedes imprimir en cualquier quiosco por menos de 0,35 €.',
    },
    {
      question: '¿Cómo convertir una foto a tamaño pasaporte online gratis?',
      answer:
        'Para convertir cualquier imagen o selfie a tamaño pasaporte oficial: 1) Sube tu fotografía en nuestro creador superior; 2) Selecciona el país y tipo de documento (por ejemplo, España 35×45 mm, EE.UU. 2×2 pulgadas o México 35×45 mm); 3) La herramienta calibra automáticamente el óvalo facial según la normativa OACI y sustituye el fondo por el blanco o gris reglamentario; 4) Descarga tu foto individual o la plantilla de impresión lista para recortar.',
    },
    {
      question: '¿Cómo validar una foto de pasaporte online y qué requisitos debe cumplir?',
      answer:
        'FotoPasaporte.app incluye un validador biométrico online que analiza los criterios oficiales de la OACI (Doc 9303): proporción de la cabeza (entre el 70% y el 80% de la altura total), ojos centrados horizontalmente y alineados, expresión facial neutra sin sonreír ni mostrar dientes, iluminación homogénea sin sombras profundas, nitidez a 300 DPI y fondo liso uniforme.',
    },
    {
      question: '¿Qué es un ejemplo de foto tipo pasaporte correcta?',
      answer:
        'Un ejemplo de foto tipo pasaporte correcta es un retrato frontal tomado a la altura de los ojos en los últimos 6 meses, con fondo blanco o claro uniforme (salvo países como Francia o Reino Unido que exigen fondo gris claro o crema), rostro centrado y despejado (frente y orejas visibles, sin flequillo sobre los ojos), sin gafas reflectantes y con ropa formal o de color oscuro que contraste con el fondo.',
    },
    {
      question: '¿Puedo preparar una foto para un visado o visa internacional?',
      answer:
        'Sí. La herramienta cuenta con perfiles específicos para visados de todo el mundo: visa de turismo o negocios de EE.UU. (DS-160 / 2×2"), visado Schengen para la Unión Europea (35×45 mm), visa para Canadá, China (33×48 mm), India, Reino Unido y Latinoamérica.',
    },
    {
      question: '¿Puedo utilizar una foto hecha con el teléfono móvil?',
      answer:
        'Sí. La mayoría de teléfonos móviles modernos capturan imágenes con resolución de sobra (más de 12 MP). Solo necesitas pedirle a alguien que te tome la foto a 1,5–2 metros de distancia con iluminación natural difusa frente a una pared lisa (evita selfies con la cámara frontal para no deformar la perspectiva facial).',
    },
    {
      question: '¿Cómo imprimo mi foto para que mantenga el tamaño milimétrico exacto?',
      answer:
        'Descarga la plantilla de impresión de 10 × 15 cm (4×6") generada por FotoPasaporte.app. Al imprimirla en casa o en un quiosco de fotos comercial, selecciona siempre la opción «Tamaño real / Escala 100%» (nunca «Ajustar a página» ni «Llenar página»), lo que garantiza que las fotos mantengan sus medidas milimétricas exactas (35×45 mm o 51×51 mm).',
    },
    {
      question: '¿Qué ocurre con la privacidad de la foto que subo?',
      answer:
        'El procesamiento y recorte se realiza de forma totalmente privada directamente en la memoria de tu navegador web mediante tecnologías seguras en el cliente. Tu fotografía nunca se almacena en bases de datos externas ni se comparte con terceros.',
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
