import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import { getAllBrands, getBrandBySlug, getAllStores, getAllCities } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

const TOP_CITIES = [
  'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand',
  'Drammen', 'Tromsø', 'Fredrikstad', 'Sandnes', 'Haugesund',
];

type PageProps = { params: { slug: string; city: string } };

export async function generateStaticParams() {
  const brands = getAllBrands();
  const params: { slug: string; city: string }[] = [];
  for (const brand of brands) {
    for (const cityName of TOP_CITIES) {
      params.push({ slug: brand.slug, city: slugify(cityName) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug);
  const cityName = TOP_CITIES.find((c) => slugify(c) === params.city) || params.city;
  if (!brand) return {};
  return createMetadata({
    title: `${brand.name} i ${cityName} – Finn ${brand.name}-butikker`,
    description: `Se hvor du kan kjøpe ${brand.name} i ${cityName}. Komplett oversikt over klesbutikker som fører ${brand.name} i ${cityName} og nærområdet.`,
    path: `/merke/${brand.slug}/${params.city}`,
  });
}

export default function BrandCityPage({ params }: PageProps) {
  const brand = getBrandBySlug(params.slug);
  const cityName = TOP_CITIES.find((c) => slugify(c) === params.city);
  if (!brand || !cityName) notFound();

  const citySlug = slugify(cityName);
  const allStores = getAllStores();

  // Stores matching this brand in this city
  const cityStores = allStores.filter(
    (s) => s.poststed === cityName && brand.stores.includes(s.slug)
  );

  // Nearby stores (same fylke, different city)
  const cityData = getAllCities().find((c) => c.slug === citySlug);
  const fylke = cityData?.fylke || '';
  const nearbyStores = allStores.filter(
    (s) =>
      s.fylke === fylke &&
      s.poststed !== cityName &&
      brand.stores.includes(s.slug)
  );

  // Other brand stores in this city (for recommendations)
  const otherBrandStores = allStores
    .filter((s) => s.poststed === cityName && !brand.stores.includes(s.slug))
    .slice(0, 6);

  const faqs = [
    {
      question: `Hvor kan jeg kjøpe ${brand.name} i ${cityName}?`,
      answer: cityStores.length > 0
        ? `Det er ${cityStores.length} butikker som fører ${brand.name} i ${cityName}. Se listen nedenfor for adresser og kontaktinfo.`
        : `Vi har foreløpig ikke registrert dedikerte ${brand.name}-butikker i ${cityName} via Brønnøysundregistrene. Merket kan likevel finnes hos multimerke-forhandlere og kjøpesentre i ${cityName}.`,
    },
    {
      question: `Finnes det ${brand.name} outlet i ${cityName}?`,
      answer: `Vi har ikke spesifikk informasjon om ${brand.name} outlet i ${cityName}. Sjekk butikkene i listen eller besøk ${brand.name} sin offisielle nettside for oppdatert informasjon.`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Merker', url: '/merker' },
        { name: brand.name, url: `/merke/${brand.slug}` },
        { name: cityName, url: `/merke/${brand.slug}/${citySlug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs items={[
          { label: 'Merker', href: '/merker' },
          { label: brand.name, href: `/merke/${brand.slug}` },
          { label: cityName },
        ]} />

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center">
              <span className="font-display text-xl font-semibold text-white">{brand.name.charAt(0)}</span>
            </div>
            <div>
              <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-1">
                {brand.name} · {cityName}
              </p>
              <h1 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
                {brand.name} <span className="italic font-normal">i {cityName}</span>
              </h1>
            </div>
          </div>
          <p className="editorial-text">
            {cityStores.length > 0 ? (
              <>
                Finn {brand.name} i {cityName}. Det er {cityStores.length} registrerte
                {cityStores.length === 1 ? ' butikk' : ' butikker'} som fører {brand.name} i {cityName}-området.
              </>
            ) : (
              <>
                Leter du etter {brand.name} i {cityName}? Vi har foreløpig ikke registrert dedikerte
                {' '}{brand.name}-butikker i {cityName}, men merket kan finnes hos lokale forhandlere.
                Se andre klesbutikker i {cityName} nedenfor.
              </>
            )}
          </p>
        </div>

        {/* Matching stores */}
        {cityStores.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              {brand.name}-butikker i {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityStores.map((store) => (
                <StoreCard key={store.organisasjonsnummer} store={store} />
              ))}
            </div>
          </section>
        )}

        {/* Nearby */}
        {nearbyStores.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              {brand.name} i nærheten av {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyStores.slice(0, 6).map((store) => (
                <StoreCard key={store.organisasjonsnummer} store={store} showCity />
              ))}
            </div>
          </section>
        )}

        {/* Other stores in this city */}
        {otherBrandStores.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              Andre klesbutikker i {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherBrandStores.map((store) => (
                <StoreCard key={store.organisasjonsnummer} store={store} />
              ))}
            </div>
            <div className="mt-6">
              <Link href={`/${citySlug}`} className="btn-secondary text-sm">
                Se alle butikker i {cityName}
              </Link>
            </div>
          </section>
        )}

        {/* FAQ */}
        <FAQAccordion faqs={faqs} title={`Ofte stilte spørsmål om ${brand.name} i ${cityName}`} />

        {/* Other cities for this brand */}
        <section className="mt-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            {brand.name} i andre byer
          </h2>
          <div className="flex flex-wrap gap-2">
            {TOP_CITIES.filter((c) => c !== cityName).map((c) => (
              <Link
                key={c}
                href={`/merke/${brand.slug}/${slugify(c)}`}
                className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-1.5 transition-colors hover:border-charcoal"
              >
                {brand.name} i {c}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
