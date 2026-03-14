import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CityCard from '@/components/CityCard';
import { getAllCities } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesbutikker i alle byer i Norge',
  description: 'Finn klesbutikker i din by. Se komplett oversikt over byer med klesbutikker i hele Norge – fra Oslo til Tromsø.',
  path: '/by',
});

export default function CitiesPage() {
  const cities = getAllCities();

  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Byer' }]} />

      <div className="mb-10">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          {cities.length} byer
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Klesbutikker etter by
        </h1>
        <p className="editorial-text">
          Utforsk klesbutikker i byer over hele Norge. Velg en by for å se alle motebutikker i området.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </div>
  );
}
