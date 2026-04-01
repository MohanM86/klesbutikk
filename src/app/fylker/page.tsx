import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllFylker } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesbutikker etter fylke i Norge',
  description: 'Se klesbutikker sortert etter fylke. Finn motebutikker i alle 15 norske fylker.',
  path: '/fylker',
});

export default function FylkerPage() {
  const fylker = getAllFylker();
  return (
    <>
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Fylker' }]} />
          <div className="flex items-end justify-between mt-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-surface text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                {fylker.length} fylker
              </div>
              <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Klesbutikker etter fylke</h1>
              <p className="font-body text-base text-muted max-w-lg">Utforsk klesbutikker i alle norske fylker. Hvert fylke har sitt eget unike motetilbud.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fylker.map((fylke, i) => (
              <Link key={fylke.slug} href={`/fylke/${fylke.slug}`}
                className={`group relative rounded-lg p-6 overflow-hidden transition-all duration-200 hover:shadow-xl ${
                  i === 0 ? 'bg-charcoal text-white' : i === 1 ? 'bg-accent text-white' : 'bg-cream border border-border hover:border-accent'
                }`}>
                <span className={`absolute right-2 -top-1 font-body text-[70px] font-black leading-none select-none pointer-events-none ${
                  i === 0 ? 'text-white/[0.04]' : i === 1 ? 'text-white/10' : 'text-charcoal/[0.03]'
                }`}>{fylke.name.charAt(0)}</span>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className={`font-body text-lg font-extrabold transition-colors ${i >= 2 ? 'text-charcoal group-hover:text-accent' : 'text-white'}`}>{fylke.name}</h2>
                    <span className={`font-body text-xs font-bold px-2.5 py-1 rounded-lg ${
                      i === 0 ? 'bg-white/10 text-white' : i === 1 ? 'bg-white/20 text-white' : 'bg-accent-light text-accent'
                    }`}>{fylke.storeCount} butikker</span>
                  </div>
                  <p className={`font-body text-xs mb-3 ${i === 0 ? 'text-white/50' : i === 1 ? 'text-white/70' : 'text-muted'}`}>
                    {fylke.cities.length} byer med klesbutikker
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {fylke.cities.slice(0, 5).map((city) => (
                      <span key={city} className={`font-body text-[11px] px-2 py-0.5 rounded-md ${
                        i === 0 ? 'bg-white/[0.06] text-white/60' : i === 1 ? 'bg-white/10 text-white/70' : 'bg-surface text-muted'
                      }`}>{city}</span>
                    ))}
                    {fylke.cities.length > 5 && (
                      <span className={`font-body text-[11px] px-2 py-0.5 ${i < 2 ? 'text-white/30' : 'text-muted/50'}`}>+{fylke.cities.length - 5} til</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
