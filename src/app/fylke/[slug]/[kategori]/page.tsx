import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import { getAllStores, getAllFylker, getFylkeBySlug } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';

const CATEGORIES = [
  { name: 'Dameklær', slug: 'dameklar', keywords: ['dame', 'kvinne', 'femme', 'femina', 'lady', 'belle'] },
  { name: 'Herreklær', slug: 'herreklar', keywords: ['herre', 'mann', 'men', 'gentleman'] },
  { name: 'Barneklær', slug: 'barneklar', keywords: ['barn', 'baby', 'kids', 'junior', 'mini'] },
  { name: 'Designerbutikker', slug: 'designer', keywords: ['design', 'atelier', 'studio', 'boutique'] },
  { name: 'Vintage og gjenbruk', slug: 'vintage', keywords: ['vintage', 'retro', 'second', 'brukt', 'gjenbruk'] },
  { name: 'Sportsklær', slug: 'sport', keywords: ['sport', 'aktiv', 'fitness', 'outdoor', 'friluft'] },
  { name: 'Arbeidsklær', slug: 'arbeidsklar', keywords: ['arbeid', 'yrke', 'work', 'verne'] },
  { name: 'Brudesalonger', slug: 'brud', keywords: ['brud', 'bryllup', 'wedding'] },
  { name: 'Undertøy', slug: 'undertoy', keywords: ['undertøy', 'under', 'lingeri'] },
  { name: 'Bunad og folkedrakt', slug: 'bunad', keywords: ['bunad', 'husflid', 'folkedrakt'] },
];

type PageProps = { params: { slug: string; kategori: string } };

export async function generateStaticParams() {
  const fylker = getAllFylker();
  const params: { slug: string; kategori: string }[] = [];
  for (const f of fylker) {
    for (const cat of CATEGORIES) {
      params.push({ slug: f.slug, kategori: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fylke = getFylkeBySlug(params.slug);
  const cat = CATEGORIES.find((c) => c.slug === params.kategori);
  if (!fylke || !cat) return {};
  return createMetadata({
    title: `${cat.name} i ${fylke.name} – Klesbutikker i ${fylke.name}`,
    description: `Oversikt over butikker med ${cat.name.toLowerCase()} i ${fylke.name}. Finn ${cat.name.toLowerCase()}-butikker i ${fylke.cities.slice(0, 3).join(', ')} og flere byer.`,
    path: `/fylke/${fylke.slug}/${cat.slug}`,
  });
}

export default function FylkeCategoryPage({ params }: PageProps) {
  const fylke = getFylkeBySlug(params.slug);
  const cat = CATEGORIES.find((c) => c.slug === params.kategori);
  if (!fylke || !cat) notFound();

  const allStores = getAllStores();

  const fylkeStores = allStores.filter((s) => s.fylke === fylke.name);
  const matchingStores = fylkeStores.filter((s) =>
    cat.keywords.some((kw) => s.navn.toLowerCase().includes(kw))
  );

  const citiesWithMatches = [...new Set(matchingStores.map((s) => s.poststed))].sort();

  const faqs = [
    {
      question: `Hvor finner jeg ${cat.name.toLowerCase()} i ${fylke.name}?`,
      answer: matchingStores.length > 0
        ? `Det er ${matchingStores.length} butikker med ${cat.name.toLowerCase()} i ${fylke.name}, fordelt over ${citiesWithMatches.length} byer.`
        : `Vi har foreløpig ikke identifisert dedikerte ${cat.name.toLowerCase()}-butikker i ${fylke.name}, men det finnes ${fylkeStores.length} klesbutikker totalt i fylket.`,
    },
    {
      question: `Hvilke byer i ${fylke.name} har flest klesbutikker?`,
      answer: `De mest populære byene for klæsshopping i ${fylke.name} er ${fylke.cities.slice(0, 5).join(', ')}.`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Fylker', url: '/fylker' },
        { name: fylke.name, url: `/fylke/${fylke.slug}` },
        { name: cat.name, url: `/fylke/${fylke.slug}/${cat.slug}` },
      ])) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs items={[
          { label: 'Fylker', href: '/fylker' },
          { label: fylke.name, href: `/fylke/${fylke.slug}` },
          { label: cat.name },
        ]} />

        <div className="mb-12">
          <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
            {fylke.name} · {cat.name}
          </p>
          <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
            {cat.name} <span className="italic font-normal">i {fylke.name}</span>
          </h1>
          <p className="editorial-text">
            {matchingStores.length > 0 ? (
              <>
                Finn {cat.name.toLowerCase()}-butikker i {fylke.name}. Det er {matchingStores.length} registrerte
                butikker fordelt over {citiesWithMatches.length} byer i fylket.
              </>
            ) : (
              <>
                Utforsk klesbutikker i {fylke.name}. Vi har {fylkeStores.length} registrerte
                butikker i fylket. Se alle butikker nedenfor.
              </>
            )}
          </p>
        </div>

        {/* Matching stores */}
        {matchingStores.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              {cat.name}-butikker i {fylke.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingStores.map((store) => (
                <StoreCard key={store.organisasjonsnummer} store={store} showCity />
              ))}
            </div>
          </section>
        )}

        {/* All fylke stores */}
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Alle klesbutikker i {fylke.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fylkeStores.slice(0, 12).map((store) => (
              <StoreCard key={store.organisasjonsnummer} store={store} showCity />
            ))}
          </div>
          {fylkeStores.length > 12 && (
            <div className="mt-6">
              <Link href={`/fylke/${fylke.slug}`} className="btn-secondary text-sm">
                Se alle {fylkeStores.length} butikker i {fylke.name}
              </Link>
            </div>
          )}
        </section>

        {/* FAQ */}
        <FAQAccordion faqs={faqs} title={`${cat.name} i ${fylke.name}`} />

        {/* Other categories in this fylke */}
        <section className="mt-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Andre kategorier i {fylke.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/fylke/${fylke.slug}/${c.slug}`}
                className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-1.5 transition-colors hover:border-charcoal"
              >
                {c.name} i {fylke.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
