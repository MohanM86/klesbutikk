import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Cookie-policy',
  description: 'Cookie-policy for Klesbutikk.no. Les om hvilke informasjonskapsler vi bruker.',
  path: '/cookies',
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto section-padding pt-6 pb-16 md:pt-10">
        <Breadcrumbs items={[{ label: 'Cookie-policy' }]} />
        <h1 className="font-body text-display-sm md:text-display font-extrabold text-charcoal mt-4 mb-8">Cookie-policy</h1>
        <div className="font-body text-sm text-muted leading-relaxed space-y-6">
          <p className="text-base text-charcoal font-medium">Sist oppdatert: mars 2026</p>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Hva er informasjonskapsler?</h2>
            <p>Informasjonskapsler (cookies) er små tekstfiler som lagres på enheten din når du besøker et nettsted. De brukes for å huske innstillinger, analysere trafikk og forbedre brukeropplevelsen.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Hvilke cookies bruker vi?</h2>

            <div className="mt-4 bg-surface rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-4 gap-0 border-b border-border bg-surface p-4">
                <span className="font-body text-xs font-bold text-charcoal">Cookie</span>
                <span className="font-body text-xs font-bold text-charcoal">Type</span>
                <span className="font-body text-xs font-bold text-charcoal">Formål</span>
                <span className="font-body text-xs font-bold text-charcoal">Varighet</span>
              </div>
              {[
                { name: '_ga', type: 'Analyse', purpose: 'Skiller brukere i Google Analytics', duration: '2 år' },
                { name: '_ga_*', type: 'Analyse', purpose: 'Vedlikeholder sesjonstilstand i GA4', duration: '2 år' },
                { name: 'cookie_consent', type: 'Nødvendig', purpose: 'Lagrer ditt samtykkevalg for cookies', duration: '1 år' },
              ].map((cookie) => (
                <div key={cookie.name} className="grid grid-cols-4 gap-0 border-b border-border last:border-b-0 p-4 bg-white">
                  <code className="font-mono text-xs text-accent">{cookie.name}</code>
                  <span className="font-body text-xs text-muted">{cookie.type}</span>
                  <span className="font-body text-xs text-muted">{cookie.purpose}</span>
                  <span className="font-body text-xs text-muted">{cookie.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Kategorier</h2>
            <p className="mt-2"><span className="font-bold text-charcoal">Nødvendige cookies:</span> Kreves for at nettstedet skal fungere. Disse kan ikke deaktiveres. Inkluderer cookie-samtykke.</p>
            <p className="mt-2"><span className="font-bold text-charcoal">Analysecookies:</span> Hjelper oss å forstå hvordan besøkende bruker nettstedet via Google Analytics 4. IP-adresser anonymiseres. Krever ditt samtykke.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Ditt samtykke</h2>
            <p>Første gang du besøker Klesbutikk.no vises en cookie-banner der du kan akseptere eller avslå analysecookies. Du kan endre ditt valg når som helst via «Cookie-innstillinger» i bunnteksten på nettstedet.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Slik administrerer du cookies</h2>
            <p>Du kan slette eller blokkere cookies via nettleserens innstillinger. Merk at blokkering av nødvendige cookies kan påvirke funksjonaliteten til nettstedet.</p>
            <p className="mt-2">De fleste nettlesere lar deg:</p>
            <p className="mt-1">— Se hvilke cookies som er lagret</p>
            <p>— Slette enkelt-cookies eller alle cookies</p>
            <p>— Blokkere cookies fra spesifikke nettsteder</p>
            <p>— Blokkere tredjepartscookies</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Tredjepartscookies</h2>
            <p>Google Analytics setter cookies på vegne av oss for å analysere trafikk. Google er databehandler og behandler data i henhold til sin personvernpolicy. Vi har aktivert IP-anonymisering og har inngått databehandleravtale med Google.</p>
          </div>

          <div>
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-2">Kontakt</h2>
            <p>For spørsmål om vår bruk av cookies, kontakt oss på hei@klesbutikk.no.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
