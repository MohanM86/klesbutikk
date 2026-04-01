import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreList from '@/components/StoreList';
import CTASection from '@/components/CTASection';
import { getAllFylker, getFylkeBySlug, getStoresByFylkeSlug, getAllCities } from '@/lib/stores';
import { createMetadata, breadcrumbSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllFylker().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fylke = getFylkeBySlug(params.slug);
  if (!fylke) return {};

  return createMetadata({
    title: `Klesbutikker i ${fylke.name} – Alle motebutikker i fylket`,
    description: `Se alle ${fylke.storeCount} klesbutikker i ${fylke.name}. Finn motebutikker i ${fylke.cities.slice(0, 3).join(', ')} og flere byer.`,
    path: `/fylke/${fylke.slug}`,
  });
}

export default function FylkePage({ params }: PageProps) {
  const fylke = getFylkeBySlug(params.slug);
  if (!fylke) notFound();

  const stores = getStoresByFylkeSlug(params.slug);
  const cities = getAllCities().filter((c) => c.fylke === fylke.name);

  const bcSchema = breadcrumbSchema([
    { name: 'Fylker', url: '/fylker' },
    { name: fylke.name, url: `/fylke/${fylke.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs items={[{ label: 'Fylker', href: '/fylker' }, { label: fylke.name }]} />

        <div className="mb-12">
          <p className="font-body text-xs font-semibold font-bold text-accent mb-3">
            {fylke.storeCount} butikker · {fylke.cities.length} byer
          </p>
          <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-4">
            Klesbutikker i {fylke.name}
          </h1>
          <p className="font-body text-base text-muted max-w-lg">
            Utforsk alle {fylke.storeCount} klesbutikker i {fylke.name}. Fylket har klesbutikker
            i {fylke.cities.length} byer, inkludert {fylke.cities.slice(0, 3).join(', ')}.
          </p>
        </div>

        {/* Cities in this fylke */}
        <section className="mb-12">
          <h2 className="font-body text-xl font-extrabold text-charcoal mb-4">
            Byer i {fylke.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="font-body text-sm text-muted hover:text-accent border border-border rounded-lg px-4 py-2 transition-colors hover:border-accent"
              >
                {city.name} ({city.storeCount})
              </Link>
            ))}
          </div>
        </section>

        {/* All stores */}
        <section className="mb-16">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">
            Alle klesbutikker i {fylke.name}
          </h2>
          <StoreList stores={stores} showCity />
        </section>

        <CTASection />
      </div>
    </>
  );
}
