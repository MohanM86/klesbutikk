'use client';

import Link from 'next/link';
import { CityData } from '@/lib/types';

function CityPill({ city }: { city: CityData }) {
  return (
    <Link
      href={`/${city.slug}`}
      className="group flex-shrink-0 flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-none px-5 py-4 hover:bg-white/[0.12] transition-all duration-300"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="font-display text-xl font-bold text-white/80 group-hover:text-white transition-colors">
          {city.name.charAt(0)}
        </span>
      </div>
      <div>
        <span className="block font-body text-sm font-semibold text-white group-hover:text-white transition-colors tracking-wide">
          {city.name}
        </span>
        <span className="block font-body text-xs text-white/30">
          {city.storeCount} {city.storeCount === 1 ? 'butikk' : 'butikker'}
        </span>
      </div>
    </Link>
  );
}

export default function CityMarquee({ cities }: { cities: CityData[] }) {
  // Split cities into two rows
  const row1 = cities.slice(0, Math.ceil(cities.length / 2));
  const row2 = cities.slice(Math.ceil(cities.length / 2));

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={(e) => {
        e.currentTarget.querySelectorAll<HTMLElement>('.marquee-track').forEach(
          (el) => (el.style.animationPlayState = 'paused')
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelectorAll<HTMLElement>('.marquee-track').forEach(
          (el) => (el.style.animationPlayState = 'running')
        );
      }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

      {/* Row 1 — scrolls left */}
      <div className="mb-3">
        <div
          className="marquee-track flex gap-3"
          style={{
            animation: 'marqueeLeft 40s linear infinite',
            width: 'max-content',
          }}
        >
          {[...row1, ...row1].map((city, i) => (
            <CityPill key={`r1-${city.slug}-${i}`} city={city} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <div
          className="marquee-track flex gap-3"
          style={{
            animation: 'marqueeRight 45s linear infinite',
            width: 'max-content',
          }}
        >
          {[...row2, ...row2].map((city, i) => (
            <CityPill key={`r2-${city.slug}-${i}`} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}
