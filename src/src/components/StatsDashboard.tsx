'use client';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  sublabel: string;
  delay: number;
  visible: boolean;
  size?: number;
}

function RadialGauge({ value, max, label, sublabel, delay, visible, size = 130 }: GaugeProps) {
  const displayed = useCountUp(value, 2000, visible);
  const pct = value / max;
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div className="text-center">
      <div className="relative" style={{ width: size, height: size, margin: '0 auto' }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,105,0,0.06)" strokeWidth={7}
          />
          {/* Animated arc */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" strokeWidth={7} strokeLinecap="round"
            stroke="url(#gaugeGradient)"
            strokeDasharray={`${pct * circ} ${circ}`}
            style={{
              strokeDashoffset: visible ? 0 : circ,
              transition: `stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
              filter: 'drop-shadow(0 0 6px rgba(255,105,0,0.2))',
            }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6900" />
              <stop offset="100%" stopColor="#ff9a44" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-body text-2xl font-extrabold text-charcoal tabular-nums"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.8)',
              transition: `all 0.6s ease ${delay + 0.3}s`,
            }}
          >
            {displayed.toLocaleString('nb-NO')}
          </span>
          <span className="font-body text-[10px] font-semibold text-muted uppercase tracking-wider">{label}</span>
        </div>
      </div>
      <span
        className="font-body text-[10px] text-muted block mt-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ease ${delay + 0.5}s`,
        }}
      >
        {sublabel}
      </span>
    </div>
  );
}

export default function StatsDashboard() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">Statistikk</p>
          <p className="font-body text-base font-extrabold text-charcoal">Klesbutikk.no i tall</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-green-500"
            style={{ animation: visible ? 'livePulse 2s ease infinite' : 'none' }}
          />
          <span className="font-body text-[10px] font-semibold text-green-600">Live data</span>
        </div>
      </div>

      {/* 2x2 gauge grid */}
      <div className="grid grid-cols-2 gap-4">
        <RadialGauge value={1566} max={2000} label="Butikker" sublabel="registrert i Norge" delay={0.2} visible={visible} />
        <RadialGauge value={483} max={600} label="Merker" sublabel="kartlagt" delay={0.4} visible={visible} />
        <RadialGauge value={357} max={400} label="Kommuner" sublabel="dekket" delay={0.6} visible={visible} />
        <RadialGauge value={7928} max={10000} label="Sider" sublabel="indeksert" delay={0.8} visible={visible} />
      </div>

      {/* Bottom stats bar */}
      <div
        className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.6s ease 1.2s',
        }}
      >
        <div className="text-center">
          <span className="font-body text-lg font-extrabold text-charcoal">15</span>
          <span className="block font-body text-[9px] text-muted uppercase tracking-wider font-semibold">Fylker</span>
        </div>
        <div className="text-center">
          <span className="font-body text-lg font-extrabold text-accent">100%</span>
          <span className="block font-body text-[9px] text-muted uppercase tracking-wider font-semibold">Dekning</span>
        </div>
        <div className="text-center">
          <span className="font-body text-lg font-extrabold text-charcoal">24/7</span>
          <span className="block font-body text-[9px] text-muted uppercase tracking-wider font-semibold">Online</span>
        </div>
      </div>
    </div>
  );
}
