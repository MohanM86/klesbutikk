'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration, start]);

  return value;
}

export default function AnimatedHero({
  totalStores,
  totalFylker,
}: {
  totalStores: number;
  totalFylker: number;
}) {
  const [started, setStarted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const storeCount = useCountUp(totalStores, 2200, started);
  const kommuneCount = useCountUp(357, 1800, started);
  const fylkeCount = useCountUp(totalFylker, 1400, started);

  return (
    <div ref={heroRef}>
      <div className="flex items-center justify-center gap-3 sm:gap-5 mb-6">
        <div className="text-center">
          <span className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums">
            {storeCount.toLocaleString('nb-NO')}
          </span>
          <span className="block font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">
            butikker
          </span>
        </div>
        <span className="text-white/10 text-2xl font-light">&middot;</span>
        <div className="text-center">
          <span className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums">
            {kommuneCount}
          </span>
          <span className="block font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">
            kommuner
          </span>
        </div>
        <span className="text-white/10 text-2xl font-light">&middot;</span>
        <div className="text-center">
          <span className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums">
            {fylkeCount}
          </span>
          <span className="block font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">
            fylker
          </span>
        </div>
      </div>
    </div>
  );
}
