import React from 'react';
import Link from 'next/link';
import { Globe2, ShieldCheck, Camera, FileCheck } from 'lucide-react';

export function TrustBar() {
  return (
    <section className="border-y border-[#E5E5EA] bg-[#F5F5F7]/60 py-6 sm:py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {/* Counter: Countries */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0071E3]/10 text-[#0071E3]">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[18px] sm:text-[22px] font-semibold text-[#1D1D1F] leading-tight">
                200+
              </p>
              <p className="text-[11px] sm:text-[12px] text-[#6E6E73]">
                Países y documentos
              </p>
            </div>
          </div>

          {/* Counter: Photo formats */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#34C759]/10 text-[#34C759]">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[18px] sm:text-[22px] font-semibold text-[#1D1D1F] leading-tight">
                4 formatos
              </p>
              <p className="text-[11px] sm:text-[12px] text-[#6E6E73]">
                35×45, 2×2″, 50×70, 33×48
              </p>
            </div>
          </div>

          {/* Counter: Verified specs */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FF9500]/10 text-[#FF9500]">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[18px] sm:text-[22px] font-semibold text-[#1D1D1F] leading-tight">
                Oct. 2026
              </p>
              <p className="text-[11px] sm:text-[12px] text-[#6E6E73]">
                Última verificación
              </p>
            </div>
          </div>

          {/* Transparency badge */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#AF52DE]/10 text-[#AF52DE]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-[#1D1D1F] leading-tight">
                Sin garantía falsa
              </p>
              <Link
                href="/como-verificamos-los-requisitos"
                className="text-[11px] sm:text-[12px] text-[#0071E3] hover:underline"
              >
                Cómo verificamos →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
