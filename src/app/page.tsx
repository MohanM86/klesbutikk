import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import FAQAccordion from '@/components/FAQAccordion';
import FadeInSection from '@/components/FadeInSection';
import Ticker from '@/components/Ticker';
import { getTopCities, getStats, getAllFylker } from '@/lib/stores';
import { faqSchema, itemListSchema, webSiteSchema } from '@/lib/seo';

const FAQS = [
  { question: 'Hva er Klesbutikk.no?', answer: 'Klesbutikk.no er en oversikt over alle registrerte klesbutikker i Norge. Vi henter data fra Brønnøysundregistrene og gjør det enkelt å finne klesbutikker i din kommune eller ditt fylke.' },
  { question: 'Hvor mange klesbutikker finnes i Norge?', answer: 'Per i dag har vi registrert 1 566 klesbutikker fordelt på 357 kommuner og 15 fylker. Oslo har det klart største utvalget med over 250 butikker.' },
  { question: 'Hvordan finner jeg klesbutikker nær meg?', answer: 'Bruk søkefeltet på forsiden og skriv inn kommunen din. Du kan også navigere via fylke for å finne alle kommuner i din region, og deretter se butikkene i din kommune.' },
  { question: 'Hva koster det å bruke Klesbutikk.no?', answer: 'Klesbutikk.no er helt gratis å bruke for alle. Du kan søke og utforske uten å betale noe som helst.' },
  { question: 'Hvor kommer dataene fra?', answer: 'Alle butikkdata er hentet fra Brønnøysundregistrene og oppdateres jevnlig. Vi viser kun verifisert informasjon som butikknavn, adresse, kommune og fylke.' },
  { question: 'Driver du en klesbutikk?', answer: 'Alle registrerte klesbutikker i Norge er allerede oppført gratis på Klesbutikk.no. Ønsker du å legge til kontaktinformasjon, åpningstider eller annen informasjon på din oppføring, ta kontakt på hei@klesbutikk.no.' },
];

const STEPS = [
  { num: '1', title: 'Søk', desc: 'Skriv inn kommune eller butikknavn' },
  { num: '2', title: 'Velg', desc: 'Se alle butikker i din kommune' },
  { num: '3', title: 'Finn', desc: 'Se adresse og ta kontakt' },
];

export default function HomePage() {
  const cities = getTopCities(12);
  const stats = getStats();
  const fylker = getAllFylker();
  const topFylke = fylker[0]?.storeCount || 1;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(fylker.map((f) => ({ name: 'Klesbutikker i ' + f.name, url: '/fylke/' + f.slug })))) }} />

      {/* 1. HERO */}
      <section className="bg-black text-white py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto section-padding">
          <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-white mb-4 tracking-tight">
            Finn klesbutikker<br /><span className="text-accent">i hele Norge</span>
          </h1>
          <p className="font-body text-[15px] text-white/40 leading-relaxed mb-8 max-w-md mx-auto">
            {stats.totalStores.toLocaleString('nb-NO')} butikker · {stats.totalCities} kommuner · {stats.totalFylker} fylker
          </p>
          <SearchBar />
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'].map((c) => (
              <Link key={c} href={'/' + c.toLowerCase()} className="font-body text-xs text-white/30 border border-white/12 px-3.5 py-1.5 rounded-full hover:text-white hover:border-accent transition-all">{c}</Link>
            ))}
          </div>
          <div className="flex justify-center gap-10 md:gap-14 mt-10 pt-8 border-t border-white/[0.06]">
            {[
              { num: stats.totalStores.toLocaleString('nb-NO'), label: 'Butikker' },
              { num: stats.totalCities.toString(), label: 'Kommuner' },
              { num: stats.totalFylker.toString(), label: 'Fylker' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-body text-[26px] font-extrabold tracking-tight">{s.num}</div>
                <div className="font-body text-[11px] text-white/30 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SLIK FUNGERER DET (3 steg) */}
      <section className="-mt-px">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="grid grid-cols-3 gap-px bg-border border border-border">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-white p-5 md:p-6 text-center">
                <div className="w-9 h-9 rounded-full border-[1.5px] border-accent flex items-center justify-center mx-auto mb-3">
                  <span className="font-body text-sm font-extrabold text-accent">{step.num}</span>
                </div>
                <h3 className="font-body text-sm font-bold text-black mb-1">{step.title}</h3>
                <p className="font-body text-[12px] text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FYLKER (med sidebar-bar) */}
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Velg fylke</h2>
            <Link href="/fylker" className="font-body text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors">Alle {stats.totalFylker} fylker</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fylker.map((f) => (
              <FadeInSection key={f.slug}>
                <Link href={'/fylke/' + f.slug} className="group flex gap-0 border border-border rounded-lg overflow-hidden hover:border-black transition-all duration-150">
                  <div className="w-1 flex-shrink-0 bg-accent" style={{ opacity: Math.max(0.2, f.storeCount / topFylke) }} />
                  <div className="p-4 flex-1 min-w-0">
                    <h3 className="font-body text-[14px] font-bold text-black mb-0.5 group-hover:text-accent transition-colors">{f.name}</h3>
                    <p className="font-body text-[12px] text-accent font-semibold mb-1.5">{f.storeCount} butikker · {f.cities.length} kommuner</p>
                    <p className="font-body text-[11px] text-muted line-clamp-1">{f.cities.slice(0, 5).join(', ')}</p>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULÆRE KOMMUNER (pills med avatar) */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Populære kommuner</h2>
            <Link href="/kommuner" className="font-body text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors">Alle {stats.totalCities} kommuner</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {cities.map((city) => (
              <Link key={city.slug} href={'/' + city.slug} className="group flex-shrink-0 flex items-center gap-3 border border-border rounded-lg px-4 py-3 hover:border-black transition-all duration-150">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <span className="font-body text-sm font-extrabold text-accent">{city.name.charAt(0)}</span>
                </div>
                <div>
                  <span className="block font-body text-[13px] font-bold text-black group-hover:text-accent transition-colors">{city.name}</span>
                  <span className="block font-body text-[11px] text-muted">{city.storeCount} butikker · {city.fylke}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TICKER */}
      <Ticker />

      {/* 6. CTA FOR BUTIKKEIERE */}
      <section className="bg-black text-white py-12 md:py-14 text-center">
        <div className="max-w-lg mx-auto section-padding">
          <h2 className="font-body text-[22px] md:text-[26px] font-extrabold mb-3">Driver du en klesbutikk?</h2>
          <p className="font-body text-sm text-white/40 mb-6">Din butikk er allerede oppført gratis. Legg til kontaktinfo, åpningstider og mer for å gjøre oppføringen komplett.</p>
          <a href="mailto:hei@klesbutikk.no" className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm rounded-full transition-colors">Oppgrader oppføringen</a>
        </div>
      </section>

      {/* 7. SEO TEXT */}
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeInSection>
              <div className="max-w-xl">
                <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-5">Klesbutikker i Norge</h2>
                <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
                  <p>Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet alle {stats.totalStores.toLocaleString('nb-NO')} registrerte klesforretninger i landet på ett sted, basert på offentlige data fra Brønnøysundregistrene. Her kan du søke etter klesbutikker i din kommune, utforske butikkene i ditt fylke, eller bla gjennom hele listen fra A til Å.</p>
                  <p>Oslo har det klart største utvalget, etterfulgt av Bergen, Trondheim og Stavanger. Men også i mindre kommuner finner du lokale klesbutikker med personlig service og godt utvalg.</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.15}>
              <div>
                <h3 className="font-body text-base font-bold text-black mb-4">Store byer</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Oslo', slug: 'oslo', text: 'Norges shoppinghovedstad med over 250 klesbutikker i sentrum, Grünerløkka og Bogstadveien.' },
                    { name: 'Bergen', slug: 'bergen', text: 'Rundt 40 klesbutikker konsentrert ved Torgallmenningen og Strandgaten.' },
                    { name: 'Trondheim', slug: 'trondheim', text: 'Solid utvalg i Nordre gate og Thomas Angells gate i sentrum.' },
                    { name: 'Stavanger', slug: 'stavanger', text: 'Variert utvalg langs Klubbgata og Kirkegata.' },
                  ].map((c) => (
                    <div key={c.slug} className="border-l-2 border-accent/20 pl-4">
                      <Link href={'/' + c.slug} className="font-body text-[13px] font-bold text-black hover:text-accent transition-colors">{c.name}</Link>
                      <p className="font-body text-[12px] text-muted leading-relaxed mt-0.5">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-surface-alt py-12 md:py-16">
        <div className="max-w-3xl mx-auto section-padding">
          <FAQAccordion faqs={FAQS} title="Vanlige spørsmål" />
        </div>
      </section>
    </>
  );
}
