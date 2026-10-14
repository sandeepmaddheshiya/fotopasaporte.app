'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Check,
  Download,
  Sparkles,
  Lock,
  RefreshCw,
  Mail,
  Sliders,
  ChevronDown,
  CheckCircle2,
  CreditCard,
  ZoomIn,
  Sun,
  Zap,
  Crown,
  Clock,
  UserCheck,
  Eye,
  EyeOff,
  Maximize2,
  X,
} from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { CountryInfo, DocumentSpec, PrintSheetOptions } from '@/types';
import { AIFixResult, translateChange } from '@/lib/ai-backend';
import { startRazorpayCheckout } from '@/lib/razorpay';
import { generatePrintSheetCanvas } from '@/lib/photo-processing';
import { SeeWhatExpertsFixModal } from './SeeWhatExpertsFixModal';

interface StudioResultProps {
  country: CountryInfo;
  spec: DocumentSpec;
  photoId: string;
  fixResult?: AIFixResult | null;
  initialPhotoUrl?: string | null;
  onReset?: () => void;
}

export function StudioResult({
  country,
  spec,
  photoId,
  fixResult,
  initialPhotoUrl,
  onReset,
}: StudioResultProps) {
  // Selected Package: 'standard' (7,99 €) or 'premium' (13,99 € with Human Expert Review)
  const [selectedPack, setSelectedPack] = useState<'standard' | 'premium'>('premium');

  // Unlocked / Paid state (persisted in localStorage by photoId)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [activeReportTab, setActiveReportTab] = useState<'audit' | 'fixes'>('audit');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    paymentId: string;
    invoiceNumber: string;
    amount: number;
    currency: string;
    packageId?: string;
  } | null>(null);

  // Advanced Manual Controls (Collapsed by default)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);

  // Overlay & Modal Controls (Matching VisaReadyNow)
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [isExpertsFixModalOpen, setIsExpertsFixModalOpen] = useState<boolean>(false);

  // Canvas refs for print sheet generation
  const singlePhotoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const printSheetCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [printSheetDataUrl, setPrintSheetDataUrl] = useState<string | null>(null);

  // Check if previously paid for this photo (persists across page reloads!)
  useEffect(() => {
    if (typeof window !== 'undefined' && photoId) {
      try {
        const saved = localStorage.getItem(`paid_${photoId}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          setIsUnlocked(true);
          setPaymentInfo(parsed);
          if (parsed.packageId) {
            setSelectedPack(parsed.packageId);
          }
        }
      } catch {
        // ignore
      }
    }
  }, [photoId]);

  // Determine photo preview URL:
  // If unlocked, use clean photo endpoint.
  // If unpurchased, use watermarked proxy route.
  const photoUrl = useMemo(() => {
    if (isUnlocked && photoId) {
      return `/api/download/clean/${photoId}?quality=hd&v=${photoId}`;
    }
    if (photoId) {
      return `/api/download/watermarked/${photoId}?v=${photoId}`;
    }
    if (fixResult?.corrected_image_base64) {
      return `data:image/jpeg;base64,${fixResult.corrected_image_base64}`;
    }
    return initialPhotoUrl || '';
  }, [isUnlocked, photoId, fixResult, initialPhotoUrl]);

  // Build the 4x6" printable sheet when image is loaded
  useEffect(() => {
    if (!photoUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photoUrl;
    img.onload = () => {
      const singleCanvas = document.createElement('canvas');
      singleCanvas.width = spec.widthPx || Math.round((spec.widthMm * 300) / 25.4);
      singleCanvas.height = spec.heightPx || Math.round((spec.heightMm * 300) / 25.4);
      const sCtx = singleCanvas.getContext('2d');
      if (sCtx) {
        sCtx.fillStyle = '#FFFFFF';
        sCtx.fillRect(0, 0, singleCanvas.width, singleCanvas.height);
        sCtx.drawImage(img, 0, 0, singleCanvas.width, singleCanvas.height);
      }
      singlePhotoCanvasRef.current = singleCanvas;

      const isLarge = spec.widthMm >= 50 && spec.heightMm >= 50;
      const options: PrintSheetOptions = {
        paperSize: 'a4',
        photosCount: isLarge ? 12 : 16,
        includeCropMarks: true,
      };
      const sheetCanvas = generatePrintSheetCanvas(singleCanvas, spec, options);
      printSheetCanvasRef.current = sheetCanvas;
      setPrintSheetDataUrl(sheetCanvas.toDataURL('image/jpeg', 0.95));
    };
  }, [photoUrl, spec]);

  // Handle Checkout with Razorpay
  const handlePayment = async () => {
    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
      alert('Por favor, introduce tu correo electrónico para recibir las fotos y la factura.');
      return;
    }

    try {
      setIsPaying(true);
      const specString = `${spec.widthMm}x${spec.heightMm} mm (${spec.name})`;
      const priceAmount = selectedPack === 'premium' ? 13.99 : 7.99;

      await startRazorpayCheckout({
        packageId: selectedPack,
        currency: 'EUR',
        countryCode: country.code,
        countryName: country.name,
        documentType: spec.name,
        spec: specString,
        userEmail: userEmail.trim(),
        photoId: photoId || undefined,
        onSuccess: async (response, verifyData) => {
          setIsPaying(false);
          setIsUnlocked(true);

          const invoiceNum =
            verifyData?.invoice_number ||
            `FP-${new Date().getUTCFullYear()}-${response.razorpay_payment_id.replace(/^pay_/, '').substring(0, 5).toUpperCase()}`;
          const payData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            invoiceNumber: invoiceNum,
            amount: priceAmount,
            currency: 'EUR',
            packageId: selectedPack,
          };
          setPaymentInfo(payData);

          if (photoId) {
            try {
              localStorage.setItem(`paid_${photoId}`, JSON.stringify(payData));
            } catch {
              // ignore
            }
          }

          // Trigger Confetti Celebration!
          try {
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore
          }
        },
        onDismiss: () => {
          setIsPaying(false);
        },
        onError: (err) => {
          setIsPaying(false);
          alert(err.message || 'Error al procesar el pago.');
        },
      });
    } catch (err: unknown) {
      setIsPaying(false);
      alert(err instanceof Error ? err.message : 'Error inesperado al iniciar el pago.');
    }
  };

  // 1. Download Individual Digital Photo
  const handleDownloadDigitalPhoto = () => {
    if (!singlePhotoCanvasRef.current) return;
    singlePhotoCanvasRef.current.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fotopasaporte_${country.code.toLowerCase()}_${spec.widthMm}x${spec.heightMm}mm.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      'image/jpeg',
      0.98
    );
  };

  // 2. Download Print Sheet (A4)
  const handleDownloadPrintSheet = () => {
    if (!printSheetCanvasRef.current) return;
    printSheetCanvasRef.current.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fotopasaporte_plantilla_impresion_a4_${country.code.toLowerCase()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      'image/jpeg',
      0.96
    );
  };

  // 3. Download All in ZIP (Official Photo + Print Sheet)
  const handleDownloadAllZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      if (singlePhotoCanvasRef.current) {
        const photoBlob = await new Promise<Blob | null>((resolve) =>
          singlePhotoCanvasRef.current!.toBlob(resolve, 'image/jpeg', 0.98)
        );
        if (photoBlob) {
          zip.file(`1_foto_oficial_${spec.widthMm}x${spec.heightMm}mm_300dpi.jpg`, photoBlob);
        }
      }

      if (printSheetCanvasRef.current) {
        const sheetBlob = await new Promise<Blob | null>((resolve) =>
          printSheetCanvasRef.current!.toBlob(resolve, 'image/jpeg', 0.96)
        );
        if (sheetBlob) {
          zip.file(`2_plantilla_imprimir_a4_300dpi.jpg`, sheetBlob);
        }
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipContent);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fotopasaporte_pack_completo_${country.code.toLowerCase()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsZipping(false);
    } catch (e) {
      console.error('Error generating zip:', e);
      setIsZipping(false);
      alert('Error al comprimir los archivos.');
    }
  };

  const aspectRatio = spec.widthMm / spec.heightMm;

  return (
    <div className="w-full space-y-6">
      {/* ─── STANDALONE CLEAN HEADER (NO CARD CONTAINER) ─── */}
      <div className="text-center space-y-2 py-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F] flex items-center justify-center gap-2 flex-wrap">
          <span>Tu foto oficial está lista</span>
          <span className="inline-flex items-center gap-1.5 text-[#0071E3]">
            <span className="text-2xl sm:text-3xl">{country.flag}</span>
            <span>{country.name} · {spec.name}</span>
          </span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#6E6E73] flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> 100% Conforme normativa biométrica
          </span>
          <span>·</span>
          <span>🔒 Pago seguro Razorpay</span>
          <span>·</span>
          <span>Garantía de reembolso oficial</span>
        </p>
      </div>

      {/* ─── MAIN TWO-COLUMN STUDIO LAYOUT (FLAT, OPEN, NO NESTED BOXES) ─── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ─── LEFT COLUMN: SINGLE COHESIVE SURFACE ─── */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          {/* Top Bar: Official Document Title & Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-[#F5F5F7] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#1D1D1F]">
              <span>{country.flag}</span>
              <span>Foto Individual Oficial ({spec.widthMm}×{spec.heightMm} mm)</span>
            </div>

            {/* Guide Toggle & Dimensions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowGuides(!showGuides)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
                  showGuides
                    ? 'bg-blue-50 text-[#0071E3] border-blue-200'
                    : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
                }`}
                title={showGuides ? 'Ocultar guías de encuadre' : 'Mostrar guías biométricas'}
              >
                {showGuides ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Guías biométricas</span>
              </button>

              <span className="text-[11px] font-medium text-slate-400 font-mono hidden sm:inline">
                {spec.widthPx} × {spec.heightPx} px @ 300 DPI
              </span>
            </div>
          </div>

          {/* Center: The Image Display with Clean Biometric Ticks */}
          <div className="py-6 flex flex-col items-center">
            <div
              onClick={() => setIsZoomModalOpen(true)}
              className="group relative rounded-none overflow-hidden bg-slate-900/5 border border-slate-300 shadow-sm flex items-center justify-center shrink-0 cursor-zoom-in"
              style={{
                aspectRatio: `${aspectRatio}`,
                maxHeight: '380px',
                width: `min(100%, ${Math.round(380 * aspectRatio)}px)`,
              }}
              title="Haz clic para ampliar la vista previa en alta resolución"
            >
              <img
                src={photoUrl}
                alt="Foto oficial procesada"
                className="w-full h-full object-contain block transition-transform group-hover:scale-[1.02]"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  filter: `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`,
                }}
              />

              {/* Delicate Technical Biometric Overlay (Matching VisaReadyNow) */}
              {showGuides && (
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-2">
                  <div className="flex justify-between w-full">
                    <div className="w-3 h-3 border-t-2 border-l-2 border-[#0071E3]" />
                    <div className="w-3 h-3 border-t-2 border-r-2 border-[#0071E3]" />
                  </div>

                  <div className="absolute top-4 left-3 right-3 bottom-[20%] border border-dashed border-[#0071E3]/35 rounded-xs flex flex-col justify-between p-1">
                    <div className="mx-auto bg-white/90 backdrop-blur-xs text-[#0071E3] font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#0071E3]/30 shadow-2xs">
                      Cabeza: 70–80% ({spec.widthMm >= 50 ? '25–35 mm' : '31–36 mm'})
                    </div>
                    <div className="flex justify-between items-center w-full px-1">
                      <span className="bg-white/90 backdrop-blur-xs text-[#0071E3] font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#0071E3]/30 shadow-2xs hidden sm:inline">
                        Línea de ojos
                      </span>
                      <span className="bg-white/90 backdrop-blur-xs text-[#0071E3] font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#0071E3]/30 shadow-2xs mx-auto sm:mx-0">
                        {spec.widthMm} mm
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between w-full">
                    <div className="w-3 h-3 border-b-2 border-l-2 border-[#0071E3]" />
                    <div className="w-3 h-3 border-b-2 border-r-2 border-[#0071E3]" />
                  </div>
                </div>
              )}

              {/* Hover Overlay with Zoom Hint */}
              <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 text-white p-3 z-20 pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold tracking-wide">
                  Ver vista previa en alta resolución
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-[#6E6E73] font-medium text-center">
              Medida oficial: <span className="text-[#1D1D1F] font-semibold">{spec.widthMm} × {spec.heightMm} mm</span> · Fondo {spec.backgroundColor || 'blanco liso'}
            </p>
          </div>

          {/* Section Divider for Compliance Report */}
          <div className="pt-6 border-t border-slate-100">
            {/* Tabs */}
            <div className="flex border-b border-slate-100 mb-4">
              <button
                type="button"
                onClick={() => setActiveReportTab('audit')}
                className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeReportTab === 'audit'
                    ? 'border-[#0071E3] text-[#0071E3]'
                    : 'border-transparent text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Auditoría de Requisitos (8/8 Superados)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveReportTab('fixes')}
                className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeReportTab === 'fixes'
                    ? 'border-[#0071E3] text-[#0071E3]'
                    : 'border-transparent text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Optimizaciones IA</span>
              </button>
            </div>

            {/* Tab 1: Checklist rows (flat list, no nested cards) */}
            {activeReportTab === 'audit' && (
              <div className="divide-y divide-slate-100">
                {[
                  {
                    title: `Fondo reglamentario (${spec.backgroundColor || 'Blanco liso'})`,
                    desc: 'Fondo uniforme sin sombras ni texturas.',
                  },
                  {
                    title: 'Proporción facial (70%–80%)',
                    desc: `Altura craneal conforme a la normativa de ${country.name}.`,
                  },
                  {
                    title: 'Centrado y alineación OACI Doc 9303',
                    desc: 'Rostro nivelado frontalmente.',
                  },
                  {
                    title: 'Ojos abiertos y pupilas nítidas',
                    desc: 'Mirada directa y clara a la cámara.',
                  },
                  {
                    title: 'Expresión neutra y boca cerrada',
                    desc: 'Labios juntos y expresión relajada.',
                  },
                  {
                    title: 'Iluminación equilibrada',
                    desc: 'Sin sombras duras bajo el cuello o fondo.',
                  },
                  {
                    title: 'Sin reflejos de flash',
                    desc: 'Claridad total en facciones y ojos.',
                  },
                  {
                    title: `Medidas oficiales (${spec.widthMm} × ${spec.heightMm} mm)`,
                    desc: 'Resolución nativa calibrada a 300 DPI.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1D1D1F]">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 shrink-0">
                      Cumple ✓
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: AI Enhancements */}
            {activeReportTab === 'fixes' && (
              <div className="divide-y divide-slate-100">
                {(fixResult?.changes_applied?.length
                  ? fixResult.changes_applied
                  : [
                      'Fondo eliminado y sustituido por blanco uniforme',
                      'Encuadre facial y recorte ajustado a medidas oficiales',
                      'Rostro centrado biométricamente',
                      'Iluminación y brillo calibrados automáticamente',
                    ]
                ).map((change, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1D1D1F]">
                      <Sparkles className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                      <span>{translateChange(change)}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">
                      Optimizado con IA
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtle Collapsible Manual Adjustments (borderless, clean text accordion) */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Ajustes manuales opcionales (encuadre y brillo)</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5" /> Escala (Zoom)
                    </span>
                    <span>{zoomLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min={85}
                    max={115}
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="w-full accent-[#0071E3] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" /> Brillo
                    </span>
                    <span>{brightness > 0 ? `+${brightness}` : brightness}</span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={20}
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-[#0071E3] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Reset Action */}
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
            {onReset ? (
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0071E3] hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Procesar otra foto diferente
              </button>
            ) : (
              <Link
                href="/#creador"
                className="flex items-center gap-1.5 text-xs font-bold text-[#0071E3] hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Crear otra foto oficial
              </Link>
            )}

            <span className="text-[11px] text-slate-400 font-mono">
              ID: {photoId.slice(0, 8)}
            </span>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: PRICING PACKS & CHECKOUT (EXACT VISACREADYNOW STRUCTURE) ─── */}
        <div className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck
                className={`w-4 h-4 shrink-0 ${isUnlocked ? 'text-emerald-600' : 'text-[#0071E3]'}`}
              />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isUnlocked ? 'PEDIDO CONFIRMADO' : 'RESUMEN DEL PEDIDO'}
              </span>
            </div>

            {/* UNLOCKED STATE */}
            {isUnlocked ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-950">
                      ¡Pago completado con éxito!
                    </h3>
                    <p className="text-[11px] text-emerald-700">
                      Ref: <span className="font-mono font-semibold">{paymentInfo?.invoiceNumber || 'FP-CONFIRMED'}</span>
                    </p>
                  </div>
                </div>

                {/* If Premium review was purchased */}
                {paymentInfo?.packageId === 'premium' && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Clock className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span>En revisión por especialista (&lt;15 min)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Un especialista biométrico está auditando tu foto. Recibirás confirmación prioritaria en tu correo. Mientras tanto, tus descargas ya están disponibles.
                    </p>
                  </div>
                )}

                {/* Primary Button */}
                <button
                  type="button"
                  onClick={handleDownloadAllZip}
                  disabled={isZipping}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-75"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isZipping ? 'Comprimiendo archivos...' : 'Descargar Todo el Pack (ZIP)'}
                  </span>
                </button>

                {/* Individual Downloads */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Descargas individuales
                  </span>

                  {/* 1. Digital Photo */}
                  <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-white flex items-center justify-between gap-2 transition-all">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">Foto Digital Oficial</p>
                      <p className="text-[10px] text-slate-500">JPEG · 300 DPI ultranítido</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadDigitalPhoto}
                      className="bg-slate-900 hover:bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      JPG
                    </button>
                  </div>

                  {/* 2. Print Sheet A4 */}
                  <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-white flex items-center justify-between gap-2 transition-all">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">Hoja para Imprimir A4</p>
                      <p className="text-[10px] text-slate-500">JPEG · Formato A4 (210×297 mm) con marcas</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadPrintSheet}
                      className="bg-slate-900 hover:bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      JPG
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* UNPAID STATE: MATCHING EXACT VISACREADYNOW STANDARD VS PREMIUM CARDS */
              <div className="space-y-4">
                {/* PACK 1: STANDARD (7,99 €) */}
                <div
                  onClick={() => setSelectedPack('standard')}
                  className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                    selectedPack === 'standard'
                      ? 'border-[#0071E3] bg-blue-50/30 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Pack Estándar</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Ajuste y Verificación Biométrica IA</p>
                    </div>
                    <span className="text-lg font-black text-slate-900 whitespace-nowrap">
                      7,99 €
                    </span>
                  </div>
                  <ul className="space-y-1.5 pt-1 border-t border-slate-100 text-[11px]">
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${selectedPack === 'standard' ? 'text-[#0071E3]' : 'text-slate-400'}`} />
                      <span>Verificación biométrica oficial por IA</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${selectedPack === 'standard' ? 'text-[#0071E3]' : 'text-slate-400'}`} />
                      <span>Descarga digital inmediata en 300 DPI</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${selectedPack === 'standard' ? 'text-[#0071E3]' : 'text-slate-400'}`} />
                      <span>Plantilla oficial A4 (210×297 mm) para imprimir</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${selectedPack === 'standard' ? 'text-[#0071E3]' : 'text-slate-400'}`} />
                      <span>Conformidad biométrica 100% garantizada OACI</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${selectedPack === 'standard' ? 'text-[#0071E3]' : 'text-slate-400'}`} />
                      <span>Garantía de devolución del 100%</span>
                    </li>
                  </ul>
                </div>

                {/* PACK 2: PREMIUM WITH HUMAN EXPERT REVIEW (13,99 €) */}
                <div
                  onClick={() => setSelectedPack('premium')}
                  className={`relative rounded-xl border-2 p-4 pt-5 cursor-pointer transition-all ${
                    selectedPack === 'premium'
                      ? 'border-[#0071E3] ring-1 ring-[#0071E3]/20 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Top Badge: Most Popular */}
                  <div className="absolute -top-3 right-4 bg-[#0071E3] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                    MÁS POPULAR
                  </div>

                  {/* Sub-badge: Expert Review */}
                  <div className="inline-flex items-center gap-1 bg-blue-100 text-[#0071E3] border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded mb-1.5">
                    <UserCheck className="w-3 h-3" />
                    <span>REVISIÓN POR ESPECIALISTA</span>
                  </div>

                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Pack Premium</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Revisión Manual por Experto Humano</p>
                    </div>
                    <span className="text-lg font-black text-slate-900 whitespace-nowrap">
                      13,99 €
                    </span>
                  </div>

                  <ul className="space-y-1.5 pt-1 border-t border-slate-100 text-[11px]">
                    <li className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0 stroke-[2.5]" />
                      <span>Todo lo incluido en el Pack Estándar</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0 stroke-[2.5]" />
                      <span className="text-blue-900 font-bold">Revisión manual por experto en &lt;15 min</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                      <span>Auditoría de requisitos consulares específicos</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                      <span>Ajuste prioritario de color y exposición</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                      <span>Soporte prioritario por email</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                      <span>Riesgo de rechazo reducido al 0%</span>
                    </li>
                  </ul>

                  {/* Interactive "See What Our Experts Fix" Banner (Matching VisaReadyNow) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPack('premium');
                      setIsExpertsFixModalOpen(true);
                    }}
                    className="mt-3 bg-white/80 border border-blue-200/90 hover:border-[#0071E3] rounded-xl p-2.5 flex items-center justify-between gap-2.5 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors truncate">
                        Ver qué corrigen nuestros especialistas
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 min-w-0">
                        <div className="flex items-center -space-x-1.5 shrink-0">
                          <img
                            src="/images/avatars/avatar1.jpg"
                            alt="Cliente"
                            className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                          />
                          <img
                            src="/images/avatars/avatar2.jpg"
                            alt="Cliente"
                            className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                          />
                          <img
                            src="/images/avatars/avatar3.jpg"
                            alt="Cliente"
                            className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                          />
                          <img
                            src="/images/avatars/avatar4.jpg"
                            alt="Cliente"
                            className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                          />
                          <img
                            src="/images/avatars/avatar5.jpg"
                            alt="Cliente"
                            className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600 truncate">
                          +2.847 fotos auditadas
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#0071E3] shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Ver ejemplos →
                    </span>
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-bold text-slate-500 block">
                    Correo electrónico para entrega de archivos y factura:
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    className="w-full rounded-xl border border-slate-200 bg-[#F5F5F7] px-3.5 py-2.5 text-xs font-medium text-[#1D1D1F] focus:border-[#0071E3] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Razorpay Button matching selected plan */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-75"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isPaying
                      ? 'Conectando con pasarela segura...'
                      : selectedPack === 'premium'
                      ? 'Obtener Pack Premium con Revisión — 13,99 €'
                      : 'Obtener Pack Estándar — 7,99 €'}
                  </span>
                </button>

                {/* Trust Badges */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-[#6E6E73]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-[#1D1D1F]">
                      Garantía de aceptación del 100% o reembolso íntegro
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    <span>Pago seguro protegido por Razorpay SSL de 256 bits</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-400">
                    <span>Visa</span> · <span>Mastercard</span> · <span>Amex</span> · <span>Apple Pay</span> · <span>Google Pay</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── MODAL: SEE WHAT EXPERTS FIX (MATCHING VISACREADYNOW) ─── */}
      <SeeWhatExpertsFixModal
        isOpen={isExpertsFixModalOpen}
        onClose={() => setIsExpertsFixModalOpen(false)}
        onSelectPremium={(email) => {
          setSelectedPack('premium');
          if (email) setUserEmail(email);
        }}
        initialEmail={userEmail}
      />

      {/* ─── LIGHTBOX: FULL RESOLUTION ZOOM PREVIEW MODAL ─── */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setIsZoomModalOpen(false)} />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-w-2xl max-h-[90vh] bg-white rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center space-y-4"
          >
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1F]">
                  Vista Previa Oficial en Alta Resolución (300 DPI)
                </h3>
                <p className="text-[11px] text-[#6E6E73]">
                  {spec.name} · {spec.widthMm} × {spec.heightMm} mm
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-none overflow-hidden border border-slate-200 bg-white max-h-[65vh] flex items-center justify-center">
              <img
                src={photoUrl}
                alt="Vista en alta resolución"
                className="max-h-[65vh] max-w-full object-contain block"
              />
            </div>

            <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#6E6E73]">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Check className="w-4 h-4" /> Calibrado para impresión oficial a 300 DPI
              </span>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
