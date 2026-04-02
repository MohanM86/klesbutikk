import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Personvernerklæring',
  description: 'Les om hvordan Klesbutikk.no behandler dine personopplysninger og ivaretar ditt personvern.',
  path: '/personvern',
});

export default function PersonvernPage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Personvern' }]} />
          <div className="mt-4 max-w-2xl">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-2">Personvernerklæring</h1>
            <p className="font-body text-base text-white/60">Sist oppdatert: mars 2026</p>
          </div>
        </div>
      </section>
      <section className="bg-cream border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-10 md:py-14">
          <div className="font-body text-sm text-muted leading-relaxed space-y-6">

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">1. Hvem er vi</h2>
              <p>Klesbutikk.no er en informasjonstjeneste som samler og presenterer verifisert informasjon om klesbutikker i Norge. Tjenesten drives av <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-accent hover:underline">IT-Firma</a>.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">2. Hvilke opplysninger vi samler inn</h2>
              <p>Vi samler inn minimal informasjon om våre besøkende:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Analysedata:</strong> Vi bruker Google Analytics 4 for å forstå hvordan nettsiden brukes. Dette inkluderer anonymisert informasjon om sidevisninger, enhetstype og geografisk område.</li>
                <li><strong>Teknisk informasjon:</strong> Standarddata som nettleseren din sender automatisk (IP-adresse, nettlesertype, operativsystem).</li>
                <li><strong>Kontaktinformasjon:</strong> Kun dersom du frivillig sender oss en henvendelse via kontaktskjema eller epost.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">3. Informasjonskapsler (cookies)</h2>
              <p>Vi bruker informasjonskapsler for å forbedre brukeropplevelsen og samle anonym statistikk. Du kan når som helst endre innstillingene for informasjonskapsler i nettleseren din.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">4. Butikkdata</h2>
              <p>Informasjonen om klesbutikker som vises på Klesbutikk.no er hentet fra verifiserte kilder og kvalitetssikret av vårt team. Butikkeiere kan kontakte oss for å oppdatere eller fjerne sin oppføring.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">5. Dine rettigheter</h2>
              <p>I henhold til personopplysningsloven og GDPR har du rett til å:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Be om innsyn i personopplysninger vi har lagret om deg</li>
                <li>Be om retting eller sletting av dine opplysninger</li>
                <li>Protestere mot behandling av dine opplysninger</li>
                <li>Be om begrensning av behandlingen</li>
                <li>Klage til Datatilsynet dersom du mener vi bryter regelverket</li>
              </ul>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">6. Tredjeparter</h2>
              <p>Vi deler ikke personopplysninger med tredjeparter utover det som er nødvendig for drift av tjenesten (f.eks. hosting via Vercel og analyser via Google Analytics).</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">7. Kontakt</h2>
              <p>Har du spørsmål om personvern kan du kontakte oss via epost: kontakt@klesbutikk.no</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
