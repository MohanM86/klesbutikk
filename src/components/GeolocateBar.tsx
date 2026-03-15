'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NearestCity {
  name: string;
  slug: string;
  fylke: string;
  storeCount: number;
}

export default function GeolocateBar() {
  const [state, setState] = useState<'idle' | 'asking' | 'searching' | 'found' | 'dismissed'>('idle');
  const [city, setCity] = useState<NearestCity | null>(null);

  useEffect(() => {
    // Check if already dismissed this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('geo-dismissed')) {
      setState('dismissed');
    }
  }, []);

  const dismiss = () => {
    setState('dismissed');
    if (typeof window !== 'undefined') sessionStorage.setItem('geo-dismissed', '1');
  };

  const findMyCity = () => {
    setState('asking');
    if (!navigator.geolocation) {
      setState('dismissed');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setState('searching');
        try {
          const res = await fetch(`/api/nearest-city?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
          const data = await res.json();
          if (data.city) {
            setCity(data.city);
            setState('found');
          } else {
            setState('dismissed');
          }
        } catch {
          setState('dismissed');
        }
      },
      () => {
        // User denied or error
        setState('dismissed');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  };

  if (state === 'dismissed') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto">
        <div className="bg-white border-2 border-border rounded-2xl shadow-xl p-4 md:p-5 relative">
          {/* Close button */}
          <button onClick={dismiss} className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-muted hover:text-charcoal transition-colors" aria-label="Lukk">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* State: Idle — initial prompt */}
          {state === 'idle' && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-bold text-charcoal">Finn klesbutikker nær deg</p>
                <p className="font-body text-xs text-muted">Vi finner din nærmeste by</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={findMyCity} className="font-body text-xs font-bold bg-accent text-white px-4 py-2.5 rounded-xl hover:bg-accent-hover transition-colors">
                  Finn min by
                </button>
                <button onClick={dismiss} className="font-body text-xs font-semibold text-muted px-3 py-2.5 rounded-xl border border-border hover:border-border-dark transition-colors hidden sm:block">
                  Bla selv
                </button>
              </div>
            </div>
          )}

          {/* State: Asking / Searching */}
          {(state === 'asking' || state === 'searching') && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-bold text-charcoal">
                  {state === 'asking' ? 'Venter på tilgang...' : 'Søker...'}
                </p>
                <p className="font-body text-xs text-muted">
                  {state === 'asking' ? 'Tillat posisjon for å finne din by' : 'Finner klesbutikker i nærheten'}
                </p>
              </div>
            </div>
          )}

          {/* State: Found */}
          {state === 'found' && city && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-muted">Din by</p>
                <p className="font-body text-base font-extrabold text-charcoal">{city.name}</p>
              </div>
              <Link href={`/${city.slug}`} onClick={dismiss}
                className="font-body text-xs font-bold bg-accent text-white px-4 py-2.5 rounded-xl hover:bg-accent-hover transition-colors whitespace-nowrap flex-shrink-0">
                Se {city.storeCount} butikker i {city.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
