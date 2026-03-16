'use client';
import { useEffect, useRef, useState } from 'react';

interface CategoryData {
  name: string;
  count: number;
  color: string;
}

const CATEGORIES: CategoryData[] = [
  { name: 'Dameklær', count: 342, color: '#FF6900' },
  { name: 'Herreklær', count: 289, color: '#ffffff' },
  { name: 'Sportsklær', count: 201, color: '#FF6900' },
  { name: 'Barneklær', count: 156, color: '#ffffff' },
  { name: 'Designer', count: 87, color: '#FF6900' },
  { name: 'Vintage', count: 64, color: '#ffffff' },
];

export default function CategoryChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const max = Math.max(...CATEGORIES.map((c) => c.count));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);

  return (
    <div ref={ref} className="bg-surface border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-body text-xs font-bold text-accent mb-0.5">Fordeling</p>
          <p className="font-body text-base font-extrabold text-charcoal">Butikker per kategori</p>
        </div>
        <div className="text-right">
          <span className="font-body text-2xl font-extrabold text-charcoal tabular-nums">{total.toLocaleString('nb-NO')}</span>
          <span className="block font-body text-[10px] text-muted">totalt registrert</span>
        </div>
      </div>

      {/* Horizontal bar chart */}
      <div className="space-y-3">
        {CATEGORIES.map((cat, i) => {
          const pct = (cat.count / max) * 100;
          return (
            <div key={cat.name} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-xs font-semibold text-charcoal">{cat.name}</span>
                <span className="font-body text-xs font-bold text-muted tabular-nums">{cat.count}</span>
              </div>
              <div className="h-7 bg-surface rounded-lg overflow-hidden relative">
                <div
                  className="h-full rounded-lg group-hover:brightness-110 transition-all duration-300"
                  style={{
                    width: visible ? `${pct}%` : '0%',
                    backgroundColor: cat.color,
                    opacity: cat.color === '#ffffff' ? 0.12 : 0.18,
                    transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s`,
                  }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-lg group-hover:brightness-110 transition-all duration-300"
                  style={{
                    width: visible ? `${pct}%` : '0%',
                    backgroundColor: cat.color,
                    transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s`,
                    opacity: 1,
                    maxWidth: '100%',
                    clipPath: 'inset(0 0 0 0 round 8px)',
                  }}
                >
                  <div className="h-full w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}dd)` }} />
                </div>
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-body text-[10px] font-bold text-muted tabular-nums"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.8 + i * 0.12}s`,
                  }}
                >
                  {((cat.count / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
