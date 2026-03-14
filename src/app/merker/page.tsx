import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllBrands } from '@/lib/stores';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Klesmerker i Norge – Finn butikker med ditt favorittmerke',
  description: 'Oversikt over 400+ klesmerker i norske butikker. Finn hvor du kan kjøpe Holzweiler, GANT, Filippa K, Nike og mange flere merker i Norge.',
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

export default function BrandsPage() {
  const brands = getAllBrands();

  const norwegianBrands = brands.filter((b) => NORWEGIAN_BRAND_NAMES.has(b.name));
  const internationalBrands = brands.filter((b) => !NORWEGIAN_BRAND_NAMES.has(b.name));

  // Sort each group: brands with stores first, then alphabetically
  const sortGroup = (arr: typeof brands) =>
    [...arr].sort((a, b) => {
      if (a.storeCount !== b.storeCount) return b.storeCount - a.storeCount;
      return a.name.localeCompare(b.name);
    });

  const sortedNorwegian = sortGroup(norwegianBrands);
  const sortedInternational = sortGroup(internationalBrands);

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
          Finn hvor du kan kjøpe ditt favorittmerke. Vi har kartlagt over {brands.length} klesmerker
          og hvilke norske butikker som fører dem.
        </p>
      </div>

      {/* Norwegian & Scandinavian */}
      {sortedNorwegian.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Norske og skandinaviske merker
          </h2>
          <div className="flex flex-wrap gap-3">
            {sortedNorwegian.map((brand) => (
              <BrandPill key={brand.slug} brand={brand} variant="dark" />
            ))}
          </div>
        </section>
      )}

      {/* International */}
      {sortedInternational.length > 0 && (
        <section>
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Internasjonale merker
          </h2>
          <div className="flex flex-wrap gap-3">
            {sortedInternational.map((brand) => (
              <BrandPill key={brand.slug} brand={brand} variant="light" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BrandPill({
  brand,
  variant,
}: {
  brand: { name: string; slug: string; storeCount: number };
  variant: 'dark' | 'light';
}) {
  return (
    <Link
      href={`/merke/${brand.slug}`}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 card-hover ${
        variant === 'dark'
          ? 'bg-charcoal text-white hover:bg-slate'
          : 'bg-white border border-border text-charcoal hover:border-charcoal/30'
      }`}
    >
      <span className={`w-7 h-7 rounded-full flex items-center justify-center ${
        variant === 'dark' ? 'bg-white/15' : 'bg-charcoal'
      }`}>
        <span className={`font-display text-xs font-semibold ${
          variant === 'dark' ? 'text-white' : 'text-white'
        }`}>
          {brand.name.charAt(0)}
        </span>
      </span>
      <span className="font-body text-sm font-medium">{brand.name}</span>
      {brand.storeCount > 0 && (
        <span className={`font-body text-xs px-2 py-0.5 rounded-full ${
          variant === 'dark' ? 'bg-white/10 text-white/70' : 'bg-cream text-muted'
        }`}>
          {brand.storeCount}
        </span>
      )}
    </Link>
  );
}
