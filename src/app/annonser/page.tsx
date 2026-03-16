import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'For butikkeiere | Nettside, nettbutikk og synlighet for klesbutikker',
  description: 'Vi hjelper uavhengige klesbutikker med synlighet i Google, nettside, nettbutikk, SEO og fraktavtaler. Fra gratis oppføring til komplett digital løsning.',
  path: '/annonser',
});

const SERVICES = [
  { title: 'Gratis oppføring', price: 'Gratis', desc: 'Alle klesbutikker i Norge har automatisk en gratis oppføring hos oss.', features: ['Butikknavn og adresse', 'Kommune og fylke', 'Kategori', 'Synlig i søk på klesbutikk.no'], highlighted: false },
  { title: 'Fremhevet oppføring', price: '990 kr/mnd', desc: 'Bli synlig for kundene som søker etter klesbutikker i din kommune.', features: ['Alt i gratis', 'Prioritert plassering øverst', 'Synlig kvalitetsbadge', 'Eksponering på merkesider', 'Eksponering på kategorisider', 'Kontaktinfo og åpningstider'], highlighted: true },
  { title: 'Nettside', price: 'Ta kontakt', desc: 'Vi bygger en profesjonell nettside for butikken din som er synlig i Google.', features: ['Profesjonelt design', 'Mobilvennlig', 'SEO optimalisert', 'Google synlighet', 'Eget domene eller underside', 'Vedlikehold inkludert'], highlighted: false },
  { title: 'Nettbutikk', price: 'Ta kontakt', desc: 'Selg klær på nett med egen nettbutikk, betalingsløsning og frakt.', features: ['Alt i nettside', 'Produktkatalog', 'Betalingsløsning', 'Fraktavtaler', 'Ordrehåndtering', 'Vipps og kort'], highlighted: false },
];

const STATS = [
  { num: '8 100', label: 'søker «klesbutikk» hver måned' },
  { num: '12 100', label: 'søker «treningsklær» hver måned' },
  { num: '3 600', label: 'søker «dameklær» hver måned' },
  { num: '1 300', label: 'søker «klesbutikk oslo» hver måned' },
];

const FAQS = [
  { question: 'Hva koster det å bli synlig på Klesbutikk.no?', answer: 'Alle klesbutikker har en gratis standardoppføring. Fremhevede plasseringer koster fra 990 kr i måneden. Nettside og nettbutikk prises individuelt. Ta kontakt for et uforpliktende tilbud.' },
  { question: 'Hvordan hjelper dere butikken min med å bli synlig i Google?', answer: 'Klesbutikk.no ranker for tusenvis av klesrelaterte søkeord. Når du har en fremhevet oppføring dukker butikken din opp når folk søker etter klesbutikker i din kommune, etter merkene du fører og i relevante kategorier.' },
  { question: 'Kan dere bygge nettside for butikken min?', answer: 'Ja! Vi bygger profesjonelle nettsider for klesbutikker. Mobilvennlig, SEO optimalisert og synlig i Google. Mange uavhengige butikker har ingen nettside og er usynlige på nett. Vi løser det.' },
  { question: 'Kan dere hjelpe med nettbutikk?', answer: 'Vi bygger nettbutikk med betalingsløsning, fraktavtaler og produktkatalog. Netthandel med klær vokser over 5 prosent årlig og butikker uten nettbutikk taper kunder til de store nettaktørene.' },
  { question: 'Hvorfor Klesbutikk.no fremfor å annonsere selv?', answer: 'Vi har premium domenet klesbutikk.no som ranker for tusenvis av relevante søkeord. Å bygge denne synligheten selv ville kostet hundretusener. Med en fremhevet oppføring får du umiddelbar synlighet for en brøkdel av prisen.' },
];

export default function AnnonserPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-charcoal to-[#1a1a1a] text-white">
        <div className="max-w-8xl mx-auto section-padding pt-8 pb-14 md:pt-12 md:pb-20">
          <Breadcrumbs items={[{ label: 'For butikkeiere' }]} />
          <div className="mt-6 max-w-2xl">
            <p className="text-[11px] font-semibold text-accent uppercase tracking-[0.12em] mb-3">For butikkeiere</p>
            <h1 className="font-display text-hero-sm md:text-hero text-white mb-4">Vi hjelper uavhengige klesbutikker å <em className="text-accent italic">vokse</em></h1>
            <p className="font-body text-base text-white/50 leading-relaxed">De store kjedene klarer seg fint. Men du som driver din egen klesbutikk fortjener de samme digitale verktøyene. Nettside, nettbutikk, synlighet i Google og fraktavtaler. Alt fra en plass.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
                <span className="font-display text-2xl text-accent">{s.num}</span>
                <span className="block font-body text-xs text-white/30 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto section-padding py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-2xl p-8">
              <h3 className="font-body text-sm font-semibold text-muted mb-5">Uten oss</h3>
              {['Usynlig i Google', 'Ingen nettside', 'Taper kunder til nettbutikker', 'Ingen merkesynlighet', 'Kundene vet ikke at du finnes'].map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3 text-sm text-muted/60">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {item}
                </div>
              ))}
            </div>
            <div className="bg-accent-light border border-accent/10 rounded-2xl p-8">
              <h3 className="font-body text-sm font-semibold text-accent mb-5">Med Klesbutikk.no</h3>
              {['Synlig på side 1 i Google', 'Profesjonell butikkprofil', 'Vises når folk søker dine merker', 'Nettside og nettbutikk', 'Nye kunder hver dag'].map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3 text-sm text-charcoal">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <div className="text-center mb-10">
            <p className="overline mb-2">Tjenester</p>
            <h2 className="font-display text-display text-charcoal">Velg det som passer <em className="text-accent italic">din butikk</em></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((svc) => (
              <div key={svc.title} className={`rounded-2xl p-6 ${svc.highlighted ? 'bg-accent text-white ring-2 ring-accent ring-offset-2' : 'bg-white border border-border'}`}>
                <h3 className={`font-body text-base font-semibold mb-1 ${svc.highlighted ? 'text-white' : 'text-charcoal'}`}>{svc.title}</h3>
                <p className={`font-display text-2xl mb-3 ${svc.highlighted ? 'text-white' : 'text-accent'}`}>{svc.price}</p>
                <p className={`font-body text-sm leading-relaxed mb-4 ${svc.highlighted ? 'text-white/70' : 'text-muted'}`}>{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 font-body text-xs ${svc.highlighted ? 'text-white/80' : 'text-muted'}`}>
                      <svg className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${svc.highlighted ? 'text-white' : 'text-accent'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/legg-til-butikk" className="btn-primary text-sm px-8 py-3.5">Kom i gang gratis</Link>
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-white">
        <div className="max-w-3xl mx-auto section-padding py-12 md:py-16 text-center">
          <p className="text-[11px] font-semibold text-accent uppercase tracking-[0.12em] mb-3">Kommer snart</p>
          <h2 className="font-display text-display-sm md:text-display text-white mb-4">Distributøroversikt for norske klesbutikker</h2>
          <p className="font-body text-sm text-white/40 leading-relaxed max-w-lg mx-auto">Vi bygger en komplett oversikt over norske klesdistributører og leverandører. Finn nye merker for butikken din, sammenlign leverandører og få bedre innkjøpsbetingelser.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto section-padding py-12 md:py-16">
          <FAQAccordion faqs={FAQS} title="Vanlige spørsmål for butikkeiere" />
        </div>
      </section>
    </>
  );
}
