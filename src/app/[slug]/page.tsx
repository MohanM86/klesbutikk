import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreList from '@/components/StoreList';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import StoreCard from '@/components/StoreCard';
import { getAllCities, getCityBySlug, getStoresByCitySlug, getAllBrands, getAllFylker } from '@/lib/stores';
import { getCityContent } from '@/lib/city-content';
import { createMetadata, breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  if (!city) return {};
  return createMetadata({
    title: `Klesbutikker i ${city.name} – ${city.storeCount} butikker | Klesbutikk.no`,
    description: `Komplett oversikt over alle ${city.storeCount} klesbutikker i ${city.name}. Finn motebutikker, designerbutikker og lokale favoritter i ${city.name}, ${city.fylke}.`,
    path: `/${city.slug}`,
  });
}

const CATEGORIES = [
  { name: 'Dameklær', slug: 'dameklar', keywords: ['dame', 'kvinne', 'femme', 'femina', 'lady', 'belle'] },
  { name: 'Herreklær', slug: 'herreklar', keywords: ['herre', 'mann', 'men', 'gentleman'] },
  { name: 'Barneklær', slug: 'barneklar', keywords: ['barn', 'baby', 'kids', 'junior', 'mini'] },
  { name: 'Designerbutikker', slug: 'designer', keywords: ['design', 'atelier', 'studio', 'boutique'] },
  { name: 'Vintage', slug: 'vintage', keywords: ['vintage', 'retro', 'second', 'brukt', 'gjenbruk'] },
  { name: 'Sport', slug: 'sport', keywords: ['sport', 'aktiv', 'fitness', 'outdoor'] },
];

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  const stores = getStoresByCitySlug(params.slug);
  const content = getCityContent(city.name);
  const featured = stores.filter((s) => s.featured);
  const allBrands = getAllBrands();

  // Brands present in this city
  const cityBrands = allBrands.filter((b) => b.cities.includes(city.name));

  // Category counts for this city
  const categoryCounts = CATEGORIES.map((cat) => {
    const count = stores.filter((s) =>
      cat.keywords.some((kw) => s.navn.toLowerCase().includes(kw))
    ).length;
    return { ...cat, count };
  });

  // Store stats
  const withEmployees = stores.filter((s) => s.antallAnsatte && s.antallAnsatte > 0).length;

  // Nearby cities (same fylke)
  const allCities = getAllCities();
  const nearbyCities = allCities
    .filter((c) => c.fylke === city.fylke && c.slug !== city.slug)
    .slice(0, 8);

  const bcSchema = breadcrumbSchema([
    { name: 'Byer', url: '/by' },
    { name: city.name, url: `/${city.slug}` },
  ]);
  const fSchema = faqSchema(content.faqs);
  const storeListSchema = itemListSchema(
    stores.slice(0, 50).map((s) => ({ name: s.navn, url: `/butikk/${s.slug}` }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeListSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <div className="max-w-8xl mx-auto section-padding pt-8 md:pt-12">
        <Breadcrumbs items={[{ label: 'Byer', href: '/by' }, { label: city.name }]} />

        <div className="mb-6 md:mb-10">
          <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
            {city.fylke}
          </p>
          <h1 className="font-display text-hero-sm md:text-hero font-semibold text-charcoal mb-4">
            Klesbutikker i{' '}
            <span className="italic font-normal">{city.name}</span>
          </h1>
          <p className="editorial-text mb-8">{content.intro}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-charcoal rounded-lg p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-semibold text-white">{city.storeCount}</span>
              <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-white/50 mt-1">klesbutikker</span>
            </div>
            <div className="bg-white border border-border rounded-lg p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-semibold text-charcoal">{featured.length}</span>
              <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-muted mt-1">fremhevede</span>
            </div>
            <div className="bg-white border border-border rounded-lg p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-semibold text-charcoal">{cityBrands.length}</span>
              <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-muted mt-1">merker</span>
            </div>
            <div className="bg-white border border-border rounded-lg p-4 text-center">
              <span className="font-display text-2xl md:text-3xl font-semibold text-charcoal">{withEmployees}</span>
              <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-muted mt-1">med ansatte</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STICKY NAV ───────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="max-w-8xl mx-auto section-padding">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide -mx-1">
            {[
              { label: 'Oversikt', href: '#oversikt' },
              { label: 'Kategorier', href: '#kategorier' },
              { label: 'Merker', href: '#merker' },
              { label: 'Butikker', href: '#butikker' },
              { label: 'Markedet', href: '#marked' },
              { label: 'FAQ', href: '#faq' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-xs font-medium text-muted hover:text-charcoal px-3 py-1.5 rounded-full hover:bg-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-8xl mx-auto section-padding pb-16 md:pb-22">

        {/* ─── FEATURED ───────────────────────────────────── */}
        {featured.length > 0 && (
          <section id="oversikt" className="pt-12 mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              Fremhevede butikker i {city.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.slice(0, 4).map((store) => (
                <Link
                  key={store.organisasjonsnummer}
                  href={`/butikk/${store.slug}`}
                  className="group block bg-charcoal text-white rounded-lg p-5 card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="font-display text-base font-semibold">{store.navn.charAt(0)}</span>
                    </div>
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full">
                      Fremhevet
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold mb-1 line-clamp-1 group-hover:text-white/80 transition-colors">
                    {store.navn}
                  </h3>
                  <p className="font-body text-sm text-white/60 line-clamp-1">{store.adresse}</p>
                  {store.merker && store.merker.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {store.merker.slice(0, 3).map((m) => (
                        <span key={m} className="font-body text-[10px] text-white/40 bg-white/10 rounded-full px-2 py-0.5">{m}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── CATEGORIES ─────────────────────────────────── */}
        <section id="kategorier" className="mb-16 pt-8">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Butikker etter kategori i {city.name}
          </h2>
          <p className="editorial-text mb-8">
            Klikk på en kategori for å se alle {city.name}-butikker innen den kategorien.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryCounts.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}/${city.slug}`}
                className="group bg-white border border-border rounded-lg p-4 text-center card-hover"
              >
                <span className="font-display text-2xl font-semibold text-charcoal group-hover:text-slate transition-colors">
                  {cat.count}
                </span>
                <span className="block font-body text-xs text-muted mt-1">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── BRANDS IN CITY ─────────────────────────────── */}
        {cityBrands.length > 0 && (
          <section id="merker" className="mb-16 pt-8">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              Klesmerker i {city.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cityBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/merke/${brand.slug}/${city.slug}`}
                  className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 font-body text-sm text-charcoal hover:border-charcoal/30 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center">
                    <span className="font-display text-[10px] font-semibold text-white">{brand.name.charAt(0)}</span>
                  </span>
                  {brand.name}
                  <span className="text-xs text-muted bg-cream px-1.5 py-0.5 rounded-full">
                    {brand.stores.filter((slug) => stores.some((s) => s.slug === slug)).length}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── ALL STORES ─────────────────────────────────── */}
        <section id="butikker" className="mb-16 pt-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-display-sm font-semibold text-charcoal">
                Alle klesbutikker i {city.name}
              </h2>
              <p className="font-body text-sm text-muted mt-1">
                {stores.length} bedrifter registrert under næringskode 47.710 i Brønnøysundregistrene
              </p>
            </div>
          </div>

          <StoreList stores={stores} />
        </section>

        {/* ─── MARKET DATA ────────────────────────────────── */}
        <section id="marked" className="mb-16 pt-8">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Klesmarkedet i {city.name}
          </h2>
          <div className="bg-white border border-border rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <span className="font-display text-3xl font-semibold text-charcoal">{stores.length}</span>
                <span className="block font-body text-xs text-muted mt-1">Registrerte bedrifter</span>
              </div>
              <div>
                <span className="font-display text-3xl font-semibold text-charcoal">{withEmployees}</span>
                <span className="block font-body text-xs text-muted mt-1">Med ansatte</span>
              </div>
              <div>
                <span className="font-display text-3xl font-semibold text-charcoal">{cityBrands.length}</span>
                <span className="block font-body text-xs text-muted mt-1">Identifiserte merker</span>
              </div>
              <div>
                <span className="font-display text-3xl font-semibold text-charcoal">47.710</span>
                <span className="block font-body text-xs text-muted mt-1">Næringskode</span>
              </div>
            </div>

            <p className="font-body text-xs text-muted">
              Kilde: Brønnøysundregistrene, enhetsregisteret. Næringskode 47.710 (Butikkhandel med klær).
            </p>
          </div>
        </section>

        {/* ─── SHOPPING INFO ──────────────────────────────── */}
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-4">
            Shopping i {city.name}
          </h2>
          <div className="editorial-text">
            <p>{content.shoppingInfo}</p>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────── */}
        <section id="faq" className="mb-16 max-w-3xl pt-8">
          <FAQAccordion faqs={content.faqs} title={`Vanlige spørsmål om klesbutikker i ${city.name}`} />
        </section>

        {/* ─── NEARBY CITIES ──────────────────────────────── */}
        {nearbyCities.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              Klesbutikker i nærheten
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group bg-white border border-border rounded-lg p-4 card-hover"
                >
                  <span className="font-display text-base font-semibold text-charcoal group-hover:text-slate transition-colors">
                    {c.name}
                  </span>
                  <span className="block font-body text-xs text-muted mt-1">
                    {c.storeCount} butikker
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── CTA ────────────────────────────────────────── */}
        <CTASection
          title={`Driver du en klesbutikk i ${city.name}?`}
          description={`Bli synlig for alle som søker etter motebutikker i ${city.name}. Få en fremhevet plassering i dag.`}
        />

        {/* ─── INTERNAL LINKS ─────────────────────────────── */}
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
            Utforsk andre byer
          </h2>
          <div className="flex flex-wrap gap-2">
            {allCities
              .filter((c) => c.slug !== city.slug)
              .slice(0, 20)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-1.5 transition-colors hover:border-charcoal"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
