'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CountryInfo, DocumentSpec } from '@/types';
import { COUNTRIES_DATA } from '@/data/countries';
import { StudioResult } from '@/components/workspace/StudioResult';
import { ArrowLeft } from 'lucide-react';

interface StudioClientProps {
  photoId: string;
  initialCountryCode?: string;
  initialDocName?: string;
}

export function StudioClient({
  photoId,
  initialCountryCode = 'ES',
  initialDocName,
}: StudioClientProps) {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country') || initialCountryCode;
  const docParam = searchParams.get('doc') || initialDocName;

  const [country, setCountry] = useState<CountryInfo>(() => {
    return (
      COUNTRIES_DATA.find(
        (c) => c.code.toUpperCase() === countryParam.toUpperCase()
      ) || COUNTRIES_DATA[0]
    );
  });

  const [spec, setSpec] = useState<DocumentSpec>(() => {
    const c =
      COUNTRIES_DATA.find(
        (co) => co.code.toUpperCase() === countryParam.toUpperCase()
      ) || COUNTRIES_DATA[0];
    if (docParam) {
      const match = c.documents.find(
        (d) => d.name.toLowerCase() === docParam.toLowerCase()
      );
      if (match) return match;
    }
    return c.documents[0];
  });

  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch photo metadata on mount / reload
  useEffect(() => {
    let isMounted = true;

    async function loadPhotoMetadata() {
      try {
        const res = await fetch(`/api/photo-metadata/${photoId}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setMetadata(data);
            if (data.country) {
              const matchedCountry = COUNTRIES_DATA.find(
                (c) => c.code.toUpperCase() === data.country.toUpperCase()
              );
              if (matchedCountry) {
                setCountry(matchedCountry);
                if (data.document_type) {
                  const matchedDoc = matchedCountry.documents.find((d) =>
                    d.documentType
                      .toLowerCase()
                      .includes(data.document_type.toLowerCase())
                  );
                  if (matchedDoc) {
                    setSpec(matchedDoc);
                  } else {
                    setSpec(matchedCountry.documents[0]);
                  }
                } else {
                  setSpec(matchedCountry.documents[0]);
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Could not load remote metadata, using default specs', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPhotoMetadata();

    return () => {
      isMounted = false;
    };
  }, [photoId]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-10 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/#creador"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Link>
          <span className="text-[11px] font-mono text-slate-400">
            ID de sesión: {photoId}
          </span>
        </div>

        {/* Studio Result (No cards inside cards!) */}
        <StudioResult
          country={country}
          spec={spec}
          photoId={photoId}
          fixResult={metadata}
        />
      </div>
    </div>
  );
}
