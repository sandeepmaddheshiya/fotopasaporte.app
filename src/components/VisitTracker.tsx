'use client';

import { useEffect, useRef } from 'react';

export function VisitTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const trackVisit = () => {
      fetch('/api/stats/visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.photoresizer.us/api/v1';
        fetch(`${apiUrl}/stats/visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Brand-ID': 'fotopasaporte',
          },
          body: JSON.stringify({
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        }).catch((err) => console.debug('Visit tracking fallback failed:', err));
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(trackVisit, { timeout: 2000 });
    } else {
      setTimeout(trackVisit, 1000);
    }
  }, []);

  return null;
}
