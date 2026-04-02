import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import FAQAccordion from '@/components/FAQAccordion';
import FadeInSection from '@/components/FadeInSection';
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

export default function HomePage() {
  const cities = getTopCities(12);
  const stats = getStats();
  const fylker = getAllFylker();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(fylker.map((f) => ({ name: 'Klesbutikker i ' + f.name, url: '/fylke/' + f.slug })))) }} />

      {/* HERO */}
      <section className="bg-black text-white py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto section-padding">
          <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-white mb-4 tracking-tight">
            Finn klesbutikker<br /><span className="text-accent">i hele Norge</span>
          </h1>
          <p className="font-body text-[15px] text-white/50 leading-relaxed mb-8 max-w-md mx-auto">
            {stats.totalStores.toLocaleString('nb-NO')} registrerte klesbutikker i {stats.totalCities} kommuner og {stats.totalFylker} fylker.
          </p>
          <SearchBar />
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'].map((c) => (
              <Link key={c} href={'/' + c.toLowerCase()} className="font-body text-xs text-white/35 border border-white/15 px-3.5 py-1.5 rounded-full hover:text-white hover:border-accent transition-all">{c}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* FYLKER */}
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Velg fylke</h2>
            <Link href="/fylker" className="font-body text-[13px] font-semibold text-black border-b border-black pb-px hover:text-accent hover:border-accent transition-colors">Alle {stats.totalFylker} fylker</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {fylker.map((f) => (
              <Link key={f.slug} href={'/fylke/' + f.slug} className="group border border-border rounded-lg p-4 hover:border-black transition-all duration-150">
                <h3 className="font-body text-[14px] font-bold text-black mb-1">{f.name}</h3>
                <p className="font-body text-[12px] text-accent font-semibold mb-1.5">{f.storeCount} butikker</p>
                <p className="font-body text-[11px] text-muted line-clamp-1">{f.cities.slice(0, 4).join(', ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULÆRE KOMMUNER */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Populære kommuner</h2>
            <Link href="/kommuner" className="font-body text-[13px] font-semibold text-black border-b border-black pb-px hover:text-accent hover:border-accent transition-colors">Alle {stats.totalCities} kommuner</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {cities.map((city) => (
              <Link key={city.slug} href={'/' + city.slug} className="group flex-shrink-0 w-[160px] border border-border rounded-lg overflow-hidden hover:border-black transition-all duration-150">
                <div className="h-12 bg-black flex items-center justify-center">
                  <span className="font-body text-xl font-extrabold text-accent">{city.name.charAt(0)}</span>
                </div>
                <div className="p-3">
                  <h3 className="font-body text-[13px] font-bold text-black">{city.name}</h3>
                  <p className="font-body text-[11px] text-muted">{city.fylke} · {city.storeCount} butikker</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="bg-surface-alt py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <FadeInSection>
            <div className="max-w-3xl">
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-5">Klesbutikker i Norge</h2>
              <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
                <p>Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet alle registrerte klesforretninger i landet på ett sted, basert på offentlige data fra Brønnøysundregistrene. Her kan du søke etter klesbutikker i din kommune, utforske butikkene i ditt fylke, eller bla gjennom hele listen fra A til Å.</p>
                <p>Norge har {stats.totalStores.toLocaleString('nb-NO')} registrerte klesbutikker fordelt på {stats.totalCities} kommuner og {stats.totalFylker} fylker. Oslo har det klart største utvalget, etterfulgt av Bergen, Trondheim og Stavanger. Men også i mindre kommuner finner du lokale klesbutikker med personlig service og godt utvalg.</p>
                <p>Vi oppdaterer oversikten jevnlig for å sikre at informasjonen er korrekt. Alle oppføringer er gratis, og vi viser kun verifisert informasjon fra offentlige registre.</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BYER SEO */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-8">Klesbutikker i Norges største byer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Klesbutikker i Oslo', slug: 'oslo', text: 'Oslo er Norges ubestridte shoppinghovedstad med over 250 registrerte klesbutikker. Sentrumsområdene rundt Karl Johan, Bogstadveien og Grünerløkka har den høyeste konsentrasjonen av klesforretninger i landet.' },
              { name: 'Klesbutikker i Bergen', slug: 'bergen', text: 'Bergen har rundt 40 klesbutikker konsentrert i sentrumsområdet. Torgallmenningen og Strandgaten er de mest populære handlegatene for klær i byen.' },
              { name: 'Klesbutikker i Trondheim', slug: 'trondheim', text: 'Trondheim har et solid utvalg av klesbutikker i sentrum, med Nordre gate og Thomas Angells gate som de viktigste handlestrøkene.' },
              { name: 'Klesbutikker i Stavanger', slug: 'stavanger', text: 'Stavanger har et variert utvalg av klesbutikker. Klubbgata og Kirkegata er hjertet av kleshandelen i byen.' },
            ].map((c) => (
              <FadeInSection key={c.slug}>
                <h3 className="font-body text-base font-bold text-black mb-1.5">
                  <Link href={'/' + c.slug} className="hover:text-accent transition-colors">{c.name}</Link>
                </h3>
                <p className="font-body text-[13px] text-slate leading-relaxed">{c.text}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOR BUTIKKEIERE */}
      <section className="bg-black text-white py-12 md:py-14 text-center">
        <div className="max-w-lg mx-auto section-padding">
          <h2 className="font-body text-[22px] md:text-[26px] font-extrabold mb-3">Driver du en klesbutikk?</h2>
          <p className="font-body text-sm text-white/50 mb-6">Din butikk er allerede oppført gratis. Legg til kontaktinfo, åpningstider og mer for å gjøre oppføringen komplett.</p>
          <a href="mailto:hei@klesbutikk.no" className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm rounded-full transition-colors">Ta kontakt</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto section-padding">
          <FAQAccordion faqs={FAQS} title="Vanlige spørsmål" />
        </div>
      </section>
    </>
  );
}
