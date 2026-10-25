'use client';

import React from 'react';
import Link from 'next/link';
import { Ruler, FileDigit, Image, Palette, Smile, AlertCircle } from 'lucide-react';

interface Criterion {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

export function QualityRequirements() {
  const criteria: Criterion[] = [
    {
      title: 'Dimensiones de la fotografía',
      description: (
        <>
          Cada documento exige proporciones específicas: 35×45 mm para España y Europa, 2×2 pulgadas (51×51 mm) para Estados Unidos o 50×70 mm para Canadá; si tienes dudas,{' '}
          <Link
            href="/medidas-foto-pasaporte"
            className="text-[#0071E3] font-medium hover:underline inline-flex items-center gap-0.5"
          >
            consulta las medidas de la foto de pasaporte por país
          </Link>
          .
        </>
      ),
      icon: <Ruler className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      title: 'Fondo limpio y uniforme',
      description:
        'Generalmente se requiere fondo blanco o gris claro, liso y sin sombras visibles. Algunos países como Reino Unido o Francia prohíben explícitamente el blanco puro.',
      icon: <Palette className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      title: 'Posición y proporciones del rostro',
      description:
        'El rostro debe mirar directamente a la cámara. En documentos biométricos (OACI), la cabeza debe ocupar habitualmente entre el 70% y el 80% de la altura total.',
      icon: <Smile className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      title: 'Resolución a 300 DPI',
      description:
        'Para una impresión nítida y aceptación en consulados, el archivo debe contar con una densidad de al menos 300 puntos por pulgada (DPI).',
      icon: <Image className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      title: 'Formato y tamaño del archivo',
      description:
        'Para envíos digitales (como el formulario DS-160 o solicitudes online), se suele exigir formato JPEG con límites de peso (por ejemplo, menor a 240 KB).',
      icon: <FileDigit className="h-5 w-5 text-[#0071E3]" />,
    },
    {
      title: 'Accesorios y expresiones',
      description:
        'La mayoría de autoridades prohíben el uso de gafas, gorros o sombreros (salvo motivos religiosos o médicos justificados) y exigen expresión facial neutra con boca cerrada.',
      icon: <AlertCircle className="h-5 w-5 text-[#0071E3]" />,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[36px] lg:text-[42px]">
            Cada detalle cuenta.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#6E6E73]">
            Los consulados y autoridades de pasaportes revisan parámetros estrictos para asegurar la legibilidad biométrica.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#D2D2D7]/80 bg-[#F5F5F7]/50 p-5 sm:p-6 transition-all hover:bg-[#F5F5F7]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0071E3] shadow-xs">
                {item.icon}
              </div>
              <h3 className="mt-4 text-[16px] sm:text-[17px] font-semibold text-[#1D1D1F]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed text-[#6E6E73]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Official Authority Reminder Alert */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-4 sm:p-6 text-[12px] sm:text-[13px] text-[#6E6E73]">
          <p>
            <strong>Aviso importante:</strong> FotoPasaporte es una herramienta de asistencia independiente que te ayuda a encuadrar y dimensionar tu foto con arreglo a las especificaciones públicas disponibles. Las autoridades oficiales pueden aplicar normativas complementarias y la resolución final sobre la validez del documento corresponde exclusivamente a la autoridad competente. Consulta con transparencia{' '}
            <Link href="/como-verificamos-los-requisitos" className="text-[#0071E3] font-medium hover:underline">
              cómo verificamos los requisitos
            </Link>{' '}
            en fuentes oficiales de cada país.
          </p>
        </div>
      </div>
    </section>
  );
}
