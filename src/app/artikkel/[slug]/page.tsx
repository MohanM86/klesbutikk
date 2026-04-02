import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { createMetadata, breadcrumbSchema } from '@/lib/seo';

interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  category: string;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'beste-klesbutikker-i-norge',
    title: 'De beste klesbutikkene i Norge i 2026',
    metaTitle: 'De beste klesbutikkene i Norge (2026) | Komplett guide',
    metaDescription: 'Vår guide til Norges beste klesbutikker fra Lindesnes til Nordkapp. Oppdag moteperler, designerbutikker og lokale favoritter over hele landet.',
    date: '2026-03-10',
    category: 'Guide',
    content: [
      'Norge har et overraskende rikt utvalg av klesbutikker, fra internasjonale kjeder til unike nisjebutikker med skandinavisk design. Enten du bor i Oslo, Bergen, Trondheim eller en mindre by, finnes det alltid spennende motebutikker å oppdage.',
      'I denne guiden tar vi deg gjennom de beste klesbutikkene i Norge, sortert etter by og kategori. Vi har brukt vår database med over 1 500 butikker for å gi deg den mest komplette oversikten.',
      'Oslo er naturligvis Norges motehovedstad. Her finner du alt fra Holzweiler og Filippa K på Aker Brygge til vintage-perler på Grünerløkka. Bogstadveien er den klassiske handlegaten med et bredt utvalg av både norske og internasjonale merker. For luksus anbefaler vi Steen & Strøm og Eger.',
      'Bergen byr på en sjarmerende shoppingopplevelse med butikker langs Torgallmenningen og i Galleriet. Byen er spesielt kjent for skandinaviske merker og lokale designere som BRGN, som lager regntøy med stil | perfekt for vestlandsværet.',
      'Trondheim har en levende motescene sentrert rundt Nordre gate. Her finner du Retro, Kleins, og en rekke konseptbutikker som blander norsk og internasjonal mote. Bakklandet byr på sjarmerende småbutikker med unik karakter.',
      'Stavanger kombinerer oljeby-energi med skandinavisk design. Klubbgata og Kirkegata er hjertet av shopping i Stavanger, med alt fra Høyer til lokale designerbutikker. Stavanger Storsenter og Forus har også et bredt utvalg.',
      'Mindre byer som Haugesund, Tromsø, Kristiansand og Lillehammer har alle overraskende gode motetilbud. Mange av disse byene har sterke lokale butikker som har drevet i generasjoner og kjenner sine kunders smak.',
      'For å finne klesbutikker i din by, bruk søkefunksjonen på Klesbutikk.no. Vi oppdaterer databasen jevnlig med verifiserte data for å sikre at du alltid finner oppdatert informasjon.',
    ],
  },
  {
    slug: 'klesbutikker-oslo-guide',
    title: 'Komplett guide til klesbutikker i Oslo',
    metaTitle: 'Klesbutikker i Oslo | Komplett shoppingguide (2026)',
    metaDescription: 'Alt du trenger å vite om shopping i Oslo. De beste handlegatene, kjøpesentrene og skjulte perlene for moteinteresserte.',
    date: '2026-03-05',
    category: 'Byguide',
    content: [
      'Oslo er Norges ubestridte motehovedstad med over 250 registrerte klesbutikker. Fra eksklusive designerbutikker til budsjettvennlige kjeder | hovedstaden har noe for absolutt alle.',
      'Karl Johans gate er Oslos mest kjente handlegate og strekker seg fra Sentralstasjonen til Slottet. Her finner du store kjeder som H&M, Zara og GANT, samt kjøpesentre som Paleet og Eger. For luksusmerker er Steen & Strøm uslåelig.',
      'Bogstadveien og Hegdehaugsveien er favorittområdet for de som søker en blanding av kjeder og nisjebutikker. Her finner du alt fra Filippa K og Holzweiler til lokale favoritter. Området har en mer avslappet stemning enn Karl Johan.',
      'Grünerløkka er Oslos hipster-paradis med vintage-butikker, secondhand-perler og uavhengige designerbutikker. Markveien og Thorvald Meyers gate er de viktigste handlegatene. Her finner du blant annet Velouria Vintage og Frøken Dianas Salonger.',
      'Aker Brygge og Tjuvholmen er Oslos premium-shoppingdestinasjon med utsikt over fjorden. Her finner du eksklusive merker og konseptbutikker i moderne omgivelser. CC Vest (tidligere Oslo City Vest) på Lilleaker er også populært.',
      'For kjøpesenterentusiaster har Oslo flere store sentre: Oslo City, Storo Storsenter, Byporten og Alna Senter. Hver av disse har et bredt utvalg av klesbutikker for hele familien.',
      'Tips: Besøk Klesbutikk.no/oslo for en komplett liste over alle klesbutikker i Oslo med adresser og kontaktinformasjon.',
    ],
  },
  {
    slug: 'norske-motemerker',
    title: 'Norske motemerker du bør kjenne til',
    metaTitle: 'Norske klesmerker | De viktigste motmerkene fra Norge',
    metaDescription: 'Fra Holzweiler til Stormberg | en oversikt over norske klesmerker som setter Norge på motekartet internasjonalt.',
    date: '2026-02-28',
    category: 'Mote',
    content: [
      'Norge har de siste årene fått et stadig sterkere fotavtrykk i den internasjonale moteverdenen. Flere norske klesmerker har vokst fra lokale nisjer til globale aktører, og det er på tide at vi feirer det.',
      'Holzweiler er kanskje det mest kjente norske motemerket internasjonalt. Grunnlagt av søskenparet Susanne og Andreas Holzweiler, har merket blitt kjent for sine ikoniske skjerf og en estetikk som blander skandinavisk minimalisme med lekne detaljer. Du finner Holzweiler-butikker i Oslo og på Fornebu.',
      'Stormberg er Norges mest solgte turklær-merke og beviset på at bærekraft og rimelige priser kan gå hånd i hånd. Med sin «åpne bøker»-filosofi og sterke miljøprofil har Stormberg blitt en folkefavoritt for aktivt friluftsliv.',
      'BRGN by Lisbeth Berge er et bergensbasert merke som har gjort regnklær til high fashion. Med stilige regnjakker og frakker i moderne design viser BRGN at vestlandsværet kan inspirere til kreativitet.',
      'Livid Jeans fra Trondheim lager premium denim med fokus på bærekraft og kvalitet. Alle jeans produseres i Norge, noe som er svært uvanlig i motebransjen. Merket har butikk i Oslo og selges i utvalgte forhandlere.',
      'Andre norske merker verdt å kjenne til inkluderer Devold (ull siden 1853), Woolland (moderne ull), Northern Playground (bærekraftig sport), Oleana (strikk) og Lillelam (barneklær i ull).',
      'Besøk Klesbutikk.no/merker for å finne butikker som fører ditt favoritt norske merke.',
    ],
  },
  {
    slug: 'barekraftig-mote-norge',
    title: 'Bærekraftig mote i Norge | hvor handler du?',
    metaTitle: 'Bærekraftig mote i Norge | Guide til miljøvennlig shopping',
    metaDescription: 'Stadig flere norske klesbutikker satser på bærekraft. Her er de beste stedene for miljøvennlig motet i Norge.',
    date: '2026-02-20',
    category: 'Bærekraft',
    content: [
      'Bærekraft har blitt et nøkkelord i norsk mote. Stadig flere forbrukere ønsker å handle klær som er produsert etisk og med tanke på miljøet. Heldigvis er Norge i forkant av denne trenden.',
      'Stormberg er en pioner innen bærekraftig mote i Norge. Merket har en åpen forretningsmodell der alle priser og marginer er synlige, og de donerer 1% av omsetningen til gode formål. Stormberg har butikker over hele Norge.',
      'Livid Jeans produserer sine jeans i Trondheim med norsk arbeidskraft og bærekraftige materialer. Hver jeans kan spores tilbake til produksjonen, og merket tilbyr reparasjonstjenester for å forlenge levetiden.',
      'Vintage og secondhand er en av de mest bærekraftige måtene å handle klær på. Oslo har et rikt vintage-miljø, spesielt på Grünerløkka med butikker som Velouria Vintage, Good Vibes Vintage og Frøken Dianas Salonger.',
      'Norske ull-merker som Devold og Woolland lager klær som varer i generasjoner. Ull er et naturlig, fornybart og biologisk nedbrytbart materiale, og norsk ull er blant den mest bærekraftige i verden.',
      'Tips for bærekraftig shopping: Kjøp færre, men bedre plagg. Velg merker med transparente produksjonskjeder. Vurder secondhand først. Reparer heller enn å kaste. Og bruk Klesbutikk.no for å finne butikker nær deg.',
    ],
  },
  {
    slug: 'shopping-bergen-guide',
    title: 'Shopping i Bergen | en komplett guide',
    metaTitle: 'Shopping i Bergen | Komplett guide til klesbutikker (2026)',
    metaDescription: 'Utforsk Bergens varierte shopping-scene, fra Bryggen til Galleriet og de sjarmerende nisjebutikkene i Skostredet.',
    date: '2026-02-15',
    category: 'Byguide',
    content: [
      'Bergen er mer enn bare regn og fjorder | byen har også en fantastisk shopping-scene med nesten 40 registrerte klesbutikker. Fra historiske Bryggen til moderne kjøpesentre, Bergen har noe for enhver smak.',
      'Torgallmenningen er Bergens viktigste handlegate og strekker seg fra Bryggen til Festplassen. Her finner du store kjeder, Galleriet kjøpesenter, og en rekke fristende butikker. Xhibition er et annet populært kjøpesenter.',
      'Skostredet og Nøstet-området er Bergens kreative hjerte med uavhengige butikker, vintage-funn og lokale designere. Her finner du en mer alternativ shopping-opplevelse med butikker du ikke finner andre steder.',
      'For merkevareshopping er Galleriet og Xhibition de beste alternativene. Her finner du kjente kjeder som H&M, Zara, Companys og Høyer. Lagunen Storsenter i Rådal er Vestlandets største kjøpesenter.',
      'Bergen er også kjent for lokale merker som BRGN (stilige regnklær) og Audhild Viken (bunader og norsk design). For sjømatinspirert shopping, sjekk butikkene langs Bryggen.',
      'Se alle klesbutikker i Bergen på Klesbutikk.no/bergen.',
    ],
  },
  {
    slug: 'skandinavisk-minimalisme',
    title: 'Skandinavisk minimalisme | stilen som aldri dør',
    metaTitle: 'Skandinavisk minimalisme | Guide til tidløs stil i norske butikker',
    metaDescription: 'Lær mer om den skandinaviske motestilen og hvor du finner butikker som selger tidløse, minimalistiske klær i Norge.',
    date: '2026-02-10',
    category: 'Mote',
    content: [
      'Skandinavisk minimalisme har blitt et globalt fenomen. Den rene, stilfulle estetikken med fokus på kvalitet fremfor kvantitet definerer hvordan nordboere kler seg | og resten av verden vil etterligne det.',
      'Stilen kjennetegnes av nøytrale farger (sort, hvit, grå, beige), rene linjer, god passform og materialer av høy kvalitet. Det handler om å bygge en garderobe som varer, med plagg som kan kombineres på utallige måter.',
      'Norske og skandinaviske merker som Filippa K, Holzweiler, Samsøe Samsøe og Acne Studios er ledende innen denne estetikken. Filippa K har butikk i Oslo med et utvalg som perfekt representerer skandinavisk minimalisme.',
      'For å oppnå den skandinaviske stilen, start med basisplagg: en god hvit t-skjorte, en perfekt sort bukse, en klassisk ullfrakk og kvalitetsdenim. Deretter kan du bygge videre med statement-plagg fra norske designere.',
      'Butikker som Høyer, Companys og Retro fører et bredt utvalg av skandinaviske merker og er gode utgangspunkt for å bygge en minimalistisk garderobe. Disse finner du i de fleste norske byer.',
      'Utforsk skandinaviske merker på Klesbutikk.no/merker for å finne forhandlere nær deg.',
    ],
  },
];

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return createMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/artikkel/${post.slug}`,
  });
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const bcSchema = breadcrumbSchema([
    { name: 'Artikler', url: '/artikler' },
    { name: post.title, url: `/artikkel/${post.slug}` },
  ]);

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'Klesbutikk.no' },
            publisher: { '@type': 'Organization', name: 'Klesbutikk.no' },
          }),
        }}
      />

      <section className="bg-black text-white">
        <div className="max-w-3xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Artikler', href: '/artikler' }, { label: post.title }]} />
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-accent bg-white/10 px-2.5 py-1 rounded-lg">
                {post.category}
              </span>
              <time className="font-body text-xs text-white/40">{post.date}</time>
            </div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">

        <div className="space-y-5 mb-16">
          {post.content.map((paragraph, i) => (
            <p key={i} className="font-body text-base md:text-lg text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related articles */}
        <section className="border-t border-border pt-12 mb-16">
          <h2 className="font-body text-xl font-extrabold text-charcoal mb-6">
            Les også
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/artikkel/${p.slug}`}
                className="group block bg-cream border border-border rounded-lg p-5 card-hover"
              >
                <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted">
                  {p.category}
                </span>
                <h3 className="font-body text-sm font-extrabold text-charcoal mt-1 group-hover:text-accent transition-colors line-clamp-2">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <CTASection />
      </article>
    </>
  );
}
