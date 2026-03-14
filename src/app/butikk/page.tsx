import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreList from '@/components/StoreList';
import { getAllStores } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Alle klesbutikker i Norge – Komplett oversikt',
  description: 'Se alle registrerte klesbutikker i Norge. Over 1500 motebutikker fra Brønnøysundregistrene samlet på ett sted.',
  path: '/butikk',
});

export default function AllStoresPage() {
  const stores = getAllStores();

  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Butikker' }]} />

      <div className="mb-10">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          {stores.length.toLocaleString('nb-NO')} butikker
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Alle klesbutikker i Norge
        </h1>
        <p className="editorial-text">
          Komplett oversikt over alle registrerte klesbutikker i Norge.
          Data hentet fra Brønnøysundregistrene, næringskode 47.710.
        </p>
      </div>

      <StoreList stores={stores} showCity />
    </div>
  );
}
