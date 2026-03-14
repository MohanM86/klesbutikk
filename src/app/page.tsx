import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CityCard from '@/components/CityCard';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import { getTopCities, getFeaturedStores, getStats } from '@/lib/stores';
import { faqSchema, itemListSchema } from '@/lib/seo';

const HOME_FAQS = [
  {
    question: 'Hva er de beste klesbutikkene i Norge?',
    answer: 'Norge har tusenvis av klesbutikker fra nord til sør. De mest populære finnes i Oslo, Bergen, Trondheim og Stavanger. På Klesbutikk.no kan du utforske alle registrerte klesbutikker i landet og finne de beste i din by.',
  },
  {
    question: 'Hvordan finner jeg klesbutikker nær meg?',
    answer: 'Bruk søkefeltet øverst på siden for å søke etter din by eller ditt postnummer. Du kan også bla gjennom bysider for å finne alle klesbutikker i ditt nærområde.',
  },
  {
    question: 'Er det gratis å legge til butikken min?',
    answer: 'Ja, alle klesbutikker registrert med næringskode 47.710 i Brønnøysundregistrene er allerede listet. Du kan også legge til eller oppdatere din butikk gratis. For økt synlighet tilbyr vi fremhevede plasseringer.',
  },
  {
    question: 'Hvor kan jeg kjøpe designerklær i Norge?',
    answer: 'Designerklær finnes i mange norske byer, med størst utvalg i Oslo. Besøk våre bysider for Oslo, Bergen og Stavanger for å finne eksklusive designerbutikker i ditt område.',
  },
  {
    question: 'Hva er forskjellen på en fremhevet og en vanlig butikk?',
    answer: 'Fremhevede butikker får økt synlighet med fremhevet plassering i sin by, et spesielt merke, og vises oftere i søkeresultater. Alle butikker er gratis listet, men fremheving gir ekstra eksponering.',
  },
];

export default function HomePage() {
  const cities = getTopCities(10);
  const featured = getFeaturedStores(8);
  const stats = getStats();

  const cityListSchema = itemListSchema(
    cities.map((c) => ({ name: `Klesbutikker i ${c.name}`, url: `/${c.slug}` }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListSchema) }}
      />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-8xl mx-auto section-padding pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-6">
              {stats.totalStores.toLocaleString('nb-NO')} butikker · {stats.totalCities} byer · {stats.totalFylker} fylker
            </p>

            <h1 className="font-display text-hero-sm md:text-hero font-semibold text-charcoal mb-6">
              Finn klesbutikker<br />
              <span className="italic font-normal">i hele Norge</span>
            </h1>

            <p className="editorial-text mx-auto mb-10">
              Oppdag motebutikker, lokale favoritter og norske klesbutikker i hele landet.
              Fra Oslo til Tromsø &mdash; din guide til norsk mote.
            </p>

            <SearchBar variant="hero" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/by" className="btn-primary">
                Finn butikker nær deg
              </Link>
              <Link href="/legg-til-butikk" className="btn-secondary">
                Legg til butikk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POPULAR CITIES ───────────────────────────────── */}
      <section className="max-w-8xl mx-auto section-padding py-16 md:py-22">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">
              Utforsk
            </p>
            <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
              Populære byer
            </h2>
          </div>
          <Link
            href="/by"
            className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-charcoal transition-colors"
          >
            Se alle byer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/by" className="btn-secondary text-sm">
            Se alle byer
          </Link>
        </div>
      </section>

      {/* ─── FEATURED STORES ──────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white border-y border-border">
          <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">
                  Anbefalt
                </p>
                <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal">
                  Fremhevede butikker
                </h2>
              </div>
              <Link
                href="/butikk"
                className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-charcoal transition-colors"
              >
                Se alle butikker
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
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

      {/* ─── STATS BAND ───────────────────────────────────── */}
      <section className="max-w-8xl mx-auto section-padding py-16 md:py-22">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[
            { value: stats.totalStores.toLocaleString('nb-NO'), label: 'Klesbutikker' },
            { value: stats.totalCities.toString(), label: 'Byer' },
            { value: stats.totalFylker.toString(), label: 'Fylker' },
            { value: stats.featuredStores.toString(), label: 'Fremhevede' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-semibold text-charcoal mb-1">
                {stat.value}
              </p>
              <p className="font-body text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOR STORE OWNERS ─────────────────────────────── */}
      <section className="max-w-8xl mx-auto section-padding pb-16 md:pb-22">
        <CTASection />
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-16 md:py-22">
          <FAQAccordion faqs={HOME_FAQS} title="Ofte stilte spørsmål" />
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
              registrerte klesbutikker fra Brønnøysundregistrene med næringskode 47.710 – Detaljhandel
              med klær – og gjort dem søkbare etter by, fylke og butikknavn.
            </p>
            <p>
              Enten du leter etter en ny favorittbutikk i din hjemby, eller vil utforske motetilbudet
              i en annen norsk by, hjelper vi deg med å finne akkurat den klesbutikken du trenger. Fra
              store kjeder til sjarmerende nisjebutikker, fra designermerker til budsjettvennlige
              alternativer – alt samlet på ett sted.
            </p>
            <p>
              Vår database oppdateres jevnlig med data fra Brønnøysundregistrene for å sikre at du
              alltid finner oppdatert informasjon. Driver du selv en klesbutikk? Legg til eller
              oppdater din butikk for å bli synlig for tusenvis av potensielle kunder.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
