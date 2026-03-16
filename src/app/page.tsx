import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import AnimatedHero from '@/components/AnimatedHero';
import CityMarquee from '@/components/CityMarquee';
import BrandShowcase from '@/components/BrandShowcase';
import HowItWorks from '@/components/HowItWorks';
import CategoryChart from '@/components/CategoryChart';
import CityBars from '@/components/CityBars';
import NorwayHeatmap from '@/components/NorwayHeatmap';
import BrandDonut from '@/components/BrandDonut';
import SustainabilityTrend from '@/components/SustainabilityTrend';
import KeywordVolumeChart from '@/components/KeywordVolumeChart';
import StatsDashboard from '@/components/StatsDashboard';
import FadeInSection from '@/components/FadeInSection';
import { getTopCities, getFeaturedStores, getStats, getAllBrands } from '@/lib/stores';
import { faqSchema, itemListSchema, webSiteSchema, datasetSchema } from '@/lib/seo';

const HOME_FAQS = [
  { question: 'Hva er de beste klesbutikkene i Norge?', answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populære finner du i Oslo, Bergen, Trondheim og Stavanger. På Klesbutikk.no kan du utforske alle registrerte klesbutikker i landet og finne favorittene i din by.' },
  { question: 'Hvordan finner jeg klesbutikker nær meg?', answer: 'Bruk søkefeltet øverst på siden for å søke etter din by, et merke eller en butikk. Du kan også bla gjennom bysider, fylkesider eller kategorier for å finne klesbutikker i ditt nærområde.' },
  { question: 'Hvor ofte oppdateres butikkoversikten?', answer: 'Databasen vår oppdateres jevnlig for å sikre at informasjonen alltid er korrekt og komplett.' },
  { question: 'Hvilke klesmerker kan jeg finne på Klesbutikk.no?', answer: 'Vi har kartlagt over 480 klesmerker, alt fra norske favoritter som Holzweiler, Stine Goya og Filippa K til internasjonale stormerker som Nike, Gucci og Zara. Du kan søke på merke og se hvilke butikker som fører det.' },
  { question: 'Hvor ofte oppdateres butikkoversikten?', answer: 'Databasen vår oppdateres jevnlig for å sikre at informasjonen alltid er korrekt og komplett.' },
  { question: 'Hvor finner jeg treningsklær i Norge?', answer: 'Klesbutikk.no har registrert over 200 butikker som fører treningsklær i Norge. Du finner alt fra treningsklær for dame og herre til spesialiserte butikker for løping, yoga og utendørstrening. Populære butikker inkluderer sportsbutikker som XXL og Antonsport, samt merkebutikker som Nike og Adidas.' },
  { question: 'Finnes det gode norske klesbutikker på nett?', answer: 'Ja, mange norske klesbutikker tilbyr også netthandel. Vi har samlet en egen oversikt over norske nettbutikker for klær der du kan handle dameklær, herreklær, barneklær og treningsklær på nett fra norske aktører.' },
  { question: 'Hva er de beste klesbutikkene i Oslo?', answer: 'Oslo har over 253 registrerte klesbutikker og er Norges mest varierte handleby for mote. Populære handlestrøk inkluderer Bogstadveien, Hegdehaugsveien, Grünerløkka og Aker Brygge. Du finner alt fra luksusbutikker som Høyer til vintagebutikker og nisjeforretninger.' },
  { question: 'Hvor mange klesbutikker finnes det i Norge?', answer: 'Klesbutikk.no har registrert over 1 566 klesbutikker fordelt på 357 kommuner og 15 fylker. Oslo har det klart største utvalget med over 253 butikker, etterfulgt av Bergen, Trondheim og Stavanger.' },
  { question: 'Hva koster det å bruke Klesbutikk.no?', answer: 'Klesbutikk.no er helt gratis å bruke. Du kan søke, utforske og finne klesbutikker uten å betale noe som helst.' },
  { question: 'Hvordan skiller Klesbutikk.no seg fra andre butikkoversikter?', answer: 'Klesbutikk.no er spesialisert utelukkende på klesbutikker i Norge. I motsetning til generelle bedriftsoversikter har vi detaljert informasjon om merker, kategorier og spesialisering for hver butikk. Vi dekker 357 kommuner med nesten 8 000 unike sider, og innholdet er optimalisert for å dukke opp i både tradisjonelle søkemotorer og AI drevne søkesystemer.' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(cities.map((c) => ({ name: `Klesbutikker i ${c.name}`, url: `/${c.slug}` })))) }} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent-light to-white">
        <div className="max-w-8xl mx-auto section-padding pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-5 py-2 rounded-full shadow-sm mb-8 border border-accent/10">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Norges største klesbutikkoversikt
            </div>
            <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-charcoal mb-5 leading-tight">
              Finn klesbutikker<br /><span className="text-accent">i hele Norge</span>
            </h1>
            <p className="font-body text-lg text-slate leading-relaxed mb-8 max-w-lg mx-auto">
              Søk blant {stats.totalStores.toLocaleString('nb-NO')} butikker, {stats.totalBrands} merker og 357 kommuner. Fra Lindesnes til Nordkapp.
            </p>
            <div className="flex justify-center mb-6"><SearchBar variant="hero" /></div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm mb-8">
              {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'].map((c) => (
                <Link key={c} href={`/${c.toLowerCase()}`} className="font-body text-xs font-medium text-muted hover:text-accent bg-white border border-border px-3 py-1.5 rounded-full transition-colors">{c}</Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
              <Link href="/by" className="btn-primary text-base px-10 py-4">Finn butikker nær deg <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
            </div>
            <AnimatedHero totalStores={stats.totalStores} totalFylker={stats.totalFylker} />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622', label: 'Verifiserte data' },
              { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7', label: 'Oppdateres jevnlig' },
              { icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3', label: 'Dekker hele Norge' },
              { icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75', label: 'Helt gratis å bruke' },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} /></svg>
                <span className="font-body text-xs font-medium text-slate">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO INTRO + STATS DASHBOARD ─── */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <FadeInSection className="lg:col-span-3">
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mb-6">Klesbutikker i Norge – Den komplette oversikten</h2>
              <div className="font-body text-[15px] text-slate leading-relaxed space-y-4">
                <p>Norge har et rikt og variert utvalg av klesbutikker fra de største byene til de minste tettstedene. Enten du leter etter en klesbutikk i nærheten med eksklusive designermerker eller en rimelig nettbutikk med bredt utvalg, finnes det norske klesbutikker for enhver smak, stil og lommebok. Klesbutikk.no har samlet alle disse på ett sted og gjort dem søkbare etter by, fylke, merke og kategori.</p>
                <p>Med over {stats.totalStores.toLocaleString('nb-NO')} registrerte klesbutikker fordelt på 357 kommuner og alle 15 fylker er Klesbutikk.no den mest komplette oversikten over klesbutikker i Norge. Vi har kartlagt over {stats.totalBrands} klesmerker og koblet dem til butikkene som fører dem.</p>
                <p>Enten du er på jakt etter treningsklær til hverdagen, dameklær til en spesiell anledning, eller bare vil utforske hva som finnes av klesbutikker i nærheten, er Klesbutikk.no stedet å starte.</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2} className="lg:col-span-2 lg:sticky lg:top-24">
              <StatsDashboard />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES + CHARTS ─── */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-sm font-bold text-accent mb-1">Kategorier</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Hva leter du etter?</h2>
            </div>
            <Link href="/kategorier" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">Se alle <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATS.map((c) => (
              <Link key={c.slug} href={`/kategorier#${c.slug}`} className="group relative bg-white border-2 border-border rounded-2xl p-5 pb-4 hover:border-accent hover:shadow-lg transition-all duration-200 overflow-hidden">
                <span className={`absolute -right-2 -top-3 font-body text-[56px] font-black leading-none select-none pointer-events-none transition-colors duration-200 ${c.accent ? 'text-accent/[0.06] group-hover:text-accent/[0.12]' : 'text-charcoal/[0.04] group-hover:text-charcoal/[0.08]'}`}>{c.letter}</span>
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
          {/* Category text + stacked charts */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <FadeInSection className="lg:col-span-3 font-body text-[15px] text-slate leading-relaxed space-y-5">
              <p>Med {CATS[0].count} registrerte butikker som fører <strong>dameklær</strong> er utvalget i Norge enormt. Ganni, Holzweiler, Filippa K og Samsøe Samsøe er blant de mest populære merkene. Mange norske klesbutikker tilbyr også dameklær på nett med enkel retur og rask levering.</p>
              <p>{CATS[1].count} butikker i Norge tilbyr <strong>herreklær</strong> i et bredt spekter av stiler og prisklasser. Oscar Jacobson, Tiger of Sweden og GANT er godt representert.</p>
              <p><strong>Treningsklær er en av de aller største kategoriene</strong> med {CATS[5].count} registrerte butikker. Treningsklær for dame er spesielt etterspurt med merker som Aimn, Röhnisch og Casall. For treningsklær for herre er Under Armour, Nike og Adidas blant de mest populære. Billige treningsklær finner du hos norske nettbutikker og outlet-butikker.</p>
              <p>{CATS[2].count} butikker spesialiserer seg på <strong>barneklær</strong>. Merker som Reima, Polarn O. Pyret og Lillelam er populære valg.</p>
              <p>For deg som setter pris på luksusmote har vi kartlagt {CATS[3].count} butikker med <strong>designerklær</strong>, og {CATS[4].count} butikker spesialiserer seg på <strong>vintage og gjenbruk</strong> i sterk vekst takket være økt fokus på bærekraft.</p>
            </FadeInSection>
            <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
              <FadeInSection delay={0.1}><CategoryChart /></FadeInSection>
              <FadeInSection delay={0.2}><KeywordVolumeChart /></FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CITIES ─── */}
      <section className="bg-surface py-16 md:py-22">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-sm font-bold text-accent mb-1">Utforsk</p>
              <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Populære kommuner</h2>
            </div>
            <Link href="/by" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">Alle byer <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></Link>
          </div>
        </div>
        <CityMarquee cities={cities} />
      </section>

      {/* ─── CITIES SEO TEXT + BARS ─── */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <FadeInSection>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mb-6">Klesbutikker i Norges største byer</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <FadeInSection className="lg:col-span-3 space-y-8">
              {[
                { name: 'Klesbutikker i Oslo', slug: 'oslo', n: 253, text: 'Oslo er Norges ubestridte motehovedstad. Leter du etter klesbutikk i Oslo finner du alt fra luksusmerker på Aker Brygge til vintage i Grünerløkka. Bogstadveien og Hegdehaugsveien er blant de mest populære handlegatene. Oslo City, Byporten og Paleet tilbyr bredt utvalg under ett tak.' },
                { name: 'Klesbutikker i Bergen', slug: 'bergen', n: 39, text: 'Klesbutikker i Bergen sentrum finner du hovedsakelig rundt Torgallmenningen og Strandgaten. Skandinavisk minimalisme møter vestlandsk kreativitet, med alt fra multimerkbutikker til nisjebutikker for bærekraftig mote.' },
                { name: 'Klesbutikker i Trondheim', slug: 'trondheim', n: 39, text: 'Klesbutikker i Trondheim sentrum er konsentrert rundt Nordre gate og Thomas Angells gate. Byens store studentmiljø bidrar til et overraskende bredt og trendy butikktilbud.' },
                { name: 'Klesbutikker i Stavanger', slug: 'stavanger', n: 39, text: 'Klesbutikker i Stavanger sentrum finner du langs Klubbgata og Kirkegata. Regionen har et sterkt innslag av outdoor og friluftsklær som gjenspeiler den aktive livsstilen.' },
                { name: 'Klesbutikker i Kristiansand', slug: 'kristiansand', n: 30, text: 'Markens gate er hjertet i shopping i Kristiansand med en god blanding av kjedekonsepter og lokale butikker med personlig service.' },
              ].map((c) => (
                <div key={c.slug}>
                  <h3 className="font-body text-lg font-bold text-charcoal mb-2"><Link href={`/${c.slug}`} className="hover:text-accent transition-colors">{c.name}</Link> <span className="text-accent text-sm font-bold">{c.n}</span></h3>
                  <p className="font-body text-[15px] text-slate leading-relaxed">{c.text}</p>
                </div>
              ))}
            </FadeInSection>
            <FadeInSection delay={0.15} className="lg:col-span-2 lg:sticky lg:top-24">
              <CityBars />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-14">
            <p className="font-body text-sm font-bold text-accent mb-1">Slik fungerer det</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Tre enkle steg</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ─── FEATURED STORES ─── */}
      {featured.length > 0 && (
        <section className="bg-white">
          <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-sm font-bold text-accent mb-1">Anbefalt</p>
                <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Fremhevede butikker</h2>
              </div>
              <Link href="/butikk" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">Alle butikker <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map((store) => <StoreCard key={store.organisasjonsnummer} store={store} showCity />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── BRANDS ─── */}
      <BrandShowcase brands={allBrands} />

      {/* ─── BRANDS SEO TEXT + DONUT ─── */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <FadeInSection><h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mb-6">Over {stats.totalBrands} klesmerker kartlagt</h2></FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <FadeInSection className="lg:col-span-3 font-body text-[15px] text-slate leading-relaxed space-y-4">
              <p>Norsk motedesign har fått internasjonal oppmerksomhet. <Link href="/merke/holzweiler" className="text-accent hover:underline">Holzweiler</Link> er kjent for skjerf og streetwear, mens <Link href="/merke/filippa-k" className="text-accent hover:underline">Filippa K</Link> representerer skandinavisk minimalisme. Andre norske merker som Norwegian Rain og <Link href="/merke/devold" className="text-accent hover:underline">Devold</Link> kombinerer håndverkstradisjon med moderne design.</p>
              <p>Internasjonalt finner du alt fra kjedebutikker som H&M, Zara og Mango til luksusmerker som Gucci og Prada — mange gjennom norske multimerkbutikker som <Link href="/merke/hoeyer" className="text-accent hover:underline">Høyer</Link> og <Link href="/merke/companys" className="text-accent hover:underline">Companys</Link>.</p>
              <p>Treningsklær og activewear har blitt en naturlig del av hverdagsgarderoben. Nike, Adidas og Johaug er blitt like vanlige i norske klesbutikker som tradisjonelle motemerker, og grensen mellom treningsklær og hverdagsklær er i ferd med å viskes ut.</p>
            </FadeInSection>
            <FadeInSection delay={0.15} className="lg:col-span-2 lg:sticky lg:top-24"><BrandDonut /></FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-bold text-accent mb-1">Hvorfor Klesbutikk.no</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Norges mest komplette klesbutikkoversikt</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Verifiserte data', desc: 'Alle butikker er kvalitetssikret og verifisert mot flere kilder', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
              { title: 'Over 480 merker', desc: 'Fra norske favoritter som Holzweiler til internasjonale stormerker som Nike', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
              { title: '7 900+ sider', desc: 'Unike sider for hver by, fylke, merke, kategori og alle kombinasjonene', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
              { title: 'Alltid oppdatert', desc: 'Databasen oppdateres jevnlig for å sikre korrekt informasjon', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-border rounded-2xl p-7 hover:border-accent/30 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center mb-5"><svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg></div>
                <h3 className="font-body text-base font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FYLKER + HEATMAP ─── */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <FadeInSection className="lg:col-span-3">
              <h2 className="font-body text-xl font-extrabold text-charcoal mb-4">Klesbutikker i alle Norges fylker</h2>
              <div className="font-body text-[15px] text-slate leading-relaxed space-y-4">
                <p>Klesbutikk.no dekker alle 15 fylker i Norge, fra Agder i sør til Troms og Finnmark i nord. Vi har egne <Link href="/fylker" className="text-accent hover:underline">fylkessider</Link> med komplett oversikt over klesbutikker i hver region.</p>
                <p>Oslo og Viken har det bredeste utvalget med hundrevis av klesbutikker. Vestland med Bergen og Rogaland med Stavanger og Sandnes er også sterke handelsregioner. Selv i Nordland og Innlandet, med byer som Lillehammer, Hamar og Bodø, finnes det overraskende gode klesbutikker.</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.15} className="lg:col-span-2 lg:sticky lg:top-24"><NorwayHeatmap /></FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── BÆREKRAFT + TREND ─── */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <FadeInSection className="lg:col-span-3">
              <h2 className="font-body text-xl font-extrabold text-charcoal mb-4">Bærekraftig klesshopping i Norge</h2>
              <div className="font-body text-[15px] text-slate leading-relaxed space-y-4">
                <p>Bærekraft har blitt en stadig viktigere faktor. Flere velger kvalitetsplagg som varer lenger, handler brukt, eller støtter klesbutikker og merker som tar miljøansvar.</p>
                <p>Også innen treningsklær ser vi en klar trend mot bærekraft. <Link href="/merke/stormberg" className="text-accent hover:underline">Stormberg</Link> og Northern Playground bruker resirkulerte materialer. Mange lokale klesbutikker jobber aktivt med å redusere svinn og tilby reparasjonstjenester.</p>
                <p>Ved å handle i norske klesbutikker fremfor store internasjonale nettaktører bidrar du til å opprettholde et levende handelsmiljø og støtter arbeidsplasser i lokalsamfunnet.</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.15} className="lg:col-span-2 lg:sticky lg:top-24"><SustainabilityTrend /></FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── NETTBUTIKKER ─── */}
      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <FadeInSection className="max-w-3xl">
            <h2 className="font-body text-xl font-extrabold text-charcoal mb-4">Klesbutikk på nett — Norske nettbutikker for klær</h2>
            <div className="font-body text-[15px] text-slate leading-relaxed space-y-4">
              <p>I tillegg til fysiske klesbutikker har vi kartlagt norske <Link href="/nettbutikker" className="text-accent hover:underline">nettbutikker</Link> som selger klær. Netthandel med klær har vokst kraftig, og stadig flere nordmenn handler dameklær på nett, treningsklær på nett og barneklær på nett. Mange ønsker å støtte norske aktører fremfor utenlandske nettbutikker.</p>
              <p>Fordelene med å handle i en norsk klesbutikk på nett inkluderer enklere returhåndtering, norskspråklig kundeservice og raskere levering. Mange norske nettbutikker tilbyr gratis frakt over et visst beløp og muligheten til å betale med Vipps eller faktura.</p>
            </div>
          </FadeInSection>
        </div>
      </section>


      {/* ─── FAQ ─── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto section-padding py-16 md:py-22">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige spørsmål" />
        </div>
      </section>

      {/* ─── AI OPTIMIZED ─── */}
      <section className="bg-charcoal">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12" /></svg>
                <h2 className="font-body text-lg font-extrabold text-white">Optimalisert for AI-søk</h2>
              </div>
              <p className="font-body text-sm text-white/40 leading-relaxed max-w-md mb-4">Innholdet er strukturert som et entity-basert kunnskapsnettverk, klart for indeksering av ChatGPT, Perplexity, Gemini, Claude og andre AI-systemer.</p>
              <Link href="/ai-index" className="inline-flex items-center gap-1.5 font-body text-sm font-bold text-accent hover:text-accent-hover transition-colors">Åpne AI-indeks <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { file: 'entity-index.json', desc: 'Strukturert entitetsdata' },
                { file: 'llms.txt', desc: 'For språkmodeller' },
                { file: 'sitemap.xml', desc: 'Alle 7 928 URLer' },
                { file: 'llms-full.txt', desc: 'Komplett kunnskapsbase' },
              ].map((f) => (
                <a key={f.file} href={`/${f.file}`} target="_blank" rel="noopener" className="group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl px-4 py-3 transition-all">
                  <svg className="w-4 h-4 text-white/15 group-hover:text-accent transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  <div>
                    <code className="font-mono text-[11px] text-accent/80 group-hover:text-accent transition-colors">{f.file}</code>
                    <span className="block font-body text-[10px] text-white/20">{f.desc}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
