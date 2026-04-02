import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AllStoresSearch from '@/components/AllStoresSearch';
import { createMetadata } from '@/lib/seo';
import { getAllStores, getAllCities, getAllFylker } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Alle klesbutikker i Norge | 1 566 butikker fra A til Å',
  description: 'Komplett liste over alle registrerte klesbutikker i Norge. Søk, filtrer etter fylke og kommune, eller bla fra A til Å.',
  path: '/butikk',
});

export default function AllStoresPage() {
  const stores = getAllStores();
  const cities = getAllCities().map((c) => c.name);
  const fylker = getAllFylker().map((f) => f.name);

  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Alle butikker' }]} />
          <div className="mt-4">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-2">Alle klesbutikker</h1>
            <p className="font-body text-base text-white/50">Søk og filtrer blant {stores.length.toLocaleString('nb-NO')} registrerte klesbutikker fra A til Å.</p>
          </div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="max-w-8xl mx-auto section-padding">
          <AllStoresSearch stores={stores} cities={cities} fylker={fylker} />
        </div>
      </section>
    </>
  );
}
