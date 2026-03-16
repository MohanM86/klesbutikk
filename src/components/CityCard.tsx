import Link from 'next/link';
import { CityData } from '@/lib/types';

export default function CityCard({ city }: { city: CityData }) {
  return (
    <Link
      href={`/${city.slug}`}
      className="group block bg-cream border-2 border-border rounded-2xl overflow-hidden card-hover hover:border-accent"
    >
      {/* Visual header */}
      <div className="h-24 bg-surface relative flex items-center justify-center overflow-hidden">
        <span className="font-body text-5xl font-black text-charcoal/[0.04] group-hover:text-accent/[0.08] group-hover:scale-110 transition-all duration-300 select-none">
          {city.name.charAt(0)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-body text-sm font-bold text-charcoal group-hover:text-accent transition-colors">
            {city.name}
          </h3>
          <svg
            className="w-4 h-4 text-border-dark group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 mt-0.5 flex-shrink-0"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <p className="font-body text-xs text-muted">{city.fylke}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="font-body text-xs font-bold text-accent bg-accent-light px-2 py-0.5 rounded-md">
            {city.storeCount}
          </span>
          <span className="font-body text-[11px] text-muted">
            {city.storeCount === 1 ? 'butikk' : 'butikker'}
          </span>
        </div>
      </div>
    </Link>
  );
}
