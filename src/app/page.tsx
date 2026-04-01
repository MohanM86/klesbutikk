import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import CityMarquee from '@/components/CityMarquee';
import BrandShowcase from '@/components/BrandShowcase';
import HowItWorks from '@/components/HowItWorks';
import FadeInSection from '@/components/FadeInSection';
import { getTopCities, getAllStores, getStats, getAllBrands } from '@/lib/stores';
import { faqSchema, itemListSchema, webSiteSchema, datasetSchema } from '@/lib/seo';

const HOME_FAQS = [
  { question: 'Hva er de beste klesbutikkene i Norge?', answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populære finner du i Oslo, Bergen, Trondheim og Stavanger. På Klesbutikk.no kan du utforske alle registrerte klesbutikker i landet og finne favorittene i din by.' },
  { question: 'Hvordan finner jeg klesbutikker nær meg?', answer: 'Bruk søkefeltet øverst på siden for å søke etter din by, et merke eller en butikk. Du kan også bla gjennom bysider, fylkesider eller kategorier for å finne klesbutikker i ditt nærområde.' },
  { question: 'Hvilke klesmerker kan jeg finne på Klesbutikk.no?', answer: 'Vi har kartlagt over 480 klesmerker, alt fra norske favoritter som Holzweiler, Stine Goya og Filippa K til internasjonale stormerker som Nike, Gucci og Zara. Du kan søke på merke og se hvilke butikker som fører det.' },
  { question: 'Hvor finner jeg treningsklær i Norge?', answer: 'Klesbutikk.no har registrert over 200 butikker som fører treningsklær i Norge. Du finner alt fra treningsklær for dame og herre til spesialiserte butikker for løping, yoga og utendørstrening.' },
  { question: 'Finnes det gode norske klesbutikker på nett?', answer: 'Ja, mange norske klesbutikker tilbyr også netthandel. Vi har samlet en egen oversikt over norske nettbutikker for klær der du kan handle dameklær, herreklær, barneklær og treningsklær på nett fra norske aktører.' },
  { question: 'Hva er de beste klesbutikkene i Oslo?', answer: 'Oslo har over 253 registrerte klesbutikker og er Norges mest varierte handleby for mote. Populære handlestrøk inkluderer Bogstadveien, Hegdehaugsveien, Grünerløkka og Aker Brygge.' },
  { question: 'Hvor mange klesbutikker finnes det i Norge?', answer: 'Klesbutikk.no har registrert over 1 566 klesbutikker fordelt på 357 kommuner og 15 fylker. Oslo har det klart største utvalget med over 253 butikker, etterfulgt av Bergen, Trondheim og Stavanger.' },
  { question: 'Hva koster det å bruke Klesbutikk.no?', answer: 'Klesbutikk.no er helt gratis å bruke. Du kan søke, utforske og finne klesbutikker uten å betale noe som helst.' },
  { question: 'Hvordan skiller Klesbutikk.no seg fra andre butikkoversikter?', answer: 'Klesbutikk.no er spesialisert utelukkende på klesbutikker i Norge. I motsetning til generelle bedriftsoversikter har vi detaljert informasjon om merker, kategorier og spesialisering for hver butikk. Vi dekker 357 kommuner med nesten 8 000 unike sider.' },
];

const CATS = [
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker og alt for henne', count: 342 },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser og mer', count: 289 },
  { name: 'Sportsklær', slug: 'sport', desc: 'Treningsklær, outdoor og friluftsutstyr', count: 201 },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby i alle aldre', count: 156 },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive merker og luksusmote', count: 87 },
  { name: 'Vintage', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig mote', count: 64 },
];

const QUICKNAV = [
  { label: 'Kommuner', desc: '357 kommuner dekket', href: '/by', color: 'bg-blue-50 text-blue-600', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
  { label: 'Merker', desc: '483 merkevarer', href: '/merker', color: 'bg-amber-50 text-amber-600', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
  { label: 'Butikker', desc: '1 566 registrert', href: '/butikk', color: 'bg-emerald-50 text-emerald-600', icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349' },
  { label: 'Kategorier', desc: '10 kategorier', href: '/kategorier', color: 'bg-violet-50 text-violet-600', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z' },
];

export default function HomePage() {
  const cities = getTopCities(16);
  const stats = getStats();
  const allBrands = getAllBrands();
  const allStores = getAllStores().slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(cities.map((c) => ({ name: 'Klesbutikker i ' + c.name, url: '/' + c.slug })))) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-100 to-cream">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(232,93,38,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-8xl mx-auto section-padding pt-24 pb-16 md:pt-32 md:pb-24 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-surface border border-border font-body text-xs font-semibold text-slate px-4 py-1.5 rounded-full shadow-sm mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {stats.totalStores.toLocaleString('nb-NO')} butikker kartlagt
            </div>
            <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-charcoal mb-4">
              Finn klesbutikker<br /><em className="text-accent italic">i hele Norge</em>
            </h1>
            <p className="font-body text-[17px] text-slate leading-relaxed mb-8 max-w-md mx-auto">
              Søk blant butikker, merker og byer fra Lindesnes til Nordkapp. Helt gratis.
            </p>
            <div className="flex justify-center mb-5"><SearchBar variant="hero" /></div>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'].map((c) => (
                <Link key={c} href={'/' + c.toLowerCase()} className="font-body text-xs font-medium text-muted hover:text-accent hover:border-accent bg-surface border border-border px-3 py-1.5 rounded-full transition-colors">{c}</Link>
              ))}
            </div>
            <div className="flex justify-center gap-8 md:gap-12">
              {[
                { num: stats.totalStores.toLocaleString('nb-NO'), label: 'Butikker' },
                { num: stats.totalBrands.toString(), label: 'Merker' },
                { num: '357', label: 'Kommuner' },
                { num: stats.totalFylker.toString(), label: 'Fylker' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-body text-2xl font-extrabold md:text-[28px] text-charcoal">{s.num}</div>
                  <div className="font-body text-xs text-muted mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="relative z-10 -mt-6">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICKNAV.map((q) => (
              <Link key={q.label} href={q.href} className="group flex items-center gap-3 bg-surface border border-border rounded-lg p-4 lg:p-5 shadow-sm hover:border-accent/40 transition-all duration-200">
                <div className={'w-10 h-10 lg:w-11 lg:h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ' + q.color}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={q.icon} /></svg>
                </div>
                <div>
                  <h3 className="font-body text-sm font-bold text-charcoal">{q.label}</h3>
                  <p className="font-body text-xs text-muted">{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CITIES */}
      <section className="bg-cream">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <FadeInSection>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="overline mb-2">Utforsk</p>
                <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Populære kommuner</h2>
                <p className="font-body text-sm text-slate mt-2 max-w-lg">Finn klesbutikker i din by. Vi dekker alle 357 kommuner i Norge.</p>
              </div>
              <Link href="/by" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">Alle kommuner <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></Link>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.slice(0, 8).map((city) => (
              <FadeInSection key={city.slug}>
                <Link href={'/' + city.slug} className="group block bg-surface border border-border rounded-lg p-5 hover:border-accent/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center font-body text-lg font-bold text-charcoal group-hover:bg-accent group-hover:text-white transition-colors">{city.name.charAt(0)}</div>
                    <span className="font-body text-[11px] font-semibold text-muted bg-surface-alt px-2 py-0.5 rounded-full">{city.storeCount} butikker</span>
                  </div>
                  <h3 className="font-body text-[15px] font-bold text-charcoal mb-0.5 group-hover:text-accent transition-colors">{city.name}</h3>
                  <p className="font-body text-xs text-muted">{city.fylke}</p>
                  <div className="h-[3px] bg-surface-alt rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: Math.max(4, (city.storeCount / 253) * 100) + '%' }} />
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <BrandShowcase brands={allBrands} />

      {/* CATEGORIES */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <FadeInSection>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="overline mb-2">Kategorier</p>
                <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Hva leter du etter?</h2>
              </div>
              <Link href="/kategorier" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">Se alle <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></Link>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATS.map((c) => (
              <FadeInSection key={c.slug}>
                <Link href={'/kategorier#' + c.slug} className="group block bg-cream border border-border rounded-lg p-6 hover:border-accent/40 transition-all duration-200 relative overflow-hidden">
                  <span className="absolute -right-2 -top-3 font-body text-[80px] font-extrabold leading-none select-none pointer-events-none text-surface-alt group-hover:text-accent-light transition-colors">{c.name.charAt(0)}</span>
                  <div className="relative">
                    <h3 className="font-body text-[15px] font-bold text-charcoal mb-1 group-hover:text-accent transition-colors">{c.name}</h3>
                    <p className="font-body text-xs text-muted leading-relaxed mb-3">{c.desc}</p>
                    <span className="font-body text-[11px] font-semibold text-accent">{c.count} butikker</span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-12">
            <p className="overline mb-2">Slik fungerer det</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Tre enkle steg</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* SEO TEXT SECTION */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <FadeInSection>
            <div className="max-w-3xl">
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mb-6">Klesbutikker i Norge</h2>
              <div className="font-body text-[15px] text-slate leading-relaxed space-y-4">
                <p>Norge har et rikt og variert utvalg av klesbutikker fra de største byene til de minste tettstedene. Enten du leter etter en klesbutikk i nærheten med eksklusive designermerker eller en rimelig nettbutikk med bredt utvalg, finnes det norske klesbutikker for enhver smak, stil og lommebok. Klesbutikk.no har samlet alle disse på ett sted og gjort dem søkbare etter by, fylke, merke og kategori.</p>
                <p>Med over {stats.totalStores.toLocaleString('nb-NO')} registrerte klesbutikker fordelt på 357 kommuner og alle 15 fylker er Klesbutikk.no den mest komplette oversikten over klesbutikker i Norge. Vi har kartlagt over {stats.totalBrands} klesmerker og koblet dem til butikkene som fører dem.</p>
                <p>Enten du er på jakt etter treningsklær til hverdagen, dameklær til en spesiell anledning, eller bare vil utforske hva som finnes av klesbutikker i nærheten, er Klesbutikk.no stedet å starte.</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CITIES SEO TEXT */}
      <section className="bg-cream">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <FadeInSection>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mb-8">Klesbutikker i Norges største byer</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Klesbutikker i Oslo', slug: 'oslo', n: 253, text: 'Oslo er Norges ubestridte motehovedstad. Leter du etter klesbutikk i Oslo finner du alt fra luksusmerker på Aker Brygge til vintage i Grünerløkka. Bogstadveien og Hegdehaugsveien er blant de mest populære handlegatene.' },
              { name: 'Klesbutikker i Bergen', slug: 'bergen', n: 39, text: 'Klesbutikker i Bergen sentrum finner du hovedsakelig rundt Torgallmenningen og Strandgaten. Skandinavisk minimalisme møter vestlandsk kreativitet.' },
              { name: 'Klesbutikker i Trondheim', slug: 'trondheim', n: 39, text: 'Klesbutikker i Trondheim sentrum er konsentrert rundt Nordre gate og Thomas Angells gate. Byens store studentmiljø bidrar til et overraskende bredt butikktilbud.' },
              { name: 'Klesbutikker i Stavanger', slug: 'stavanger', n: 39, text: 'Klesbutikker i Stavanger sentrum finner du langs Klubbgata og Kirkegata. Regionen har et sterkt innslag av outdoor og friluftsklær.' },
            ].map((c) => (
              <FadeInSection key={c.slug}>
                <div>
                  <h3 className="font-body text-lg font-bold text-charcoal mb-2">
                    <Link href={'/' + c.slug} className="hover:text-accent transition-colors">{c.name}</Link>
                    <span className="text-accent text-sm font-bold ml-2">{c.n}</span>
                  </h3>
                  <p className="font-body text-[15px] text-slate leading-relaxed">{c.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* NETTBUTIKKER */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <FadeInSection className="max-w-3xl">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mb-6">Klesbutikk på nett</h2>
            <div className="font-body text-[15px] text-slate leading-relaxed space-y-4">
              <p>I tillegg til fysiske klesbutikker har vi kartlagt norske <Link href="/nettbutikker" className="text-accent hover:underline">nettbutikker</Link> som selger klær. Netthandel med klær har vokst kraftig, og stadig flere nordmenn handler dameklær på nett, treningsklær på nett og barneklær på nett.</p>
              <p>Fordelene med å handle i en norsk klesbutikk på nett inkluderer enklere returhåndtering, norskspråklig kundeservice og raskere levering. Mange norske nettbutikker tilbyr gratis frakt over et visst beløp og muligheten til å betale med Vipps eller faktura.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="max-w-3xl mx-auto section-padding py-16 md:py-22">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige spørsmål" />
        </div>
      </section>
    </>
  );
}
