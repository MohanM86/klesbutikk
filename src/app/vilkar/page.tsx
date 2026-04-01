import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Vilkår for bruk',
  description: 'Les vilkårene for bruk av Klesbutikk.no, Norges mest komplette oversikt over klesbutikker.',
  path: '/vilkar',
});

export default function VilkarPage() {
  return (
    <>
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Vilkår' }]} />
          <div className="mt-4 max-w-2xl">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Vilkår for bruk</h1>
            <p className="font-body text-base text-muted">Sist oppdatert: mars 2026</p>
          </div>
        </div>
      </section>
      <section className="bg-cream border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-10 md:py-14">
          <div className="font-body text-sm text-muted leading-relaxed space-y-6">

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">1. Generelt</h2>
              <p>Ved å bruke Klesbutikk.no aksepterer du disse vilkårene. Klesbutikk.no er en informasjonstjeneste som drives av <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-accent hover:underline">IT-Firma</a>. Tjenesten gir oversikt over klesbutikker i Norge og verifiserte data.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">2. Innhold og nøyaktighet</h2>
              <p>Vi tilstreber at all informasjon på Klesbutikk.no er korrekt og oppdatert. Vi tilstreber at all informasjon er korrekt, men vi kan likevel ikke garantere at all informasjon til enhver tid er fullstendig eller korrekt. Brukere oppfordres til å verifisere informasjon direkte med butikkene.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">3. Butikkoppføringer</h2>
              <p>Alle registrerte klesbutikker i Norge får en gratis oppføring på Klesbutikk.no. Butikkeiere kan når som helst kontakte oss for å oppdatere, forbedre eller fjerne sin oppføring. </p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">4. Opphavsrett</h2>
              <p>Alt innhold på Klesbutikk.no, inkludert tekst, design, logoer og kode, er beskyttet av opphavsrett. Innholdet kan ikke kopieres, distribueres eller brukes kommersielt uten skriftlig tillatelse. Butikkdata som stammer fra offentlige registre er underlagt de respektive registrenes vilkår.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">5. Lenker til eksterne nettsteder</h2>
              <p>Klesbutikk.no kan inneholde lenker til eksterne nettsteder. Vi har ikke kontroll over innholdet på disse sidene og er ikke ansvarlige for deres innhold eller personvernpraksis.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">6. Ansvarsbegrensning</h2>
              <p>Klesbutikk.no tilbys «som den er» uten noen form for garanti. Vi er ikke ansvarlige for eventuelle feil, mangler eller tap som kan oppstå som følge av bruk av tjenesten. Dette gjelder også informasjon om butikker, priser, åpningstider og tilgjengelighet.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">7. Endringer</h2>
              <p>Vi forbeholder oss retten til å endre disse vilkårene når som helst. Vesentlige endringer vil bli varslet på nettsiden. Fortsatt bruk av tjenesten etter endringer innebærer aksept av de oppdaterte vilkårene.</p>
            </div>

            <div>
              <h2 className="font-body text-lg font-bold text-charcoal mb-2">8. Kontakt</h2>
              <p>Spørsmål om vilkårene kan rettes til: kontakt@klesbutikk.no</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
