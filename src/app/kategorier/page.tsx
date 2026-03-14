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
  },
  {
    name: 'Herrebutikker',
    slug: 'herrebutikker',
    description: 'Klesbutikker med fokus på herreklær og herremote',
    keywords: ['herre', 'mann', 'men', 'gentleman'],
  },
  {
    name: 'Barneklær',
    slug: 'barneklar',
    description: 'Butikker som selger klær til barn og baby',
    keywords: ['barn', 'baby', 'kids', 'junior', 'lillelam', 'mini', 'småtroll', 'kiddo'],
  },
  {
    name: 'Designerbutikker',
    slug: 'designerbutikker',
    description: 'Eksklusive butikker med designermerker og luksusklær',
    keywords: ['design', 'atelier', 'studio', 'boutique', 'couture'],
  },
  {
    name: 'Vintage og secondhand',
    slug: 'vintage',
    description: 'Vintage-butikker og secondhand-forretninger',
    keywords: ['vintage', 'retro', 'second', 'brukt', 'gjenbruk', 'cirkulær'],
  },
  {
    name: 'Undertøy',
    slug: 'undertoy',
    description: 'Spesialbutikker for undertøy og nattøy',
    keywords: ['undertøy', 'under', 'korsett', 'lingeri'],
  },
  {
    name: 'Bunad og folkedrakt',
    slug: 'bunad',
    description: 'Butikker som selger bunader og folkedrakter',
    keywords: ['bunad', 'husflid', 'folkedrakt'],
  },
  {
    name: 'Sportsutstyr',
    slug: 'sport',
    description: 'Butikker med sportsklær og aktivitetsplagg',
    keywords: ['sport', 'aktiv', 'fitness', 'outdoor', 'friluft', 'gym'],
  },
  {
    name: 'Arbeidsklær',
    slug: 'arbeidsklar',
    description: 'Butikker som selger arbeidsklær og verneutstyr',
    keywords: ['arbeid', 'yrke', 'work', 'verne', 'profil'],
  },
  {
    name: 'Brudebutikker',
    slug: 'brud',
    description: 'Brudesalonger og butikker med brudekjoler',
    keywords: ['brud', 'bryllup', 'wedding'],
  },
];

function CategoryIcon({ slug }: { slug: string }) {
  const cls = 'w-7 h-7 text-charcoal';
  const s = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.5 };
  switch (slug) {
    case 'damebutikker':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
    case 'herrebutikker':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V7.5M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>;
    case 'barneklar':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>;
    case 'designerbutikker':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>;
    case 'vintage':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>;
    case 'undertoy':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
    case 'bunad':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>;
    case 'sport':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
    case 'arbeidsklar':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M11.42 15.17l-5.384-5.383a2.025 2.025 0 010-2.862L9.17 3.79a2.025 2.025 0 012.862 0l5.383 5.384M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.164-.086 1.636.225l2.746 1.812M4.5 19.5h15" /></svg>;
    case 'brud':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-4.5H3m18 0a9 9 0 00-18 0" /></svg>;
    default:
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path {...s} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" /></svg>;
  }
}

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
            <span className="text-3xl mb-4 block"><CategoryIcon slug={cat.slug} /></span>
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
