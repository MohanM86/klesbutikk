import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import AnimatedHero from '@/components/AnimatedHero';
import CityMarquee from '@/components/CityMarquee';
import BrandShowcase from '@/components/BrandShowcase';
import { getTopCities, getFeaturedStores, getStats, getAllBrands } from '@/lib/stores';
import { faqSchema, itemListSchema } from '@/lib/seo';

const HOME_FAQS = [
  {
    question: 'Hva er de beste klesbutikkene i Norge?',
    answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populære finnes i Oslo, Bergen, Trondheim og Stavanger. På Klesbutikk.no kan du utforske alle registrerte klesbutikker i landet og finne de beste i din by.',
  },
  {
    question: 'Hvordan finner jeg klesbutikker nær meg?',
    answer: 'Bruk søkefeltet øverst på siden for å søke etter din by, et merke eller en butikk. Du kan også bla gjennom bysider, fylkesider eller kategorier for å finne klesbutikker i ditt nærområde.',
  },
  {
    question: 'Er det gratis å legge til butikken min?',
    answer: 'Ja, alle klesbutikker registrert med næringskode 47.710 i Brønnøysundregistrene er allerede listet gratis. Du kan også oppdatere din oppføring. For økt synlighet tilbyr vi fremhevede plasseringer fra 990 kr/mnd.',
  },
  {
    question: 'Hvilke klesmerker kan jeg finne på Klesbutikk.no?',
    answer: 'Vi har kartlagt over 480 klesmerker, fra norske favoritter som Holzweiler, Stine Goya og Filippa K til internasjonale merker som Nike, Gucci og Zara. Du kan søke på merke og se hvilke butikker som fører det.',
  },
  {
    question: 'Hvor ofte oppdateres butikkoversikten?',
    answer: 'Vår database er basert på offisielle data fra Brønnøysundregistrene (næringskode 47.710 – Butikkhandel med klær) og oppdateres jevnlig for å sikre at informasjonen er korrekt og aktuell.',
  },
  {
    question: 'Hva er forskjellen på en fremhevet og en vanlig oppføring?',
    answer: 'Alle klesbutikker har en gratis standardoppføring. Fremhevede butikker får prioritert plassering i sin by, et synlig merke, og vises i «Fremhevede butikker»-seksjonen. Se vår annonseringsside for priser.',
  },
];

const CATEGORIES = [
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker og alt for henne', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser og mer', icon: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V7.5M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z' },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby, alle aldre', icon: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z' },
  { name: 'Designerbutikker', slug: 'designer', desc: 'Eksklusive merker og luksusklær', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
  { name: 'Vintage og gjenbruk', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
  { name: 'Sportsklær', slug: 'sport', desc: 'Treningsklær, outdoor og friluft', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' },
];

export default function HomePage() {
  const cities = getTopCities(16);
  const featured = getFeaturedStores(8);
  const stats = getStats();
  const allBrands = getAllBrands();

  const cityListSchema = itemListSchema(
    cities.map((c) => ({ name: `Klesbutikker i ${c.name}`, url: `/${c.slug}` }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListSchema) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {[
            { name: 'Holzweiler', style: { left: '4%', top: '18%' }, delay: 0 },
            { name: 'Ganni', style: { right: '4%', top: '14%' }, delay: 0.7 },
            { name: 'Filippa K', style: { left: '3%', bottom: '30%' }, delay: 1.4 },
            { name: 'GANT', style: { right: '5%', bottom: '26%' }, delay: 2.0 },
            { name: 'Dressmann', style: { left: '8%', top: '48%' }, delay: 0.3 },
            { name: 'Stormberg', style: { right: '7%', top: '52%' }, delay: 1.1 },
            { name: 'H&M', style: { left: '6%', bottom: '14%' }, delay: 1.7 },
            { name: 'Cubus', style: { right: '3%', bottom: '48%' }, delay: 0.9 },
          ].map((b) => (
            <span key={b.name} className="absolute inline-block bg-charcoal/[0.03] border border-charcoal/[0.05] rounded-full px-4 py-1.5 font-body text-xs text-muted/40 select-none" style={{ ...b.style, animation: `float ${3.5 + b.delay * 0.5}s ease-in-out infinite`, animationDelay: `${b.delay}s` }}>
              {b.name}
            </span>
          ))}
        </div>

        <div className="relative max-w-8xl mx-auto section-padding pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedHero totalStores={stats.totalStores} totalFylker={stats.totalFylker} />
            <h1 className="font-display text-hero-sm md:text-hero font-semibold text-charcoal mb-6">
              Finn klesbutikker<br />
              <span className="italic font-normal">i hele Norge</span>
            </h1>
            <p className="editorial-text mx-auto mb-4">
              Norges mest komplette oversikt over klesbutikker. Søk blant {stats.totalStores.toLocaleString('nb-NO')} butikker,
              {' '}{stats.totalBrands} merker og {stats.totalCities} byer.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
              {['Data fra Brønnøysundregistrene', 'Oppdatert og verifisert', 'Helt gratis å bruke', '357 kommuner dekket'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 font-body text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-charcoal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <SearchBar variant="hero" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/by" className="btn-primary">Finn butikker nær deg</Link>
              <Link href="/legg-til-butikk" className="btn-secondary">Legg til butikk</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">Slik fungerer det</p>
            <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
              Finn klesbutikken du leter etter
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: '1', title: 'Søk etter by, merke eller butikk', desc: 'Bruk søkefeltet eller bla gjennom byoversikter, kategorier og merkesider for å finne akkurat det du leter etter.' },
              { step: '2', title: 'Se butikkdetaljer', desc: 'Hver butikk har sin egen side med adresse, kontaktinfo, nettside, merker de fører og andre detaljer.' },
              { step: '3', title: 'Besøk butikken', desc: 'Finn veien med adressen, ring for åpningstider, eller besøk butikkens nettside for netthandel.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-charcoal text-white flex items-center justify-center mx-auto mb-5">
                  <span className="font-display text-lg font-semibold">{item.step}</span>
                </div>
                <h3 className="font-display text-base font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section className="max-w-8xl mx-auto section-padding py-16 md:py-22">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">Kategorier</p>
            <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
              Hva leter du etter?
            </h2>
          </div>
          <Link href="/kategorier" className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-charcoal transition-colors">
            Se alle kategorier
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/kategorier#${cat.slug}`} className="group bg-white border border-border rounded-lg p-5 card-hover text-center">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center mx-auto mb-3 group-hover:bg-charcoal transition-colors">
                <svg className="w-5 h-5 text-charcoal group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                </svg>
              </div>
              <h3 className="font-display text-sm font-semibold text-charcoal mb-1">{cat.name}</h3>
              <p className="font-body text-xs text-muted leading-relaxed">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── POPULAR CITIES ───────────────────────────────── */}
      <section className="py-16 md:py-22">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">Utforsk</p>
              <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">Populære byer</h2>
            </div>
            <Link href="/by" className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-charcoal transition-colors">
              Se alle byer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          </div>
        </div>
        <CityMarquee cities={cities} />
        <div className="mt-8 text-center sm:hidden">
          <Link href="/by" className="btn-secondary text-sm">Se alle byer</Link>
        </div>
      </section>

      {/* ─── FEATURED STORES ──────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white border-y border-border">
          <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">Anbefalt</p>
                <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">Fremhevede butikker</h2>
              </div>
              <Link href="/butikk" className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-charcoal transition-colors">
                Se alle butikker
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map((store) => (
                <StoreCard key={store.organisasjonsnummer} store={store} showCity />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── POPULAR BRANDS (DARK) ────────────────────────── */}
      <BrandShowcase brands={allBrands} />

      {/* ─── WHY US ───────────────────────────────────────── */}
      <section className="max-w-8xl mx-auto section-padding py-16 md:py-22">
        <div className="text-center mb-12">
          <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">Hvorfor Klesbutikk.no</p>
          <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
            Norges mest komplette klesbutikkoversikt
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Offisielle data', desc: 'Alle butikker er hentet fra Brønnøysundregistrene med næringskode 47.710 – Butikkhandel med klær.', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
            { title: 'Over 480 merker', desc: 'Vi har kartlagt hvilke merker som selges i norske butikker – fra Holzweiler til Nike, Gucci til H&M.', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
            { title: '7 900+ sider', desc: 'Unike sider for hver by, fylke, merke og kategori – og alle kombinasjonene mellom dem.', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
            { title: 'Alltid oppdatert', desc: 'Databasen synkroniseres med Brønnøysundregistrene for å sikre at informasjonen er korrekt.', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-border rounded-lg p-6">
              <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold text-charcoal mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOR STORE OWNERS ─────────────────────────────── */}
      <section className="bg-charcoal">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">For butikkeiere</p>
              <h2 className="font-display text-display-sm md:text-display font-semibold text-white mb-6">
                Bli synlig for tusenvis av kunder
              </h2>
              <p className="font-body text-base text-white/60 leading-relaxed mb-8">
                Klesbutikk.no er der folk søker når de leter etter klesbutikker. Få en fremhevet
                oppføring og bli synlig i din by, ditt fylke og for merkene du fører.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/annonser" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-charcoal font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/90">
                  Se priser
                </Link>
                <Link href="/legg-til-butikk" className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 text-white font-body font-medium text-sm tracking-wide transition-all duration-300 hover:border-white/40">
                  Legg til butikk gratis
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'Gratis', label: 'Standardoppføring', sub: 'For alle butikker' },
                { value: '990 kr', label: 'Fremhevet', sub: 'Per måned' },
                { value: '24/7', label: 'Synlighet', sub: 'Alltid tilgjengelig' },
                { value: '7 900+', label: 'Sider', sub: 'Der du kan vises' },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-5">
                  <span className="font-display text-2xl font-semibold text-white">{item.value}</span>
                  <span className="block font-body text-sm text-white/70 mt-1">{item.label}</span>
                  <span className="block font-body text-xs text-white/40">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-16 md:py-22">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige spørsmål" />
        </div>
      </section>

      {/* ─── SEO TEXT ─────────────────────────────────────── */}
      <section className="max-w-8xl mx-auto section-padding py-16 md:py-22">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-sm font-semibold text-charcoal mb-6">
            Klesbutikker i Norge – din komplette guide
          </h2>
          <div className="prose prose-sm font-body text-muted leading-relaxed space-y-4">
            <p>
              Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet alle
              registrerte klesbutikker fra Brønnøysundregistrene med næringskode 47.710 – Butikkhandel
              med klær – og gjort dem søkbare etter by, fylke, merke og kategori.
            </p>
            <p>
              Med over {stats.totalStores.toLocaleString('nb-NO')} butikker fordelt på 357 kommuner
              og 15 fylker, dekker vi hele Norge fra Lindesnes til Nordkapp. Vi har kartlagt over
              {' '}{stats.totalBrands} klesmerker og identifisert hvilke butikker som fører dem.
            </p>
            <p>
              Enten du leter etter en ny favorittbutikk i din hjemby, eller vil utforske motetilbudet
              i en annen norsk by, hjelper vi deg med å finne akkurat den klesbutikken du trenger. Fra
              store kjeder til sjarmerende nisjebutikker, fra designermerker til budsjettvennlige
              alternativer – alt samlet på ett sted.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
