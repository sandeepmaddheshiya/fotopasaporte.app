'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onStartClick?: () => void;
}

export function Header({ onStartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D2D2D7]/60 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-[#1D1D1F] transition-opacity hover:opacity-80"
          aria-label="FotoPasaporte - Inicio"
        >
          {/* Minimalist crop-corner brand icon */}
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-[#D2D2D7] bg-[#F5F5F7] shadow-xs">
            <svg
              className="h-4 w-4 text-[#0071E3]"
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
          <span className="text-[17px] font-semibold tracking-tight text-[#1D1D1F]">
            FotoPasaporte
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          <button
            onClick={() => scrollToSection('creador')}
            className="text-[14px] text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
          >
            Crear foto
          </button>
          <button
            onClick={() => scrollToSection('requisitos')}
            className="text-[14px] text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
          >
            Requisitos
          </button>
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="text-[14px] text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
          >
            Cómo funciona
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-[14px] text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
          >
            Preguntas frecuentes
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => {
              if (onStartClick) onStartClick();
              else scrollToSection('creador');
            }}
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#0071E3] px-4 py-1.5 text-[13px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
          >
            <span>Crear mi foto</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              if (onStartClick) onStartClick();
              else scrollToSection('creador');
            }}
            className="rounded-full bg-[#0071E3] px-3 py-1 text-[12px] font-medium text-white shadow-xs"
          >
            Crear
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1D1D1F] hover:bg-[#F5F5F7]"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#D2D2D7] bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('creador')}
              className="text-left text-[15px] font-medium text-[#1D1D1F]"
            >
              Crear foto
            </button>
            <button
              onClick={() => scrollToSection('requisitos')}
              className="text-left text-[15px] text-[#6E6E73]"
            >
              Requisitos
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="text-left text-[15px] text-[#6E6E73]"
            >
              Cómo funciona
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-[15px] text-[#6E6E73]"
            >
              Preguntas frecuentes
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  if (onStartClick) onStartClick();
                  else scrollToSection('creador');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071E3] py-2.5 text-[14px] font-medium text-white"
              >
                <span>Crear mi foto</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
