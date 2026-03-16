'use client';
import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      {/* Timeline container */}
      <div className="relative px-4 md:px-0">
        {/* Horizontal line — hidden on mobile */}
        <div className="hidden md:block absolute top-[28px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-[3px] bg-border rounded-full">
          <div
            className="h-full bg-accent rounded-full"
            style={{
              width: visible ? '100%' : '0%',
              transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Step 1 */}
          <div
            className="text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            <div className="relative z-10 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent/30">
              <span className="font-body text-xl font-extrabold">1</span>
            </div>
            <h3 className="font-body text-lg font-extrabold text-charcoal mb-3">Søk</h3>

            {/* Mini preview: search field */}
            <div className="bg-surface border border-border rounded-2xl p-4 mx-auto max-w-[220px] mb-3">
              <div className="flex items-center gap-2 bg-cream border-2 border-accent rounded-xl px-3 py-2.5">
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth={2} />
                  <path d="m20 20-3.5-3.5" strokeWidth={2} strokeLinecap="round" />
                </svg>
                <span className="font-body text-xs text-charcoal font-semibold">Oslo</span>
                <span className="font-body text-[10px] text-muted ml-auto">253</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Bergen', 'Trondheim', 'Stavanger'].map((c) => (
                  <span key={c} className="font-body text-[10px] bg-cream border border-border px-2 py-0.5 rounded-lg text-muted">{c}</span>
                ))}
              </div>
            </div>

            <p className="font-body text-sm text-muted leading-relaxed max-w-[220px] mx-auto">
              By, merke eller butikknavn. Finn akkurat det du leter etter.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s',
            }}
          >
            <div className="relative z-10 w-14 h-14 rounded-full bg-accent-light border-[3px] border-accent text-accent flex items-center justify-center mx-auto mb-5">
              <span className="font-body text-xl font-extrabold">2</span>
            </div>
            <h3 className="font-body text-lg font-extrabold text-charcoal mb-3">Utforsk</h3>

            {/* Mini preview: store card */}
            <div className="bg-surface border border-border rounded-2xl p-4 mx-auto max-w-[220px] mb-3">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                  <span className="font-body text-xs font-extrabold text-white">M</span>
                </div>
                <div className="text-left">
                  <p className="font-body text-xs font-bold text-charcoal">Motehuset.no</p>
                  <p className="font-body text-[10px] text-muted">Storgata 12, Oslo</p>
                </div>
              </div>
              <div className="flex gap-1 mb-1.5">
                {['Holzweiler', 'Ganni'].map((m) => (
                  <span key={m} className="font-body text-[9px] bg-cream border border-border px-1.5 py-0.5 rounded text-muted">{m}</span>
                ))}
                <span className="font-body text-[9px] text-muted/40">+3</span>
              </div>
              <p className="font-body text-[10px] text-muted/60">Man-fre 10-19 · Lør 10-17</p>
            </div>

            <p className="font-body text-sm text-muted leading-relaxed max-w-[220px] mx-auto">
              Adresse, merker, åpningstider og kontaktinfo for hver butikk.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s',
            }}
          >
            <div className="relative z-10 w-14 h-14 rounded-full bg-surface border-[3px] border-border text-muted flex items-center justify-center mx-auto mb-5">
              <span className="font-body text-xl font-extrabold">3</span>
            </div>
            <h3 className="font-body text-lg font-extrabold text-charcoal mb-3">Besøk</h3>

            {/* Mini preview: action buttons */}
            <div className="bg-surface border border-border rounded-2xl p-4 mx-auto max-w-[220px] mb-3">
              <div className="flex gap-2 mb-2">
                <div className="flex-1 bg-accent text-white rounded-xl py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <span className="font-body text-[10px] font-bold">Nettbutikk</span>
                  </div>
                </div>
                <div className="flex-1 bg-cream border border-border rounded-xl py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="font-body text-[10px] font-bold text-muted">Finn veien</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-cream border border-border rounded-xl px-3 py-2">
                <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="font-body text-[10px] font-semibold text-charcoal">Ring for åpningstider</span>
              </div>
            </div>

            <p className="font-body text-sm text-muted leading-relaxed max-w-[220px] mx-auto">
              Handle i nettbutikken, finn veien eller ring direkte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
