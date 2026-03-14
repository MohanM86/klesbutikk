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
          <span className="font-display text-2xl sm:text-3xl font-semibold text-charcoal tabular-nums">
            {storeCount.toLocaleString('nb-NO')}
          </span>
          <span className="block font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-muted mt-0.5">
            butikker
          </span>
        </div>
        <span className="text-muted/30 text-lg font-light">&middot;</span>
        <div className="text-center">
          <span className="font-display text-2xl sm:text-3xl font-semibold text-charcoal tabular-nums">
            {kommuneCount}
          </span>
          <span className="block font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-muted mt-0.5">
            kommuner
          </span>
        </div>
        <span className="text-muted/30 text-lg font-light">&middot;</span>
        <div className="text-center">
          <span className="font-display text-2xl sm:text-3xl font-semibold text-charcoal tabular-nums">
            {fylkeCount}
          </span>
          <span className="block font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-muted mt-0.5">
            fylker
          </span>
        </div>
      </div>
    </div>
  );
}
