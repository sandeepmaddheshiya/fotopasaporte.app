'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Contrast,
  Eye,
  EyeOff,
  Download,
  Printer,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  FileCheck,
  Sparkles,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  X,
  Undo2,
} from 'lucide-react';
import { CountryInfo, DocumentSpec, EditorSettings } from '@/types';
import {
  renderToCanvas,
  drawBiometricGuides,
  exportPhotoBlob,
} from '@/lib/photo-processing';
import { PrintSheetModal } from './PrintSheetModal';
import { BiometricValidationModal } from './BiometricValidationModal';
import {
  analyzePhotoWithAI,
  analyzeAndFixWithAI,
  AIAnalysisResult,
  translateChange,
} from '@/lib/ai-backend';
import confetti from 'canvas-confetti';

interface PhotoEditorProps {
  imageSrc: string;
  spec: DocumentSpec;
  country?: CountryInfo;
  onResetImage: () => void;
}

export function PhotoEditor({
  imageSrc,
  spec,
  country,
  onResetImage,
}: PhotoEditorProps) {
  // Canvas refs
  const interactiveCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenRenderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgElementRef = useRef<HTMLImageElement | null>(null);

  // Active image source (supports switching to AI-corrected preview)
  const [activeImageSrc, setActiveImageSrc] = useState<string>(imageSrc);
  const [appliedAiChanges, setAppliedAiChanges] = useState<string[] | null>(null);

  // AI Validator & Auto-Fix state
  const [isAiValidating, setIsAiValidating] = useState(false);
  const [isAiFixing, setIsAiFixing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Reset when source prop changes
  useEffect(() => {
    setActiveImageSrc(imageSrc);
    setAppliedAiChanges(null);
    setAiAnalysisResult(null);
  }, [imageSrc]);

  // Editor Settings state
  const [settings, setSettings] = useState<EditorSettings>({
    zoom: 1.0,
    rotation: 0,
    panX: 0,
    panY: 0,
    brightness: 0,
    contrast: 0,
    backgroundColor: 'original',
    showBiometricGuides: true,
    outputFormat: 'image/jpeg',
    quality: 0.92,
  });

  // Target size limit option (e.g. for US Visa 240 KB limit or official rules)
  const [useTargetLimit, setUseTargetLimit] = useState<boolean>(
    Boolean(spec.fileSizeKbMax && spec.fileSizeKbMax <= 500)
  );
  const [targetKb, setTargetKb] = useState<number>(spec.fileSizeKbMax || 240);

  useEffect(() => {
    if (spec.fileSizeKbMax) {
      setTargetKb(spec.fileSizeKbMax);
      if (spec.fileSizeKbMax <= 500) {
        setUseTargetLimit(true);
      }
    }
  }, [spec]);

  // Interactive Pan dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Processing & Export states
  const [isExporting, setIsExporting] = useState(false);
  const [estimatedSizeKb, setEstimatedSizeKb] = useState<number>(0);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Main rendering function
  const renderAll = useCallback(() => {
    if (!imgElementRef.current || !interactiveCanvasRef.current) return;

    // Create or reuse hidden full-resolution canvas
    if (!hiddenRenderCanvasRef.current) {
      hiddenRenderCanvasRef.current = document.createElement('canvas');
    }
    const renderCanvas = hiddenRenderCanvasRef.current;

    // 1. Render photograph at full 300 DPI resolution
    renderToCanvas(imgElementRef.current, spec, settings, renderCanvas);

    // 2. Render onto the visible interactive canvas
    const displayCanvas = interactiveCanvasRef.current;
    const ctx = displayCanvas.getContext('2d');
    if (!ctx) return;

    // Maintain aspect ratio for viewport
    const containerWidth = displayCanvas.clientWidth || 380;
    const displayHeight = Math.round(containerWidth / spec.aspectRatio);

    displayCanvas.width = containerWidth;
    displayCanvas.height = displayHeight;

    ctx.clearRect(0, 0, containerWidth, displayHeight);
    ctx.drawImage(renderCanvas, 0, 0, containerWidth, displayHeight);

    // 3. Draw biometric guides if enabled
    if (settings.showBiometricGuides) {
      drawBiometricGuides(ctx, containerWidth, displayHeight, spec);
    }

    // 4. Update estimated file size asynchronously (debounced)
    if (renderCanvas.width > 0 && renderCanvas.height > 0) {
      renderCanvas.toBlob(
        (blob) => {
          if (blob) {
            setEstimatedSizeKb(Math.round(blob.size / 1024));
          }
        },
        settings.outputFormat,
        settings.quality
      );
    }
  }, [spec, settings]);

  // Load active image into element ref and re-render
  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgElementRef.current = img;
      setImageLoaded(true);
      renderAll();
    };
    img.src = activeImageSrc;
  }, [activeImageSrc, renderAll]);

  // Re-render whenever settings, spec, or image changes
  useEffect(() => {
    if (imageLoaded) {
      renderAll();
    }
  }, [imageLoaded, renderAll]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      if (imageLoaded) {
        renderAll();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageLoaded, renderAll]);

  // ---------------------------------------------------------------------------
  // AI Backend Handlers
  // ---------------------------------------------------------------------------

  // 1. Run AI Biometric Validator (/api/v1/analyze)
  const handleRunAiValidator = async () => {
    if (aiAnalysisResult && !isAiFixing) {
      setIsValidationModalOpen(true);
      return;
    }

    setIsAiValidating(true);
    setAiNotice(null);
    try {
      const countryCode = country?.code || 'ES';
      const result = await analyzePhotoWithAI(activeImageSrc, countryCode);
      setAiAnalysisResult(result);
      setIsValidationModalOpen(true);
    } catch (err: unknown) {
      console.warn('AI Validator fallback:', err);
      setAiNotice(
        err instanceof Error
          ? err.message
          : 'No se pudo conectar con el motor de validación IA. Puedes continuar usando los controles locales.'
      );
    } finally {
      setIsAiValidating(false);
    }
  };

  // 2. Run AI Auto-Fix & Create (/api/v1/analyze-and-fix)
  const handleRunAiFix = async () => {
    setIsAiFixing(true);
    setAiNotice(null);
    try {
      const countryCode = country?.code || 'ES';
      const result = await analyzeAndFixWithAI(activeImageSrc, countryCode);

      if (result.corrected_image_base64) {
        const newSrc = `data:image/jpeg;base64,${result.corrected_image_base64}`;
        setActiveImageSrc(newSrc);
        setAppliedAiChanges(result.changes_applied || ['Ajuste biométrico completado']);
        setAiAnalysisResult({
          overall_status: result.overall_status,
          issues: result.issues || [],
          passed_checks: result.passed_checks || [],
          summary: result.summary || {
            total_issues: result.issues?.length || 0,
            critical_issues: 0,
            warnings: 0,
            passed_checks: result.passed_checks?.length || 0,
          },
          country: result.country,
        });

        // Reset pan & rotation since AI already centered the face
        setSettings((prev) => ({
          ...prev,
          panX: 0,
          panY: 0,
          rotation: 0,
          zoom: 1.0,
        }));

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } else {
        setAiNotice('El motor de IA no detectó un rostro claro para auto-ajustar.');
      }
    } catch (err: unknown) {
      console.warn('AI Fix fallback:', err);
      setAiNotice(
        err instanceof Error
          ? err.message
          : 'No se pudo aplicar el auto-ajuste con IA. Utiliza los controles manuales del editor.'
      );
    } finally {
      setIsAiFixing(false);
    }
  };

  // 3. Revert AI changes back to original photo
  const handleRevertToOriginal = () => {
    setActiveImageSrc(imageSrc);
    setAppliedAiChanges(null);
    setAiAnalysisResult(null);
    handleResetAdjustments();
  };

  // ---------------------------------------------------------------------------
  // Canvas Pan Interaction Handlers
  // ---------------------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStart.x) * 0.8;
    const deltaY = (e.clientY - dragStart.y) * 0.8;

    setSettings((prev) => ({
      ...prev,
      panX: prev.panX + deltaX,
      panY: prev.panY + deltaY,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = (e.touches[0].clientX - dragStart.x) * 0.8;
    const deltaY = (e.touches[0].clientY - dragStart.y) * 0.8;

    setSettings((prev) => ({
      ...prev,
      panX: prev.panX + deltaX,
      panY: prev.panY + deltaY,
    }));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.05 : -0.05;
    setSettings((prev) => ({
      ...prev,
      zoom: Math.min(2.5, Math.max(0.8, Number((prev.zoom + zoomFactor).toFixed(2)))),
    }));
  };

  const handleResetAdjustments = () => {
    setSettings({
      zoom: 1.0,
      rotation: 0,
      panX: 0,
      panY: 0,
      brightness: 0,
      contrast: 0,
      backgroundColor: 'original',
      showBiometricGuides: true,
      outputFormat: 'image/jpeg',
      quality: 0.92,
    });
  };

  // ---------------------------------------------------------------------------
  // Export & Download
  // ---------------------------------------------------------------------------
  const handleDownload = async () => {
    if (!hiddenRenderCanvasRef.current) return;
    setIsExporting(true);

    try {
      const renderCanvas = hiddenRenderCanvasRef.current;
      const targetMaxKb = useTargetLimit ? targetKb : undefined;

      const exportRes = await exportPhotoBlob(
        renderCanvas,
        settings.outputFormat,
        settings.quality,
        targetMaxKb
      );

      if (exportRes?.blob) {
        const url = URL.createObjectURL(exportRes.blob);
        const link = document.createElement('a');
        const ext = settings.outputFormat === 'image/png' ? 'png' : 'jpg';
        const docSlug = spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        link.download = `foto-${docSlug}-${spec.widthMm}x${spec.heightMm}mm.${ext}`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error al generar la foto para descargar.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Document badge, AI buttons & Replace Photo */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E5EA] pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onResetImage}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D2D2D7] px-3.5 py-1.5 text-[13px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#F5F5F7]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Cambiar foto</span>
          </button>
          <span className="text-[13px] text-[#6E6E73]">
            {country ? `${country.flag} ${country.name} · ` : ''}
            Medidas: <strong>{spec.widthMm} × {spec.heightMm} mm</strong> ({spec.widthPx} × {spec.heightPx} px a 300 DPI)
          </span>
        </div>

        {/* AI Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* AI Biometric Validator Button */}
          <button
            type="button"
            onClick={handleRunAiValidator}
            disabled={isAiValidating}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0071E3]/30 bg-[#0071E3]/5 px-3.5 py-1.5 text-[13px] font-medium text-[#0071E3] hover:bg-[#0071E3]/10 transition-colors disabled:opacity-50"
          >
            {isAiValidating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Validando...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Validar con IA</span>
              </>
            )}
          </button>

          {/* AI Auto-Fix Button */}
          <button
            type="button"
            onClick={handleRunAiFix}
            disabled={isAiFixing}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0071E3] px-3.5 py-1.5 text-[13px] font-medium text-white shadow-2xs hover:bg-[#0077ED] transition-colors disabled:opacity-50"
          >
            {isAiFixing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Ajustando con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Auto-ajustar con IA</span>
              </>
            )}
          </button>

          {/* Reset manual controls */}
          <button
            type="button"
            onClick={handleResetAdjustments}
            className="inline-flex items-center gap-1 rounded-full p-2 text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
            title="Restablecer controles manuales a los valores iniciales"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* AI Success Banner (when AI changes were applied) */}
      {appliedAiChanges && appliedAiChanges.length > 0 && (
        <div className="rounded-2xl border border-[#34C759]/30 bg-[#34C759]/5 p-3.5 text-[13px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1D1D1F]">
                Foto optimizada automáticamente con IA para {country?.name || 'trámites oficiales'}
              </span>
              <p className="text-[12px] text-[#6E6E73] mt-0.5">
                {appliedAiChanges.map(translateChange).join(' · ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {aiAnalysisResult && (
              <button
                type="button"
                onClick={() => setIsValidationModalOpen(true)}
                className="text-[12px] font-medium text-[#0071E3] hover:underline"
              >
                Ver informe
              </button>
            )}
            <button
              type="button"
              onClick={handleRevertToOriginal}
              className="inline-flex items-center gap-1 text-[12px] text-[#8E8E93] hover:text-[#1D1D1F] transition-colors"
            >
              <Undo2 className="h-3 w-3" />
              <span>Volver a original</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Warning / Notice Banner */}
      {aiNotice && (
        <div className="rounded-2xl border border-[#FF9500]/30 bg-[#FF9500]/5 p-3 text-[12px] text-[#424245] flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#FF9500] shrink-0" />
            <span>{aiNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setAiNotice(null)}
            className="text-[#8E8E93] hover:text-[#1D1D1F]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Workspace: Left Canvas + Right Controls */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left: Canvas Area */}
        <div className="flex flex-col items-center lg:col-span-6">
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-3 shadow-inner">
            {/* Aspect ratio canvas container */}
            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-xs">
              <canvas
                ref={interactiveCanvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                className="w-full cursor-grab active:cursor-grabbing touch-none select-none"
                style={{ maxHeight: '480px', objectFit: 'contain' }}
              />

              {/* Drag instruction overlay badge */}
              <div className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-md">
                Arrastra para encuadrar · Rueda para zoom
              </div>

              {/* Format tag */}
              <div className="pointer-events-none absolute top-2 right-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#1D1D1F] shadow-2xs backdrop-blur-md">
                {spec.name}
              </div>
            </div>

            {/* Quick Canvas Helpers */}
            <div className="mt-3 flex items-center justify-between px-1 text-[12px] text-[#6E6E73]">
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    showBiometricGuides: !prev.showBiometricGuides,
                  }))
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium transition-colors ${
                  settings.showBiometricGuides
                    ? 'bg-[#0071E3]/10 text-[#0071E3]'
                    : 'bg-[#E5E5EA] text-[#6E6E73]'
                }`}
              >
                {settings.showBiometricGuides ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Guías biométricas activas</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>Mostrar guías biométricas</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-[#8E8E93]">
                {Math.round(settings.zoom * 100)}% zoom · {settings.rotation}°
              </span>
            </div>
          </div>
        </div>

        {/* Right: Fine-Tuning Controls */}
        <div className="space-y-5 lg:col-span-6">
          {/* Zoom Control */}
          <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
            <div className="flex items-center justify-between text-[13px] font-medium text-[#1D1D1F]">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="h-4 w-4 text-[#0071E3]" />
                Ampliación (Zoom)
              </span>
              <span className="text-[#6E6E73] font-mono">{Math.round(settings.zoom * 100)}%</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    zoom: Math.max(0.8, Number((prev.zoom - 0.05).toFixed(2))),
                  }))
                }
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D2D2D7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.02"
                value={settings.zoom}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, zoom: parseFloat(e.target.value) }))
                }
                className="w-full"
              />
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    zoom: Math.min(2.5, Number((prev.zoom + 0.05).toFixed(2))),
                  }))
                }
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D2D2D7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Head Tilt / Rotation */}
          <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
            <div className="flex items-center justify-between text-[13px] font-medium text-[#1D1D1F]">
              <span className="flex items-center gap-1.5">
                <RotateCw className="h-4 w-4 text-[#0071E3]" />
                Nivelar inclinación (Giro)
              </span>
              <span className="text-[#6E6E73] font-mono">{settings.rotation}°</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                min="-15"
                max="15"
                step="0.5"
                value={settings.rotation}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, rotation: parseFloat(e.target.value) }))
                }
                className="w-full"
              />
              {settings.rotation !== 0 && (
                <button
                  type="button"
                  onClick={() => setSettings((prev) => ({ ...prev, rotation: 0 }))}
                  className="rounded-md border border-[#D2D2D7] px-2 py-0.5 text-[11px] text-[#6E6E73] hover:bg-[#F5F5F7]"
                >
                  0°
                </button>
              )}
            </div>
          </div>

          {/* Lighting Controls: Brightness & Contrast */}
          <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
            <div className="mb-3 text-[13px] font-medium text-[#1D1D1F]">
              Iluminación y tono
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[12px] text-[#6E6E73]">
                  <span className="flex items-center gap-1">
                    <Sun className="h-3.5 w-3.5" /> Brillo
                  </span>
                  <span>{settings.brightness > 0 ? `+${settings.brightness}` : settings.brightness}</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="1"
                  value={settings.brightness}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, brightness: parseInt(e.target.value) }))
                  }
                  className="mt-1.5 w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-[12px] text-[#6E6E73]">
                  <span className="flex items-center gap-1">
                    <Contrast className="h-3.5 w-3.5" /> Contraste
                  </span>
                  <span>{settings.contrast > 0 ? `+${settings.contrast}` : settings.contrast}</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="1"
                  value={settings.contrast}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, contrast: parseInt(e.target.value) }))
                  }
                  className="mt-1.5 w-full"
                />
              </div>
            </div>
          </div>

          {/* Background tone preset */}
          <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
            <div className="mb-2.5 flex items-center justify-between text-[13px] font-medium text-[#1D1D1F]">
              <span>Tono de fondo</span>
              <span className="text-[11px] text-[#6E6E73]">Requerido: {spec.backgroundColor}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'original', name: 'Original', color: '#F5F5F7' },
                { id: 'white', name: 'Blanco', color: '#FFFFFF' },
                { id: 'lightgray', name: 'Gris claro', color: '#E5E5EA' },
                { id: 'cream', name: 'Crema', color: '#F5F5EC' },
              ].map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      backgroundColor: bg.id as any,
                    }))
                  }
                  className={`flex flex-col items-center rounded-lg border p-2 text-center transition-all ${
                    settings.backgroundColor === bg.id
                      ? 'border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3] font-medium shadow-2xs'
                      : 'border-[#D2D2D7] hover:bg-[#F5F5F7] text-[#6E6E73]'
                  }`}
                >
                  <span
                    className="mb-1 h-4 w-4 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: bg.color }}
                  />
                  <span className="text-[11px]">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Output Format & File Size limits */}
          <div className="rounded-xl border border-[#E5E5EA] bg-white p-4 text-[13px]">
            <div className="mb-2 font-medium text-[#1D1D1F]">Formato y tamaño de archivo</div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  checked={settings.outputFormat === 'image/jpeg'}
                  onChange={() => setSettings((prev) => ({ ...prev, outputFormat: 'image/jpeg' }))}
                  className="text-[#0071E3] focus:ring-[#0071E3]"
                />
                <span className="text-[#1D1D1F]">JPEG (Recomendado)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  checked={settings.outputFormat === 'image/png'}
                  onChange={() => setSettings((prev) => ({ ...prev, outputFormat: 'image/png' }))}
                  className="text-[#0071E3] focus:ring-[#0071E3]"
                />
                <span className="text-[#1D1D1F]">PNG</span>
              </label>
            </div>

            {/* Target size switch (e.g. for visa requirements) */}
            <div className="mt-3 border-t border-[#E5E5EA] pt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useTargetLimit}
                  onChange={(e) => setUseTargetLimit(e.target.checked)}
                  className="rounded text-[#0071E3] focus:ring-[#0071E3]"
                />
                <span className="text-[#6E6E73] text-[12px]">
                  Limitar peso del archivo a máx. {targetKb} KB {spec.fileSizeKbMax ? `(Requisito oficial: máx. ${spec.fileSizeKbMax} KB)` : ''}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary & Actions Bar */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#34C759] shadow-xs">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#1D1D1F]">
              Tu foto está lista para descargar
            </p>
            <p className="text-[12px] text-[#6E6E73]">
              {spec.widthMm} × {spec.heightMm} mm · {spec.dpi} DPI · {settings.outputFormat === 'image/jpeg' ? 'JPEG' : 'PNG'} · ~{estimatedSizeKb} KB
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Printable Sheet Button */}
          <button
            type="button"
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-5 py-2.5 text-[14px] font-medium text-[#1D1D1F] transition-all hover:bg-[#E5E5EA] active:scale-[0.98]"
          >
            <Printer className="h-4 w-4 text-[#6E6E73]" />
            <span>Preparar hoja para imprimir</span>
          </button>

          {/* Primary Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-2.5 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] active:scale-[0.98] disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Preparando archivo...' : 'Descargar mi foto'}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Modal */}
      <PrintSheetModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        singlePhotoCanvas={hiddenRenderCanvasRef.current}
        spec={spec}
      />

      {/* Biometric Validation Modal */}
      {country && (
        <BiometricValidationModal
          isOpen={isValidationModalOpen}
          onClose={() => setIsValidationModalOpen(false)}
          analysis={aiAnalysisResult}
          isLoading={isAiValidating}
          onApplyAIFix={handleRunAiFix}
          isFixing={isAiFixing}
          country={country}
          spec={spec}
        />
      )}
    </div>
  );
}
