'use client';
import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">
        {[
          { num: '1', title: 'Søk', desc: 'Skriv inn by, merke eller butikknavn.' },
          { num: '2', title: 'Utforsk', desc: 'Se adresse, merker og kontaktinfo for hver butikk.' },
          { num: '3', title: 'Besøk', desc: 'Handle i nettbutikken, finn veien eller ring direkte.' },
        ].map((step, i) => (
          <div key={step.num}
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.5s ease ' + (0.15 + i * 0.2) + 's' }}>
            <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-4">
              <span className="font-body text-base font-extrabold text-accent">{step.num}</span>
            </div>
            <h3 className="font-body text-base font-bold text-white mb-1.5">{step.title}</h3>
            <p className="font-body text-[13px] text-white/50 leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
