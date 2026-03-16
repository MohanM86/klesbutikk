'use client';
import { useEffect, useRef, useState } from 'react';
import { NORWAY_SVG_PATH } from '@/data/norway-path';

const FYLKER = [
  { name: 'Oslo', stores: 253, x: 735, y: 2519 },
  { name: 'Viken', stores: 180, x: 712, y: 2573 },
  { name: 'Vestland', stores: 65, x: 167, y: 2333 },
  { name: 'Rogaland', stores: 72, x: 202, y: 2658 },
  { name: 'Trøndelag', stores: 55, x: 682, y: 1717 },
  { name: 'Vestfold/Telemark', stores: 90, x: 593, y: 2646 },
  { name: 'Agder', stores: 45, x: 397, y: 2836 },
  { name: 'Innlandet', stores: 35, x: 694, y: 2267 },
  { name: 'Møre og Romsdal', stores: 30, x: 364, y: 1953 },
  { name: 'Nordland', stores: 25, x: 952, y: 947 },
  { name: 'Troms/Finnmark', stores: 22, x: 1450, y: 379 },
];

export default function NorwayHeatmap() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const max = Math.max(...FYLKER.map((f) => f.stores));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-surface border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">Heatmap</p>
          <p className="font-body text-base font-extrabold text-charcoal">Hele Norge dekket</p>
        </div>
      </div>
      <div className="relative w-full mx-auto">
        <svg viewBox="0 0 2105 2980" className="w-full h-auto block">
          {/* Norway filled shape */}
          <path
            d={NORWAY_SVG_PATH}
            fill="rgba(255,105,0,0.03)"
            stroke="none"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.5s ease 0.3s' }}
          />
          {/* Norway outline - animated draw */}
          <path
            d={NORWAY_SVG_PATH}
            fill="none"
            stroke="rgba(255,105,0,0.15)"
            strokeWidth="2"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 99999,
              strokeDashoffset: visible ? 0 : 99999,
              transition: 'stroke-dashoffset 4s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          />
          {/* Fylke dots */}
          {FYLKER.map((f, i) => {
            const dotR = 12 + (f.stores / max) * 50;
            const intensity = 0.25 + (f.stores / max) * 0.75;
            const isHov = hovered === i;
            return (
              <g key={f.name} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <circle cx={f.x} cy={f.y} r={dotR * 2.5}
                  fill={`rgba(255,105,0,${intensity * 0.06})`}
                  style={{ opacity: visible ? 1 : 0, transition: `opacity 1s ease ${0.5 + i * 0.08}s` }}
                />
                {isHov && (
                  <circle cx={f.x} cy={f.y} r={dotR + 12}
                    fill="none" stroke="rgba(255,105,0,0.3)" strokeWidth="2"
                  />
                )}
                <circle cx={f.x} cy={f.y} r={dotR}
                  fill={`rgba(255,105,0,${intensity})`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0)',
                    transformOrigin: `${f.x}px ${f.y}px`,
                    transition: `all 0.7s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.08}s`,
                    filter: isHov
                      ? 'drop-shadow(0 0 16px rgba(255,105,0,0.6))'
                      : `drop-shadow(0 0 ${dotR / 2}px rgba(255,105,0,${intensity * 0.2}))`,
                  }}
                />
                <circle cx={f.x} cy={f.y} r={dotR / 3.5}
                  fill="rgba(255,180,120,0.8)"
                  style={{ opacity: visible ? intensity : 0, transition: `opacity 0.6s ease ${0.7 + i * 0.08}s` }}
                />
              </g>
            );
          })}
        </svg>
        {/* Tooltips */}
        {FYLKER.map((f, i) => hovered === i ? (
          <div key={`tt-${f.name}`} className="absolute z-20 pointer-events-none"
            style={{
              left: `${(f.x / 2105) * 100}%`,
              top: `${(f.y / 2980) * 100}%`,
              transform: 'translate(-50%, calc(-100% - 14px))',
            }}>
            <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-border whitespace-nowrap">
              <span className="font-body text-xs font-bold text-charcoal block">{f.name}</span>
              <span className="font-body text-[11px] font-semibold text-accent">{f.stores} butikker</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-white" />
            </div>
          </div>
        ) : null)}
      </div>
      <div className="flex items-center justify-center gap-7 pt-4 border-t border-border mt-3">
        {[
          { v: '15', l: 'Fylker' },
          { v: '357', l: 'Kommuner' },
          { v: '7 928', l: 'Sider' },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <span className="font-body text-lg font-extrabold text-charcoal tabular-nums">{s.v}</span>
            <span className="block font-body text-[9px] font-semibold text-muted uppercase tracking-wider mt-0.5">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
