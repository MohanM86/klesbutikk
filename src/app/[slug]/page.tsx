import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreList from '@/components/StoreList';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import { getAllCities, getCityBySlug, getStoresByCitySlug } from '@/lib/stores';
import { getCityContent } from '@/lib/city-content';
import { createMetadata, breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/seo';
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
    title: `Klesbutikker i ${city.name} – Finn motebutikker i ${city.name}`,
    description: `Se alle ${city.storeCount} klesbutikker i ${city.name}. Oppdag lokale motebutikker, designerbutikker og populære shoppingområder i ${city.name}, ${city.fylke}.`,
    path: `/${city.slug}`,
  });
}

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  const stores = getStoresByCitySlug(params.slug);
  const content = getCityContent(city.name);
  const featured = stores.filter((s) => s.featured);

  const bcSchema = breadcrumbSchema([
    { name: 'Byer', url: '/by' },
    { name: city.name, url: `/${city.slug}` },
  ]);

  const fSchema = faqSchema(content.faqs);

  const storeListSchema = itemListSchema(
    stores.slice(0, 50).map((s) => ({
      name: s.navn,
      url: `/butikk/${s.slug}`,
    }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeListSchema) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs items={[{ label: 'Byer', href: '/by' }, { label: city.name }]} />

        {/* Hero */}
        <div className="mb-12 md:mb-16">
          <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
            {city.fylke} · {city.storeCount} butikker
          </p>
          <h1 className="font-display text-hero-sm md:text-hero font-semibold text-charcoal mb-6">
            Klesbutikker i{' '}
            <span className="italic font-normal">{city.name}</span>
          </h1>
          <div className="editorial-text">
            <p>{content.intro}</p>
          </div>
        </div>

        {/* Featured stores */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              Fremhevede butikker i {city.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                  <h3 className="font-display text-base font-semibold mb-1 line-clamp-1">
                    {store.navn}
                  </h3>
                  <p className="font-body text-sm text-white/60 line-clamp-1">{store.adresse}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All stores */}
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Alle klesbutikker i {city.name}
          </h2>
          <StoreList stores={stores} />
        </section>

        {/* Shopping info */}
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-4">
            Shopping i {city.name}
          </h2>
          <div className="editorial-text">
            <p>{content.shoppingInfo}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 max-w-3xl">
          <FAQAccordion faqs={content.faqs} title={`Ofte stilte spørsmål om klesbutikker i ${city.name}`} />
        </section>

        {/* CTA */}
        <CTASection
          title={`Driver du en klesbutikk i ${city.name}?`}
          description={`Bli synlig for alle som søker etter motebutikker i ${city.name}. Få en fremhevet plassering i dag.`}
        />

        {/* Internal links */}
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
            Utforsk andre byer
          </h2>
          <div className="flex flex-wrap gap-2">
            {getAllCities()
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
