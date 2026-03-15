import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vilkår og betingelser | Klesbutikk.no',
  description:
    'Vilkår og betingelser for bruk av Klesbutikk.no.',
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Juridisk side · /vilkar                                           */
/* ------------------------------------------------------------------ */

export default function VilkarPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Hjem
                </Link>
              </li>
              <li className="text-border-dark">/</li>
              <li className="text-charcoal font-medium">Vilkår og betingelser</li>
            </ol>
          </nav>
          <h1 className="text-display font-bold text-charcoal">
            Vilkår og betingelser
          </h1>
          <p className="mt-3 text-muted text-sm">
            Sist oppdatert: 15.&nbsp;mars&nbsp;2026
          </p>
        </div>
      </div>

      {/* Innhold */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="space-y-10 text-[15px] leading-[1.75] text-slate">
          {/* 1 */}
          <Section n={1} title="Om tjenesten">
            <p>
              Klesbutikk.no er en gratis oversiktstjeneste som samler
              informasjon om registrerte klesbutikker i Norge. Tjenesten er
              levert av IT-FIRMA og baserer seg på data fra offisielle norske
              registre.
            </p>
          </Section>

          {/* 2 */}
          <Section n={2} title="Bruk av tjenesten">
            <p>
              Tjenesten er gratis for forbrukere. Ved å bruke Klesbutikk.no
              aksepterer du disse vilkårene. Du kan bruke innholdet til
              personlige, ikke-kommersielle formål. Systematisk kopiering,
              scraping eller reproduksjon av data fra nettstedet er ikke
              tillatt uten skriftlig samtykke.
            </p>
          </Section>

          {/* 3 */}
          <Section n={3} title="Nøyaktighet og oppdatering">
            <p>
              Vi tilstreber at all informasjon på Klesbutikk.no er korrekt og
              oppdatert. Data hentes fra offisielle norske registre og
              oppdateres jevnlig. Vi kan likevel ikke garantere at all
              informasjon til enhver tid er fullstendig eller feilfri.
              Butikker kan ha endret adresse, åpningstider eller lagt ned
              uten at dette umiddelbart reflekteres i våre data.
            </p>
          </Section>

          {/* 4 */}
          <Section n={4} title="Annonsering og betalte tjenester">
            <p>
              Butikkeiere kan kjøpe synlighetspakker for å fremheve sin
              butikk på Klesbutikk.no. Tilgjengelige pakker:
            </p>
            <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-border-dark">
              <li>
                <strong className="text-charcoal">Synlig</strong> —
                990&nbsp;kr/mnd: logo, beskrivelse, åpningstider, kategori-
                og merkesider
              </li>
              <li>
                <strong className="text-charcoal">Premium</strong> —
                2&nbsp;490&nbsp;kr/mnd: alle Synlig-funksjoner pluss merke,
                prioritert plassering, SEO-tekst og artikkelside
              </li>
            </ul>
            <p className="mt-3">
              Betalte tjenester faktureres månedlig. Det er ingen bindingstid,
              og abonnementet kan sies opp når som helst med virkning fra
              neste faktureringsperiode.
            </p>
          </Section>

          {/* 5 */}
          <Section n={5} title="Immaterielle rettigheter">
            <p>
              Alt innhold på Klesbutikk.no, inkludert design, tekst, grafikk,
              logoer og den sammenstilte databasen, er beskyttet av
              opphavsrett og databasevern. Butikkdata som stammer fra
              offisielle registre er offentlig tilgjengelig, men vår
              sammenstilling, kategorisering og presentasjon er vernet.
            </p>
          </Section>

          {/* 6 */}
          <Section n={6} title="Ansvarsbegrensning">
            <p>
              Klesbutikk.no tilbys «som den er» uten garantier av noe slag.
              Vi er ikke ansvarlige for tap, skade eller ulempe som måtte
              oppstå som følge av bruk av informasjon fra nettstedet. Dette
              inkluderer, men er ikke begrenset til, feil i
              butikkinformasjon, nedetid eller utilgjengelighet av tjenesten.
            </p>
          </Section>

          {/* 7 */}
          <Section n={7} title="Tredjepartslenker">
            <p>
              Klesbutikk.no kan inneholde lenker til eksterne nettsteder. Vi
              er ikke ansvarlige for innholdet på eller personvernpraksisen
              til tredjepartsnettsteder.
            </p>
          </Section>

          {/* 8 */}
          <Section n={8} title="Endringer i vilkårene">
            <p>
              Vi forbeholder oss retten til å endre disse vilkårene når som
              helst. Endringer trer i kraft ved publisering på denne siden.
              Fortsatt bruk av tjenesten etter endring innebærer aksept av
              de oppdaterte vilkårene.
            </p>
          </Section>

          {/* 9 */}
          <Section n={9} title="Gjeldende lov">
            <p>
              Disse vilkårene er underlagt norsk lov. Eventuelle tvister
              skal søkes løst i minnelighet. Dersom dette ikke er mulig,
              skal tvisten avgjøres av norske domstoler.
            </p>
          </Section>

          {/* 10 */}
          <Section n={10} title="Kontakt">
            <p>
              Spørsmål om disse vilkårene kan rettes til{' '}
              <a
                href="mailto:hei@klesbutikk.no"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                hei@klesbutikk.no
              </a>
              .
            </p>
          </Section>
        </div>
      </article>
    </main>
  );
}

/* ---------- Helper ---------- */

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-charcoal mb-3">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}
