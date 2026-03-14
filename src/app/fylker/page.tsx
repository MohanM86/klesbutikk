import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllFylker } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesbutikker etter fylke i Norge',
  description: 'Se klesbutikker sortert etter fylke. Finn motebutikker i alle norske fylker.',
  path: '/fylker',
});

export default function FylkerPage() {
  const fylker = getAllFylker();

  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Fylker' }]} />

      <div className="mb-10">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          {fylker.length} fylker
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Klesbutikker etter fylke
        </h1>
        <p className="editorial-text">
          Utforsk klesbutikker i alle norske fylker. Hvert fylke har et unikt motetilbud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fylker.map((fylke) => (
          <Link
            key={fylke.slug}
            href={`/fylke/${fylke.slug}`}
            className="group block bg-white border border-border rounded-lg p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-charcoal group-hover:text-slate transition-colors">
                {fylke.name}
              </h2>
              <span className="font-body text-sm text-muted bg-cream px-3 py-1 rounded-full">
                {fylke.storeCount}
              </span>
            </div>
            <p className="font-body text-sm text-muted mb-4">
              {fylke.storeCount} klesbutikker i {fylke.cities.length} byer
            </p>
            <div className="flex flex-wrap gap-1.5">
              {fylke.cities.slice(0, 6).map((city) => (
                <span key={city} className="font-body text-xs text-muted/70 bg-cream px-2.5 py-1 rounded-full">
                  {city}
                </span>
              ))}
              {fylke.cities.length > 6 && (
                <span className="font-body text-xs text-muted/50 px-2.5 py-1">
                  +{fylke.cities.length - 6} flere
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
