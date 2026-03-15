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
  { question: 'Hva er de beste klesbutikkene i Norge?', answer: 'Norge har over 1 500 registrerte klesbutikker fra Lindesnes til Nordkapp. De mest populaere finnes i Oslo, Bergen, Trondheim og Stavanger. Pa Klesbutikk.no kan du utforske alle og finne de beste i din by.' },
  { question: 'Hvordan finner jeg klesbutikker naer meg?', answer: 'Bruk sokefeltet for a soke etter din by, et merke eller en butikk. Du kan ogsa bla gjennom bysider, fylkesider eller kategorier.' },
  { question: 'Er det gratis a legge til butikken min?', answer: 'Ja, alle klesbutikker registrert med naeringskode 47.710 i Bronnoysundregistrene er allerede listet gratis. For okt synlighet tilbyr vi fremhevede plasseringer fra 990 kr/mnd.' },
  { question: 'Hvilke klesmerker kan jeg finne?', answer: 'Vi har kartlagt over 480 klesmerker, fra Holzweiler og Filippa K til Nike, Gucci og Zara.' },
  { question: 'Hvor ofte oppdateres oversikten?', answer: 'Databasen er basert pa offisielle data fra Bronnoysundregistrene (naeringskode 47.710) og oppdateres jevnlig.' },
  { question: 'Hva er forskjellen pa en fremhevet og en vanlig oppforing?', answer: 'Alle butikker har en gratis standardoppforing. Fremhevede butikker far prioritert plassering og vises i Fremhevede butikker-seksjonen.' },
];

const CATS = [
  { name: 'Dame', slug: 'dameklar', desc: 'Kjoler, topper, jakker' },
  { name: 'Herre', slug: 'herreklar', desc: 'Dresser, skjorter, bukser' },
  { name: 'Barn', slug: 'barneklar', desc: 'Alle aldre' },
  { name: 'Designer', slug: 'designer', desc: 'Luksus og eksklusive' },
  { name: 'Vintage', slug: 'vintage', desc: 'Gjenbruk, retro' },
  { name: 'Sport', slug: 'sport', desc: 'Outdoor, friluft' },
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

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-black relative overflow-hidden border-b border-white/[0.04]">
        {/* Enormous background number */}
        <div className="absolute right-0 top-10 md:top-0 text-[120px] md:text-[200px] lg:text-[280px] font-body font-black text-white/[0.015] leading-none tracking-tighter select-none pointer-events-none" aria-hidden="true">
          1566
        </div>

        <div className="relative max-w-8xl mx-auto section-padding pt-20 pb-16 md:pt-32 md:pb-24">
          {/* Left-aligned, asymmetric */}
          <div className="max-w-3xl">
            <p className="stagger-1 font-body text-[9px] font-bold tracking-[0.3em] uppercase text-white/15 mb-6">
              Norges klesbutikkoversikt &mdash; siden 2026
            </p>

            <h1 className="stagger-2 font-display text-hero-sm md:text-hero font-black text-white mb-2">
              Finn<br />klesbutikker
            </h1>
            <p className="stagger-3 font-display text-3xl md:text-5xl font-light italic text-white/20 tracking-tight mb-8">
              i hele Norge
            </p>

            {/* Divider line */}
            <div className="stagger-4 w-[60px] h-px bg-white/15 mb-8" />

            <AnimatedHero totalStores={stats.totalStores} totalFylker={stats.totalFylker} />

            <div className="stagger-6 mt-10">
              <SearchBar variant="hero" />
            </div>

            <div className="stagger-7 flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/by" className="btn-primary">Finn butikker</Link>
              <Link href="/legg-til-butikk" className="btn-secondary">Legg til butikk</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES (WHITE) ───────────────────────────── */}
      <section className="bg-white text-black border-b border-black/[0.06]">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-black/30 mb-2">Kategorier</p>
              <h2 className="font-display text-display-sm md:text-display font-black text-black">Hva leter du etter?</h2>
            </div>
            <Link href="/kategorier" className="hidden sm:inline-flex font-body text-[10px] font-bold text-black/30 hover:text-black transition-colors tracking-[0.12em] uppercase">
              Alle kategorier
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-black/[0.06]">
            {CATS.map((c, i) => (
              <Link key={c.slug} href={`/kategorier#${c.slug}`}
                className={`bg-white p-5 md:p-6 transition-all duration-200 hover:bg-black hover:text-white group ${i === 0 ? 'bg-black text-white' : ''}`}>
                <h3 className={`font-body text-sm font-black tracking-wide ${i === 0 ? 'text-white' : 'text-black group-hover:text-white'} transition-colors`}>{c.name}</h3>
                <p className={`font-body text-[10px] mt-1 ${i === 0 ? 'text-white/40' : 'text-black/30 group-hover:text-white/40'} transition-colors`}>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CITIES (BLACK) ───────────────────────────────── */}
      <section className="bg-black py-14 md:py-20 border-b border-white/[0.04]">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-white/15 mb-2">Utforsk</p>
              <h2 className="font-display text-display-sm md:text-display font-black text-white">Populaere byer</h2>
            </div>
            <Link href="/by" className="hidden sm:inline-flex font-body text-[10px] font-bold text-white/20 hover:text-white transition-colors tracking-[0.12em] uppercase">
              Alle byer
            </Link>
          </div>
        </div>
        <CityMarquee cities={cities} />
      </section>

      {/* ─── HOW IT WORKS (WHITE) ─────────────────────────── */}
      <section className="bg-white text-black border-b border-black/[0.06]">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-black/[0.06]">
            <div className="bg-white p-6 md:p-8 md:col-span-1">
              <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-black/30 mb-2">Slik fungerer det</p>
              <h2 className="font-display text-xl md:text-2xl font-black text-black leading-tight">Sok.<br />Utforsk.<br />Besok.</h2>
            </div>
            {[
              { n: '01', title: 'Sok', desc: 'By, merke, butikknavn. Sokefeltet finner alt.' },
              { n: '02', title: 'Utforsk', desc: 'Hver butikk har adresse, kontaktinfo og merker.' },
              { n: '03', title: 'Besok', desc: 'Finn veien, ring for apningstider, eller handl online.' },
            ].map((s) => (
              <div key={s.n} className="bg-white p-6 md:p-8 relative">
                <span className="font-body text-[48px] md:text-[64px] font-black text-black/[0.04] leading-none absolute top-4 right-4">{s.n}</span>
                <div className="relative">
                  <h3 className="font-body text-base font-black text-black mb-2 tracking-wide">{s.title}</h3>
                  <p className="font-body text-xs text-black/40 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED (BLACK) ─────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-black border-b border-white/[0.04]">
          <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-white/15 mb-2">Anbefalt</p>
                <h2 className="font-display text-display-sm md:text-display font-black text-white">Fremhevede butikker</h2>
              </div>
              <Link href="/butikk" className="hidden sm:inline-flex font-body text-[10px] font-bold text-white/20 hover:text-white transition-colors tracking-[0.12em] uppercase">
                Alle butikker
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
              {featured.map((store) => (
                <Link key={store.organisasjonsnummer} href={`/butikk/${store.slug}`}
                  className="bg-black p-5 hover:bg-white/[0.04] transition-all duration-200 group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-white/[0.06] flex items-center justify-center font-body text-xs font-black text-white/60">{store.navn.charAt(0)}</span>
                    <span className="font-body text-[8px] font-bold tracking-[0.15em] uppercase text-white/20">Fremhevet</span>
                  </div>
                  <h3 className="font-body text-sm font-bold text-white group-hover:text-white/80 transition-colors line-clamp-1">{store.navn}</h3>
                  <p className="font-body text-[11px] text-white/20 mt-1 line-clamp-1">{store.adresse}</p>
                  <p className="font-body text-[10px] text-white/10 mt-0.5">{store.poststed}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── BRANDS (BLACK with ghost marquee) ────────────── */}
      <BrandShowcase brands={allBrands} />

      {/* ─── WHY US (WHITE) ───────────────────────────────── */}
      <section className="bg-white text-black border-b border-black/[0.06]">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-black/30 mb-2">Hvorfor Klesbutikk.no</p>
          <h2 className="font-display text-display-sm md:text-display font-black text-black mb-10">Norges mest komplette oversikt</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.06]">
            {[
              { title: 'Offisielle data', desc: 'Bronnoysundregistrene, naeringskode 47.710' },
              { title: '480+ merker', desc: 'Fra Holzweiler til Nike, Gucci til H&M' },
              { title: '7 900+ sider', desc: 'Byer, fylker, merker og alle kombinasjoner' },
              { title: 'Alltid oppdatert', desc: 'Synkronisert med offentlige registre' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 md:p-8">
                <h3 className="font-body text-sm font-black text-black mb-2 tracking-wide">{item.title}</h3>
                <p className="font-body text-xs text-black/35 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR OWNERS (BLACK) ───────────────────────────── */}
      <section className="bg-black border-b border-white/[0.04]">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-white/15 mb-3">For butikkeiere</p>
              <h2 className="font-display text-display-sm md:text-display font-black text-white mb-6">Bli synlig</h2>
              <p className="font-body text-sm text-white/25 leading-relaxed mb-8 max-w-md">
                Klesbutikk.no er der folk soker nar de leter etter klesbutikker. Fa en fremhevet oppforing og bli synlig i din by.
              </p>
              <div className="flex gap-3">
                <Link href="/annonser" className="btn-primary">Se priser</Link>
                <Link href="/legg-til-butikk" className="btn-secondary">Legg til gratis</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
              {[
                { value: 'Gratis', label: 'Standardoppforing' },
                { value: '990 kr', label: 'Fremhevet / mnd' },
                { value: '24/7', label: 'Online synlighet' },
                { value: '7 900+', label: 'Sider i nettverket' },
              ].map((s) => (
                <div key={s.label} className="bg-black p-6">
                  <span className="font-body text-2xl font-black text-white">{s.value}</span>
                  <span className="block font-body text-[10px] text-white/15 mt-1 tracking-wider uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ (WHITE) ──────────────────────────────────── */}
      <section className="bg-white text-black border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto section-padding py-14 md:py-20">
          <FAQAccordion faqs={HOME_FAQS} title="Vanlige sporsmal" />
        </div>
      </section>

      {/* ─── SEO TEXT (BLACK) ─────────────────────────────── */}
      <section className="bg-black">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-black text-white mb-6">Klesbutikker i Norge</h2>
            <div className="font-body text-xs text-white/20 leading-relaxed space-y-3">
              <p>
                Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet alle
                registrerte klesbutikker fra Bronnoysundregistrene med naeringskode 47.710 og gjort dem
                sokbare etter by, fylke, merke og kategori.
              </p>
              <p>
                Med over {stats.totalStores.toLocaleString('nb-NO')} butikker i 357 kommuner og 15 fylker
                dekker vi hele Norge. Vi har kartlagt over {stats.totalBrands} klesmerker.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
