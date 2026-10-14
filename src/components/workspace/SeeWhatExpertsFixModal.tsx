'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Sparkles, UserCheck } from 'lucide-react';

interface SeeWhatExpertsFixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPremium: (email?: string) => void;
  initialEmail?: string;
}

const EXPERT_FIX_ITEMS = [
  {
    id: 'wall-shadow',
    title: 'Eliminación de sombras de pared y calibración de fondo',
    desc: 'Sustitución de fondo sucio o con sombras duras por blanco uniforme reglamentario.',
    beforeImg: '/images/before-after-expert-images/before4.jpg',
    afterImg: '/images/before-after-expert-images/after4.jpg',
  },
  {
    id: 'eye-centering',
    title: 'Línea de ojos y centrado biométrico facial',
    desc: 'Alineación milimétrica de ojos y distancia de barbilla a coronilla según norma OACI.',
    beforeImg: '/images/before-after-expert-images/before3.jpg',
    afterImg: '/images/before-after-expert-images/after3.jpg',
  },
  {
    id: 'glare-reduction',
    title: 'Reducción de reflejos y destellos de flash',
    desc: 'Eliminación de brillos y destellos en cristales de gafas y zonas grasas de la piel.',
    beforeImg: '/images/before-after-expert-images/before2.jpg',
    afterImg: '/images/before-after-expert-images/after2.jpg',
  },
  {
    id: 'head-tilt',
    title: 'Corrección de inclinación y orientación de cabeza',
    desc: 'Nivelación del eje sagital para una postura frontal perfecta y simétrica.',
    beforeImg: '/images/before-after-expert-images/before1.jpg',
    afterImg: '/images/before-after-expert-images/after1.jpg',
  },
  {
    id: 'lighting-balance',
    title: 'Equilibrio de luz y contraste de sombras',
    desc: 'Corrección de subexposición o iluminación desigual entre ambos lados del rostro.',
    beforeImg: '/images/before-after-expert-images/before5.jpg',
    afterImg: '/images/before-after-expert-images/after5.jpg',
  },
  {
    id: 'background-noise',
    title: 'Uniformidad absoluta del fondo y nitidez 300 DPI',
    desc: 'Eliminación de ruido digital, motas y artefactos de compresión para impresión HD.',
    beforeImg: '/images/before-after-expert-images/before6.jpg',
    afterImg: '/images/before-after-expert-images/after6.jpg',
  },
];

export function SeeWhatExpertsFixModal({
  isOpen,
  onClose,
  onSelectPremium,
  initialEmail = '',
}: SeeWhatExpertsFixModalProps) {
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContinue = () => {
    onSelectPremium(email.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="px-4 sm:px-7 pt-4 sm:pt-6 pb-3 border-b border-slate-100 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-blue-50 text-[#0071E3] border border-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <UserCheck className="w-3 h-3" />
                Revisión por Especialista Humano
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Garantía de Aceptación Consular
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#1D1D1F] tracking-tight mt-1.5 leading-snug">
              Descubre qué corrigen nuestros especialistas
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-0.5">
              Ejemplos reales de fotos auditadas y optimizadas manualmente antes de la entrega oficial.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Banner */}
        <div className="mx-4 sm:mx-7 my-3 bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0071E3] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="leading-snug text-[11px] sm:text-xs">
            Un especialista biométrico examina cada punto crítico (fondo, centrado, iluminación, ojos y reflejos) en menos de 15 minutos para asegurar que tu solicitud nunca sea rechazada.
          </span>
        </div>

        {/* Scrollable Gallery */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXPERT_FIX_ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 flex flex-col space-y-2.5 transition-all hover:border-slate-300"
              >
                <div>
                  <h3 className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-white aspect-[3/4] flex items-center justify-center">
                    <img
                      src={item.beforeImg}
                      alt={`Antes: ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-red-600/90 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      Antes (Riesgo rechazo)
                    </span>
                  </div>

                  <div className="relative rounded-lg overflow-hidden border border-emerald-300 bg-white aspect-[3/4] flex items-center justify-center ring-1 ring-emerald-500/20">
                    <img
                      src={item.afterImg}
                      alt={`Después: ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-emerald-600/90 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      Después (100% Conforme)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-4 sm:px-7 py-3 sm:py-3.5 border-t border-slate-100 bg-[#F5F5F7] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] sm:text-xs text-[#6E6E73] text-center sm:text-left">
            <span className="font-bold text-[#1D1D1F]">Pack Premium</span> · Incluye revisión humana en &lt;15 min + descargas 300 DPI + garantía oficial 100%.
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Seleccionar Pack Premium — 13,99 €</span>
          </button>
        </div>
      </div>
    </div>
  );
}
