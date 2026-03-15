'use client';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(e * target));
      if (p < 1) ref.current = requestAnimationFrame(step);
      else setValue(target);
    };
    ref.current = requestAnimationFrame(step);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target, duration, start]);
  return value;
}

export default function AnimatedHero({ totalStores, totalFylker }: { totalStores: number; totalFylker: number }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stores = useCountUp(totalStores, 2200, started);
  const kommuner = useCountUp(357, 1800, started);
  const merker = useCountUp(483, 1600, started);

  return (
    <div ref={ref} className="stagger-5">
      <div className="flex gap-8 md:gap-12">
        {[
          { val: stores.toLocaleString('nb-NO'), label: 'Butikker' },
          { val: kommuner.toString(), label: 'Kommuner' },
          { val: merker.toString(), label: 'Merker' },
        ].map((s) => (
          <div key={s.label}>
            <span className="font-body text-3xl md:text-4xl font-black text-white tabular-nums tracking-tight">
              {s.val}
            </span>
            <span className="block font-body text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/15 mt-1">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
