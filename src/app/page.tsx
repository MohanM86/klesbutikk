import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
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
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker og alt for henne' },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser og mer' },
  { name: 'Sportsklær', slug: 'sport', desc: 'Treningsklær, outdoor og friluftsutstyr' },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby i alle aldre' },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive merker og luksusmote' },
  { name: 'Vintage', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig mote' },
];

const QUICKNAV = [
  { label: 'Kommuner', desc: '357 kommuner dekket', href: '/by', iconStyle: 'bg-accent text-white', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
  { label: 'Merker', desc: '483 merkevarer', href: '/merker', iconStyle: 'bg-black text-white', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
  { label: 'Butikker', desc: '1 566 registrert', href: '/butikk', iconStyle: 'border-2 border-black text-black', icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349' },
  { label: 'Kategorier', desc: '10 kategorier', href: '/kategorier', iconStyle: 'bg-surface-alt text-black', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z' },
];

export default function HomePage() {
  const cities = getTopCities(16);
  const stats = getStats();
  const allBrands = getAllBrands();
  const allStores = getAllStores().slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(cities.map((c) => ({ name: 'Klesbutikker i ' + c.name, url: '/' + c.slug })))) }} />

      {/* HERO (black) */}
      <section className="bg-black text-white py-16 md:py-20 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto section-padding relative z-10">
          <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.1em] mb-5">Norges største klesbutikkoversikt</p>
          <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-white mb-4 tracking-tight">
            Finn klesbutikker<br /><span className="text-accent">i hele Norge</span>
          </h1>
          <p className="font-body text-[15px] text-white/60 leading-relaxed mb-8 max-w-md mx-auto">
            Søk blant butikker, merker og byer fra Lindesnes til Nordkapp. Helt gratis.
          </p>
          <div className="flex justify-center mb-4"><SearchBar variant="hero" /></div>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'].map((c) => (
              <Link key={c} href={'/' + c.toLowerCase()} className="font-body text-xs text-white/40 border border-white/15 px-3.5 py-1.5 rounded-full hover:text-white hover:border-accent hover:bg-accent/10 transition-all">{c}</Link>
            ))}
          </div>
          <div className="flex justify-center gap-12 md:gap-16 pt-8 border-t border-white/10">
            {[
              { num: stats.totalStores.toLocaleString('nb-NO'), label: 'Butikker' },
              { num: stats.totalBrands.toString(), label: 'Merker' },
              { num: '357', label: 'Kommuner' },
              { num: stats.totalFylker.toString(), label: 'Fylker' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-body text-[28px] font-extrabold tracking-tight">{s.num}</div>
                <div className="font-body text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK NAV (grid, 1px gap) */}
      <section className="-mt-px">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {QUICKNAV.map((q) => (
              <Link key={q.label} href={q.href} className="group flex items-center gap-4 bg-white p-5 hover:bg-surface-alt transition-colors duration-150">
                <div className={'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ' + q.iconStyle}>
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={q.icon} /></svg>
                </div>
                <div>
                  <div className="font-body text-sm font-bold text-black">{q.label}</div>
                  <div className="font-body text-[11px] text-slate">{q.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES (horizontal scroll) */}
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Populære kommuner</h2>
            <Link href="/by" className="font-body text-[13px] font-semibold text-black border-b border-black pb-px hover:text-accent hover:border-accent transition-colors">Alle 357 kommuner</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {cities.slice(0, 10).map((city) => (
              <Link key={city.slug} href={'/' + city.slug} className="group flex-shrink-0 w-[170px] border border-border rounded-lg overflow-hidden hover:border-black transition-all duration-150">
                <div className="h-14 bg-black flex items-center justify-center">
                  <span className="font-body text-2xl font-extrabold text-accent">{city.name.charAt(0)}</span>
                </div>
                <div className="p-3">
                  <h3 className="font-body text-[13px] font-bold text-black">{city.name}</h3>
                  <p className="font-body text-[11px] text-muted">{city.fylke}</p>
                  <p className="font-body text-[11px] font-bold text-accent mt-1.5">{city.storeCount} butikker</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <BrandShowcase brands={allBrands} />

      {/* CATEGORIES (grid, 1px gap) */}
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Kategorier</h2>
            <Link href="/kategorier" className="font-body text-[13px] font-semibold text-black border-b border-black pb-px hover:text-accent hover:border-accent transition-colors">Se alle</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {CATS.map((c) => (
              <Link key={c.slug} href={'/kategorier#' + c.slug} className="group relative bg-white p-6 hover:bg-surface-alt transition-colors duration-150">
                <h3 className="font-body text-[15px] font-bold text-black mb-1">{c.name}</h3>
                <p className="font-body text-[13px] text-slate leading-relaxed mb-2.5">{c.desc}</p>
                <span className="font-body text-xs font-bold text-accent">Les mer</span>
                <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-border-dark group-hover:text-black group-hover:translate-x-1 transition-all duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (black bg) */}
      <section className="bg-black py-14 md:py-18">
        <div className="max-w-8xl mx-auto section-padding">
          <h2 className="font-body text-display-sm md:text-display font-extrabold text-white text-center mb-10">Slik fungerer det</h2>
          <HowItWorks />
        </div>
      </section>

      {/* BUTIKKER */}
      <section className="py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">Butikker</h2>
            <Link href="/butikk" className="font-body text-[13px] font-semibold text-black border-b border-black pb-px hover:text-accent hover:border-accent transition-colors">Alle {stats.totalStores.toLocaleString('nb-NO')} butikker</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allStores.map((store) => <StoreCard key={store.organisasjonsnummer} store={store} showCity />)}
          </div>
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <FadeInSection>
            <div className="max-w-3xl">
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-5">Klesbutikker i Norge</h2>
              <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
                <p>Norge har et rikt og variert utvalg av klesbutikker fra de største byene til de minste tettstedene. Enten du leter etter en klesbutikk i nærheten med eksklusive designermerker eller en rimelig nettbutikk med bredt utvalg, finnes det norske klesbutikker for enhver smak, stil og lommebok. Klesbutikk.no har samlet alle disse på ett sted og gjort dem søkbare etter by, fylke, merke og kategori.</p>
                <p>Med over {stats.totalStores.toLocaleString('nb-NO')} registrerte klesbutikker fordelt på 357 kommuner og alle 15 fylker er Klesbutikk.no den mest komplette oversikten over klesbutikker i Norge. Vi har kartlagt over {stats.totalBrands} klesmerker og koblet dem til butikkene som fører dem.</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CITIES SEO */}
      <section className="bg-surface-alt py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-8">Klesbutikker i Norges største byer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Klesbutikker i Oslo', slug: 'oslo', n: 253, text: 'Oslo er Norges ubestridte motehovedstad. Leter du etter klesbutikk i Oslo finner du alt fra luksusmerker på Aker Brygge til vintage i Grünerløkka. Bogstadveien og Hegdehaugsveien er blant de mest populære handlegatene.' },
              { name: 'Klesbutikker i Bergen', slug: 'bergen', n: 39, text: 'Klesbutikker i Bergen sentrum finner du hovedsakelig rundt Torgallmenningen og Strandgaten. Skandinavisk minimalisme møter vestlandsk kreativitet.' },
              { name: 'Klesbutikker i Trondheim', slug: 'trondheim', n: 39, text: 'Klesbutikker i Trondheim sentrum er konsentrert rundt Nordre gate og Thomas Angells gate. Byens store studentmiljø bidrar til et overraskende bredt butikktilbud.' },
              { name: 'Klesbutikker i Stavanger', slug: 'stavanger', n: 39, text: 'Klesbutikker i Stavanger sentrum finner du langs Klubbgata og Kirkegata. Regionen har et sterkt innslag av outdoor og friluftsklær.' },
            ].map((c) => (
              <FadeInSection key={c.slug}>
                <h3 className="font-body text-base font-bold text-black mb-1.5">
                  <Link href={'/' + c.slug} className="hover:text-accent transition-colors">{c.name}</Link>
                  <span className="text-accent text-sm font-bold ml-2">{c.n}</span>
                </h3>
                <p className="font-body text-[13px] text-slate leading-relaxed">{c.text}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* NETTBUTIKKER */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="max-w-8xl mx-auto section-padding">
          <FadeInSection className="max-w-3xl">
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-5">Klesbutikk på nett</h2>
            <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
              <p>I tillegg til fysiske klesbutikker har vi kartlagt norske <Link href="/nettbutikker" className="text-accent font-semibold hover:underline">nettbutikker</Link> som selger klær. Netthandel med klær har vokst kraftig, og stadig flere nordmenn handler dameklær på nett, treningsklær på nett og barneklær på nett.</p>
              <p>Fordelene med å handle i en norsk klesbutikk på nett inkluderer enklere returhåndtering, norskspråklig kundeservice og raskere levering. Mange norske nettbutikker tilbyr gratis frakt over et visst beløp og muligheten til å betale med Vipps eller faktura.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt py-12 md:py-16">
        <div className="max-w-3xl mx-auto section-padding">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige spørsmål" />
        </div>
      </section>
    </>
  );
}
