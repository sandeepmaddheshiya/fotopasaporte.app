'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle, Sparkles, Lock, Loader2 } from 'lucide-react';

interface PhotoUploaderProps {
  onImageSelected: (dataUrl: string) => void;
}

export function PhotoUploader({ onImageSelected }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsDataUrl = async (file: File): Promise<string> => {
    // Strategy 1: Modern FileReader
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
          else reject(new Error('Formato no válido'));
        };
        reader.onerror = () => reject(reader.error || new Error('Error al leer el archivo'));
        reader.readAsDataURL(file);
      });
      if (data) return data;
    } catch (err) {
      console.warn('FileReader failed, attempting ArrayBuffer fallback:', err);
    }

    // Strategy 2: ArrayBuffer -> Base64
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = '';
      const len = bytes.byteLength;
      const chunkSize = 16384;
      for (let i = 0; i < len; i += chunkSize) {
        binary += String.fromCharCode.apply(
          null,
          Array.from(bytes.subarray(i, Math.min(i + chunkSize, len)))
        );
      }
      const mime = file.type || 'image/jpeg';
      return `data:${mime};base64,${btoa(binary)}`;
    } catch (err) {
      console.warn('ArrayBuffer fallback failed, attempting ObjectURL/Canvas fallback:', err);
    }

    // Strategy 3: ObjectURL + HTMLImageElement -> Canvas -> DataURL
    return await new Promise<string>((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Canvas no disponible'));
            return;
          }
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          URL.revokeObjectURL(objectUrl);
          resolve(dataUrl);
        } catch (canvasErr) {
          URL.revokeObjectURL(objectUrl);
          reject(canvasErr);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('No se pudo decodificar la imagen'));
      };
      img.src = objectUrl;
    });
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);

    // Validate type (by MIME type or common image file extensions)
    const fileType = (file.type || '').toLowerCase();
    const fileName = (file.name || '').toLowerCase();
    const isImage =
      fileType.startsWith('image/') ||
      /\.(jpe?g|png|webp|bmp|tiff?|heic|heif)$/i.test(fileName);

    if (!isImage) {
      setErrorMessage('Este formato de archivo no es compatible. Por favor sube una imagen JPG, PNG o WEBP.');
      return;
    }

    // Validate size (max 25MB)
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('La foto supera el límite de 25 MB. Por favor elige una imagen más ligera.');
      return;
    }

    setIsLoading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setIsLoading(false);
      onImageSelected(dataUrl);
    } catch (err: unknown) {
      console.error('Failed to read image file:', err);
      setIsLoading(false);
      setErrorMessage('No se ha podido leer la foto. Prueba con otra imagen o una de las fotos de muestra.');
    }
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
        className={`relative flex min-h-[220px] sm:min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 sm:p-8 text-center transition-all ${
          isDragging
            ? 'border-[#0071E3] bg-[#0071E3]/5 scale-[1.01]'
            : 'border-[#D2D2D7] bg-[#F5F5F7]/60 hover:border-[#8E8E93] hover:bg-[#F5F5F7]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[#0071E3] mb-3 sm:mb-4">
          {isLoading ? (
            <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 animate-spin" />
          ) : (
            <UploadCloud className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </div>

        <p className="text-[16px] sm:text-[17px] font-semibold text-[#1D1D1F]">
          {isLoading ? 'Procesando foto...' : 'Arrastra tu foto aquí'}
        </p>
        <p className="mt-1 text-[13px] sm:text-[14px] text-[#6E6E73]">
          {isLoading ? 'Por favor espera unos instantes' : 'o selecciónala desde tu dispositivo'}
        </p>

        <button
          type="button"
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-4 sm:mt-5 rounded-full bg-[#0071E3] px-6 py-2.5 text-[14px] font-medium text-white shadow-xs transition-colors hover:bg-[#0077ED] disabled:opacity-60"
        >
          {isLoading ? 'Cargando foto...' : 'Elegir foto'}
        </button>

        <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-[12px] text-[#8E8E93]">
          Formatos compatibles: JPG, PNG, WEBP (hasta 25 MB)
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
      <div className="flex flex-col items-start sm:items-center justify-between gap-3 rounded-xl border border-[#E5E5EA] bg-white p-3.5 sm:flex-row">
        <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#6E6E73]">
          <Sparkles className="h-4 w-4 text-[#0071E3] shrink-0" />
          <span>¿No tienes una foto a mano? Prueba el editor al instante:</span>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <button
            type="button"
            onClick={() => loadSample('/images/sample-portrait.jpg')}
            className="flex-1 sm:flex-initial rounded-lg border border-[#D2D2D7] bg-[#F5F5F7] px-3 py-1.5 text-[11px] sm:text-[12px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#E5E5EA] text-center"
          >
            Muestra 1 (Retrato A)
          </button>
          <button
            type="button"
            onClick={() => loadSample('/images/sample-portrait-male.jpg')}
            className="flex-1 sm:flex-initial rounded-lg border border-[#D2D2D7] bg-[#F5F5F7] px-3 py-1.5 text-[11px] sm:text-[12px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#E5E5EA] text-center"
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
