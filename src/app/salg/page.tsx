import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import { createMetadata } from '@/lib/seo';
import { getStats } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Klær på salg i Norge | Finn tilbud i din kommune',
  description: 'Finn klesbutikker med salg og tilbud nær deg. Barneklær salg, dameklær salg, herreklær salg og mer i alle Norges kommuner.',
  path: '/salg',
});

const SALG_CATEGORIES = [
  { name: 'Barneklær salg', slug: 'barneklær', desc: 'Salg på barneklær, babyklær og klær til barn i alle aldre. Finn butikker med tilbud på barneklær i din kommune.', volume: '1k-10k søk/mnd' },
  { name: 'Dameklær salg', slug: 'dameklær', desc: 'Salg på dameklær, kjoler, jakker og tilbehør for kvinner. Finn de beste tilbudene på dameklær nær deg.', volume: '590 søk/mnd' },
  { name: 'Herreklær salg', slug: 'herreklær', desc: 'Salg på herreklær, dresser, skjorter og casualwear for menn. Finn butikker med tilbud på herreklær.', volume: '590 søk/mnd' },
  { name: 'Treningsklær salg', slug: 'treningsklær', desc: 'Salg på treningsklær og treningstøy for dame, herre og barn. Nike, Johaug, Under Armour og mer.', volume: 'Populært søk' },
  { name: 'Billige klær', slug: 'billige', desc: 'Finn billige klær og klær til gode priser i klesbutikker nær deg. Billige klær på nett og i butikk.', volume: '100-1k søk/mnd' },
  { name: 'Sommerklær salg', slug: 'sommerklær', desc: 'Salg på sommerklær for hele familien. Finn sommertilbud i klesbutikker i din kommune.', volume: 'Sesongbasert' },
];

const SALG_FAQS = [
  { question: 'Hvor finner jeg klær på salg i Norge?', answer: 'Klesbutikk.no viser deg hvilke klesbutikker i din kommune som har salg og tilbud. Vi dekker 227 kommuner i alle 15 fylker, fra barneklær salg til dameklær salg og herreklær salg. Søk etter din kommune for å finne butikker med tilbud nær deg.' },
  { question: 'Når er det salg på klær i Norge?', answer: 'De store salgsperiodene i Norge er januar (etter jul), juni/juli (sommersalg) og november (Black Friday). Mange klesbutikker har også mellomsesongsalg i mars/april og september/oktober. Vi oppdaterer salgsiden vår jevnlig slik at du alltid finner aktuelle tilbud.' },
  { question: 'Hvor finner jeg billige barneklær?', answer: 'Barneklær salg er et av de mest søkte klestemaene i Norge. Finn butikker med tilbud på barneklær, babyklær og klær til barn i din kommune. Populære merker som Name It, Polarn O. Pyret og Reima har jevnlig salg i norske klesbutikker.' },
  { question: 'Kan jeg finne klær på salg på nett?', answer: 'Ja, mange klesbutikker i vår oversikt har også nettbutikk der du kan handle klær på salg. Se vår nettbutikkoversikt for butikker som tilbyr billige klær på nett med levering til hele Norge.' },
];

export default function SalgPage() {
  const stats = getStats();
  return (
    <>
      <section className="bg-gradient-to-b from-warm-100 to-cream">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Klær på salg' }]} />
          <div className="mt-4 max-w-2xl">
            <p className="overline mb-2">Salg og tilbud</p>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-3">Klær på salg <em className="text-accent italic">i hele Norge</em></h1>
            <p className="font-body text-base text-muted leading-relaxed">Finn klesbutikker med salg og tilbud i din kommune. Barneklær salg, dameklær salg, herreklær salg, treningsklær salg og mer. Vi dekker {stats.totalStores.toLocaleString('nb-NO')} klesbutikker i 227 kommuner.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SALG_CATEGORIES.map((cat) => (
              <div key={cat.slug} className="bg-cream border border-border rounded-lg p-6 hover:border-accent transition-all duration-200 cursor-pointer">
                <h2 className="font-body text-base font-semibold text-charcoal mb-2">{cat.name}</h2>
                <p className="font-body text-sm text-muted leading-relaxed mb-3">{cat.desc}</p>
                <span className="inline-block font-body text-[10px] font-semibold text-accent bg-accent-light px-2.5 py-1 rounded-full">{cat.volume}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-12 md:py-16">
          <div className="font-body text-sm text-muted leading-relaxed space-y-4 mb-12">
            <h2 className="font-body text-display font-extrabold-sm text-charcoal">Salg på klær i norske klesbutikker</h2>
            <p>Nordmenn elsker et godt tilbud, og salg på klær er blant de mest populære søkene i Norge. Barneklær salg alene har mellom 1 000 og 10 000 søk i måneden, og salg klær har tilsvarende volum. Vi jobber med å bygge en komplett salgseksjon der du kan se hvilke klesbutikker som har tilbud akkurat nå.</p>
            <p>Foreløpig kan du utforske klesbutikker i din kommune og kontakte dem direkte for informasjon om aktuelle salg og kampanjer. Mange butikker har sesongsalg, opphørssalg og lopende tilbud som ikke alltid annonseres online. De lokale klesbutikkene har ofte de beste tilbudene fordi de onsker a trekke kunder til butikken.</p>
          </div>
          <FAQAccordion faqs={SALG_FAQS} title="Vanlige spørsmål om klær på salg" />
          <div className="mt-14">
            <CTASection />
          </div>
        </div>
      </section>
    </>
  );
}
