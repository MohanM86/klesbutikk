'use client';

import Link from 'next/link';
import { CityData } from '@/lib/types';

function CityPill({ city }: { city: CityData }) {
  return (
    <Link
      href={`/${city.slug}`}
      className="group flex-shrink-0 flex items-center gap-3 bg-white border border-border rounded-xl px-5 py-4 hover:border-charcoal/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center group-hover:bg-slate transition-colors">
        <span className="font-display text-sm font-semibold text-white">
          {city.name.charAt(0)}
        </span>
      </div>
      <div>
        <span className="block font-display text-sm font-semibold text-charcoal group-hover:text-slate transition-colors">
          {city.name}
        </span>
        <span className="block font-body text-xs text-muted">
          {city.storeCount} {city.storeCount === 1 ? 'butikk' : 'butikker'}
        </span>
      </div>
      <svg
        className="w-4 h-4 text-muted/40 group-hover:text-charcoal group-hover:translate-x-0.5 transition-all ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
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
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

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
