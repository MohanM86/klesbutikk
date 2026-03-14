import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import { getAllStores, getAllCities } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

const CATEGORIES = [
  { name: 'Dameklær', slug: 'dameklar', keywords: ['dame', 'kvinne', 'femme', 'femina', 'lady', 'belle', 'ella', 'her'] },
  { name: 'Herreklær', slug: 'herreklar', keywords: ['herre', 'mann', 'men', 'gentleman', 'his'] },
  { name: 'Barneklær', slug: 'barneklar', keywords: ['barn', 'baby', 'kids', 'junior', 'mini', 'kiddo'] },
  { name: 'Designerbutikker', slug: 'designer', keywords: ['design', 'atelier', 'studio', 'boutique', 'couture'] },
  { name: 'Vintage og gjenbruk', slug: 'vintage', keywords: ['vintage', 'retro', 'second', 'brukt', 'gjenbruk'] },
  { name: 'Sportsklær', slug: 'sport', keywords: ['sport', 'aktiv', 'fitness', 'outdoor', 'friluft'] },
  { name: 'Arbeidsklær', slug: 'arbeidsklar', keywords: ['arbeid', 'yrke', 'work', 'verne', 'profil'] },
  { name: 'Brudesalonger', slug: 'brud', keywords: ['brud', 'bryllup', 'wedding'] },
  { name: 'Undertøy', slug: 'undertoy', keywords: ['undertøy', 'under', 'lingeri'] },
  { name: 'Bunad og folkedrakt', slug: 'bunad', keywords: ['bunad', 'husflid', 'folkedrakt'] },
];

const TOP_50_CITIES = [
  'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand', 'Drammen', 'Tromsø',
  'Fredrikstad', 'Sandnes', 'Haugesund', 'Tønsberg', 'Holmestrand', 'Porsgrunn',
  'Ålesund', 'Bodø', 'Sarpsborg', 'Arendal', 'Hamar', 'Larvik', 'Kongsberg',
  'Molde', 'Moss', 'Skien', 'Lillehammer', 'Harstad', 'Halden', 'Sandefjord',
  'Gjøvik', 'Narvik', 'Kristiansund', 'Horten', 'Mandal', 'Grimstad', 'Lillestrøm',
  'Ski', 'Asker', 'Bærum', 'Lørenskog', 'Jessheim', 'Eidsvoll', 'Råholt',
  'Ås', 'Drøbak', 'Vestby', 'Son', 'Askim', 'Mysen', 'Rakkestad', 'Elverum', 'Kongsvinger',
];

type PageProps = { params: { slug: string; city: string } };

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const cat of CATEGORIES) {
    for (const cityName of TOP_50_CITIES) {
      params.push({ slug: cat.slug, city: slugify(cityName) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  const cityName = TOP_50_CITIES.find((c) => slugify(c) === params.city) || params.city;
  if (!cat) return {};
  return createMetadata({
    title: `${cat.name} i ${cityName} – Klesbutikker med ${cat.name.toLowerCase()}`,
    description: `Finn butikker med ${cat.name.toLowerCase()} i ${cityName}. Komplett oversikt over klesbutikker som spesialiserer seg på ${cat.name.toLowerCase()} i ${cityName}.`,
    path: `/kategori/${cat.slug}/${params.city}`,
  });
}

export default function CategoryCityPage({ params }: PageProps) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  const cityName = TOP_50_CITIES.find((c) => slugify(c) === params.city);
  if (!cat || !cityName) notFound();

  const citySlug = slugify(cityName);
  const allStores = getAllStores();

  const matchingStores = allStores.filter(
    (s) =>
      s.poststed === cityName &&
      cat.keywords.some((kw) => s.navn.toLowerCase().includes(kw))
  );

  const allCityStores = allStores.filter((s) => s.poststed === cityName);

  const faqs = [
    {
      question: `Hvor finner jeg ${cat.name.toLowerCase()} i ${cityName}?`,
      answer: matchingStores.length > 0
        ? `Vi har registrert ${matchingStores.length} butikker med ${cat.name.toLowerCase()} i ${cityName}. Se oversikten nedenfor.`
        : `Vi har foreløpig ikke identifisert dedikerte ${cat.name.toLowerCase()}-butikker i ${cityName}, men det finnes ${allCityStores.length} klesbutikker totalt i byen.`,
    },
    {
      question: `Hvor mange klesbutikker finnes i ${cityName}?`,
      answer: `Det er ${allCityStores.length} registrerte klesbutikker i ${cityName}. Utforsk alle butikker på vår byoversikt.`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Kategorier', url: '/kategorier' },
        { name: cat.name, url: `/kategori/${cat.slug}` },
        { name: cityName, url: `/kategori/${cat.slug}/${citySlug}` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs items={[
          { label: 'Kategorier', href: '/kategorier' },
          { label: cat.name },
          { label: cityName },
        ]} />

        <div className="mb-12">
          <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
            {cat.name} · {cityName}
          </p>
          <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
            {cat.name} <span className="italic font-normal">i {cityName}</span>
          </h1>
          <p className="editorial-text">
            {matchingStores.length > 0 ? (
              <>
                Finn butikker som spesialiserer seg på {cat.name.toLowerCase()} i {cityName}.
                Vi har identifisert {matchingStores.length} relevante butikker basert på data fra Brønnøysundregistrene.
              </>
            ) : (
              <>
                Leter du etter {cat.name.toLowerCase()} i {cityName}? Vi har {allCityStores.length} registrerte
                klesbutikker i {cityName}. Utforsk dem nedenfor for å finne det du leter etter.
              </>
            )}
          </p>
        </div>

        {/* Matching stores */}
        {matchingStores.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
              {cat.name}-butikker i {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingStores.map((store) => (
                <StoreCard key={store.organisasjonsnummer} store={store} />
              ))}
            </div>
          </section>
        )}

        {/* All city stores */}
        <section className="mb-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Alle klesbutikker i {cityName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCityStores.slice(0, 12).map((store) => (
              <StoreCard key={store.organisasjonsnummer} store={store} />
            ))}
          </div>
          {allCityStores.length > 12 && (
            <div className="mt-6">
              <Link href={`/${citySlug}`} className="btn-secondary text-sm">
                Se alle {allCityStores.length} butikker i {cityName}
              </Link>
            </div>
          )}
        </section>

        {/* FAQ */}
        <FAQAccordion faqs={faqs} title={`${cat.name} i ${cityName} – spørsmål og svar`} />

        {/* Other cities */}
        <section className="mt-16">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            {cat.name} i andre byer
          </h2>
          <div className="flex flex-wrap gap-2">
            {TOP_50_CITIES.filter((c) => c !== cityName).slice(0, 15).map((c) => (
              <Link
                key={c}
                href={`/kategori/${cat.slug}/${slugify(c)}`}
                className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-1.5 transition-colors hover:border-charcoal"
              >
                {cat.name} i {c}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
