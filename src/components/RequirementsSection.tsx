'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, Check, Shield } from 'lucide-react';
import { COUNTRIES_DATA, toCountrySlug } from '@/data/countries';
import { CountryInfo } from '@/types';

interface RequirementsSectionProps {
  onSelectCountryForMaker: (country: CountryInfo) => void;
}

export function RequirementsSection({ onSelectCountryForMaker }: RequirementsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('Todos');

  const regions = ['Todos', 'Europa', 'América', 'Asia / Oceanía'];

  const spanishSpeaking = ['ES', 'MX', 'CO', 'AR', 'PE', 'CL', 'EC', 'VE', 'UY', 'CR', 'PA', 'DO', 'SV', 'CU', 'PY', 'NI', 'GT', 'HN', 'BO'];
  const priority = (code: string) => {
    const i = spanishSpeaking.indexOf(code.toUpperCase());
    return i === -1 ? spanishSpeaking.length : i;
  };

  const filteredCountries = COUNTRIES_DATA.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.documents.some((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRegion = activeRegion === 'Todos' || country.region === activeRegion;

    return matchesSearch && matchesRegion;
  }).sort((a, b) => priority(a.code) - priority(b.code));

  return (
    <section id="requisitos" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px] lg:text-[42px]">
            Encuentra los requisitos de tu foto
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#6E6E73]">
            Cada documento puede tener sus propias medidas, reglas de encuadre y condiciones de presentación.
          </p>
        </div>

        {/* Search Bar & Region Tabs */}
        <div className="mx-auto mt-10 max-w-2xl space-y-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8E8E93]" />
            <input
              type="text"
              placeholder="Busca tu país o documento (ej. Estados Unidos, España, Visado...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#D2D2D7] bg-[#F5F5F7] py-3 pr-4 pl-10 text-[15px] text-[#1D1D1F] placeholder-[#8E8E93] transition-all focus:border-[#0071E3] focus:bg-white focus:ring-3 focus:ring-[#0071E3]/20 focus:outline-hidden"
            />
          </div>

          {/* Region Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  activeRegion === region
                    ? 'bg-[#1D1D1F] text-white'
                    : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E5E5EA] hover:text-[#1D1D1F]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => {
            const primaryDoc = country.documents[0];
            return (
              <div
                key={country.code}
                className="group flex flex-col justify-between rounded-2xl border border-[#D2D2D7]/80 bg-[#F5F5F7]/40 p-5 transition-all hover:border-[#D2D2D7] hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[26px] leading-none">{country.flag}</span>
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#1D1D1F]">
                          {country.name}
                        </h3>
                        <p className="text-[12px] text-[#8E8E93]">{country.region}</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-[#D2D2D7] bg-white px-2 py-0.5 text-[11px] font-mono text-[#6E6E73]">
                      {primaryDoc.widthMm} × {primaryDoc.heightMm} mm
                    </span>
                  </div>

                  {/* Documents List */}
                  <div className="mt-4 space-y-2 border-t border-[#E5E5EA] pt-3 text-[12px]">
                    <div className="flex justify-between text-[#6E6E73]">
                      <span>Documentos disponibles:</span>
                      <span className="font-medium text-[#1D1D1F]">
                        {country.documents.map((d) => d.name.split(' ')[0]).join(', ')}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#6E6E73]">
                      <span>Fondo:</span>
                      <span className="truncate pl-2 font-medium text-[#1D1D1F]" title={primaryDoc.backgroundColor}>
                        {primaryDoc.backgroundColor}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#6E6E73]">
                      <span>Resolución 300 DPI:</span>
                      <span className="font-mono text-[#1D1D1F]">
                        {primaryDoc.widthPx} × {primaryDoc.heightPx} px
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCountryForMaker(country);
                      const el = document.getElementById('creador');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0071E3] py-2 text-[13px] font-medium text-white shadow-2xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
                  >
                    <span>Crear foto para {country.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    href={`/foto-pasaporte/${toCountrySlug(country)}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#D2D2D7] bg-white py-1.5 text-[12px] font-medium text-[#6E6E73] transition-colors hover:border-[#0071E3] hover:text-[#0071E3]"
                  >
                    <span>foto de pasaporte de {country.name}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCountries.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-[#D2D2D7] p-12 text-center text-[15px] text-[#6E6E73]">
            No se han encontrado países con la búsqueda &quot;{searchQuery}&quot;. Prueba con otro término.
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-[12px] text-[#8E8E93]">
          <Shield className="h-3.5 w-3.5" />
          <span>
            Las especificaciones mostradas corresponden a las directrices públicas de cada país e ICAO 9303.
          </span>
        </div>
      </div>
    </section>
  );
}
