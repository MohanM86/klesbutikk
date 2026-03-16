'use client';
import Link from 'next/link';
import { CityData } from '@/lib/types';

function CityPill({ city }: { city: CityData }) {
  return (
    <Link href={`/${city.slug}`}
      className="group flex-shrink-0 flex items-center gap-3 bg-cream border border-border rounded-xl px-5 py-4 hover:border-accent hover:shadow-md transition-all duration-200">
      <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center group-hover:bg-accent transition-colors duration-200">
        <span className="font-body text-base font-extrabold text-accent group-hover:text-white transition-colors">{city.name.charAt(0)}</span>
      </div>
      <div>
        <span className="block font-body text-sm font-bold text-charcoal">{city.name}</span>
        <span className="block font-body text-xs text-muted">{city.storeCount} butikker</span>
      </div>
      <svg className="w-4 h-4 text-border-dark group-hover:text-accent group-hover:translate-x-0.5 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}

export default function CityMarquee({ cities }: { cities: CityData[] }) {
  const row1 = cities.slice(0, Math.ceil(cities.length / 2));
  const row2 = cities.slice(Math.ceil(cities.length / 2));
  return (
    <div className="relative overflow-hidden"
      onMouseEnter={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.mtrack').forEach((el) => (el.style.animationPlayState = 'paused'))}
      onMouseLeave={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.mtrack').forEach((el) => (el.style.animationPlayState = 'running'))}>
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      <div className="mb-3">
        <div className="mtrack flex gap-3" style={{ animation: 'marqueeLeft 45s linear infinite', width: 'max-content' }}>
          {[...row1, ...row1].map((c, i) => <CityPill key={`a-${c.slug}-${i}`} city={c} />)}
        </div>
      </div>
      <div>
        <div className="mtrack flex gap-3" style={{ animation: 'marqueeRight 55s linear infinite', width: 'max-content' }}>
          {[...row2, ...row2].map((c, i) => <CityPill key={`b-${c.slug}-${i}`} city={c} />)}
        </div>
      </div>
    </div>
  );
}
