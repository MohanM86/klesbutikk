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
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) ref.current = requestAnimationFrame(step); else setValue(target);
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
  const stores = useCountUp(totalStores, 2000, started);
  const kommuner = useCountUp(357, 1600, started);
  const merker = useCountUp(483, 1400, started);

  return (
    <div ref={ref} className="flex justify-center gap-6 sm:gap-10">
      {[
        { val: stores.toLocaleString('nb-NO'), label: 'Butikker' },
        { val: merker.toString(), label: 'Merker' },
        { val: totalFylker.toString(), label: 'Fylker' },
        { val: kommuner.toString(), label: 'Kommuner' },
      ].map((s) => (
        <div key={s.label} className="text-center">
          <span className="font-body text-2xl sm:text-3xl font-extrabold text-charcoal tabular-nums">{s.val}</span>
          <span className="block font-body text-[11px] font-medium text-muted mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
