import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import FadeInSection from '@/components/FadeInSection';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Kategorier | Klesbutikker etter type',
  description: 'Utforsk klesbutikker etter kategori. Dameklær, herreklær, barneklær, treningsklær, designer, vintage, bunad og mer i hele Norge.',
  path: '/kategorier',
});

const CATEGORIES = [
  {
    name: 'Dameklær',
    slug: 'dameklar',
    letter: 'D',
    intro: 'Alt fra hverdagsplagg til festantrekk. Norske kvinner handler klær oftere enn noen gang, og utvalget i norske klesbutikker har aldri vært bredere.',
    body: 'Dameklær er den største kategorien i norsk kleshandel. Populære merker inkluderer Holzweiler, Ganni, Filippa K og Samsøe Samsøe, som alle er godt representert i norske klesbutikker. Trenden de siste årene har gått mot tidløse kvalitetsplagg fremfor fast fashion. Mange velger skandinavisk minimalisme med rene linjer og nøytrale farger, mens andre foretrekker mer fargerike og mønstrede stiler. Kjoler, blazere og gode ytterjakker er blant de mest etterspurte plaggene.',
    tips: 'Når du handler dameklær lønner det seg å investere i basisplagg av god kvalitet som varer over flere sesonger. Se etter naturlige materialer som bomull, ull og lin. Mange norske klesbutikker tilbyr personlig styling og hjelper deg med å sette sammen komplette antrekk.',
    brands: ['Holzweiler', 'Ganni', 'Filippa K', 'Samsøe Samsøe', 'By Malene Birger', 'Stine Goya'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'],
  },
  {
    name: 'Herreklær',
    slug: 'herreklar',
    letter: 'H',
    intro: 'Norske menn bruker mer på klær enn tidligere. Fra dresser og skjorter til casual hverdagsklær finnes det klesbutikker over hele landet som spesialiserer seg på herreklær.',
    body: 'Herreklær i Norge spenner fra klassiske dresser og skjorter til moderne streetwear og casual plagg. Oscar Jacobson, Tiger of Sweden og GANT er blant merkene som er mest etterspurt. Trenden blant norske menn går mot en blanding av formelt og uformelt, der en god blazer gjerne kombineres med jeans og sneakers. Kvalitetsklær som varer lenge har blitt viktigere enn å følge kortsiktige trender.',
    tips: 'Et godt råd for herreklær er å bygge opp en garderobe med allsidige basisplagg. En mørk dress, en god vinterjakke, kvalitetsjeans og noen pene skjorter dekker de fleste anledninger. Ikke undervurder betydningen av riktig passform.',
    brands: ['Oscar Jacobson', 'Tiger of Sweden', 'GANT', 'Polo Ralph Lauren', 'Hugo Boss', 'J.Lindeberg'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
  },
  {
    name: 'Barneklær',
    slug: 'barneklar',
    letter: 'B',
    intro: 'Barn vokser fort, og behovet for gode klær er konstant. Norske foreldre er opptatt av kvalitet, holdbarhet og materialer som tåler aktive barn i all slags vær.',
    body: 'Barneklær i Norge handler like mye om funksjon som om stil. Merker som Reima, Polarn O. Pyret og Name It er populære fordi de lager robuste klær som tåler lek og vær. Ullundertøy fra Lillelam og Devold er en norsk klassiker for barn. Gjenbruk av barneklær har også blitt stadig mer populært, og mange klesbutikker tilbyr innbytte eller videresalg av brukte barneklær i god stand.',
    tips: 'Barneklær bør være praktiske og laget av materialer som tåler hyppig vask. Merinoull er perfekt som grunnlag, og vanntette ytterklær er et must i norsk klima. Kjøp gjerne en størrelse for stor på ytterklær, så varer de lenger.',
    brands: ['Reima', 'Polarn O. Pyret', 'Name It', 'Lillelam', 'Helly Hansen Junior', 'Didriksons'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'],
  },
  {
    name: 'Sportsklær',
    slug: 'sport',
    letter: 'S',
    intro: 'Nordmenn er et aktivt folk, og treningsklær har blitt en naturlig del av hverdagsgarderoben. Fra løping og yoga til ski og fjelltur finnes det sportsklær for enhver aktivitet.',
    body: 'Sportsklær og treningsklær er blant de raskest voksende kategoriene i norsk kleshandel. Nike, Adidas og Johaug er blant de mest søkte merkene. Grensen mellom treningsklær og hverdagsklær er i ferd med å viskes ut, og mange bruker treningsplagg på jobb, i byen og på trening. Tekniske materialer som transporterer fukt, holder varmen og gir bevegelsesfrihet er standard i moderne sportsklær. Norske merkevarer som Kari Traa, Johaug og Stormberg er spesielt populære for utendørsaktiviteter.',
    tips: 'Velg treningsklær basert på aktiviteten du skal drive med. Løpeklær bør være lette og pustende, mens skiklær trenger isolasjon og vindtetthet. Et lag med merinoull nærmest kroppen fungerer godt i de fleste aktiviteter og hindrer lukt.',
    brands: ['Nike', 'Adidas', 'Johaug', 'Kari Traa', 'Under Armour', 'Stormberg'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
  },
  {
    name: 'Designer',
    slug: 'designer',
    letter: 'D',
    intro: 'For deg som setter pris på eksklusivt håndverk, unike materialer og kjente motehus. Designerklær representerer toppen av kvalitet og stil.',
    body: 'Designerklær i Norge finner du hovedsakelig i de største byene, med Oslo som det naturlige senteret. Multimerkbutikker som Høyer og Companys fører et bredt utvalg av internasjonale luksusmotehus. Norsk design har også fått internasjonal anerkjennelse, med merker som Holzweiler og Norwegian Rain i spissen. Trenden går mot tidløse investeringsplagg fremfor sesongbaserte kjøp. Mange foretrekker å eie færre, men bedre plagg.',
    tips: 'Designerklær er en investering. Se etter klassiske snitt og materialer som holder seg over tid. Sjekk alltid vaskeanvisningen og følg den nøye. Mange designerbutikker tilbyr tilpasninger og reparasjoner som forlenger plaggets levetid betraktelig.',
    brands: ['Holzweiler', 'Acne Studios', 'Prada', 'Gucci', 'Norwegian Rain', 'Totême'],
    cities: ['Oslo', 'Bergen', 'Stavanger'],
  },
  {
    name: 'Vintage og gjenbruk',
    slug: 'vintage',
    letter: 'V',
    intro: 'Bærekraftig mote handler om å gi klær nytt liv. Vintage og gjenbruksbutikker tilbyr unike funn du ikke finner andre steder, samtidig som du bidrar til et bedre miljø.',
    body: 'Vintage og gjenbruk er i sterk vekst i Norge. Stadig flere velger brukte klær, enten for å finne unike plagg med karakter eller for å redusere klimaavtrykket sitt. Grünerløkka i Oslo er kjent for sine mange vintagebutikker, men du finner gode gjenbruksforretninger i de fleste norske byer. Fretex, som finnes over hele landet, er en inngangsport for mange. I tillegg vokser digitale plattformer for gjenbruk raskt, og mange fysiske butikker kombinerer eget utvalg med netthandel.',
    tips: 'Når du handler vintage, ta deg tid til å inspisere plaggene nøye. Sjekk sømmer, glidelåser og eventuell slitasje. De beste funnene gjør du tidlig på dagen når nytt varelager er satt ut. Vær åpen for å oppdage merker og stiler du kanskje ikke ville valgt ellers.',
    brands: ['Fretex', 'UFF', 'Velouria Vintage', 'Robot', 'Frøken Diansen'],
    cities: ['Oslo', 'Bergen', 'Trondheim'],
  },
  {
    name: 'Arbeidsklær',
    slug: 'arbeidsklar',
    letter: 'A',
    intro: 'Profesjonelle arbeidsklær som kombinerer sikkerhet, komfort og holdbarhet. Fra byggebransjen til helsevesenet finnes det spesialiserte klesbutikker for alle yrker.',
    body: 'Arbeidsklær i Norge er underlagt strenge krav til sikkerhet og kvalitet. Bransjen dekker alt fra vernetøy og synlighetsklær for bygg og anlegg til uniformer for helsevesenet og servicebransjen. Norske bedrifter som Blåkläder, Helly Hansen Workwear og Snickers er kjent for robuste og funksjonelle arbeidsklær. Mange klesbutikker som spesialiserer seg på arbeidsklær tilbyr også logotrykk og bedriftsavtaler.',
    tips: 'Arbeidsklær må oppfylle relevante sikkerhetsstandarter for din bransje. Sørg for riktig passform som gir bevegelsesfrihet, og velg materialer som tåler hyppig vask. Flere arbeidsgivere dekker kostnaden for arbeidsklær, så sjekk med din bedrift.',
    brands: ['Blåkläder', 'Helly Hansen Workwear', 'Snickers', 'Mascot', 'Fristads'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
  },
  {
    name: 'Brudebutikker',
    slug: 'brud',
    letter: 'B',
    intro: 'Den store dagen fortjener den perfekte kjolen. Norske brudebutikker tilbyr alt fra klassiske brudekjoler til moderne festantrekk for hele bryllupsfølget.',
    body: 'Å finne den rette brudekjolen er en av de viktigste handleopplevelsene i livet. Norske brudebutikker tilbyr personlig service og hjelper deg med å finne kjolen som passer din stil, kropp og budsjett. Mange fører internasjonale merker, mens noen har egne designere som syr skreddersydde kjoler. I tillegg til brudekjoler finner du tilbehør som slør, sko, smykker og antrekk for brudepiker og brudens mor.',
    tips: 'Start jakten på brudekjolen minst seks til åtte måneder før bryllupet, da mange kjoler må bestilles og tilpasses. Bestill time på forhånd og ta med en eller to personer du stoler på. Sett et budsjett på forhånd og vær åpen for ulike stiler.',
    brands: ['Pronovias', 'Maggie Sottero', 'Vera Wang', 'BHLDN'],
    cities: ['Oslo', 'Bergen', 'Trondheim'],
  },
  {
    name: 'Undertøy',
    slug: 'undertoy',
    letter: 'U',
    intro: 'Godt undertøy er grunnlaget for enhver garderobe. Fra hverdagsundertøy til finere plagg finnes det spesialiserte butikker med kunnskap om passform og materialer.',
    body: 'Undertøy er en kategori mange undervurderer. Riktig passform og gode materialer gjør en stor forskjell for komfort og velvære i hverdagen. I Norge finner du alt fra spesialiserte undertøysbutikker med ekspertise på tilpasning til bredere klesbutikker med godt utvalg. Merker som Triumph, Calvin Klein og svenske Björn Borg er populære i norske butikker. Bærekraftige alternativer i bambus og økologisk bomull har også fått fotfeste.',
    tips: 'Riktig størrelse er nøkkelen til godt undertøy. Mange kvinner bruker feil BH størrelse, og en profesjonell tilpasning kan gjøre stor forskjell. Velg bomull eller bambus for hverdagsbruk, og unngå syntetiske materialer som holder på varme og fukt.',
    brands: ['Triumph', 'Calvin Klein', 'Björn Borg', 'Chantelle', 'Hunkemöller'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
  },
  {
    name: 'Bunad',
    slug: 'bunad',
    letter: 'B',
    intro: 'Bunaden er Norges stolteste tradisjon innen klær. Hver region har sin egen bunad med unike broderingsmønstre, farger og sølvarbeid.',
    body: 'Bunaden er mer enn et festplagg. Den representerer tilhørighet, håndverkstradisjon og kulturarv. I Norge finnes det over 400 ulike bunadsvarianter, og hver har sin egen historie knyttet til en bestemt region eller bygd. Å anskaffe en bunad er en betydelig investering, og prosessen fra bestilling til ferdig plagg kan ta over et år. Bunadssølv er en viktig del av helheten, og mange velger arvestykker som har gått i familien i generasjoner. Norske bunadsspesialister kan hjelpe deg med å velge riktig bunad basert på din tilhørighet og personlige preferanser.',
    tips: 'Velg bunad basert på din egen eller familiens geografiske tilknytning. Bestill i god tid, gjerne over et år før du trenger den. En bunad skal sitte perfekt, så sørg for skikkelig tilpasning. Oppbevar bunaden hengende i et mørkt, tørt skap, og luft den etter bruk i stedet for å vaske den.',
    brands: ['Husfliden', 'Oleana', 'Norsk Flid'],
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Tromsø', 'Lillehammer'],
  },
];

const PAGE_FAQS = [
  { question: 'Hvilke kleskategorier dekker Klesbutikk.no?', answer: 'Vi dekker dameklær, herreklær, barneklær, sportsklær og treningsklær, designerklær, vintage og gjenbruk, arbeidsklær, brudebutikker, undertøy og bunad. Hver kategori har egen innholdsside med trender, tips og oversikt over populære merker.' },
  { question: 'Hvordan finner jeg klesbutikker i en bestemt kategori?', answer: 'Velg kategorien du er interessert i på denne siden, og kombiner gjerne med en by for å se hva som finnes i ditt nærområde. Du kan også søke direkte etter merkenavn eller butikknavn i søkefeltet.' },
  { question: 'Hva er de mest populære kleskategoriene i Norge?', answer: 'Dameklær, sportsklær og herreklær er de tre største kategoriene målt i antall butikker og søkevolum. Treningsklær alene har over 12 000 månedlige søk i Norge og er en av de raskest voksende kategoriene.' },
  { question: 'Finnes det klesbutikker for bærekraftig mote?', answer: 'Ja, kategorien vintage og gjenbruk dekker butikker som selger brukte klær og bærekraftig mote. I tillegg har mange butikker innen andre kategorier et økende fokus på bærekraft, med resirkulerte materialer og etisk produksjon.' },
];

export default function KategorierPage() {
  return (
    <>
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Kategorier' }]} />
          <div className="mt-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" /></svg>
              {CATEGORIES.length} kategorier
            </div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-3">Kleskategorier i Norge</h1>
            <p className="font-body text-[15px] text-slate leading-relaxed max-w-xl">Utforsk norske klesbutikker etter kategori. Her finner du trender, tips og oversikt over populære merker innen hver kategori.</p>
          </div>
        </div>
      </section>

      {/* Category cards grid */}
      <section className="border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {CATEGORIES.map((cat, i) => (
              <a key={cat.slug} href={'#' + cat.slug}
                className={'group relative p-6 transition-colors duration-150 overflow-hidden ' +
                  (i === 0 ? 'bg-black text-white md:col-span-2 hover:bg-charcoal' :
                   i === 1 ? 'bg-accent text-white hover:bg-accent-hover' :
                   'bg-white hover:bg-surface-alt')
                }>
                <span className={'absolute -right-2 -top-4 font-body text-[80px] md:text-[100px] font-extrabold leading-none select-none pointer-events-none ' +
                  (i === 0 ? 'text-white/[0.04]' : i === 1 ? 'text-white/[0.1]' : 'text-charcoal/[0.03]')
                }>{cat.letter}</span>
                <div className="relative">
                  <h2 className={'font-body text-lg font-extrabold mb-1 ' + (i >= 2 ? 'text-charcoal' : 'text-white')}>{cat.name}</h2>
                  <p className={'font-body text-[13px] leading-relaxed ' +
                    (i === 0 ? 'text-white/60' : i === 1 ? 'text-white/70' : 'text-slate')
                  }>{cat.intro}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed category sections */}
      {CATEGORIES.map((cat) => (
        <section key={cat.slug} id={cat.slug} className="border-t border-border py-12 md:py-16">
          <div className="max-w-8xl mx-auto section-padding">
            <FadeInSection>
              <div className="max-w-3xl">
                <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.08em] mb-2">{cat.name}</p>
                <h2 className="font-body text-display-sm md:text-display font-extrabold text-black mb-5">{cat.name} i Norge</h2>
                <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
                  <p>{cat.body}</p>
                  <p>{cat.tips}</p>
                </div>
              </div>
            </FadeInSection>

            {/* Populære merker */}
            <FadeInSection>
              <div className="mt-8">
                <h3 className="font-body text-sm font-bold text-black mb-3">Populære merker innen {cat.name.toLowerCase()}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.brands.map((brand) => (
                    <span key={brand} className="font-body text-[13px] font-semibold text-slate border border-border px-4 py-2 rounded-full">{brand}</span>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Byer */}
            <FadeInSection>
              <div className="mt-6">
                <h3 className="font-body text-sm font-bold text-black mb-3">{cat.name} etter by</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.cities.map((city) => (
                    <Link key={city} href={'/kategori/' + cat.slug + '/' + city.toLowerCase()}
                      className="font-body text-[12px] font-semibold text-muted bg-surface-alt px-3.5 py-1.5 rounded-full hover:text-accent hover:border-accent border border-transparent transition-colors">
                      {cat.name} i {city}
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="bg-surface-alt py-12 md:py-16">
        <div className="max-w-3xl mx-auto section-padding">
          <FAQAccordion faqs={PAGE_FAQS} title="Vanlige spørsmål om kleskategorier" />
        </div>
      </section>
    </>
  );
}
