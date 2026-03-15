import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Vilkår og betingelser',
  description: 'Vilkår og betingelser for bruk av Klesbutikk.no.',
  path: '/vilkar',
  noIndex: true,
});

export default function VilkarPage() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto section-padding pt-6 pb-16 md:pt-10">
        <Breadcrumbs items={[{ label: 'Vilkår og betingelser' }]} />
        <h1 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mt-4 mb-8">Vilkår og betingelser</h1>
        <div className="font-body text-sm text-muted leading-relaxed space-y-6">
          <p className="text-base text-charcoal font-medium">Sist oppdatert: mars 2026</p>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">1. Om tjenesten</h2>
            <p>Klesbutikk.no er en gratis oversikt over klesbutikker i Norge. Tjenesten gir brukere mulighet til å søke etter klesbutikker basert på by, merke, kategori og fylke. Vi tilbyr også betalte synlighetspakker for butikkeiere.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">2. Bruk av tjenesten</h2>
            <p>Tjenesten er gratis å bruke for forbrukere. Ved å bruke Klesbutikk.no aksepterer du disse vilkårene. Du kan bruke innholdet til personlige formål, men du kan ikke kopiere, gjenskape eller redistribuere vesentlige deler av databasen uten skriftlig samtykke.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">3. Innholdets nøyaktighet</h2>
            <p>Vi bestreber oss på å holde informasjonen oppdatert og korrekt, men kan ikke garantere at all informasjon til enhver tid er nøyaktig. Butikker kan ha endret adresse, åpningstider eller lagt ned virksomheten etter at dataene ble hentet. Vi anbefaler å kontakte butikken direkte for å bekrefte informasjon.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">4. Annonsering og betalte tjenester</h2>
            <p>Butikkeiere kan kjøpe synlighetspakker (Synlig og Premium) for å fremheve butikken sin. Priser og pakkeinnhold er beskrevet på annonseringssiden. Alle priser er oppgitt eksklusiv merverdiavgift med mindre annet er spesifisert.</p>
            <p className="mt-2">Det er ingen bindingstid. Oppsigelse skjer ved å sende epost til hei@klesbutikk.no, og pakken beholdes ut inneværende faktureringsperiode.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">5. Immaterielle rettigheter</h2>
            <p>Design, kode, tekster og den samlede databasen på Klesbutikk.no er beskyttet av opphavsrett og databasevern. Enkeltstående butikkdata (navn, adresse) er offentlig informasjon, men den kuraterte samlingen, kategoriseringen og presentasjonen er vår eiendom.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">6. Ansvarsbegrensning</h2>
            <p>Klesbutikk.no tilbys «som den er» uten garantier av noe slag. Vi er ikke ansvarlige for tap eller skade som følge av bruk av tjenesten, inkludert men ikke begrenset til feil i butikkinformasjon, utilgjengelighet av tjenesten, eller handlinger basert på informasjon funnet på nettstedet.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">7. Lenker til tredjeparter</h2>
            <p>Nettstedet kan inneholde lenker til butikkers nettsider og nettbutikker. Vi er ikke ansvarlige for innholdet eller personvernet på eksterne nettsteder.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">8. Endringer i vilkårene</h2>
            <p>Vi forbeholder oss retten til å oppdatere disse vilkårene. Fortsatt bruk av tjenesten etter endringer utgjør aksept av de oppdaterte vilkårene.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">9. Gjeldende lov</h2>
            <p>Disse vilkårene er underlagt norsk lov. Eventuelle tvister skal forsøkes løst i minnelighet, og dersom dette ikke fører frem, avgjøres tvisten ved norske domstoler.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">10. Kontakt</h2>
            <p>For spørsmål om vilkårene, kontakt oss på hei@klesbutikk.no.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
