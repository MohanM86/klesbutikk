import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ title: 'Om oss', description: 'Klesbutikk.no er Norges mest komplette oversikt over klesbutikker med offentlige data fra Brønnøysundregistrene.', path: '/om-oss' });

export default function OmOssPage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Om oss' }]} />
          <div className="mt-4"><h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-2">Om Klesbutikk.no</h1><p className="font-body text-base text-white/50">Norges mest komplette oversikt over klesbutikker.</p></div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto section-padding font-body text-[14px] text-slate leading-relaxed space-y-4">
          <p>Klesbutikk.no samler alle registrerte klesbutikker i Norge og gjør dem søkbare etter kommune og fylke. Vår database er basert på offentlige data fra Brønnøysundregistrene og oppdateres jevnlig.</p>
          <p>Vi dekker 1 566 klesbutikker fordelt på 357 kommuner og 15 fylker. Alle oppføringer er gratis og viser verifisert informasjon som butikknavn, adresse og organisasjonsnummer.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">For butikkeiere</h2>
          <p>Alle registrerte klesbutikker er oppført automatisk med grunnleggende informasjon. Ønsker du å legge til kontaktinformasjon, åpningstider, beskrivelse eller bilder på din oppføring, ta kontakt med oss på <a href="mailto:hei@klesbutikk.no" className="text-accent font-semibold hover:underline">hei@klesbutikk.no</a>.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Om oss</h2>
          <p>Klesbutikk.no er en tjeneste fra <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-accent font-semibold hover:underline">IT-Firma.no</a>. Vi bygger norske nettsteder som gir verdi gjennom verifiserte data og brukervennlig design.</p>
        </div>
      </section>
    </>
  );
}
