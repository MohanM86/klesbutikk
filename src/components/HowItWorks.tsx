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
      <div className="relative px-4 md:px-0">
        {/* Horizontal line */}
        <div className="hidden md:block absolute top-[24px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-[2px] bg-border rounded-full">
          <div
            className="h-full bg-accent rounded-full"
            style={{
              width: visible ? '100%' : '0%',
              transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {[
            { num: '1', title: 'Søk', desc: 'By, merke eller butikknavn. Finn akkurat det du leter etter.', style: 'bg-accent text-white shadow-md shadow-accent/20' },
            { num: '2', title: 'Utforsk', desc: 'Se adresse, merker, kontaktinfo og åpningstider for hver butikk.', style: 'bg-accent-light text-accent border-2 border-accent' },
            { num: '3', title: 'Besøk', desc: 'Handle i nettbutikken, finn veien eller ring direkte.', style: 'bg-surface-alt text-muted border border-border' },
          ].map((step, i) => (
            <div
              key={step.num}
              className="text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ' + (0.2 + i * 0.5) + 's',
              }}
            >
              <div className={'relative z-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 ' + step.style}>
                <span className="font-body text-xl font-extrabold">{step.num}</span>
              </div>
              <h3 className="font-body text-lg font-bold text-charcoal mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
