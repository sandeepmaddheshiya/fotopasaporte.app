'use client';

import React, { useState } from 'react';
import { CountryInfo, DocumentSpec } from '@/types';
import { COUNTRIES_DATA } from '@/data/countries';
import { CountrySelector } from './CountrySelector';
import { DocumentSelector } from './DocumentSelector';
import { PhotoUploader } from './PhotoUploader';
import { PhotoEditor } from './PhotoEditor';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface PhotoMakerProps {
  initialCountryCode?: string;
  initialImageSrc?: string | null;
}

export function PhotoMaker({
  initialCountryCode = 'ES',
  initialImageSrc = null,
}: PhotoMakerProps) {
  // Step State (1: Doc & Country, 2: Upload, 3: Editor)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(
    initialImageSrc ? 3 : 1
  );

  // Selected Country & Document Spec
  const defaultCountry =
    COUNTRIES_DATA.find((c) => c.code === initialCountryCode) || COUNTRIES_DATA[0];
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(defaultCountry);
  const [selectedDocSpec, setSelectedDocSpec] = useState<DocumentSpec>(
    defaultCountry.documents[0]
  );

  // Uploaded Image Src
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(initialImageSrc);

  // When country changes, default to its first document
  const handleCountryChange = (country: CountryInfo) => {
    setSelectedCountry(country);
    setSelectedDocSpec(country.documents[0]);
  };

  // When image is selected or sample chosen
  const handleImageSelected = (dataUrl: string) => {
    setUploadedImageSrc(dataUrl);
    setCurrentStep(3);
  };

  const handleResetImage = () => {
    setUploadedImageSrc(null);
    setCurrentStep(2);
  };

  return (
    <section id="creador" className="relative scroll-mt-20 bg-[#F5F5F7] py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[42px]">
            Prepara tu foto
          </h2>
          <p className="mt-3 text-[17px] text-[#6E6E73]">
            Selecciona el documento que necesitas y te guiaremos durante el proceso.
          </p>
        </div>

        {/* Step Navigation Pills */}
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-between rounded-full border border-[#D2D2D7] bg-white p-1.5 shadow-2xs">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-medium transition-all ${
              currentStep === 1
                ? 'bg-[#0071E3] text-white shadow-xs'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                currentStep === 1 ? 'bg-white/20 text-white' : 'bg-[#F5F5F7] text-[#6E6E73]'
              }`}
            >
              {currentStep > 1 ? <Check className="h-3 w-3" /> : '1'}
            </span>
            <span>Documento</span>
          </button>

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-medium transition-all ${
              currentStep === 2
                ? 'bg-[#0071E3] text-white shadow-xs'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                currentStep === 2 ? 'bg-white/20 text-white' : 'bg-[#F5F5F7] text-[#6E6E73]'
              }`}
            >
              {uploadedImageSrc && currentStep === 3 ? <Check className="h-3 w-3" /> : '2'}
            </span>
            <span>Tu foto</span>
          </button>

          {/* Step 3 Pill */}
          <button
            type="button"
            disabled={!uploadedImageSrc}
            onClick={() => uploadedImageSrc && setCurrentStep(3)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-medium transition-all ${
              currentStep === 3
                ? 'bg-[#0071E3] text-white shadow-xs'
                : uploadedImageSrc
                ? 'text-[#6E6E73] hover:text-[#1D1D1F]'
                : 'text-[#8E8E93]/60 cursor-not-allowed'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                currentStep === 3 ? 'bg-white/20 text-white' : 'bg-[#F5F5F7] text-[#6E6E73]'
              }`}
            >
              3
            </span>
            <span>Ajuste y descarga</span>
          </button>
        </div>

        {/* Workspace Card Container */}
        <div className="mx-auto mt-8 max-w-[960px] rounded-3xl border border-[#D2D2D7] bg-white p-6 shadow-xl sm:p-10">
          {/* STEP 1: Document & Country Selection */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-[#E5E5EA] pb-4">
                <h3 className="text-[20px] font-semibold text-[#1D1D1F]">
                  Paso 1: Selecciona tu documento y país
                </h3>
                <p className="mt-1 text-[14px] text-[#6E6E73]">
                  Ajustaremos automáticamente las medidas oficiales, proporciones del rostro y color de fondo.
                </p>
              </div>

              {/* Country Selector */}
              <CountrySelector
                selectedCountry={selectedCountry}
                onSelectCountry={handleCountryChange}
              />

              {/* Document Selector */}
              <DocumentSelector
                country={selectedCountry}
                selectedDocSpec={selectedDocSpec}
                onSelectDocSpec={setSelectedDocSpec}
              />

              {/* Next Step CTA */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-7 py-3 text-[15px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98]"
                >
                  <span>Continuar con mi foto</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Photo Upload */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5EA] pb-4">
                <div>
                  <h3 className="text-[20px] font-semibold text-[#1D1D1F]">
                    Paso 2: Añade tu foto
                  </h3>
                  <p className="mt-1 text-[14px] text-[#6E6E73]">
                    Utiliza una foto reciente, con el rostro visible y una iluminación uniforme.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[13px] text-[#0071E3] hover:underline"
                >
                  Cambiar país ({selectedCountry.name})
                </button>
              </div>

              {/* Photo Uploader */}
              <PhotoUploader onImageSelected={handleImageSelected} />
            </div>
          )}

          {/* STEP 3: Editor & Download */}
          {currentStep === 3 && uploadedImageSrc && (
            <div className="animate-fade-in">
              <PhotoEditor
                imageSrc={uploadedImageSrc}
                spec={selectedDocSpec}
                onResetImage={handleResetImage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
