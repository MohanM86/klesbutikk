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
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 md:pt-10">
        <Breadcrumbs items={[{ label: 'Byer', href: '/by' }, { label: city.name }]} />

        <div className="mt-4 mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-surface text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            {city.fylke}
          </div>
          <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-3">
            Klesbutikker i {city.name}
          </h1>
          <p className="font-body text-base text-muted max-w-lg mb-8">{content.intro}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-accent rounded-lg p-4 text-center">
              <span className="font-body text-2xl md:text-3xl font-extrabold text-white">{city.storeCount}</span>
              <span className="block font-body text-xs text-white/70 mt-1">Klesbutikker</span>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <span className="font-body text-2xl md:text-3xl font-extrabold text-charcoal">{cityBrands.length}</span>
              <span className="block font-body text-xs text-muted mt-1">Merker</span>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <span className="font-body text-2xl md:text-3xl font-extrabold text-charcoal">{withEmployees}</span>
              <span className="block font-body text-xs text-muted mt-1">Med ansatte</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ─── STICKY NAV ───────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
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
                className="font-body text-xs font-semibold text-muted hover:text-accent px-3 py-1.5 rounded-xl hover:bg-accent-light transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-8xl mx-auto section-padding pb-16 md:pb-22">

        {/* ─── OVERVIEW ANCHOR ───────────────────────────── */}
        <div id="oversikt" className="pt-8"></div>

        {/* ─── CATEGORIES ─────────────────────────────────── */}
        <section id="kategorier" className="mb-16 pt-8">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">
            Butikker etter kategori i {city.name}
          </h2>
          <p className="font-body text-base text-muted max-w-lg mb-8">
            Klikk på en kategori for å se alle {city.name}-butikker innen den kategorien.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryCounts.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}/${city.slug}`}
                className="group bg-cream border border-border rounded-lg p-4 text-center card-hover"
              >
                <span className="font-body text-2xl font-extrabold text-charcoal group-hover:text-accent transition-colors">
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
            <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">
              Klesmerker i {city.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cityBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/merke/${brand.slug}/${city.slug}`}
                  className="inline-flex items-center gap-2 bg-cream border border-border rounded-lg px-4 py-2 font-body text-sm text-charcoal hover:border-accent transition-colors"
                >
                  <span className="w-6 h-6 rounded-lg bg-charcoal flex items-center justify-center">
                    <span className="font-body text-[10px] font-extrabold text-white">{brand.name.charAt(0)}</span>
                  </span>
                  {brand.name}
                  <span className="text-xs text-muted bg-surface px-1.5 py-0.5 rounded-lg">
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
              <h2 className="font-body text-display-sm font-extrabold text-charcoal">
                Alle klesbutikker i {city.name}
              </h2>
              <p className="font-body text-sm text-muted mt-1">
                {stores.length} klesbutikker kartlagt i denne kommunen
              </p>
            </div>
          </div>

          <StoreList stores={stores} />
        </section>

        {/* ─── MARKET DATA ────────────────────────────────── */}
        <section id="marked" className="mb-16 pt-8">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">
            Klesmarkedet i {city.name}
          </h2>
          <div className="bg-cream border border-border rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{stores.length}</span>
                <span className="block font-body text-xs text-muted mt-1">Registrerte bedrifter</span>
              </div>
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{withEmployees}</span>
                <span className="block font-body text-xs text-muted mt-1">Med ansatte</span>
              </div>
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{cityBrands.length}</span>
                <span className="block font-body text-xs text-muted mt-1">Identifiserte merker</span>
              </div>
              <div>
                <span className="font-body text-3xl font-extrabold text-accent">✓</span>
                <span className="block font-body text-xs text-muted mt-1">Verifisert data</span>
              </div>
            </div>

            <p className="font-body text-xs text-muted">
              Vi oppdaterer informasjonen jevnlig for å sikre at alt er korrekt.
            </p>
          </div>
        </section>

        {/* ─── SHOPPING INFO ──────────────────────────────── */}
        <section className="mb-16">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-4">
            Shopping i {city.name}
          </h2>
          <div className="font-body text-base text-muted max-w-lg">
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
            <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">
              Klesbutikker i nærheten
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group bg-cream border border-border rounded-lg p-4 card-hover"
                >
                  <span className="font-body text-base font-extrabold text-charcoal group-hover:text-accent transition-colors">
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
          <h2 className="font-body text-xl font-extrabold text-charcoal mb-4">
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
                  className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-lg px-4 py-1.5 transition-colors hover:border-accent"
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
