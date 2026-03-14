import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllBrands } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesmerker i Norge – Finn butikker med ditt favorittmerke',
  description: 'Oversikt over klesmerker i norske butikker. Finn hvor du kan kjøpe Holzweiler, GANT, Filippa K, H&M og mange flere merker i Norge.',
  path: '/merker',
});

export default function BrandsPage() {
  const brands = getAllBrands();

  const norwegianBrands = brands.filter((b) =>
    ['Holzweiler', 'Stormberg', 'Devold', 'Northern Playground', 'BRGN', 'Livid Jeans', 'Woolland', 'Lillelam', 'Oleana', 'Skogstad', 'Camilla Pihl', 'Dressmann', 'Cubus', 'Bik Bok', 'Carlings', 'Volt', 'Voice', 'Junkyard', 'Follestad', 'Høyer', 'Companys', 'Kleins', 'Retro', 'Floyd', 'Best Kids', 'Active Brands'].includes(b.name)
  );
  const internationalBrands = brands.filter((b) => !norwegianBrands.includes(b));

  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Merker' }]} />

      <div className="mb-12">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          {brands.length} merker
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Klesmerker i Norge
        </h1>
        <p className="editorial-text">
          Finn hvor du kan kjøpe ditt favorittmerke. Vi har kartlagt hvilke klesmerker som
          selges i norske butikker – fra norske designermerker til internasjonale favoritter.
        </p>
      </div>

      {/* Norwegian brands */}
      {norwegianBrands.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Norske og skandinaviske merker
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {norwegianBrands.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>
      )}

      {/* International brands */}
      {internationalBrands.length > 0 && (
        <section>
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Internasjonale merker
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {internationalBrands.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BrandCard({ brand }: { brand: { name: string; slug: string; storeCount: number; cities: string[] } }) {
  return (
    <Link
      href={`/merke/${brand.slug}`}
      className="group block bg-white border border-border rounded-lg p-5 card-hover"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center group-hover:bg-slate transition-colors">
          <span className="font-display text-sm font-semibold text-white">
            {brand.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-charcoal group-hover:text-slate transition-colors">
            {brand.name}
          </h3>
          <p className="font-body text-xs text-muted">
            {brand.storeCount} {brand.storeCount === 1 ? 'butikk' : 'butikker'}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {brand.cities.slice(0, 4).map((city) => (
          <span key={city} className="font-body text-[11px] text-muted/70 bg-cream px-2 py-0.5 rounded-full">
            {city}
          </span>
        ))}
        {brand.cities.length > 4 && (
          <span className="font-body text-[11px] text-muted/50 px-1">
            +{brand.cities.length - 4}
          </span>
        )}
      </div>
    </Link>
  );
}
