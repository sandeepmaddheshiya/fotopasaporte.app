'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  link?: {
    href: string;
    text: string;
    prefix?: string;
  };
}

const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: '¿Dónde sacar o dónde toman fotos para pasaporte?',
    answer:
      'Puedes preparar tu foto en casa con la cámara de tu teléfono móvil usando FotoPasaporte.app, sin desplazarte a un estudio. La herramienta ajusta el encuadre a las medidas del país elegido, calibra el fondo y genera el archivo digital y una hoja de impresión (A4 o 10×15 cm) con varias copias para imprimir en cualquier tienda de fotografía o papelería.',
    link: {
      prefix: 'Conoce los costes de estudios, fotomatones y',
      href: '/donde-sacar-foto-pasaporte',
      text: 'dónde sacar la foto del pasaporte',
    },
  },
  {
    question: '¿Es gratis? ¿Cuánto cuesta?',
    answer:
      'Puedes subir tu foto y ver una vista previa con marca de agua sin pagar. Para descargar la foto final sin marca de agua en alta resolución (300 DPI) y la hoja de impresión hay que adquirir un pack: Estándar por 7,99 € o Premium con revisión humana por 13,99 €. Los precios se muestran antes de pagar.',
  },
  {
    question: '¿Cómo convertir una foto a tamaño pasaporte online?',
    answer:
      'Para convertir una imagen o selfie a tamaño pasaporte: 1) Sube tu fotografía en el creador; 2) Selecciona el país y el tipo de documento (por ejemplo, España 35×45 mm, EE.UU. 2×2 pulgadas); 3) La herramienta ajusta el encuadre según las medidas de ese país y sustituye el fondo por el color indicado; 4) Descarga tu foto individual o la hoja de impresión lista para recortar.',
  },
  {
    question: '¿Cómo se comprueba que mi foto cumple los requisitos?',
    answer:
      'FotoPasaporte.app analiza tu foto con criterios basados en la norma OACI (Doc 9303): proporción de la cabeza, ojos centrados, expresión neutra, iluminación homogénea, nitidez y fondo liso. Es una ayuda previa: la aceptación final la decide siempre la autoridad que tramita tu documento, y no podemos garantizarla.',
  },
  {
    question: '¿Cómo hacer la foto de pasaporte a un bebé o niño pequeño?',
    answer:
      'Tumba al bebé sobre una sábana blanca lisa o siéntalo en una silla con respaldo blanco. Fotografía desde arriba (si está tumbado) o de frente (si está sentado) con la cámara a la altura de sus ojos. Los ojos deben estar abiertos, la boca cerrada y el rostro centrado. En menores de 6 años muchos países son más flexibles con la expresión, pero el fondo y las medidas siguen siendo los mismos que para un adulto.',
  },
  {
    question: '¿Se puede llevar gafas en la foto de pasaporte?',
    answer:
      'Depende del país. Estados Unidos, España, México y la mayoría de países prohíben gafas graduadas o de sol. Algunos países (como Alemania o Australia) las permiten si los cristales son transparentes, no hay reflejo del flash y la montura no cubre los ojos ni las cejas. Nuestra recomendación general: quítatelas siempre que sea posible para evitar rechazos.',
  },
  {
    question: '¿Qué es un ejemplo de foto tipo pasaporte correcta?',
    answer:
      'Un ejemplo de foto tipo pasaporte correcta es un retrato frontal tomado a la altura de los ojos en los últimos 6 meses, con fondo blanco o claro uniforme (salvo países como Francia o Reino Unido que exigen fondo gris claro o crema), rostro centrado y despejado (frente y orejas visibles, sin flequillo sobre los ojos), sin gafas reflectantes y con ropa formal o de color oscuro que contraste con el fondo.',
  },
  {
    question: '¿Puedo preparar una foto para un visado o visa internacional?',
    answer:
      'Sí. Hay perfiles de visado para varios países, entre ellos EE.UU. (DS-160 / 2×2"), Schengen (35×45 mm), China (33×48 mm), Canadá, India y Reino Unido. Comprueba siempre las medidas de tu país en su página y en la fuente oficial.',
  },
  {
    question: '¿Puedo utilizar una foto hecha con el teléfono móvil?',
    answer:
      'Sí. La mayoría de teléfonos móviles modernos capturan imágenes con resolución de sobra (más de 12 MP). Solo necesitas pedirle a alguien que te tome la foto a 1,5–2 metros de distancia con iluminación natural difusa frente a una pared lisa (evita selfies con la cámara frontal para no deformar la perspectiva facial).',
  },
  {
    question: '¿Dónde puedo imprimir la foto de pasaporte cerca de mí?',
    answer:
      'Descarga la hoja de impresión (A4 o 10 × 15 cm) que genera FotoPasaporte.app y llévala a cualquier tienda de fotografía, papelería, copistería o quiosco de impresión fotográfica. También puedes imprimir en casa si dispones de impresora fotográfica. Lo importante es seleccionar «Tamaño real / Escala 100%» y usar papel fotográfico brillante o satinado de alta densidad.',
  },
  {
    question: '¿Cuánto tarda en estar lista la foto?',
    answer:
      'El recorte, el ajuste de fondo y la generación de la hoja de impresión se completan en menos de un minuto. Una vez procesada, puedes descargar los archivos de inmediato. Si eliges el pack Premium con revisión humana, nuestro equipo valida los parámetros biométricos y te envía un correo con la foto aprobada en un plazo aproximado de 1 hora en horario laboral.',
  },
  {
    question: '¿Cómo imprimo mi foto para que mantenga el tamaño milimétrico exacto?',
    answer:
      'Descarga la hoja de impresión (A4 o 10 × 15 cm) generada por FotoPasaporte.app. Al imprimirla en casa o en un quiosco de fotos, selecciona siempre «Tamaño real / Escala 100%» (nunca «Ajustar a página» ni «Llenar página») para que las fotos conserven sus medidas exactas.',
  },
  {
    question: '¿Qué ocurre con la privacidad de la foto que subo?',
    answer:
      'Para el recorte y la vista previa, tu foto se envía a nuestros servidores, que también ejecutan el análisis automático. No la compartimos con terceros con fines publicitarios. Consulta los plazos de conservación y cómo solicitar su eliminación en nuestra',
    link: {
      href: '/privacidad',
      text: 'política de privacidad',
    },
  },
];

export { HOMEPAGE_FAQS };

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-16 bg-white py-16 sm:py-24">
      {/* FAQPage JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: HOMEPAGE_FAQS.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.link
                  ? `${faq.answer} ${faq.link.prefix ? faq.link.prefix + ' ' : ''}${faq.link.text}.`
                  : faq.answer,
              },
            })),
          }),
        }}
      />

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
          {HOMEPAGE_FAQS.map((faq, index) => {
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

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  hidden={!isOpen}
                  className="mt-3 pr-2 sm:pr-8 text-[14px] sm:text-[15px] leading-relaxed text-[#6E6E73] animate-fade-in"
                >
                  <p>
                    {faq.answer}{' '}
                    {faq.link && (
                      <>
                        {faq.link.prefix && <span>{faq.link.prefix} </span>}
                        <Link
                          href={faq.link.href}
                          className="text-[#0071E3] font-medium hover:underline inline-flex items-center gap-0.5"
                        >
                          {faq.link.text}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
