'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function StudioRedirectInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('id') || searchParams.get('photo');
    if (id) {
      const q = new URLSearchParams(searchParams.toString());
      q.delete('id');
      q.delete('photo');
      const qs = q.toString() ? `?${q.toString()}` : '';
      router.replace(`/estudio/${id}${qs}`);
    } else {
      router.replace('/#creador');
    }
  }, [searchParams, router]);

  return (
    <div className="py-24 text-center text-sm text-[#6E6E73]">
      Redirigiendo a tu estudio oficial...
    </div>
  );
}

export default function StudioIndexPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-[#6E6E73]">
          Cargando estudio...
        </div>
      }
    >
      <StudioRedirectInner />
    </Suspense>
  );
}
