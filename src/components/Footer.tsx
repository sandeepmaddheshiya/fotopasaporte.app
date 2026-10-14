'use client';

import React from 'react';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#D2D2D7] bg-[#F5F5F7] text-[#6E6E73]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-[#D2D2D7] bg-white text-[#0071E3]">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3v3H3" />
                  <path d="M18 3v3h3" />
                  <path d="M6 21v-3H3" />
                  <path d="M18 21v-3h3" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
                FotoPasaporte
              </span>
            </div>

            <p className="mt-3.5 max-w-sm text-[13px] leading-relaxed text-[#6E6E73]">
              Herramienta online para ajustar, recortar y preparar fotos de pasaporte y visado conforme a las especificaciones oficiales de cada país.
            </p>

            <p className="mt-4 text-[12px] text-[#8E8E93]">
              © 2026 FotoPasaporte.app. Todos los derechos reservados.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3">
            <p className="text-[13px] font-semibold text-[#1D1D1F]">Herramienta</p>
            <ul className="mt-3.5 space-y-2.5 text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('creador')}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Crear foto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('requisitos')}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Requisitos por país
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('como-funciona')}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Cómo funciona
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-4">
            <p className="text-[13px] font-semibold text-[#1D1D1F]">Información y Ayuda</p>
            <ul className="mt-3.5 space-y-2.5 text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('faq')}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#1D1D1F] transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#1D1D1F] transition-colors">
                  Términos de uso
                </a>
              </li>
              <li>
                <a href="mailto:soporte@fotopasaporte.app" className="hover:text-[#1D1D1F] transition-colors">
                  Contacto: soporte@fotopasaporte.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Independent Service Disclaimer */}
        <div className="mt-12 border-t border-[#D2D2D7]/80 pt-8 text-[12px] leading-relaxed text-[#8E8E93]">
          <p>
            <strong>Aviso legal:</strong> FotoPasaporte es un servicio independiente. No representa a ningún gobierno, embajada, consulado ni autoridad de inmigración. La aceptación definitiva de cualquier fotografía depende exclusivamente de la autoridad oficial que tramite la solicitud.
          </p>
        </div>
      </div>
    </footer>
  );
}
