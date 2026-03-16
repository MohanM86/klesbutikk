import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CityCard from '@/components/CityCard';
import CitySearch from '@/components/CitySearch';
import { getAllCities, getAllFylker } from '@/lib/stores';
import { createMetadata, itemListSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesbutikker i alle byer i Norge',
  description: 'Finn klesbutikker i din by. Komplett oversikt over 368 byer med klesbutikker i hele Norge, fra Oslo til Tromsø.',
  path: '/by',
});

const HERO_CITIES = [
  { name: 'Oslo', slug: 'oslo', fylke: 'Oslo', accent: 'dark' as const },
  { name: 'Bergen', slug: 'bergen', fylke: 'Vestland', accent: 'orange' as const },
  { name: 'Trondheim', slug: 'trondheim', fylke: 'Trøndelag', accent: 'light' as const },
  { name: 'Stavanger', slug: 'stavanger', fylke: 'Rogaland', accent: 'light' as const },
  { name: 'Kristiansand', slug: 'kristiansand', fylke: 'Agder', accent: 'light' as const },
];

export default function CitiesPage() {
  const cities = getAllCities();
  const fylker = getAllFylker();
  const heroData = HERO_CITIES.map((h) => ({
    ...h,
    storeCount: cities.find((c) => c.slug === h.slug)?.storeCount || 0,
  }));
  const restCities = cities.filter((c) => !HERO_CITIES.some((h) => h.slug === c.slug));

  const cityListSchema = itemListSchema(
    cities.slice(0, 20).map((c) => ({ name: `Klesbutikker i ${c.name}`, url: `/${c.slug}` }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-accent-light/50 to-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-0 md:pt-10">
          <Breadcrumbs items={[{ label: 'Byer' }]} />

          <div className="flex items-end justify-between mt-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {cities.length} byer i hele Norge
              </div>
              <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">
                Finn klesbutikker i din by
              </h1>
              <p className="font-body text-base text-muted max-w-lg">
                Utforsk klesbutikker i byer over hele Norge. Velg en by for å se alle butikker, merker og kategorier i området.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-right">
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{cities.length}</span>
                <span className="block font-body text-xs text-muted">Byer</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-accent">{fylker.length}</span>
                <span className="block font-body text-xs text-muted">Fylker</span>
              </div>
            </div>
          </div>

          {/* ─── FEATURED CITIES ─────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pb-10">
            {heroData.map((city) => (
              <Link key={city.slug} href={`/${city.slug}`}
                className={`group relative rounded-2xl p-5 min-h-[140px] overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                  city.accent === 'dark' ? 'bg-charcoal text-white' :
                  city.accent === 'orange' ? 'bg-accent text-white' :
                  'bg-white border-2 border-border hover:border-accent text-charcoal'
                }`}>
                <span className={`absolute right-1 -top-2 font-body text-[90px] font-black leading-none select-none pointer-events-none ${
                  city.accent === 'dark' ? 'text-white/[0.04]' :
                  city.accent === 'orange' ? 'text-white/10' :
                  'text-charcoal/[0.03]'
                }`}>{city.name.charAt(0)}</span>
                <div className="relative">
                  <h2 className={`font-body text-lg font-extrabold mb-1 transition-colors ${
                    city.accent === 'light' ? 'text-charcoal group-hover:text-accent' : 'text-white'
                  }`}>{city.name}</h2>
                  <p className={`font-body text-xs mb-3 ${
                    city.accent === 'dark' ? 'text-white/50' :
                    city.accent === 'orange' ? 'text-white/70' : 'text-muted'
                  }`}>{city.fylke}</p>
                  <span className={`inline-flex items-center font-body text-xs font-bold px-2.5 py-1 rounded-lg ${
                    city.accent === 'dark' ? 'bg-white/10 text-white' :
                    city.accent === 'orange' ? 'bg-white/20 text-white' :
                    'bg-accent-light text-accent'
                  }`}>{city.storeCount} butikker</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEARCH + GRID ───────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <CitySearch cities={restCities} fylker={fylker} />
        </div>
      </section>

      {/* ─── SEO TEXT ─────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-3">Klesbutikker i alle norske byer</h2>
            <div className="font-body text-sm text-muted leading-relaxed space-y-2">
              <p>
                Norge har {cities.length} byer med registrerte klesbutikker fordelt på {fylker.length} fylker.
                Oslo er desidert størst med over 250 klesbutikker, etterfulgt av Bergen, Stavanger og
                Trondheim med rundt 39 butikker hver.
              </p>
              <p>
                Oversikten
                oppdateres jevnlig for å sikre at informasjonen er korrekt og oppdatert.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
