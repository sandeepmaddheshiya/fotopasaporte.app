'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { CountryInfo } from '@/types';
import { COUNTRIES_DATA, POPULAR_COUNTRIES } from '@/data/countries';

interface CountrySelectorProps {
  selectedCountry: CountryInfo;
  onSelectCountry: (country: CountryInfo) => void;
}

export function CountrySelector({ selectedCountry, onSelectCountry }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredCountries = COUNTRIES_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="mb-2 block text-[13px] font-medium text-[#1D1D1F]">
        ¿Para qué país necesitas la foto?
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-[#D2D2D7] bg-white px-4 py-3 text-left shadow-2xs transition-all hover:border-[#8E8E93] focus:border-[#0071E3] focus:ring-3 focus:ring-[#0071E3]/20 focus:outline-hidden"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-[22px] leading-none">{selectedCountry.flag}</span>
          <div>
            <span className="text-[15px] font-medium text-[#1D1D1F]">{selectedCountry.name}</span>
            <span className="ml-2 text-[12px] text-[#6E6E73]">({selectedCountry.code})</span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#8E8E93] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full z-40 mt-1.5 w-full overflow-hidden rounded-2xl border border-[#D2D2D7] bg-white shadow-xl backdrop-blur-xl">
          {/* Search Box */}
          <div className="border-b border-[#E5E5EA] p-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8E8E93]" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Busca un país (ej. España, Estados Unidos...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-[#F5F5F7] py-2 pr-3 pl-9 text-[14px] text-[#1D1D1F] placeholder-[#8E8E93] focus:bg-white focus:ring-2 focus:ring-[#0071E3] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="max-h-[280px] overflow-y-auto p-1.5">
            {!searchQuery && (
              <>
                <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-[#8E8E93] uppercase">
                  Países populares
                </div>
                {POPULAR_COUNTRIES.map((country) => (
                  <button
                    key={`popular-${country.code}`}
                    type="button"
                    onClick={() => {
                      onSelectCountry(country);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
                      selectedCountry.code === country.code
                        ? 'bg-[#0071E3]/10 font-medium text-[#0071E3]'
                        : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[18px]">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                    {selectedCountry.code === country.code && <Check className="h-4 w-4 text-[#0071E3]" />}
                  </button>
                ))}

                <div className="my-1.5 border-t border-[#E5E5EA]" />
                <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-[#8E8E93] uppercase">
                  Todos los países
                </div>
              </>
            )}

            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-[13px] text-[#6E6E73]">
                No se encontraron países que coincidan con la búsqueda.
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onSelectCountry(country);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
                    selectedCountry.code === country.code
                      ? 'bg-[#0071E3]/10 font-medium text-[#0071E3]'
                      : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[18px]">{country.flag}</span>
                    <span>{country.name}</span>
                    <span className="text-[11px] text-[#8E8E93]">({country.region})</span>
                  </div>
                  {selectedCountry.code === country.code && <Check className="h-4 w-4 text-[#0071E3]" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
