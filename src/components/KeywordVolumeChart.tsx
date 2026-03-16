'use client';
import { useEffect, useRef, useState } from 'react';

const DATA = [
  { kw: 'treningsklær', vol: 12100, kd: 14 },
  { kw: 'klesbutikk', vol: 8100, kd: 61 },
  { kw: 'treningsklær dame', vol: 4400, kd: 46 },
  { kw: 'dameklær', vol: 3600, kd: 20 },
  { kw: 'treningsklær herre', vol: 2900, kd: 14 },
  { kw: 'treningsklær junior', vol: 1600, kd: 14 },
  { kw: 'klesbutikk oslo', vol: 1300, kd: 50 },
  { kw: 'klesbutikker oslo', vol: 1300, kd: 43 },
  { kw: 'johaug treningsklær', vol: 1000, kd: 17 },
  { kw: 'klesbutikker trondheim', vol: 880, kd: 42 },
];

export default function KeywordVolumeChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const max = DATA[0].vol;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-surface border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">Søkevolum</p>
          <p className="font-body text-base font-extrabold text-charcoal">Topp keywords i Norge</p>
        </div>
        <div className="bg-accent-light rounded-lg px-2.5 py-1">
          <span className="font-body text-[10px] font-bold text-accent">Semrush data</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {DATA.map((d, i) => {
          const pct = (d.vol / max) * 100;
          const kdColor = d.kd <= 20 ? 'text-green-600 bg-green-50' : d.kd <= 45 ? 'text-amber-600 bg-amber-50' : 'text-red-500 bg-red-50';
          return (
            <div key={d.kw}>
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="font-body text-xs font-semibold text-slate">{d.kw}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-[13px] font-extrabold text-charcoal tabular-nums">{d.vol.toLocaleString('nb-NO')}</span>
                  <span className={`font-body text-[9px] font-semibold px-1.5 py-px rounded ${kdColor}`}>KD {d.kd}%</span>
                </div>
              </div>
              <div className="h-[5px] bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#FF6900' : 'rgba(17,17,17,0.12)',
                    width: visible ? `${pct}%` : '0%',
                    transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="font-body text-[10px] text-muted">Månedlig søkevolum (Norge)</span>
        <div className="flex gap-2">
          <span className="font-body text-[9px] font-semibold text-green-600">● Lett</span>
          <span className="font-body text-[9px] font-semibold text-amber-600">● Medium</span>
          <span className="font-body text-[9px] font-semibold text-red-500">● Vanskelig</span>
        </div>
      </div>
    </div>
  );
}
