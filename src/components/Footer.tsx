'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="border-t border-[#D2D2D7] bg-[#F5F5F7] text-[#6E6E73]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80 cursor-pointer"
              aria-label="FotoPasaporte - Inicio"
            >
              <svg
                className="h-5 w-5 text-[#0071E3] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
                FotoPasaporte<span className="text-[#0071E3]">.app</span>
              </span>
            </Link>

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
              <li>
                <Link
                  href="/medidas-foto-pasaporte"
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Medidas de foto de pasaporte
                </Link>
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
                <Link href="/privacidad" className="hover:text-[#1D1D1F] transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[#1D1D1F] transition-colors">
                  Términos de uso
                </Link>
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
