'use client';

import React from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  Loader2,
} from 'lucide-react';
import {
  AIAnalysisResult,
  CATEGORY_LABELS_ES,
  PASSED_CHECK_LABELS_ES,
} from '@/lib/ai-backend';
import { CountryInfo, DocumentSpec } from '@/types';

interface BiometricValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AIAnalysisResult | null;
  isLoading: boolean;
  onApplyAIFix: () => void;
  isFixing: boolean;
  country: CountryInfo;
  spec: DocumentSpec;
}

export function BiometricValidationModal({
  isOpen,
  onClose,
  analysis,
  isLoading,
  onApplyAIFix,
  isFixing,
  country,
  spec,
}: BiometricValidationModalProps) {
  if (!isOpen) return null;

  const isPass = analysis?.overall_status === 'pass';
  const isWarn = analysis?.overall_status === 'warn';
  const isFail = analysis?.overall_status === 'fail';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#D2D2D7] bg-white p-6 sm:p-8 shadow-2xl transition-all z-10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0071E3]/10 text-[#0071E3]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-[#1D1D1F]">
                Validación Biométrica Oficial
              </h3>
              <p className="text-[12px] text-[#6E6E73]">
                {country.flag} {country.name} · {spec.name} ({spec.widthMm} × {spec.heightMm} mm)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0071E3]" />
            <h4 className="mt-4 text-[16px] font-semibold text-[#1D1D1F]">
              Analizando biometría y requisitos...
            </h4>
            <p className="mt-1 text-[13px] text-[#6E6E73]">
              Verificando óvalo facial, simetría, fondo oficial y contraste según el estándar OACI.
            </p>
          </div>
        )}

        {/* Analysis Results */}
        {!isLoading && analysis && (
          <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Status Banner */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isPass
                  ? 'border-[#34C759]/30 bg-[#34C759]/5'
                  : isWarn
                  ? 'border-[#FF9500]/30 bg-[#FF9500]/5'
                  : 'border-[#FF3B30]/30 bg-[#FF3B30]/5'
              }`}
            >
              <div className="flex items-start gap-3">
                {isPass ? (
                  <CheckCircle2 className="h-6 w-6 text-[#34C759] shrink-0 mt-0.5" />
                ) : isWarn ? (
                  <AlertTriangle className="h-6 w-6 text-[#FF9500] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-[#FF3B30] shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-[16px] font-semibold text-[#1D1D1F]">
                    {isPass
                      ? 'Conforme con la normativa consular'
                      : isWarn
                      ? 'Revisión recomendada'
                      : 'No conforme — Requiere corrección'}
                  </h4>
                  <p className="mt-0.5 text-[13px] text-[#6E6E73]">
                    {isPass
                      ? 'Tu foto cumple todos los parámetros biométricos verificados para este trámite.'
                      : isWarn
                      ? 'Se han detectado advertencias menores que podrían causar observaciones.'
                      : 'La foto presenta inconsistencias con la norma consular oficial de ' + country.name + '.'}
                  </p>
                </div>
              </div>

              {/* Action Button: Fix with AI */}
              {(!isPass || analysis.is_auto_fixable) && (
                <button
                  type="button"
                  onClick={onApplyAIFix}
                  disabled={isFixing}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0071E3] px-4 py-2 text-[13px] font-medium text-white shadow-xs transition-all hover:bg-[#0077ED] disabled:opacity-50"
                >
                  {isFixing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Ajustando con IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Corregir con IA</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Summary Counters */}
            <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
              <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-3">
                <span className="block text-[18px] font-bold text-[#34C759]">
                  {analysis.summary.passed_checks}
                </span>
                <span className="text-[#6E6E73]">Verificaciones OK</span>
              </div>
              <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-3">
                <span className="block text-[18px] font-bold text-[#FF9500]">
                  {analysis.summary.warnings}
                </span>
                <span className="text-[#6E6E73]">Advertencias</span>
              </div>
              <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-3">
                <span className="block text-[18px] font-bold text-[#FF3B30]">
                  {analysis.summary.critical_issues}
                </span>
                <span className="text-[#6E6E73]">Críticas</span>
              </div>
            </div>

            {/* Issues List (if any) */}
            {analysis.issues.length > 0 && (
              <div>
                <h5 className="text-[14px] font-semibold text-[#1D1D1F] mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-[#FF9500]" />
                  <span>Incidencias detectadas ({analysis.issues.length})</span>
                </h5>

                <div className="space-y-2.5">
                  {analysis.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="rounded-2xl border border-[#E5E5EA] bg-white p-3.5 text-[13px] shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1D1D1F]">
                          {CATEGORY_LABELS_ES[issue.category] || issue.category}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            issue.severity === 'critical'
                              ? 'bg-[#FF3B30]/10 text-[#FF3B30]'
                              : 'bg-[#FF9500]/10 text-[#FF9500]'
                          }`}
                        >
                          {issue.severity === 'critical' ? 'Crítico' : 'Advertencia'}
                        </span>
                      </div>
                      <p className="mt-1 text-[#6E6E73] leading-relaxed">
                        {issue.user_message || issue.description}
                      </p>
                      {issue.auto_fixable && (
                        <div className="mt-2 text-[11px] font-medium text-[#0071E3] flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Corregible automáticamente con IA</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passed Checks List */}
            {analysis.passed_checks.length > 0 && (
              <div>
                <h5 className="text-[14px] font-semibold text-[#1D1D1F] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759]" />
                  <span>Parámetros conformes ({analysis.passed_checks.length})</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#424245]">
                  {analysis.passed_checks.map((checkKey) => (
                    <div
                      key={checkKey}
                      className="flex items-center gap-2 rounded-xl bg-[#F5F5F7] px-3 py-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#34C759] shrink-0" />
                      <span className="truncate">
                        {PASSED_CHECK_LABELS_ES[checkKey] || checkKey}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E5EA] pt-4">
          <p className="text-[11px] text-[#8E8E93]">
            Validado según algoritmos de visión artificial y la norma ICAO Doc 9303.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#D2D2D7] bg-white px-5 py-2 text-[13px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
