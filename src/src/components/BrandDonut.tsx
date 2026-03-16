'use client';
import { useEffect, useRef, useState } from 'react';

const SEGMENTS = [
  { label: 'Norske merker', pct: 38, color: '#FF6900' },
  { label: 'Skandinavisk', pct: 22, color: '#111111' },
  { label: 'Europeisk', pct: 24, color: '#FF6900' },
  { label: 'Internasjonal', pct: 16, color: '#111111' },
];

export default function BrandDonut() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Build SVG arcs
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;
  const arcs = SEGMENTS.map((seg, i) => {
    const dashLength = (seg.pct / 100) * circumference;
    const gap = circumference - dashLength;
    const offset = -(accumulated / 100) * circumference + circumference * 0.25;
    accumulated += seg.pct;
    return { ...seg, dashLength, gap, offset, index: i };
  });

  return (
    <div ref={ref} className="bg-white border border-border rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <p className="font-body text-xs font-bold text-accent mb-0.5">Merkeoversikt</p>
        <p className="font-body text-base font-extrabold text-charcoal">483 merker kartlagt</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Donut */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f0f0f0" strokeWidth={strokeWidth} />
            {/* Segments */}
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={active === arc.index ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${arc.dashLength} ${arc.gap}`}
                strokeDashoffset={arc.offset}
                strokeLinecap="butt"
                className="cursor-pointer transition-all duration-500"
                style={{
                  opacity: visible ? (arc.color === '#111111' ? 0.15 : 1) : 0,
                  transition: `opacity 0.8s ease ${arc.index * 0.15}s, stroke-width 0.3s ease`,
                  filter: active === arc.index ? `drop-shadow(0 0 6px ${arc.color}44)` : 'none',
                }}
                onMouseEnter={() => setActive(arc.index)}
              />
            ))}
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span
              className="font-body text-3xl font-extrabold text-charcoal tabular-nums transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.6s ease 0.5s',
              }}
            >
              {SEGMENTS[active].pct}%
            </span>
            <span className="font-body text-[10px] text-muted font-medium transition-all duration-200">
              {SEGMENTS[active].label}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {SEGMENTS.map((seg, i) => (
            <button
              key={seg.label}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                active === i ? 'bg-surface border border-accent/20' : 'hover:bg-surface border border-transparent'
              }`}
              onMouseEnter={() => setActive(i)}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(12px)',
                transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: seg.color,
                  opacity: seg.color === '#111111' ? 0.15 : 1,
                }}
              />
              <span className="font-body text-sm font-semibold text-charcoal flex-1">{seg.label}</span>
              <span className="font-body text-sm font-bold text-muted tabular-nums">{seg.pct}%</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
