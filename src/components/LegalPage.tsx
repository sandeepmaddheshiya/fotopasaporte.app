import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LegalPageProps {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, intro, updated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-white w-full max-w-full overflow-x-clip">
      <Header />
      <article className="mx-auto max-w-[760px] px-4 py-12 sm:px-6 sm:py-20">
        <h1 className="text-[30px] font-semibold tracking-tight text-[#1D1D1F] sm:text-[42px] leading-tight">
          {title}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#6E6E73]">{intro}</p>
        <p className="mt-2 text-[13px] text-[#8E8E93]">Última actualización: {updated}</p>
        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#3A3A3C] [&_h2]:mb-3 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-[#1D1D1F] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-[#0071E3] [&_a]:underline">
          {children}
        </div>
      </article>
      <Footer />
    </main>
  );
}
