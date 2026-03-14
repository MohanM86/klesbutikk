import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';
import { getAllStores, getAllCities } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Kategorier – Klesbutikker etter type',
  description: 'Finn klesbutikker etter kategori. Dameklær, herreklær, barneklær, designerbutikker, vintage, sportsutstyr og mer.',
  path: '/kategorier',
});

const CATEGORIES = [
  {
    name: 'Damebutikker',
    slug: 'damebutikker',
    description: 'Klesbutikker med fokus på dameklær og damemode',
    keywords: ['dame', 'kvinne', 'femme', 'femina', 'lady', 'belle', 'ella'],
    icon: '👗',
  },
  {
    name: 'Herrebutikker',
    slug: 'herrebutikker',
    description: 'Klesbutikker med fokus på herreklær og herremote',
    keywords: ['herre', 'mann', 'men', 'gentleman'],
    icon: '👔',
  },
  {
    name: 'Barneklær',
    slug: 'barneklar',
    description: 'Butikker som selger klær til barn og baby',
    keywords: ['barn', 'baby', 'kids', 'junior', 'lillelam', 'mini', 'småtroll', 'kiddo'],
    icon: '🧒',
  },
  {
    name: 'Designerbutikker',
    slug: 'designerbutikker',
    description: 'Eksklusive butikker med designermerker og luksusklær',
    keywords: ['design', 'atelier', 'studio', 'boutique', 'couture'],
    icon: '✨',
  },
  {
    name: 'Vintage og secondhand',
    slug: 'vintage',
    description: 'Vintage-butikker og secondhand-forretninger',
    keywords: ['vintage', 'retro', 'second', 'brukt', 'gjenbruk', 'cirkulær'],
    icon: '♻️',
  },
  {
    name: 'Undertøy',
    slug: 'undertoy',
    description: 'Spesialbutikker for undertøy og nattøy',
    keywords: ['undertøy', 'under', 'korsett', 'lingeri'],
    icon: '🩱',
  },
  {
    name: 'Bunad og folkedrakt',
    slug: 'bunad',
    description: 'Butikker som selger bunader og folkedrakter',
    keywords: ['bunad', 'husflid', 'folkedrakt'],
    icon: '🇳🇴',
  },
  {
    name: 'Sportsutstyr',
    slug: 'sport',
    description: 'Butikker med sportsklær og aktivitetsplagg',
    keywords: ['sport', 'aktiv', 'fitness', 'outdoor', 'friluft', 'gym'],
    icon: '🏃',
  },
  {
    name: 'Arbeidsklær',
    slug: 'arbeidsklar',
    description: 'Butikker som selger arbeidsklær og verneutstyr',
    keywords: ['arbeid', 'yrke', 'work', 'verne', 'profil'],
    icon: '🦺',
  },
  {
    name: 'Brudebutikker',
    slug: 'brud',
    description: 'Brudesalonger og butikker med brudekjoler',
    keywords: ['brud', 'bryllup', 'wedding'],
    icon: '💒',
  },
];

export default function CategoriesPage() {
  const stores = getAllStores();

  const categoriesWithCount = CATEGORIES.map((cat) => {
    const count = stores.filter((s) =>
      cat.keywords.some((kw) => s.navn.toLowerCase().includes(kw))
    ).length;
    return { ...cat, count };
  });

  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Kategorier' }]} />

      <div className="mb-12">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          {CATEGORIES.length} kategorier
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Klesbutikker etter kategori
        </h1>
        <p className="editorial-text">
          Finn klesbutikker som passer din stil. Vi har kategorisert butikkene slik at du
          enkelt kan finne det du leter etter – enten det er dameklær, herreklær, barneklær
          eller spesialbutikker.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCount.map((cat) => (
          <div
            key={cat.slug}
            className="bg-white border border-border rounded-lg p-6 card-hover"
          >
            <span className="text-3xl mb-4 block">{cat.icon}</span>
            <h2 className="font-display text-xl font-semibold text-charcoal mb-2">
              {cat.name}
            </h2>
            <p className="font-body text-sm text-muted mb-3">{cat.description}</p>
            {cat.count > 0 && (
              <p className="font-body text-xs text-muted/60">
                Ca. {cat.count} butikker identifisert
              </p>
            )}
          </div>
        ))}
      </div>

      {/* SEO text */}
      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-display-sm font-semibold text-charcoal mb-4">
          Finn riktig klesbutikk for deg
        </h2>
        <div className="font-body text-muted leading-relaxed space-y-4">
          <p>
            Norge har et mangfoldig utvalg av klesbutikker som dekker alle behov og stiler.
            Fra eksklusive designerbutikker i Oslo til sjarmerende brudesalonger i småbyer,
            fra moderne sportsutstyrbutikker til tradisjonelle bunadforhandlere – det finnes
            en klesbutikk for absolutt alle.
          </p>
          <p>
            Bruk vår kategorioversikt for å finne butikker som matcher det du leter etter,
            eller søk direkte etter by, merke eller butikknavn på forsiden.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {getAllCities().slice(0, 10).map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="font-body text-sm text-muted hover:text-charcoal border border-border rounded-full px-4 py-1.5 transition-colors hover:border-charcoal"
            >
              Klesbutikker i {city.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
