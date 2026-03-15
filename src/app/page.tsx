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
  { question: 'Hva er de beste klesbutikkene i Norge?', answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populaere finnes i Oslo, Bergen, Trondheim og Stavanger.' },
  { question: 'Hvordan finner jeg klesbutikker naer meg?', answer: 'Bruk sokefeltet for a soke etter din by, et merke eller en butikk. Du kan ogsa bla gjennom bysider, fylkesider eller kategorier.' },
  { question: 'Er det gratis a legge til butikken min?', answer: 'Ja, alle klesbutikker registrert med naeringskode 47.710 i Bronnoysundregistrene er allerede listet gratis. For okt synlighet tilbyr vi fremhevede plasseringer fra 990 kr/mnd.' },
  { question: 'Hvilke klesmerker kan jeg finne?', answer: 'Vi har kartlagt over 480 klesmerker, fra Holzweiler og Filippa K til Nike, Gucci og Zara.' },
  { question: 'Hvor ofte oppdateres oversikten?', answer: 'Databasen er basert pa offisielle data fra Bronnoysundregistrene (naeringskode 47.710) og oppdateres jevnlig.' },
  { question: 'Hva er forskjellen pa fremhevet og vanlig oppforing?', answer: 'Alle butikker har gratis standardoppforing. Fremhevede far prioritert plassering og vises i Fremhevede butikker-seksjonen.' },
];

const CATS = [
  { name: 'Dameklaer', slug: 'dameklar', desc: 'Kjoler, topper, jakker og alt for henne', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
  { name: 'Herreklaer', slug: 'herreklar', desc: 'Dresser, skjorter, bukser og mer', icon: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V7.5' },
  { name: 'Barneklaer', slug: 'barneklar', desc: 'Klaer for barn og baby', icon: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive merker og luksus', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12' },
  { name: 'Vintage', slug: 'vintage', desc: 'Gjenbruk, retro og baerekraftig', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
  { name: 'Sportsklaer', slug: 'sport', desc: 'Outdoor, trening og friluft', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58' },
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
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding pt-12 pb-14 md:pt-20 md:pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-body text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Norges storste klesbutikkoversikt
            </div>
            <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-charcoal mb-4">
              Finn klesbutikker i hele Norge
            </h1>
            <p className="font-body text-base md:text-lg text-muted leading-relaxed mb-8 max-w-lg mx-auto">
              Sok blant {stats.totalStores.toLocaleString('nb-NO')} butikker, {stats.totalBrands} merker og 357 kommuner. Fra Lindesnes til Nordkapp.
            </p>
            <div className="flex justify-center mb-8">
              <SearchBar variant="hero" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link href="/by" className="btn-primary">Finn butikker naer deg</Link>
              <Link href="/legg-til-butikk" className="btn-outline">Legg til butikk</Link>
            </div>
            <AnimatedHero totalStores={stats.totalStores} totalFylker={stats.totalFylker} />
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-xs font-bold text-accent mb-1">Kategorier</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Hva leter du etter?</h2>
            </div>
            <Link href="/kategorier" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
              Alle kategorier <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATS.map((c) => (
              <Link key={c.slug} href={`/kategorier#${c.slug}`}
                className="group bg-white border border-border rounded-xl p-5 hover:border-accent hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center mb-3 group-hover:bg-accent transition-colors">
                  <svg className="w-5 h-5 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={c.icon} />
                  </svg>
                </div>
                <h3 className="font-body text-sm font-bold text-charcoal mb-0.5">{c.name}</h3>
                <p className="font-body text-[11px] text-muted leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIES ───────────────────────────────────────── */}
      <section className="bg-surface py-14 md:py-20">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-xs font-bold text-accent mb-1">Utforsk</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Populaere byer</h2>
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
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-xs font-bold text-accent mb-1">Slik fungerer det</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Tre enkle steg</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Sok', desc: 'Bruk sokefeltet eller bla gjennom byer, merker og kategorier for a finne det du leter etter.' },
              { n: '2', title: 'Utforsk', desc: 'Hver butikk har sin egen side med adresse, kontaktinfo, nettside og merker de forer.' },
              { n: '3', title: 'Besok', desc: 'Finn veien med adressen, ring for apningstider, eller besok butikkens nettside.' },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto mb-4">
                  <span className="font-body text-xl font-extrabold">{s.n}</span>
                </div>
                <h3 className="font-body text-lg font-bold text-charcoal mb-2">{s.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED STORES ──────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-surface">
          <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-body text-xs font-bold text-accent mb-1">Anbefalt</p>
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
      <section className="bg-white border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-xs font-bold text-accent mb-1">Hvorfor Klesbutikk.no</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Norges mest komplette oversikt</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Offisielle data', desc: 'Alle butikker fra Bronnoysundregistrene med naeringskode 47.710', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
              { title: '480+ merker', desc: 'Fra norske favoritter til internasjonale stormerker', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
              { title: '7 900+ sider', desc: 'Unike sider for byer, fylker, merker og kombinasjoner', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
              { title: 'Alltid oppdatert', desc: 'Synkronisert med offentlige registre jevnlig', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
            ].map((item) => (
              <div key={item.title} className="bg-surface rounded-xl p-6">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-body text-sm font-bold text-charcoal mb-1">{item.title}</h3>
                <p className="font-body text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR OWNERS ───────────────────────────────────── */}
      <section className="bg-accent">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-bold text-white/60 mb-2">For butikkeiere</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-white mb-4">Bli synlig for tusenvis av kunder</h2>
              <p className="font-body text-base text-white/70 leading-relaxed mb-8 max-w-md">
                Klesbutikk.no er der folk soker nar de leter etter klesbutikker. Fa en fremhevet oppforing og bli synlig i din by.
              </p>
              <div className="flex gap-3">
                <Link href="/annonser" className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-accent font-body font-bold text-sm rounded-lg hover:bg-white/90 transition-all">Se priser</Link>
                <Link href="/legg-til-butikk" className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/30 text-white font-body font-bold text-sm rounded-lg hover:bg-white/10 transition-all">Legg til gratis</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'Gratis', label: 'Standardoppforing' },
                { value: '990 kr', label: 'Fremhevet / mnd' },
                { value: '24/7', label: 'Online synlighet' },
                { value: '7 900+', label: 'Sider' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
                  <span className="font-body text-2xl font-extrabold text-white">{s.value}</span>
                  <span className="block font-body text-xs text-white/50 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto section-padding py-14 md:py-20">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige sporsmal" />
        </div>
      </section>

      {/* ─── SEO TEXT ─────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-body text-xl font-extrabold text-charcoal mb-4">Klesbutikker i Norge</h2>
            <div className="font-body text-sm text-muted leading-relaxed space-y-3">
              <p>Klesbutikk.no er Norges mest komplette oversikt over klesbutikker med data fra Bronnoysundregistrene (naeringskode 47.710).</p>
              <p>Med over {stats.totalStores.toLocaleString('nb-NO')} butikker i 357 kommuner og 15 fylker dekker vi hele Norge. Vi har kartlagt over {stats.totalBrands} klesmerker.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
