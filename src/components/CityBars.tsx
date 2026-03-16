'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const CITIES = [
  { name: 'Oslo', slug: 'oslo', count: 253 },
  { name: 'Bergen', slug: 'bergen', count: 39 },
  { name: 'Trondheim', slug: 'trondheim', count: 39 },
  { name: 'Stavanger', slug: 'stavanger', count: 39 },
  { name: 'Kristiansand', slug: 'kristiansand', count: 30 },
  { name: 'Sandnes', slug: 'sandnes', count: 30 },
  { name: 'Drammen', slug: 'drammen', count: 30 },
  { name: 'Haugesund', slug: 'haugesund', count: 28 },
  { name: 'Tønsberg', slug: 'toensberg', count: 27 },
  { name: 'Holmestrand', slug: 'holmestrand', count: 25 },
];

export default function CityBars() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const max = CITIES[0].count;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-surface border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-body text-xs font-bold text-accent mb-0.5">Topp 10</p>
          <p className="font-body text-base font-extrabold text-charcoal">Norges største handlebyer</p>
        </div>
      </div>

      {/* Vertical bar chart */}
      <div className="flex items-end gap-[6px] sm:gap-3 h-48 sm:h-56">
        {CITIES.map((city, i) => {
          const pct = (city.count / max) * 100;
          const isHot = hovered === i;
          return (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="flex-1 flex flex-col items-center justify-end h-full group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              <div
                className="font-body text-xs font-bold text-charcoal mb-1 tabular-nums text-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `all 0.4s ease ${0.6 + i * 0.06}s`,
                }}
              >
                {city.count}
              </div>

              {/* Bar */}
              <div
                className="w-full rounded-t-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  height: visible ? `${pct}%` : '0%',
                  backgroundColor: i === 0 ? '#FF6900' : isHot ? '#FF6900' : 'rgba(255,255,255,0.12)',
                  opacity: i === 0 ? 1 : isHot ? 0.8 : 0.08,
                  transition: `height 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s, background-color 0.3s ease, opacity 0.3s ease`,
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-t-lg"
                  style={{ opacity: i === 0 || isHot ? 1 : 0 }}
                />
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <span
                  className="font-body font-semibold text-charcoal block leading-tight transition-colors duration-200 group-hover:text-accent"
                  style={{ fontSize: '10px' }}
                >
                  {city.name.length > 7 ? city.name.slice(0, 6) + '…' : city.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Scale line */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="font-body text-[10px] text-muted">Registrerte klesbutikker per kommune</span>
        <span className="font-body text-[10px] text-muted">Kilde: Klesbutikk.no</span>
      </div>
    </div>
  );
}
