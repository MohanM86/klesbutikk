import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ title: 'Vilkår', description: 'Vilkår for bruk av Klesbutikk.no.', path: '/vilkar' });

export default function VilkarPage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Vilkår' }]} />
          <div className="mt-4"><h1 className="font-body text-hero-sm md:text-display font-extrabold text-white">Brukervilkår</h1></div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto section-padding font-body text-[14px] text-slate leading-relaxed space-y-4">
          <p>Ved å bruke Klesbutikk.no aksepterer du disse vilkårene. Klesbutikk.no er en informasjonstjeneste som drives av <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-accent font-semibold hover:underline">IT-Firma.no</a>.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Tjenestens innhold</h2>
          <p>Klesbutikk.no gir oversikt over klesbutikker i Norge basert på offentlige data fra Brønnøysundregistrene. Vi garanterer ikke at all informasjon er oppdatert til enhver tid.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Butikkoppføringer</h2>
          <p>Grunnleggende oppføringer opprettes automatisk basert på offentlige data. Butikkeiere kan ta kontakt for å oppdatere eller fjerne sin oppføring.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Kontakt</h2>
          <p>For spørsmål om vilkår, kontakt <a href="mailto:hei@klesbutikk.no" className="text-accent font-semibold hover:underline">hei@klesbutikk.no</a>.</p>
        </div>
      </section>
    </>
  );
}
