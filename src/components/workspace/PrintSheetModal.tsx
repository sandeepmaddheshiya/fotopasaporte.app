'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Printer, Check, Info } from 'lucide-react';
import { DocumentSpec, PrintSheetOptions } from '@/types';
import { generatePrintSheetCanvas } from '@/lib/photo-processing';
import confetti from 'canvas-confetti';

interface PrintSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  singlePhotoCanvas: HTMLCanvasElement | null;
  spec: DocumentSpec;
}

export function PrintSheetModal({
  isOpen,
  onClose,
  singlePhotoCanvas,
  spec,
}: PrintSheetModalProps) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fullSheetCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [includeCropMarks, setIncludeCropMarks] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Compute photos count
  const isLarge = spec.widthMm >= 50 && spec.heightMm >= 50;
  const photosCount = isLarge ? 4 : 6;

  useEffect(() => {
    if (!isOpen || !singlePhotoCanvas) return;

    const options: PrintSheetOptions = {
      paperSize: '4x6',
      photosCount,
      includeCropMarks,
    };

    const sheetCanvas = generatePrintSheetCanvas(singlePhotoCanvas, spec, options);
    fullSheetCanvasRef.current = sheetCanvas;

    // Draw scaled preview onto modal display canvas
    const previewCanvas = previewCanvasRef.current;
    if (previewCanvas) {
      previewCanvas.width = 600;
      previewCanvas.height = 400;
      const ctx = previewCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(sheetCanvas, 0, 0, 600, 400);
      }
    }
  }, [isOpen, singlePhotoCanvas, spec, includeCropMarks, photosCount]);

  if (!isOpen) return null;

  const handleDownloadSheet = () => {
    if (!fullSheetCanvasRef.current) return;
    setIsDownloading(true);

    fullSheetCanvasRef.current.toBlob(
      (blob) => {
        setIsDownloading(false);
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fotopasaporte_hoja_imprimir_${spec.widthMm}x${spec.heightMm}mm.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {
          // ignore
        }
      },
      'image/jpeg',
      0.95
    );
  };

  const handleDirectPrint = () => {
    if (!fullSheetCanvasRef.current) return;
    const dataUrl = fullSheetCanvasRef.current.toDataURL('image/jpeg', 0.95);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Imprimir Hoja de Fotos - FotoPasaporte</title>
            <style>
              @page { size: 10cm 15cm; margin: 0; }
              body { margin: 0; display: flex; align-items: center; justify-content: center; background: #fff; }
              img { width: 100%; height: 100%; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[680px] rounded-3xl border border-[#D2D2D7] bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
          <div>
            <h3 className="text-[18px] font-semibold text-[#1D1D1F]">
              Hoja para imprimir (10 × 15 cm / 4×6&quot;)
            </h3>
            <p className="text-[13px] text-[#6E6E73]">
              Plantilla con {photosCount} fotos de {spec.widthMm} × {spec.heightMm} mm a 300 DPI lista para imprimir
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
            aria-label="Cerrar ventana"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Canvas Sheet Preview */}
        <div className="my-5 flex flex-col items-center justify-center rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-4">
          <div className="overflow-hidden rounded-lg border border-[#D2D2D7] bg-white shadow-md">
            <canvas
              ref={previewCanvasRef}
              className="max-h-[280px] w-auto max-w-full"
            />
          </div>
          <p className="mt-2 text-[11px] text-[#8E8E93]">
            Escala normalizada para papel estándar 10 × 15 cm (4×6 pulgadas)
          </p>
        </div>

        {/* Options */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E5E5EA] bg-[#F5F5F7] p-3 text-[13px]">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={includeCropMarks}
              onChange={(e) => setIncludeCropMarks(e.target.checked)}
              className="h-4 w-4 rounded border-[#D2D2D7] text-[#0071E3] focus:ring-[#0071E3]"
            />
            <span className="font-medium text-[#1D1D1F]">Incluir guías de corte en las esquinas</span>
          </label>

          <span className="text-[12px] text-[#6E6E73]">
            {photosCount} fotografías incluidas
          </span>
        </div>

        {/* Print instructions notice */}
        <div className="mb-6 flex items-start gap-2 rounded-xl bg-[#0071E3]/5 p-3 text-[12px] text-[#0071E3]">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            <strong>Consejo para imprimir:</strong> En la configuración de tu impresora o quiosco de fotos, selecciona <em>&quot;Escala 100%&quot;</em> o <em>&quot;Tamaño real&quot;</em> (no selecciones &quot;Ajustar a página&quot;) para conservar las medidas milimétricas exactas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-full border border-[#D2D2D7] px-5 py-2.5 text-[14px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#F5F5F7]"
          >
            Volver al editor
          </button>

          <button
            onClick={handleDirectPrint}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-5 py-2.5 text-[14px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#F5F5F7]"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleDownloadSheet}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 py-2.5 text-[14px] font-medium text-white shadow-xs transition-colors hover:bg-[#0077ED] disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isDownloading ? 'Generando...' : 'Descargar hoja (JPG)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
