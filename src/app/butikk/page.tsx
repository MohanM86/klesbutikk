import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AllStoresSearch from '@/components/AllStoresSearch';
import { getAllStores } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Alle klesbutikker i Norge - 1 566 butikker fra A til A',
  description: 'Komplett oversikt over alle registrerte klesbutikker i Norge. Sok, filtrer etter by, fylke og bokstav.',
  path: '/butikk',
});

export default function AllStoresPage() {
  const stores = getAllStores();
  const cities = Array.from(new Set(stores.map((s) => s.poststed))).sort();
  const fylker = Array.from(new Set(stores.map((s) => s.fylke))).sort();

  return (
    <>
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Butikker' }]} />
          <div className="flex items-end justify-between mt-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-surface text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349" /></svg>
                {stores.length.toLocaleString('nb-NO')} butikker
              </div>
              <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Alle klesbutikker i Norge</h1>
              <p className="font-body text-base text-muted max-w-lg">Sok, filtrer og bla gjennom alle registrerte klesbutikker fra A til A.</p>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-right">
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{stores.length.toLocaleString('nb-NO')}</span>
                <span className="block font-body text-xs text-muted">Butikker</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{cities.length}</span>
                <span className="block font-body text-xs text-muted">Byer</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{fylker.length}</span>
                <span className="block font-body text-xs text-muted">Fylker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <AllStoresSearch stores={stores} cities={cities} fylker={fylker} />
        </div>
      </section>
    </>
  );
}
