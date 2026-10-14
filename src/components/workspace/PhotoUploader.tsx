'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle, Sparkles, Lock } from 'lucide-react';

interface PhotoUploaderProps {
  onImageSelected: (dataUrl: string) => void;
}

export function PhotoUploader({ onImageSelected }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Este formato de archivo no es compatible. Por favor sube una imagen JPG, PNG o WEBP.');
      return;
    }

    // Validate size (max 20MB)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('La foto supera el límite de 20 MB. Por favor elige una imagen más ligera.');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      setIsLoading(false);
      const result = e.target?.result;
      if (typeof result === 'string') {
        onImageSelected(result);
      } else {
        setErrorMessage('No se ha podido cargar la foto. Inténtalo de nuevo.');
      }
    };

    reader.onerror = () => {
      setIsLoading(false);
      setErrorMessage('Se ha producido un error al leer la imagen.');
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const loadSample = (samplePath: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setIsLoading(false);
      onImageSelected(samplePath);
    };
    img.onerror = () => {
      setIsLoading(false);
      setErrorMessage('No se ha podido cargar la foto de muestra.');
    };
    img.src = samplePath;
  };

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? 'border-[#0071E3] bg-[#0071E3]/5 scale-[1.01]'
            : 'border-[#D2D2D7] bg-[#F5F5F7]/60 hover:border-[#8E8E93] hover:bg-[#F5F5F7]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[#0071E3] mb-4">
          <UploadCloud className="h-7 w-7" />
        </div>

        <p className="text-[17px] font-semibold text-[#1D1D1F]">
          Arrastra tu foto aquí
        </p>
        <p className="mt-1 text-[14px] text-[#6E6E73]">
          o selecciónala desde tu dispositivo
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-5 rounded-full bg-[#0071E3] px-6 py-2.5 text-[14px] font-medium text-white shadow-xs transition-colors hover:bg-[#0077ED]"
        >
          {isLoading ? 'Cargando foto...' : 'Elegir foto'}
        </button>

        <p className="mt-3 text-[12px] text-[#8E8E93]">
          Formatos compatibles: JPG, PNG, WEBP (hasta 20 MB)
        </p>
      </div>

      {/* Error State */}
      {errorMessage && (
        <div className="flex items-center gap-2.5 rounded-xl border border-[#FF3B30]/30 bg-[#FF3B30]/10 p-3 text-[13px] text-[#FF3B30]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Sample Photo Instant Tester */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-[#E5E5EA] bg-white p-3.5 sm:flex-row">
        <div className="flex items-center gap-2 text-[13px] text-[#6E6E73]">
          <Sparkles className="h-4 w-4 text-[#0071E3]" />
          <span>¿No tienes una foto a mano? Prueba el editor al instante:</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => loadSample('/images/sample-portrait.jpg')}
            className="rounded-lg border border-[#D2D2D7] bg-[#F5F5F7] px-3 py-1 text-[12px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#E5E5EA]"
          >
            Muestra 1 (Retrato A)
          </button>
          <button
            type="button"
            onClick={() => loadSample('/images/sample-portrait-male.jpg')}
            className="rounded-lg border border-[#D2D2D7] bg-[#F5F5F7] px-3 py-1 text-[12px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#E5E5EA]"
          >
            Muestra 2 (Retrato B)
          </button>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="flex items-start gap-2 pt-1 text-[12px] text-[#6E6E73]">
        <Lock className="h-3.5 w-3.5 shrink-0 text-[#34C759] mt-0.5" />
        <p>
          Tu foto se utiliza para preparar el documento que necesitas. El procesamiento se ejecuta en tu propio navegador y ningún archivo se transfiere ni almacena en servidores externos.
        </p>
      </div>
    </div>
  );
}
