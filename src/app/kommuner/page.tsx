import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';
import { getAllCities, getAllFylker } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Kommuner | Klesbutikker i alle Norges kommuner',
  description: 'Finn klesbutikker i din kommune. Vi dekker 357 kommuner i alle 15 fylker i Norge.',
  path: '/kommuner',
});

export default function KommunerPage() {
  const cities = getAllCities();
  const fylker = getAllFylker();

  const citiesByFylke = new Map<string, typeof cities>();
  for (const c of cities) {
    if (!citiesByFylke.has(c.fylke)) citiesByFylke.set(c.fylke, []);
    citiesByFylke.get(c.fylke)!.push(c);
  }

  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Kommuner' }]} />
          <div className="mt-4">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-2">Alle kommuner</h1>
            <p className="font-body text-base text-white/50">{cities.length} kommuner med klesbutikker i {fylker.length} fylker</p>
          </div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="max-w-8xl mx-auto section-padding">
          {fylker.map((fylke) => {
            const fCities = citiesByFylke.get(fylke.name) || [];
            if (fCities.length === 0) return null;
            return (
              <div key={fylke.slug} className="mb-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="font-body text-lg font-extrabold text-black">{fylke.name}</h2>
                  <span className="font-body text-xs text-muted">{fylke.storeCount} butikker</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {fCities.map((city) => (
                    <Link key={city.slug} href={'/' + city.slug} className="font-body text-[13px] text-slate hover:text-black border border-border rounded-lg px-3.5 py-2.5 hover:border-black transition-all duration-150">
                      <span className="font-semibold text-black">{city.name}</span>
                      <span className="text-accent ml-1.5 text-[11px] font-semibold">{city.storeCount}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
