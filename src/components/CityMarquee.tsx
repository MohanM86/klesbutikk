'use client';
import Link from 'next/link';
import { CityData } from '@/lib/types';

function CityPill({ city }: { city: CityData }) {
  return (
    <Link href={'/' + city.slug}
      className="group flex-shrink-0 flex items-center gap-3 border border-border rounded-lg px-4 py-3 hover:border-black transition-all duration-150">
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
        <span className="font-body text-sm font-extrabold text-accent">{city.name.charAt(0)}</span>
      </div>
      <div>
        <span className="block font-body text-[13px] font-bold text-black">{city.name}</span>
        <span className="block font-body text-[11px] text-muted">{city.storeCount} butikker</span>
      </div>
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
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className="mb-2">
        <div className="mtrack flex gap-2" style={{ animation: 'marqueeLeft 45s linear infinite', width: 'max-content' }}>
          {[...row1, ...row1].map((c, i) => <CityPill key={'a-' + c.slug + '-' + i} city={c} />)}
        </div>
      </div>
      <div>
        <div className="mtrack flex gap-2" style={{ animation: 'marqueeRight 55s linear infinite', width: 'max-content' }}>
          {[...row2, ...row2].map((c, i) => <CityPill key={'b-' + c.slug + '-' + i} city={c} />)}
        </div>
      </div>
    </div>
  );
}
