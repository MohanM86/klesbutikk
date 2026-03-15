import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import AnimatedHero from '@/components/AnimatedHero';
import CityMarquee from '@/components/CityMarquee';
import BrandShowcase from '@/components/BrandShowcase';
import { getTopCities, getFeaturedStores, getStats, getAllBrands } from '@/lib/stores';
import { faqSchema, itemListSchema } from '@/lib/seo';

const HOME_FAQS = [
  { question: 'Hva er de beste klesbutikkene i Norge?', answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populære finnes i Oslo, Bergen, Trondheim og Stavanger. På Klesbutikk.no kan du utforske alle registrerte klesbutikker og finne de beste i din by.' },
  { question: 'Hvordan finner jeg klesbutikker nær meg?', answer: 'Bruk søkefeltet for å søke etter din by, et merke eller en butikk. Du kan også bla gjennom bysider, fylkesider eller kategorier for å finne klesbutikker i ditt nærområde.' },
  { question: 'Er det gratis å legge til butikken min?', answer: 'Ja, alle klesbutikker registrert med næringskode 47.710 i Brønnøysundregistrene er allerede listet gratis. For økt synlighet tilbyr vi fremhevede plasseringer fra 990 kr/mnd.' },
  { question: 'Hvilke klesmerker kan jeg finne?', answer: 'Vi har kartlagt over 480 klesmerker, fra Holzweiler og Filippa K til Nike, Gucci og Zara. Søk på merke og se hvilke butikker som fører det.' },
  { question: 'Hvor ofte oppdateres butikkoversikten?', answer: 'Vår database er basert på offisielle data fra Brønnøysundregistrene (næringskode 47.710) og oppdateres jevnlig.' },
  { question: 'Hva er forskjellen på en fremhevet og en vanlig oppføring?', answer: 'Alle butikker har en gratis standardoppføring. Fremhevede butikker får prioritert plassering, et synlig merke og vises i Fremhevede butikker-seksjonen.' },
];

const CATEGORIES = [
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker og alt for henne' },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser og mer' },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby, alle aldre' },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive merker og luksusklær' },
  { name: 'Vintage', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig' },
  { name: 'Sport', slug: 'sport', desc: 'Treningsklær, outdoor og friluft' },
];

export default function HomePage() {
  const cities = getTopCities(16);
  const featured = getFeaturedStores(8);
  const stats = getStats();
  const allBrands = getAllBrands();

  const cityListSchema = itemListSchema(cities.map((c) => ({ name: `Klesbutikker i ${c.name}`, url: `/${c.slug}` })));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListSchema) }} />

      {/* ─── HERO (BLACK) ─────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden">
        <div className="relative max-w-8xl mx-auto section-padding pt-24 pb-20 md:pt-36 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-8">
              Norges ledende klesbutikkoversikt
            </p>

            <AnimatedHero totalStores={stats.totalStores} totalFylker={stats.totalFylker} />

            <h1 className="font-display text-hero-sm md:text-hero font-bold text-white mb-6">
              Finn klesbutikker<br />
              <span className="italic font-normal text-white/50">i hele Norge</span>
            </h1>

            <p className="font-body text-base md:text-lg text-white/40 max-w-xl mx-auto mb-4 leading-relaxed">
              {stats.totalStores.toLocaleString('nb-NO')} butikker. {stats.totalBrands} merker. 357 kommuner.
              Fra Lindesnes til Nordkapp.
            </p>

            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
              {['Data fra Brønnøysundregistrene', 'Oppdatert og verifisert', 'Helt gratis', '357 kommuner'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 font-body text-[11px] text-white/25 tracking-wide">
                  <svg className="w-3 h-3 text-white/20 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <SearchBar variant="hero" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/by" className="btn-white">Finn butikker nær deg</Link>
              <Link href="/legg-til-butikk" className="btn-outline-white">Legg til butikk</Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-8xl mx-auto section-padding py-5">
            <div className="flex items-center justify-center gap-8 sm:gap-16">
              {[
                { value: stats.totalStores.toLocaleString('nb-NO'), label: 'Butikker' },
                { value: '357', label: 'Kommuner' },
                { value: stats.totalBrands.toString(), label: 'Merker' },
                { value: stats.totalFylker.toString(), label: 'Fylker' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="font-display text-lg sm:text-xl font-bold text-white">{s.value}</span>
                  <span className="block font-body text-[9px] tracking-[0.15em] uppercase text-white/25 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (WHITE) ─────────────────────────── */}
      <section className="section-light border-b border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-12">
            <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-muted mb-2">Slik fungerer det</p>
            <h2 className="font-display text-display-sm md:text-display font-bold text-charcoal">
              Tre enkle steg
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Søk', desc: 'Bruk søkefeltet eller bla gjennom byer, merker og kategorier.' },
              { step: '02', title: 'Utforsk', desc: 'Hver butikk har sin egen side med adresse, kontaktinfo og merker.' },
              { step: '03', title: 'Besøk', desc: 'Finn veien, ring for åpningstider, eller besøk butikkens nettside.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-display text-5xl font-bold text-charcoal/[0.06]">{item.step}</span>
                <h3 className="font-display text-lg font-bold text-charcoal mt-2 mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES (SURFACE) ─────────────────────────── */}
      <section className="section-surface">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-muted mb-2">Kategorier</p>
              <h2 className="font-display text-display-sm md:text-display font-bold text-charcoal">Hva leter du etter?</h2>
            </div>
            <Link href="/kategorier" className="hidden sm:inline-flex items-center gap-1.5 font-body text-xs font-semibold text-muted hover:text-charcoal transition-colors tracking-wide uppercase">
              Alle kategorier
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/kategorier#${cat.slug}`} className="group bg-white border border-border p-5 transition-all duration-300 hover:bg-charcoal hover:border-charcoal">
                <h3 className="font-display text-sm font-bold text-charcoal mb-1 group-hover:text-white transition-colors">{cat.name}</h3>
                <p className="font-body text-[11px] text-muted leading-relaxed group-hover:text-white/50 transition-colors">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIES (BLACK) ───────────────────────────────── */}
      <section className="section-dark py-16 md:py-22">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-2">Utforsk</p>
              <h2 className="font-display text-display-sm md:text-display font-bold text-white">Populære byer</h2>
            </div>
            <Link href="/by" className="hidden sm:inline-flex items-center gap-1.5 font-body text-xs font-semibold text-white/30 hover:text-white transition-colors tracking-wide uppercase">
              Alle byer
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          </div>
        </div>
        <CityMarquee cities={cities} />
        <div className="mt-8 text-center sm:hidden">
          <Link href="/by" className="btn-outline-white text-xs">Alle byer</Link>
        </div>
      </section>

      {/* ─── FEATURED STORES (WHITE) ──────────────────────── */}
      {featured.length > 0 && (
        <section className="section-light border-b border-border">
          <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-muted mb-2">Anbefalt</p>
                <h2 className="font-display text-display-sm md:text-display font-bold text-charcoal">Fremhevede butikker</h2>
              </div>
              <Link href="/butikk" className="hidden sm:inline-flex items-center gap-1.5 font-body text-xs font-semibold text-muted hover:text-charcoal transition-colors tracking-wide uppercase">
                Alle butikker
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
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

      {/* ─── BRANDS (BLACK) ───────────────────────────────── */}
      <BrandShowcase brands={allBrands} />

      {/* ─── WHY US (WHITE) ───────────────────────────────── */}
      <section className="section-light border-b border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-12">
            <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-muted mb-2">Hvorfor Klesbutikk.no</p>
            <h2 className="font-display text-display-sm md:text-display font-bold text-charcoal">
              Norges mest komplette oversikt
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { title: 'Offisielle data', desc: 'Brønnøysundregistrene, næringskode 47.710' },
              { title: '480+ merker', desc: 'Fra Holzweiler til Nike, Gucci til H&M' },
              { title: '7 900+ sider', desc: 'Byer, fylker, merker, kategorier og kombinasjoner' },
              { title: 'Alltid oppdatert', desc: 'Synkronisert med offentlige registre' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 text-center">
                <h3 className="font-display text-base font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR STORE OWNERS (BLACK) ─────────────────────── */}
      <section className="section-dark">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-3">For butikkeiere</p>
              <h2 className="font-display text-display-sm md:text-display font-bold text-white mb-6">
                Bli synlig for tusenvis av kunder
              </h2>
              <p className="font-body text-base text-white/40 leading-relaxed mb-8">
                Klesbutikk.no er der folk søker når de leter etter klesbutikker. Få en fremhevet
                oppføring og bli synlig i din by, ditt fylke og for merkene du fører.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/annonser" className="btn-white">Se priser</Link>
                <Link href="/legg-til-butikk" className="btn-outline-white">Legg til butikk gratis</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              {[
                { value: 'Gratis', label: 'Standardoppføring' },
                { value: '990 kr', label: 'Fremhevet / mnd' },
                { value: '24/7', label: 'Synlighet online' },
                { value: '7 900+', label: 'Sider i nettverket' },
              ].map((item) => (
                <div key={item.label} className="bg-charcoal p-6">
                  <span className="font-display text-2xl font-bold text-white">{item.value}</span>
                  <span className="block font-body text-xs text-white/30 mt-1 tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ (WHITE) ──────────────────────────────────── */}
      <section className="section-light">
        <div className="max-w-3xl mx-auto section-padding py-16 md:py-22">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige spørsmål" />
        </div>
      </section>

      {/* ─── SEO TEXT (SURFACE) ────────────────────────────── */}
      <section className="section-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="max-w-3xl">
            <h2 className="font-display text-display-sm font-bold text-charcoal mb-6">
              Klesbutikker i Norge
            </h2>
            <div className="font-body text-muted leading-relaxed space-y-4 text-sm">
              <p>
                Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet alle
                registrerte klesbutikker fra Brønnøysundregistrene med næringskode 47.710 – Butikkhandel
                med klær – og gjort dem søkbare etter by, fylke, merke og kategori.
              </p>
              <p>
                Med over {stats.totalStores.toLocaleString('nb-NO')} butikker i 357 kommuner
                og 15 fylker, dekker vi hele Norge. Vi har kartlagt over {stats.totalBrands} klesmerker
                og identifisert hvilke butikker som fører dem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
