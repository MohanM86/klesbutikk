import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Personvernerklæring',
  description: 'Personvernerklæring for Klesbutikk.no. Les om hvordan vi behandler personopplysninger.',
  path: '/personvern',
  noIndex: true,
});

export default function PersonvernPage() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto section-padding pt-6 pb-16 md:pt-10">
        <Breadcrumbs items={[{ label: 'Personvernerklæring' }]} />
        <h1 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mt-4 mb-8">Personvernerklæring</h1>
        <div className="font-body text-sm text-muted leading-relaxed space-y-6">
          <p className="text-base text-charcoal font-medium">Sist oppdatert: mars 2026</p>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">1. Behandlingsansvarlig</h2>
            <p>Klesbutikk.no er behandlingsansvarlig for personopplysninger som samles inn via nettstedet klesbutikk.no. For spørsmål om personvern, kontakt oss på hei@klesbutikk.no.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">2. Hvilke opplysninger vi samler inn</h2>
            <p>Vi samler inn følgende opplysninger:</p>
            <p className="mt-2"><span className="font-bold text-charcoal">Automatisk innsamlet data:</span> Når du besøker nettstedet samler vi automatisk inn teknisk informasjon som IP-adresse (anonymisert), nettlesertype, operativsystem, besøkte sider, tidspunkt for besøk og henvisende nettsted. Dette skjer via Google Analytics 4 med anonymisert IP.</p>
            <p className="mt-2"><span className="font-bold text-charcoal">Frivillig oppgitt data:</span> Hvis du kontakter oss via epost, lagrer vi epostadressen din og innholdet i meldingen for å kunne svare deg.</p>
            <p className="mt-2"><span className="font-bold text-charcoal">Geolokasjon:</span> Vi bruker nettleserens geolokasjon-API for å vise deg klesbutikker i nærheten. Posisjonsdata sendes kun til vår server for å finne nærmeste by og lagres ikke.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">3. Formålet med behandlingen</h2>
            <p>Vi behandler personopplysninger for å:</p>
            <p className="mt-1">— Forbedre og videreutvikle nettstedet basert på anonymisert bruksstatistikk</p>
            <p>— Vise deg klesbutikker i nærheten basert på din posisjon (kun etter samtykke)</p>
            <p>— Svare på henvendelser du sender oss</p>
            <p>— Sikre teknisk drift og sikkerhet for nettstedet</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">4. Rettslig grunnlag</h2>
            <p>Behandlingen av personopplysninger er basert på:</p>
            <p className="mt-1">— <span className="font-bold text-charcoal">Samtykke</span> (GDPR art. 6(1)(a)): For informasjonskapsler og geolokasjon. Du kan trekke samtykket tilbake når som helst.</p>
            <p>— <span className="font-bold text-charcoal">Berettiget interesse</span> (GDPR art. 6(1)(f)): For anonymisert analyse av trafikk og teknisk drift.</p>
            <p>— <span className="font-bold text-charcoal">Avtale</span> (GDPR art. 6(1)(b)): For å behandle henvendelser fra butikkeiere som ønsker annonsepakker.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">5. Informasjonskapsler (cookies)</h2>
            <p>Vi bruker informasjonskapsler for analyse og funksjonalitet. Se vår <a href="/cookies" className="text-accent hover:text-accent-hover transition-colors font-medium">cookie-policy</a> for fullstendig oversikt over hvilke cookies vi bruker og hvordan du kan administrere dem.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">6. Deling med tredjeparter</h2>
            <p>Vi deler ikke personopplysninger med tredjeparter for markedsføring. Vi bruker følgende tjenesteleverandører som kan behandle data på våre vegne:</p>
            <p className="mt-1">— <span className="font-bold text-charcoal">Google Analytics 4</span>: Anonymisert trafikkanalyse. Data behandles i EU/EØS.</p>
            <p>— <span className="font-bold text-charcoal">Vercel</span>: Hosting av nettstedet. Vercel Inc. er lokalisert i USA og er underlagt EU-US Data Privacy Framework.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">7. Lagring og sletting</h2>
            <p>Anonymisert analysedata lagres i inntil 14 måneder i Google Analytics. Epostkorrespondanse lagres så lenge det er nødvendig for å besvare henvendelsen, og slettes deretter. Vi lagrer ikke posisjonsdata.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">8. Dine rettigheter</h2>
            <p>Du har rett til å:</p>
            <p className="mt-1">— Be om innsyn i personopplysninger vi har om deg</p>
            <p>— Be om retting eller sletting av opplysninger</p>
            <p>— Be om begrensning av behandlingen</p>
            <p>— Protestere mot behandling basert på berettiget interesse</p>
            <p>— Trekke tilbake samtykke for cookies og geolokasjon</p>
            <p>— Klage til Datatilsynet (datatilsynet.no)</p>
            <p className="mt-2">For å utøve dine rettigheter, kontakt oss på hei@klesbutikk.no.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">9. Sikkerhet</h2>
            <p>Vi bruker HTTPS-kryptering på alle sider og følger bransjestandarder for å beskytte data mot uautorisert tilgang.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">10. Endringer</h2>
            <p>Vi kan oppdatere denne personvernerklæringen ved behov. Vesentlige endringer vil bli kommunisert på nettstedet. Sist oppdatert mars 2026.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
