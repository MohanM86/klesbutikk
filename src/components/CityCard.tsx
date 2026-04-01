import Link from 'next/link';
import { CityData } from '@/lib/types';

export default function CityCard({ city }: { city: CityData }) {
  return (
    <Link href={'/' + city.slug}
      className="group block border border-border rounded-lg overflow-hidden transition-all duration-150 hover:border-black">
      <div className="h-14 bg-black flex items-center justify-center">
        <span className="font-body text-2xl font-extrabold text-accent">{city.name.charAt(0)}</span>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between mb-0.5">
          <h3 className="font-body text-[13px] font-bold text-black">{city.name}</h3>
          <svg className="w-3.5 h-3.5 text-border-dark group-hover:text-black transition-colors mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </div>
        <p className="font-body text-[11px] text-muted">{city.fylke}</p>
        <div className="mt-2">
          <span className="font-body text-[11px] font-bold text-accent">{city.storeCount} butikker</span>
        </div>
      </div>
    </Link>
  );
}
