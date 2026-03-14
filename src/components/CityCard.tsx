import Link from 'next/link';
import { CityData } from '@/lib/types';

// Curated image indices for visual variety
const CITY_VISUALS: Record<string, string> = {
  Oslo: '🏙️',
  Bergen: '🌧️',
  Trondheim: '⛪',
  Stavanger: '⛽',
  Kristiansand: '☀️',
  Drammen: '🌊',
  Tromsø: '❄️',
  Fredrikstad: '🏰',
  Sandnes: '🏖️',
  Haugesund: '⚓',
};

export default function CityCard({ city }: { city: CityData }) {
  const emoji = CITY_VISUALS[city.name] || '🏪';

  return (
    <Link
      href={`/${city.slug}`}
      className="group block bg-white border border-border rounded-lg overflow-hidden card-hover"
    >
      {/* Visual header */}
      <div className="h-32 bg-gradient-to-br from-charcoal/5 to-charcoal/10 flex items-center justify-center relative overflow-hidden">
        <span className="text-5xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
          {emoji}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

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
