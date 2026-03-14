import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import CTASection from '@/components/CTASection';
import { getAllBrands, getBrandBySlug, getStoresByBrandSlug, getAllCities } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllBrands().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};

  return createMetadata({
    title: `${brand.name} butikker i Norge – Finn ${brand.name} nær deg`,
    description: `Se alle butikker som fører ${brand.name} i Norge. Finn ${brand.name} i ${brand.cities.slice(0, 3).join(', ')} og ${brand.cities.length} andre byer.`,
    path: `/merke/${brand.slug}`,
  });
}

export default function BrandPage({ params }: PageProps) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const stores = getStoresByBrandSlug(params.slug);

  const bcSchema = breadcrumbSchema([
    { name: 'Merker', url: '/merker' },
    { name: brand.name, url: `/merke/${brand.slug}` },
  ]);

  const brandFaqs = [
    {
      question: `Hvor kan jeg kjøpe ${brand.name} i Norge?`,
      answer: `${brand.name} selges i ${brand.storeCount} butikker i Norge, blant annet i ${brand.cities.slice(0, 5).join(', ')}. Se vår komplette liste over ${brand.name}-forhandlere nedenfor.`,
    },
    {
      question: `Finnes det ${brand.name}-butikker i Oslo?`,
      answer: brand.cities.includes('Oslo')
        ? `Ja, ${brand.name} finnes i butikker i Oslo. Se listen nedenfor for alle ${brand.name}-forhandlere i Oslo.`
        : `Vi har foreløpig ikke registrert ${brand.name}-butikker i Oslo, men sjekk listen for andre byer.`,
    },
    {
      question: `Hvor mange ${brand.name}-butikker finnes i Norge?`,
      answer: `Det er ${brand.storeCount} registrerte butikker som fører ${brand.name} i Norge, fordelt over ${brand.cities.length} byer i ${brand.fylker.length} fylker.`,
    },
  ];

  const fSchema = faqSchema(brandFaqs);

  const storeListSchema = itemListSchema(
    stores.map((s) => ({
      name: `${s.navn} – ${brand.name} i ${s.poststed}`,
      url: `/butikk/${s.slug}`,
    }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeListSchema) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs items={[{ label: 'Merker', href: '/merker' }, { label: brand.name }]} />

        {/* Hero */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center">
              <span className="font-display text-2xl font-semibold text-white">
                {brand.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-1">
                Klesmerke · {brand.storeCount} butikker · {brand.cities.length} byer
              </p>
              <h1 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
                {brand.name} <span className="italic font-normal">i Norge</span>
              </h1>
            </div>
          </div>

          <p className="editorial-text">
            Finn alle butikker som fører {brand.name} i Norge. Merket er tilgjengelig
            i {brand.storeCount} butikker fordelt over {brand.cities.length} byer
            i {brand.fylker.length} fylker. {brand.cities.length > 3
              ? `De største byene med ${brand.name} inkluderer ${brand.cities.slice(0, 3).join(', ')}.`
              : `Du finner ${brand.name} i ${brand.cities.join(' og ')}.`}
          </p>
        </div>

        {/* Cities with this brand */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
            Byer med {brand.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {brand.cities.map((city) => (
              <Link
                key={city}
                href={`/${slugify(city)}`}
                className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-2 transition-colors hover:border-charcoal"
              >
                {city}
              </Link>
            ))}
          </div>
        </section>

        {/* All stores with this brand */}
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            {brand.name}-butikker i Norge
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stores.map((store) => (
              <StoreCard key={store.organisasjonsnummer} store={store} showCity />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 max-w-3xl">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Ofte stilte spørsmål om {brand.name}
          </h2>
          <div className="divide-y divide-border border-t border-b border-border">
            {brandFaqs.map((faq, i) => (
              <div key={i} className="py-5">
                <h3 className="font-display text-base font-medium text-charcoal mb-2">
                  {faq.question}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO text */}
        <section className="mb-16 max-w-3xl">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
            Om {brand.name}
          </h2>
          <div className="font-body text-muted leading-relaxed space-y-3">
            <p>
              {brand.name} er et populært klesmerke som selges i {brand.storeCount} butikker
              over hele Norge. Du finner {brand.name} i {brand.cities.length} norske byer,
              inkludert {brand.cities.slice(0, 5).join(', ')}.
            </p>
            <p>
              Bruk vår oversikt for å finne nærmeste {brand.name}-forhandler. Alle butikkene
              er registrert med adresse og kontaktinformasjon slik at du enkelt kan planlegge
              ditt besøk.
            </p>
          </div>
        </section>

        {/* Other brands */}
        <section className="mb-16 pt-12 border-t border-border">
          <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
            Utforsk andre merker
          </h2>
          <div className="flex flex-wrap gap-2">
            {getAllBrands()
              .filter((b) => b.slug !== brand.slug)
              .slice(0, 20)
              .map((b) => (
                <Link
                  key={b.slug}
                  href={`/merke/${b.slug}`}
                  className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-1.5 transition-colors hover:border-charcoal"
                >
                  {b.name}
                </Link>
              ))}
          </div>
        </section>

        <CTASection
          title={`Selger du ${brand.name}?`}
          description={`Få din butikk fremhevet som ${brand.name}-forhandler og nå kunder som søker etter merket.`}
        />
      </div>
    </>
  );
}
