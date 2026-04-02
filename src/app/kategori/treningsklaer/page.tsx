import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import { createMetadata } from '@/lib/seo';
import { getAllStores, getStats, getAllCities } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Treningsklær i Norge | Finn butikker med treningsklær nær deg',
  description: 'Finn butikker som selger treningsklær i din kommune. Treningsklær dame, herre, junior og barn. Johaug, Nike, Under Armour, Norrøna og mer.',
  path: '/kategori/treningsklaer',
});

const SPORT_KEYWORDS = ['sport', 'trening', 'aktiv', 'fitness', 'outdoor', 'norrøna', 'helly', 'nike', 'adidas', 'under armour', 'johaug', 'kari traa', 'bergans', 'swix', 'devold', 'xxl'];

const SUB_CATEGORIES = [
  { name: 'Treningsklær dame', volume: '4 400', desc: 'Treningstights, sportsbher, treningstopper og joggedresser for kvinner. Populære merker som Johaug, Kari Traa, Nike og Adidas.' },
  { name: 'Treningsklær herre', volume: '2 900', desc: 'Treningsbukser, t-skjorter, løpejakker og kompresjon for menn. Nike, Adidas, Under Armour og norske merker.' },
  { name: 'Treningsklær junior', volume: '1 600', desc: 'Treningsklær for ungdom og tenåringer. Populære merker og sportstøy for aktive unge.' },
  { name: 'Treningsklær barn', volume: '880', desc: 'Treningsklær for de minste. Funksjonelle og holdbare treningsplagg for barn i alle aldre.' },
  { name: 'Johaug treningsklær', volume: '1 000', desc: 'Therese Johaug sitt eget klesmerke for aktive kvinner. Løpetights, treningsjakker og sportsbher.' },
  { name: 'Nike treningsklær', volume: '390', desc: 'Nike treningsklær for dame, herre og barn. Dri-FIT teknologi, joggedresser og treningsutstyr.' },
];

const TRENING_FAQS = [
  { question: 'Hvor finner jeg treningsklær i min kommune?', answer: 'Søk etter din kommune på Klesbutikk.no for å finne butikker som selger treningsklær nær deg. Vi har kartlagt over 200 butikker som selger sportsklær og treningsklær fordelt på 112 kommuner i hele Norge.' },
  { question: 'Hvilke merker er mest populære for treningsklær?', answer: 'De mest søkte merkene for treningsklær i Norge er Johaug (1 000 søk i måneden), Nike, Under Armour, Norrøna, Kari Traa, Helly Hansen og Bergans. Norske merker er spesielt populære fordi de er utviklet for norske forhold.' },
  { question: 'Finnes det billige treningsklær?', answer: 'Ja, billige treningsklær er et populært søk med over 320 månedlige søk i Norge. Finn butikker med treningsklær på salg i din kommune, eller sjekk vår salgsside for aktuelle tilbud på treningstøy.' },
  { question: 'Hva er forskjellen på treningsklær og friluftsklær?', answer: 'Treningsklær er laget for trening innendørs og utendørs med fokus på bevegelse, fuktransport og komfort. Friluftsklær er laget for tur og friluft med fokus på vær og vindtetthet, holdbarhet og lagprinsippet. Mange norske butikker fører begge deler.' },
];

export default function TreningsklaerPage() {
  const stats = getStats();
  const allStores = getAllStores();
  const sportStores = allStores.filter((s) => SPORT_KEYWORDS.some((kw) => s.navn.toLowerCase().includes(kw)));
  const topCities = getAllCities().slice(0, 8);

  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Kategorier', href: '/kategorier' }, { label: 'Treningsklær' }]} />
          <div className="mt-4 max-w-2xl">
            <p className="overline mb-2">Norges mest søkte kleskategori</p>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-3">Treningsklær <em className="text-accent italic">i hele Norge</em></h1>
            <p className="font-body text-base text-muted leading-relaxed">Treningsklær er det mest søkte kleskategorien i Norge med over 12 000 søk i måneden. Finn butikker som selger treningsklær og treningstøy i din kommune. Treningsklær for dame, herre, junior og barn fra populære merker som Johaug, Nike, Under Armour og Norrøna.</p>
          </div>
        </div>
      </section>

      {/* Sub-categories */}
      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <h2 className="font-body text-display font-extrabold-sm text-charcoal mb-6">Populære søk innen treningsklær</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUB_CATEGORIES.map((cat) => (
              <div key={cat.name} className="bg-cream border border-border rounded-lg p-6 hover:border-accent transition-all duration-200">
                <h3 className="font-body text-base font-semibold text-charcoal mb-2">{cat.name}</h3>
                <p className="font-body text-sm text-muted leading-relaxed mb-3">{cat.desc}</p>
                <span className="inline-block font-body text-[10px] font-semibold text-accent bg-accent-light px-2.5 py-1 rounded-full">{cat.volume} søk/mnd</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City links for treningsklær */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-12 md:py-16">
          <h2 className="font-body text-display font-extrabold-sm text-charcoal mb-6">Finn treningsklær i din kommune</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {topCities.map((city) => (
              <Link key={city.slug} href={`/${city.slug}`} className="bg-cream border border-border rounded-lg p-4 hover:border-accent transition-all">
                <span className="font-body text-sm font-semibold text-charcoal block">{city.name}</span>
                <span className="font-body text-xs text-muted">{city.storeCount} butikker</span>
              </Link>
            ))}
          </div>

          <div className="max-w-3xl">
            <div className="font-body text-sm text-muted leading-relaxed space-y-4 mb-12">
              <h3 className="font-body text-xl font-extrabold text-charcoal">Treningsklær i norske butikker</h3>
              <p>Norge er en av verdens mest aktive nasjoner, og det gjenspeiles i etterspørselen etter treningsklær. Over 12 000 nordmenn søker etter treningsklær hver eneste måned, noe som gjør det til den desidert mest populære kleskategorien i landet. Treningsklær for dame alene har 4 400 månedlige søk, mens treningsklær for herre har 2 900.</p>
              <p>Norske treningsmerker som Johaug, Kari Traa, Norrøna, Helly Hansen og Bergans er spesielt populære fordi de er utviklet for å tåle norske forhold. Johaug treningsklær har alene 1 000 månedlige søk i Norge. Internasjonale merker som Nike, Adidas og Under Armour har også sterk tilstedeværelse i norske sportsbutikker.</p>
              <p>Vi har kartlagt over 200 butikker som selger treningsklær og sportsklær i 112 kommuner over hele Norge. Enten du er ute etter treningstights, løpejakker, joggedresser eller funksjonelt treningstøy, hjelper vi deg å finne riktig butikk i din kommune.</p>
              <p></p>
            </div>
            <FAQAccordion faqs={TRENING_FAQS} title="Vanlige spørsmål om treningsklær" />
            <div className="mt-14">
              <CTASection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
