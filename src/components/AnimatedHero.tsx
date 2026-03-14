'use client';

import { useEffect, useRef, useState } from 'react';

const BRAND_BUBBLES = [
  { name: 'Holzweiler', x: 'left-[8%]', y: 'top-[12%]', delay: 0 },
  { name: 'Ganni', x: 'right-[6%]', y: 'top-[18%]', delay: 0.6 },
  { name: 'Filippa K', x: 'left-[5%]', y: 'bottom-[28%]', delay: 1.2 },
  { name: 'GANT', x: 'right-[8%]', y: 'bottom-[22%]', delay: 1.8 },
  { name: 'Dressmann', x: 'left-[15%]', y: 'top-[38%]', delay: 0.4 },
  { name: 'Stormberg', x: 'right-[14%]', y: 'top-[42%]', delay: 1.0 },
  { name: 'H&M', x: 'left-[10%]', y: 'bottom-[12%]', delay: 1.6 },
  { name: 'Cubus', x: 'right-[10%]', y: 'bottom-[38%]', delay: 0.8 },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
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
    // Start animation when hero enters viewport (or immediately if already visible)
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
    <div ref={heroRef} className="relative">
      {/* Floating brand bubbles - hidden on mobile */}
      <div className="hidden lg:block">
        {BRAND_BUBBLES.map((bubble) => (
          <div
            key={bubble.name}
            className={`absolute ${bubble.x} ${bubble.y} z-0`}
            style={{
              animation: `float ${3 + bubble.delay}s ease-in-out infinite`,
              animationDelay: `${bubble.delay}s`,
            }}
          >
            <span className="inline-block bg-charcoal/[0.04] backdrop-blur-sm border border-charcoal/[0.06] rounded-full px-3.5 py-1.5 font-body text-xs text-muted/60 select-none whitespace-nowrap">
              {bubble.name}
            </span>
          </div>
        ))}
      </div>

      {/* Animated stats */}
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
