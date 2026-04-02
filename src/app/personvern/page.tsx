import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ title: 'Personvern', description: 'Personvernerklæring for Klesbutikk.no.', path: '/personvern' });

export default function PersonvernPage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Personvern' }]} />
          <div className="mt-4"><h1 className="font-body text-hero-sm md:text-display font-extrabold text-white">Personvernerklæring</h1></div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto section-padding font-body text-[14px] text-slate leading-relaxed space-y-4">
          <p>Klesbutikk.no tar personvern på alvor. Denne siden forklarer hvordan vi behandler data.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Data vi samler inn</h2>
          <p>Vi bruker Google Analytics 4 for å forstå hvordan nettsiden brukes. Dette inkluderer anonymisert informasjon om sidevisninger, enhetstype og geografisk område. Vi lagrer ingen personopplysninger direkte.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Butikkdata</h2>
          <p>Alle butikkdata som vises på Klesbutikk.no er hentet fra Brønnøysundregistrene, som er offentlig tilgjengelig informasjon. Vi publiserer kun informasjon som allerede er offentlig.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Dine rettigheter</h2>
          <p>I henhold til personopplysningsloven og GDPR har du rett til innsyn, retting og sletting. Kontakt oss på <a href="mailto:hei@klesbutikk.no" className="text-accent font-semibold hover:underline">hei@klesbutikk.no</a>.</p>
          <h2 className="font-body text-lg font-bold text-black pt-4">Behandlingsansvarlig</h2>
          <p>IT-Firma.no er behandlingsansvarlig for Klesbutikk.no.</p>
        </div>
      </section>
    </>
  );
}
