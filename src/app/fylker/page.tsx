import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';
import { getAllFylker, getStats } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Fylker | Klesbutikker i alle Norges fylker',
  description: 'Se klesbutikker i alle 15 fylker i Norge. Velg ditt fylke for å finne klesbutikker i din region.',
  path: '/fylker',
});

export default function FylkerPage() {
  const fylker = getAllFylker();
  const stats = getStats();
  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Fylker' }]} />
          <div className="mt-4">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-2">Alle fylker</h1>
            <p className="font-body text-base text-white/50">{stats.totalStores.toLocaleString('nb-NO')} klesbutikker i {stats.totalFylker} fylker</p>
          </div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fylker.map((f) => (
              <Link key={f.slug} href={'/fylke/' + f.slug} className="group border border-border rounded-lg p-5 hover:border-black transition-all duration-150">
                <h2 className="font-body text-[15px] font-bold text-black mb-1 group-hover:text-accent transition-colors">{f.name}</h2>
                <p className="font-body text-[13px] text-accent font-semibold mb-2">{f.storeCount} butikker · {f.cities.length} kommuner</p>
                <p className="font-body text-[11px] text-muted line-clamp-2">{f.cities.slice(0, 8).join(', ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
