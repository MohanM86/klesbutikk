'use client';
import Link from 'next/link';
import { CityData } from '@/lib/types';

function CityPill({ city }: { city: CityData }) {
  return (
    <Link href={`/${city.slug}`}
      className="group flex-shrink-0 flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] px-5 py-4 hover:bg-white/[0.08] transition-all duration-200">
      <span className="font-body text-xl font-black text-white/60 group-hover:text-white transition-colors">{city.name.charAt(0)}</span>
      <div>
        <span className="block font-body text-sm font-bold text-white/80 group-hover:text-white transition-colors tracking-wide">{city.name}</span>
        <span className="block font-body text-[10px] text-white/20 tracking-wider">{city.storeCount} butikker</span>
      </div>
    </Link>
  );
}

export default function CityMarquee({ cities }: { cities: CityData[] }) {
  const row1 = cities.slice(0, Math.ceil(cities.length / 2));
  const row2 = cities.slice(Math.ceil(cities.length / 2));
  return (
    <div className="relative overflow-hidden"
      onMouseEnter={(e) => { e.currentTarget.querySelectorAll<HTMLElement>('.mtrack').forEach((el) => (el.style.animationPlayState = 'paused')); }}
      onMouseLeave={(e) => { e.currentTarget.querySelectorAll<HTMLElement>('.mtrack').forEach((el) => (el.style.animationPlayState = 'running')); }}>
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="mb-2">
        <div className="mtrack flex gap-2" style={{ animation: 'marqueeLeft 45s linear infinite', width: 'max-content' }}>
          {[...row1, ...row1].map((c, i) => <CityPill key={`a-${c.slug}-${i}`} city={c} />)}
        </div>
      </div>
      <div>
        <div className="mtrack flex gap-2" style={{ animation: 'marqueeRight 55s linear infinite', width: 'max-content' }}>
          {[...row2, ...row2].map((c, i) => <CityPill key={`b-${c.slug}-${i}`} city={c} />)}
        </div>
      </div>
    </div>
  );
}
