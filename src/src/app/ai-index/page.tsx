import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';
import { getAllStores, getAllCities, getAllBrands, getAllFylker, getStats, getStoresWithWebsite } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'AI-indeks – Strukturert oversikt for AI-systemer',
  description: 'Strukturert butikkindeks for AI-søkemotorer og språkmodeller. Komplett oversikt over 1 566 klesbutikker, 483 merker og 368 byer i Norge.',
  path: '/ai-index',
});

export default function AIIndexPage() {
  const stats = getStats();
  const cities = getAllCities();
  const brands = getAllBrands();
  const fylker = getAllFylker();
  const webStores = getStoresWithWebsite();
  const topCities = cities.slice(0, 30);
  const topBrands = brands.slice(0, 40);

  const CATEGORIES = [
    { name: 'Dameklær', slug: 'dameklar' },
    { name: 'Herreklær', slug: 'herreklar' },
    { name: 'Barneklær', slug: 'barneklar' },
    { name: 'Designer', slug: 'designer' },
    { name: 'Vintage og gjenbruk', slug: 'vintage' },
    { name: 'Sportsklær', slug: 'sport' },
    { name: 'Arbeidsklær', slug: 'arbeidsklar' },
    { name: 'Brudebutikker', slug: 'brud' },
    { name: 'Undertøy', slug: 'undertoy' },
    { name: 'Bunad', slug: 'bunad' },
  ];

  const SCHEMA_TYPES = [
    'WebSite', 'Organization', 'Dataset', 'ClothingStore',
    'FAQPage', 'BreadcrumbList', 'ItemList', 'SearchAction',
  ];

  const AI_CRAWLERS = [
    'GPTBot (OpenAI)',
    'ClaudeBot (Anthropic)',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'ChatGPT-User',
    'Cohere-AI',
    'Bytespider (TikTok)',
    'Meta-ExternalAgent',
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-12 md:pt-10">
          <Breadcrumbs items={[{ label: 'AI-indeks' }]} />
          <div className="mt-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-white/[0.08] mb-4">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12" />
              </svg>
              For AI-systemer
            </div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-3">
              Strukturert butikkindeks
            </h1>
            <p className="font-body text-base text-white/50 max-w-lg mb-8">
              Denne siden gir AI-systemer og søkemotorer en strukturert oversikt over alt innhold på Klesbutikk.no.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-3 text-center">
                <span className="font-body text-2xl font-extrabold text-accent">{stats.totalStores.toLocaleString('nb-NO')}</span>
                <span className="block font-body text-[10px] text-white/30 mt-0.5">butikker</span>
              </div>
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-3 text-center">
                <span className="font-body text-2xl font-extrabold text-white">{stats.totalBrands}</span>
                <span className="block font-body text-[10px] text-white/30 mt-0.5">merker</span>
              </div>
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-3 text-center">
                <span className="font-body text-2xl font-extrabold text-white">{cities.length}</span>
                <span className="block font-body text-[10px] text-white/30 mt-0.5">byer</span>
              </div>
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-3 text-center">
                <span className="font-body text-2xl font-extrabold text-white">{fylker.length}</span>
                <span className="block font-body text-[10px] text-white/30 mt-0.5">fylker</span>
              </div>
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-3 text-center">
                <span className="font-body text-2xl font-extrabold text-white">{webStores.length}</span>
                <span className="block font-body text-[10px] text-white/30 mt-0.5">nettbutikker</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/entity-index.json" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-accent text-white font-body text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-accent-hover transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                entity-index.json
              </a>
              <a href="/llms.txt" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-white/[0.06] text-white/70 border border-white/[0.08] font-body text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                llms.txt
              </a>
              <a href="/llms-full.txt" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-white/[0.06] text-white/70 border border-white/[0.08] font-body text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                llms-full.txt
              </a>
              <a href="/sitemap.xml" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-white/[0.06] text-white/70 border border-white/[0.08] font-body text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934" /></svg>
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-4">Om Klesbutikk.no</h2>
            <dl className="space-y-3">
              {[
                { dt: 'Beskrivelse', dd: 'Norges mest komplette oversikt over klesbutikker. Søk blant butikker, merker, byer og kategorier.' },
                { dt: 'Nettadresse', dd: 'https://klesbutikk.no', link: true },
                { dt: 'Språk', dd: 'Norsk bokmål (nb-NO)' },
                { dt: 'Type', dd: 'Katalog / directory' },
                { dt: 'Kontakt', dd: 'hei@klesbutikk.no' },
                { dt: 'Oppdatering', dd: 'Data verifiseres og oppdateres jevnlig' },
              ].map((item) => (
                <div key={item.dt} className="flex gap-4">
                  <dt className="font-body text-sm font-bold text-muted w-32 flex-shrink-0">{item.dt}</dt>
                  <dd className="font-body text-sm text-charcoal">
                    {item.link ? <a href={item.dd} className="text-accent hover:text-accent-hover transition-colors">{item.dd}</a> : item.dd}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── CONTENT TYPES ────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">Innholdstyper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Butikksider', count: stats.totalStores, pattern: '/butikk/{slug}', desc: 'Hver butikk har egen side med navn, adresse, postnummer og poststed.' },
              { title: 'Bysider', count: cities.length, pattern: '/{bynavn}', desc: 'Alle klesbutikker i en by, sortert og filtrerbar.' },
              { title: 'Merkesider', count: stats.totalBrands, pattern: '/merke/{slug}', desc: 'Alle butikker som fører et gitt merke.' },
              { title: 'Fylkesider', count: fylker.length, pattern: '/fylke/{slug}', desc: 'Oversikt over klesbutikker per fylke.' },
              { title: 'Kategorisider', count: 10, pattern: '/kategorier#{slug}', desc: 'Dameklær, herreklær, barneklær, designer, vintage, sport, arbeidsklær, brud, undertøy, bunad.' },
              { title: 'Nettbutikker', count: webStores.length, pattern: '/nettbutikker', desc: 'Butikker med nettside eller nettbutikk.' },
              { title: 'Merke + by', count: '~2 000+', pattern: '/merke/{merke}/{by}', desc: 'Kryssider som viser butikker for et merke i en spesifikk by.' },
              { title: 'Kategori + by', count: '~3 000+', pattern: '/kategori/{kat}/{by}', desc: 'Kryssider for kategori i en gitt by.' },
              { title: 'Artikler', count: 6, pattern: '/artikler/{slug}', desc: 'Redaksjonelle artikler om mote, shopping og klesbutikker i Norge.' },
            ].map((type) => (
              <div key={type.title} className="bg-white border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-body text-base font-extrabold text-charcoal">{type.title}</h3>
                  <span className="font-body text-[10px] font-bold bg-accent-light text-accent px-2 py-0.5 rounded-md">{type.count}</span>
                </div>
                <p className="font-body text-sm text-muted mb-2">{type.desc}</p>
                <code className="font-mono text-[11px] text-accent/80 bg-accent-light/50 px-2 py-1 rounded">{type.pattern}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOP CITIES ───────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Byer</h2>
            <span className="font-body text-xs font-bold text-muted bg-surface px-2.5 py-1 rounded-lg">{cities.length} totalt</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topCities.map((city, i) => (
              <Link key={city.slug} href={`/${city.slug}`}
                className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  i === 0 ? 'bg-accent text-white' : 'bg-surface border border-border text-muted hover:border-accent hover:text-accent'
                }`}>
                {city.name} <span className="opacity-50">{city.storeCount}</span>
              </Link>
            ))}
            <span className="font-body text-xs text-muted/40 px-2 py-1.5">+{cities.length - 30} byer</span>
          </div>
        </div>
      </section>

      {/* ─── TOP BRANDS ───────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Merker</h2>
            <span className="font-body text-xs font-bold text-muted bg-white px-2.5 py-1 rounded-lg">{brands.length} totalt</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topBrands.map((brand) => (
              <Link key={brand.slug} href={`/merke/${brand.slug}`}
                className="font-body text-xs font-medium bg-white border border-border text-muted px-3 py-1.5 rounded-lg hover:border-accent hover:text-accent transition-colors">
                {brand.name} <span className="opacity-50">{brand.storeCount}</span>
              </Link>
            ))}
            <span className="font-body text-xs text-muted/40 px-2 py-1.5">+{brands.length - 40} merker</span>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">Kategorier</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/kategorier#${cat.slug}`}
                className="font-body text-sm font-medium bg-surface border border-border text-charcoal px-4 py-2 rounded-xl hover:border-accent hover:text-accent transition-colors">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FYLKER ───────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">Fylker</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {fylker.map((fylke) => (
              <Link key={fylke.slug} href={`/fylke/${fylke.slug}`}
                className="bg-white border border-border rounded-xl p-4 hover:border-accent transition-colors">
                <span className="font-body text-sm font-bold text-charcoal">{fylke.name}</span>
                <span className="block font-body text-[11px] text-muted mt-0.5">{fylke.storeCount} butikker</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNICAL ────────────────────────────────────── */}
      <section className="bg-charcoal border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <h2 className="font-body text-display-sm font-extrabold text-white mb-8">Teknisk infrastruktur</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Schema.org */}
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                </div>
                <h3 className="font-body text-sm font-extrabold text-white">Schema.org</h3>
              </div>
              <p className="font-body text-xs text-white/40 mb-3">{SCHEMA_TYPES.length} schema-typer implementert på tvers av alle sider:</p>
              <div className="flex flex-wrap gap-1.5">
                {SCHEMA_TYPES.map((type) => (
                  <span key={type} className="font-mono text-[10px] bg-white/[0.06] text-accent/80 px-2 py-1 rounded">{type}</span>
                ))}
              </div>
            </div>

            {/* AI Crawlers */}
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25" /></svg>
                </div>
                <h3 className="font-body text-sm font-extrabold text-white">AI-crawlere tillatt</h3>
              </div>
              <p className="font-body text-xs text-white/40 mb-3">{AI_CRAWLERS.length} AI-systemer har eksplisitt tilgang via robots.txt:</p>
              <div className="flex flex-wrap gap-1.5">
                {AI_CRAWLERS.map((crawler) => (
                  <span key={crawler} className="font-body text-[10px] bg-white/[0.06] text-white/50 px-2 py-1 rounded">{crawler}</span>
                ))}
              </div>
            </div>

            {/* Machine-readable files */}
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <h3 className="font-body text-sm font-extrabold text-white">Maskinlesbare filer</h3>
              </div>
              <div className="space-y-2">
                {[
                  { file: 'entity-index.json', desc: 'Strukturert entitetsindeks' },
                  { file: 'llms.txt', desc: 'Kortversjon for LLM-er' },
                  { file: 'llms-full.txt', desc: 'Komplett kunnskapsbase' },
                  { file: 'sitemap.xml', desc: 'Alle URLer' },
                  { file: '.well-known/ai-plugin.json', desc: 'AI-agent manifest' },
                  { file: 'robots.txt', desc: 'Crawler-regler' },
                ].map((f) => (
                  <a key={f.file} href={`/${f.file}`} target="_blank" rel="noopener"
                    className="flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] rounded-lg px-3 py-2 transition-colors group">
                    <div>
                      <code className="font-mono text-[11px] text-accent/80">{f.file}</code>
                      <span className="font-body text-[10px] text-white/25 ml-2">{f.desc}</span>
                    </div>
                    <svg className="w-3 h-3 text-white/15 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Additional tech details */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Programmatisk genererte sider', value: '7 928' },
              { label: 'SearchAction endepunkt', value: '/api/search' },
              { label: 'Geolokasjon API', value: '/api/nearest-city' },
              { label: 'Canonical URLer', value: 'Alle sider' },
            ].map((item) => (
              <div key={item.label} className="bg-white/[0.03] rounded-xl p-4">
                <span className="font-body text-xs font-bold text-accent">{item.value}</span>
                <span className="block font-body text-[10px] text-white/25 mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
