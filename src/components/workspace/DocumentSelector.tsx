'use client';

import React from 'react';
import { CountryInfo, DocumentSpec, DocumentType } from '@/types';
import { BookOpen, Stamp, CreditCard, Info } from 'lucide-react';

interface DocumentSelectorProps {
  country: CountryInfo;
  selectedDocSpec: DocumentSpec;
  onSelectDocSpec: (spec: DocumentSpec) => void;
}

export function DocumentSelector({
  country,
  selectedDocSpec,
  onSelectDocSpec,
}: DocumentSelectorProps) {
  // Available doc types for this country
  const docTypes = country.documents;

  const getIcon = (type: DocumentType) => {
    switch (type) {
      case 'passport':
        return <BookOpen className="h-4 w-4" />;
      case 'visa':
        return <Stamp className="h-4 w-4" />;
      case 'id_card':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Document Type Pills */}
      <div>
        <label className="mb-2 block text-[13px] font-medium text-[#1D1D1F]">
          Tipo de documento
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {docTypes.map((doc) => {
            const isSelected = selectedDocSpec.id === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => onSelectDocSpec(doc)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3] shadow-xs'
                    : 'border-[#D2D2D7] bg-white text-[#1D1D1F] hover:border-[#8E8E93] hover:bg-[#F5F5F7]'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? 'bg-[#0071E3] text-white' : 'bg-[#F5F5F7] text-[#6E6E73]'
                  }`}
                >
                  {getIcon(doc.documentType)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold">{doc.name}</p>
                  <p className="text-[11px] text-[#6E6E73]">
                    {doc.widthMm} × {doc.heightMm} mm
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Specification Preview Card */}
      <div className="rounded-2xl border border-[#D2D2D7]/80 bg-[#F5F5F7] p-3.5 sm:p-4 text-[13px] text-[#1D1D1F]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5EA] pb-2.5">
          <div className="flex items-center gap-1.5 font-medium text-[#1D1D1F]">
            <Info className="h-4 w-4 text-[#0071E3] shrink-0" />
            <span>Requisitos oficiales detectados</span>
          </div>
          <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#6E6E73] shadow-2xs truncate max-w-full">
            {country.name} · {selectedDocSpec.name}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 sm:grid-cols-4">
          <div>
            <span className="block text-[11px] text-[#6E6E73]">Dimensiones</span>
            <span className="font-semibold text-[#1D1D1F]">
              {selectedDocSpec.widthMm} × {selectedDocSpec.heightMm} mm
            </span>
          </div>

          <div>
            <span className="block text-[11px] text-[#6E6E73]">Resolución mín.</span>
            <span className="font-semibold text-[#1D1D1F]">
              {selectedDocSpec.widthPx} × {selectedDocSpec.heightPx} px
            </span>
          </div>

          <div>
            <span className="block text-[11px] text-[#6E6E73]">Fondo requerido</span>
            <span className="truncate font-semibold text-[#1D1D1F]" title={selectedDocSpec.backgroundColor}>
              {selectedDocSpec.backgroundColor}
            </span>
          </div>

          <div>
            <span className="block text-[11px] text-[#6E6E73]">Rostro en imagen</span>
            <span className="font-semibold text-[#1D1D1F]">
              {Math.round(selectedDocSpec.faceHeightMinRatio * 100)}% - {Math.round(selectedDocSpec.faceHeightMaxRatio * 100)}%
            </span>
          </div>
        </div>

        {/* Additional rule pills from countries.json */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-[#E5E5EA] pt-2 text-[11px]">
          <span className="rounded-md bg-white px-2 py-0.5 text-[#6E6E73]">
            Gafas: <strong className="text-[#1D1D1F]">{selectedDocSpec.glassesAllowed ? 'Permitidas' : 'No permitidas'}</strong>
          </span>
          {selectedDocSpec.fileSizeKbMax && (
            <span className="rounded-md bg-white px-2 py-0.5 text-[#6E6E73]">
              Peso máx: <strong className="text-[#1D1D1F]">{selectedDocSpec.fileSizeKbMax} KB</strong>
            </span>
          )}
          {selectedDocSpec.printFinish && (
            <span className="rounded-md bg-white px-2 py-0.5 text-[#6E6E73]">
              Acabado: <strong className="text-[#1D1D1F]">{selectedDocSpec.printFinish === 'matte_or_glossy' ? 'Mate o brillo' : selectedDocSpec.printFinish}</strong>
            </span>
          )}
        </div>

        {selectedDocSpec.notes && (
          <p className="mt-2 text-[12px] text-[#6E6E73]">
            {selectedDocSpec.notes}
          </p>
        )}
      </div>
    </div>
  );
}
