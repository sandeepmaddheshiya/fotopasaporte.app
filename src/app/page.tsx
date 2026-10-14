'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PhotoMaker } from '@/components/workspace/PhotoMaker';
import { RequirementsSection } from '@/components/RequirementsSection';
import { HowItWorks } from '@/components/HowItWorks';
import { QualityRequirements } from '@/components/QualityRequirements';
import { PrivacySection } from '@/components/PrivacySection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { CountryInfo } from '@/types';

export default function HomePage() {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('ES');
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [makerKey, setMakerKey] = useState<number>(0);

  const scrollToMaker = () => {
    const el = document.getElementById('creador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSamplePhoto = (sampleUrl: string) => {
    setInitialImage(sampleUrl);
    setMakerKey((prev) => prev + 1);
    scrollToMaker();
  };

  const handleSelectCountryForMaker = (country: CountryInfo) => {
    setSelectedCountryCode(country.code);
    setMakerKey((prev) => prev + 1);
    scrollToMaker();
  };

  return (
    <main className="min-h-screen bg-white w-full max-w-full overflow-x-clip">
      {/* 1. Navigation Header */}
      <Header onStartClick={scrollToMaker} />

      {/* 2. Hero Section */}
      <HeroSection
        onStartClick={scrollToMaker}
        onSelectSamplePhoto={handleSelectSamplePhoto}
      />

      {/* 3. Main Workspace: PhotoMaker */}
      <PhotoMaker
        key={makerKey}
        initialCountryCode={selectedCountryCode}
        initialImageSrc={initialImage}
      />

      {/* 4. Supported Requirements & Countries */}
      <RequirementsSection
        onSelectCountryForMaker={handleSelectCountryForMaker}
      />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Quality & Strict Criteria */}
      <QualityRequirements />

      {/* 7. Privacy Commitment */}
      <PrivacySection />

      {/* 8. Frequently Asked Questions */}
      <FAQAccordion />

      {/* 9. Final Call to Action */}
      <FinalCTA onStartClick={scrollToMaker} />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
