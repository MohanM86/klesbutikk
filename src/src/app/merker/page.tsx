import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import BrandSearch from '@/components/BrandSearch';
import { getAllBrands } from '@/lib/stores';
import { createMetadata, itemListSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesmerker i Norge – Finn butikker med ditt favorittmerke',
  description: 'Oversikt over 483 klesmerker i norske butikker. Finn hvor du kan kjøpe Holzweiler, Filippa K, Nike, Ganni og hundrevis av andre merker.',
  path: '/merker',
});

const NORWEGIAN_BRAND_NAMES = new Set([
  'Holzweiler', 'Stormberg', 'Devold', 'Northern Playground', 'BRGN by Lunde & Gaundal',
  'Lillelam', 'Camilla Pihl', 'Dressmann', 'Cubus', 'Bik Bok', 'Carlings',
  'Høyer', 'Companys', 'Kleins', 'Retro', 'Floyd', 'Best Kids', 'Active Brands',
  'Amundsen', 'Helly Hansen', 'Norrøna', 'Dale of Norway', 'Aclima', 'Ulvang',
  'Dæhlie', 'Swix', 'Sweet Protection', 'Kari Traa', 'Johaug', 'Viking',
  'BY TIMO', 'Hestra', 'Elvine', 'We Norwegians',
  'Stine Goya', 'Ganni', 'Samsøe Samsøe', 'Baum und Pferdgarten', 'Munthe',
  'Custommade', 'By Malene Birger', 'DAY Birger et Mikkelsen', 'Bruuns Bazaar',
  'Mads Nørgaard', 'Norse Projects', 'NN07', 'Les Deux', 'Rains', 'Wood Wood',
  'Han Kjøbenhavn', 'Our Legacy', 'Rodebjer', 'TotêMe', 'Anine Bing',
  'Filippa K', 'Acne Studios', 'Tiger of Sweden', 'J.Lindeberg', 'Oscar Jacobson',
  'Stenströms', 'Eton', 'Hope', 'Peak Performance', 'Sail Racing',
  'Becksöndergaard', 'Stutterheim', 'Sand', 'Matinique', 'Minimum',
  'Knowledge Cotton Apparel', 'ROTATE Birger Christensen',
  'Copenhagen Shoes', 'Copenhagen Studios', 'Coster Copenhagen',
  'Birgitte Herskind', 'Hofmann Copenhagen', 'Sofie Schnoor', 'Stella Nova',
  'Neo Noir', 'Noella', 'Gestuz', 'Moss Copenhagen', 'MOS MOSH',
  'Casall', 'Craft', 'Didriksons', 'Fjällräven', 'Haglöfs', 'Houdini',
  'Klättermusen', 'H2O Fagerholt', 'Gina Tricot', 'Lindex', 'KappAhl',
]);

const HERO_BRANDS = ['Holzweiler', 'Høyer', 'Filippa K', 'Ganni', 'Nike'];

export default function BrandsPage() {
  const allBrands = getAllBrands();
  const sortedBrands = [...allBrands].sort((a, b) => {
    if (a.storeCount !== b.storeCount) return b.storeCount - a.storeCount;
    return a.name.localeCompare(b.name);
  });

  const heroBrands = HERO_BRANDS.map((name) => allBrands.find((b) => b.name === name)).filter(Boolean) as typeof allBrands;
  const withStores = sortedBrands.filter((b) => b.storeCount > 0).length;
  const norwegian = allBrands.filter((b) => NORWEGIAN_BRAND_NAMES.has(b.name));
  const international = allBrands.filter((b) => !NORWEGIAN_BRAND_NAMES.has(b.name));

  const brandListSchema = itemListSchema(
    sortedBrands.slice(0, 20).map((b) => ({ name: b.name, url: `/merke/${b.slug}` }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandListSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-accent-light/50 to-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-0 md:pt-10">
          <Breadcrumbs items={[{ label: 'Merker' }]} />

          <div className="flex items-end justify-between mt-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                </svg>
                {allBrands.length} klesmerker kartlagt
              </div>
              <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">
                Klesmerker i Norge
              </h1>
              <p className="font-body text-base text-muted max-w-lg">
                Finn hvor du kan kjøpe favorittmerket ditt. Vi har kartlagt over {allBrands.length} klesmerker og hvilke norske butikker som fører dem.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-right">
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{allBrands.length}</span>
                <span className="block font-body text-xs text-muted">Merker totalt</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-accent">{withStores}</span>
                <span className="block font-body text-xs text-muted">Med butikker</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{norwegian.length}</span>
                <span className="block font-body text-xs text-muted">Norske merker</span>
              </div>
            </div>
          </div>

          {/* ─── FEATURED BRANDS ─────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pb-10">
            {heroBrands.map((brand, i) => (
              <Link key={brand.slug} href={`/merke/${brand.slug}`}
                className={`group relative rounded-2xl p-5 min-h-[130px] overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                  i === 0 ? 'bg-charcoal text-white' :
                  i === 1 ? 'bg-accent text-white' :
                  'bg-white border-2 border-border hover:border-accent text-charcoal'
                }`}>
                <span className={`absolute right-1 -top-2 font-body text-[80px] font-black leading-none select-none pointer-events-none ${
                  i === 0 ? 'text-white/[0.04]' : i === 1 ? 'text-white/10' : 'text-charcoal/[0.03]'
                }`}>{brand.name.charAt(0)}</span>
                <div className="relative">
                  <h2 className={`font-body text-base font-extrabold mb-1 transition-colors ${
                    i >= 2 ? 'text-charcoal group-hover:text-accent' : 'text-white'
                  }`}>{brand.name}</h2>
                  <p className={`font-body text-xs mb-3 ${
                    i === 0 ? 'text-white/50' : i === 1 ? 'text-white/70' : 'text-muted'
                  }`}>
                    {NORWEGIAN_BRAND_NAMES.has(brand.name) ? 'Norsk' : 'Internasjonalt'} merke
                  </p>
                  <span className={`inline-flex items-center font-body text-xs font-bold px-2.5 py-1 rounded-lg ${
                    i === 0 ? 'bg-white/10 text-white' :
                    i === 1 ? 'bg-white/20 text-white' :
                    'bg-accent-light text-accent'
                  }`}>
                    {brand.storeCount} {brand.storeCount === 1 ? 'butikk' : 'butikker'} · {brand.cities.length} {brand.cities.length === 1 ? 'by' : 'byer'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEARCH + GRID ───────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <BrandSearch
            brands={sortedBrands}
            norwegianNames={NORWEGIAN_BRAND_NAMES}
          />
        </div>
      </section>

      {/* ─── SEO TEXT ─────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-3">Klesmerker i norske butikker</h2>
            <div className="font-body text-sm text-muted leading-relaxed space-y-2">
              <p>
                Vi har kartlagt over {allBrands.length} klesmerker og identifisert hvilke norske klesbutikker
                som fører dem. Fra norske favoritter som Holzweiler, Stine Goya og Filippa K til
                internasjonale stormerker som Nike, Gucci og Zara.
              </p>
              <p>
                {norwegian.length} av merkene er norske eller skandinaviske, mens {international.length} er
                internasjonale merker. Merkene er identifisert gjennom mønstergjenkjenning i butikknavn
                kartlagt i vår database.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
