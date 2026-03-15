import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import AnimatedHero from '@/components/AnimatedHero';
import CityMarquee from '@/components/CityMarquee';
import BrandShowcase from '@/components/BrandShowcase';
import HowItWorks from '@/components/HowItWorks';
import { getTopCities, getFeaturedStores, getStats, getAllBrands } from '@/lib/stores';
import { faqSchema, itemListSchema } from '@/lib/seo';

const HOME_FAQS = [
  { question: 'Hva er de beste klesbutikkene i Norge?', answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populære finner du i Oslo, Bergen, Trondheim og Stavanger. På Klesbutikk.no kan du utforske alle registrerte klesbutikker i landet og finne favorittene i din by.' },
  { question: 'Hvordan finner jeg klesbutikker nær meg?', answer: 'Bruk søkefeltet øverst på siden for å søke etter din by, et merke eller en butikk. Du kan også bla gjennom bysider, fylkesider eller kategorier for å finne klesbutikker i ditt nærområde.' },
  { question: 'Er det gratis å legge til butikken min?', answer: 'Ja, alle klesbutikker registrert med næringskode 47.710 i Brønnøysundregistrene er allerede listet helt gratis. For økt synlighet tilbyr vi fremhevede plasseringer fra 990 kr per måned.' },
  { question: 'Hvilke klesmerker kan jeg finne på Klesbutikk.no?', answer: 'Vi har kartlagt over 480 klesmerker, alt fra norske favoritter som Holzweiler, Stine Goya og Filippa K til internasjonale stormerker som Nike, Gucci og Zara. Du kan søke på merke og se hvilke butikker som fører det.' },
  { question: 'Hvor ofte oppdateres butikkoversikten?', answer: 'Databasen vår er basert på offisielle data fra Brønnøysundregistrene med næringskode 47.710 og oppdateres jevnlig for å sikre at informasjonen alltid er korrekt.' },
  { question: 'Hva er forskjellen på en fremhevet og en vanlig oppføring?', answer: 'Alle klesbutikker har en gratis standardoppføring. Fremhevede butikker får prioritert plassering, et synlig merke, og vises øverst i sin by. Se annonseringssiden vår for mer informasjon.' },
];

const CATS = [
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker og alt for henne', letter: 'D', count: 342, accent: true },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser og mer', letter: 'H', count: 289, accent: false },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby i alle aldre', letter: 'B', count: 156, accent: true },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive merker og luksusklær', letter: 'D', count: 87, accent: false },
  { name: 'Vintage', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig mote', letter: 'V', count: 64, accent: true },
  { name: 'Sportsklær', slug: 'sport', desc: 'Treningsklær, outdoor og friluftsutstyr', letter: 'S', count: 201, accent: false },
];

export default function HomePage() {
  const cities = getTopCities(16);
  const featured = getFeaturedStores(8);
  const stats = getStats();
  const allBrands = getAllBrands();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(cities.map((c) => ({ name: `Klesbutikker i ${c.name}`, url: `/${c.slug}` })))) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent-light to-white">
        <div className="max-w-8xl mx-auto section-padding pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-5 py-2 rounded-full shadow-sm mb-8 border border-accent/10">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Norges største klesbutikkoversikt
            </div>

            <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-charcoal mb-5 leading-tight">
              Finn klesbutikker<br />
              <span className="text-accent">i hele Norge</span>
            </h1>

            <p className="font-body text-lg text-slate leading-relaxed mb-8 max-w-lg mx-auto">
              Søk blant {stats.totalStores.toLocaleString('nb-NO')} butikker, {stats.totalBrands} merker
              og 357 kommuner. Fra Lindesnes til Nordkapp.
            </p>

            <div className="flex justify-center mb-6">
              <SearchBar variant="hero" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm mb-8">
              {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'].map((c) => (
                <Link key={c} href={`/${c.toLowerCase()}`} className="font-body text-xs font-medium text-muted hover:text-accent bg-white border border-border px-3 py-1.5 rounded-full transition-colors">
                  {c}
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
              <Link href="/by" className="btn-primary text-base px-10 py-4">
                Finn butikker nær deg
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href="/legg-til-butikk" className="btn-outline text-base px-10 py-4">Legg til butikk</Link>
            </div>

            <AnimatedHero totalStores={stats.totalStores} totalFylker={stats.totalFylker} />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622', label: 'Data fra Brønnøysundregistrene' },
              { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7', label: 'Oppdateres jevnlig' },
              { icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3', label: 'Dekker hele Norge' },
              { icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75', label: 'Helt gratis å bruke' },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} />
                </svg>
                <span className="font-body text-xs font-medium text-slate">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-sm font-bold text-accent mb-1">Kategorier</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Hva leter du etter?</h2>
            </div>
            <Link href="/kategorier" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
              Se alle <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATS.map((c) => (
              <Link key={c.slug} href={`/kategorier#${c.slug}`}
                className="group relative bg-white border-2 border-border rounded-2xl p-5 pb-4 hover:border-accent hover:shadow-lg transition-all duration-200 overflow-hidden">
                <span className={`absolute -right-2 -top-3 font-body text-[56px] font-black leading-none select-none pointer-events-none transition-colors duration-200 ${
                  c.accent ? 'text-accent/[0.06] group-hover:text-accent/[0.12]' : 'text-charcoal/[0.04] group-hover:text-charcoal/[0.08]'
                }`}>{c.letter}</span>
                <div className="relative">
                  <h3 className="font-body text-sm font-extrabold text-charcoal mb-0.5 group-hover:text-accent transition-colors">{c.name}</h3>
                  <p className="font-body text-[11px] text-muted leading-relaxed mb-3">{c.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-[3px] rounded-full ${c.accent ? 'bg-accent' : 'bg-charcoal'}`} />
                    <span className="font-body text-[10px] font-bold text-muted">{c.count} butikker</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIES ───────────────────────────────────────── */}
      <section className="bg-surface py-16 md:py-22">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-sm font-bold text-accent mb-1">Utforsk</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Populære byer</h2>
            </div>
            <Link href="/by" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
              Alle byer <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          </div>
        </div>
        <CityMarquee cities={cities} />
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-bold text-accent mb-1">Slik fungerer det</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Tre enkle steg</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ─── FEATURED STORES ──────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-surface">
          <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-sm font-bold text-accent mb-1">Anbefalt</p>
                <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Fremhevede butikker</h2>
              </div>
              <Link href="/butikk" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                Alle butikker <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map((store) => <StoreCard key={store.organisasjonsnummer} store={store} showCity />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── BRANDS (DARK) ────────────────────────────────── */}
      <BrandShowcase brands={allBrands} />

      {/* ─── WHY US ───────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-bold text-accent mb-1">Hvorfor Klesbutikk.no</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Norges mest komplette klesbutikkoversikt</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Offisielle data', desc: 'Alle butikker er hentet fra Brønnøysundregistrene med næringskode 47.710', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
              { title: 'Over 480 merker', desc: 'Fra norske favoritter som Holzweiler til internasjonale stormerker som Nike', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
              { title: '7 900+ sider', desc: 'Unike sider for hver by, fylke, merke, kategori og alle kombinasjonene', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
              { title: 'Alltid oppdatert', desc: 'Databasen synkroniseres jevnlig med Brønnøysundregistrene', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-border rounded-2xl p-7 hover:border-accent/30 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-body text-base font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR OWNERS (ORANGE) ──────────────────────────── */}
      <section className="bg-accent relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent-hover/50 to-transparent pointer-events-none" />
        <div className="relative max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-body text-sm font-bold text-white/70 mb-2">For butikkeiere</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-white mb-5">
                Bli synlig for tusenvis av kunder
              </h2>
              <p className="font-body text-base text-white/80 leading-relaxed mb-8 max-w-md">
                Klesbutikk.no er der folk søker når de leter etter klesbutikker. Få en fremhevet
                oppføring og bli synlig i din by, ditt fylke og for merkene du fører.
              </p>
              <div className="flex gap-3">
                <Link href="/annonser" className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-body font-bold text-sm rounded-xl hover:bg-white/90 transition-all shadow-lg">
                  Se priser
                </Link>
                <Link href="/legg-til-butikk" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-body font-bold text-sm rounded-xl hover:bg-white/10 transition-all">
                  Legg til gratis
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'Gratis', label: 'Standardoppføring', sub: 'For alle butikker' },
                { value: '990 kr', label: 'Fremhevet', sub: 'Per måned' },
                { value: '24/7', label: 'Synlighet', sub: 'Alltid online' },
                { value: '7 928', label: 'Sider', sub: 'I nettverket' },
              ].map((s) => (
                <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-6">
                  <span className="font-body text-3xl font-extrabold text-white">{s.value}</span>
                  <span className="block font-body text-sm font-semibold text-white/90 mt-1">{s.label}</span>
                  <span className="block font-body text-xs text-white/50">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto section-padding py-16 md:py-22">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige spørsmål" />
        </div>
      </section>

      {/* ─── SEO TEXT ─────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="max-w-2xl">
            <h2 className="font-body text-xl font-extrabold text-charcoal mb-5">Klesbutikker i Norge</h2>
            <div className="font-body text-sm text-muted leading-relaxed space-y-3">
              <p>
                Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet alle
                registrerte klesbutikker fra Brønnøysundregistrene med næringskode 47.710 og gjort dem
                søkbare etter by, fylke, merke og kategori.
              </p>
              <p>
                Med over {stats.totalStores.toLocaleString('nb-NO')} butikker i 357 kommuner og 15 fylker
                dekker vi hele Norge fra Lindesnes til Nordkapp. Vi har kartlagt over {stats.totalBrands} klesmerker
                og identifisert hvilke norske butikker som fører dem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
