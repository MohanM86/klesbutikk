import Link from 'next/link';
import { CityData } from '@/lib/types';

function CityIcon({ city }: { city: string }) {
  // Unique SVG patterns per city for visual distinction
  const patterns: Record<string, { gradient: string; letter: string }> = {
    Oslo: { gradient: 'from-stone-800 to-stone-600', letter: 'O' },
    Bergen: { gradient: 'from-slate-700 to-blue-900', letter: 'B' },
    Trondheim: { gradient: 'from-zinc-800 to-zinc-600', letter: 'T' },
    Stavanger: { gradient: 'from-neutral-800 to-neutral-600', letter: 'S' },
    Kristiansand: { gradient: 'from-stone-700 to-amber-900', letter: 'K' },
    Drammen: { gradient: 'from-gray-800 to-gray-600', letter: 'D' },
    Tromsø: { gradient: 'from-slate-800 to-slate-600', letter: 'T' },
    Fredrikstad: { gradient: 'from-zinc-700 to-stone-800', letter: 'F' },
    Sandnes: { gradient: 'from-neutral-700 to-stone-600', letter: 'S' },
    Haugesund: { gradient: 'from-gray-700 to-slate-800', letter: 'H' },
  };

  const p = patterns[city] || { gradient: 'from-charcoal/80 to-charcoal/60', letter: city.charAt(0) };

  return (
    <div className={`h-32 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
      <span className="font-display text-6xl font-bold text-white/[0.08] group-hover:text-white/[0.14] group-hover:scale-110 transition-all duration-500 select-none">
        {p.letter}
      </span>
      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </div>
  );
}

export default function CityCard({ city }: { city: CityData }) {
  return (
    <Link
      href={`/${city.slug}`}
      className="group block bg-white border border-border rounded-lg overflow-hidden card-hover"
    >
      <CityIcon city={city.name} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display text-lg font-semibold text-charcoal group-hover:text-slate transition-colors">
            {city.name}
          </h3>
          <svg
            className="w-4 h-4 text-muted group-hover:text-charcoal group-hover:translate-x-0.5 transition-all duration-200 mt-1.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <p className="font-body text-sm text-muted">{city.fylke}</p>
        <p className="font-body text-xs text-muted/70 mt-2">
          {city.storeCount} {city.storeCount === 1 ? 'butikk' : 'butikker'}
        </p>
      </div>
    </Link>
  );
}
