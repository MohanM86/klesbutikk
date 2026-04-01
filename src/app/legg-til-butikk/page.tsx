import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Legg til butikk – Bli synlig på Klesbutikk.no',
  description: 'Legg til klesbutikken din på Klesbutikk.no og bli synlig for tusenvis av kunder.',
  path: '/legg-til-butikk',
});

export default function LeggTilButikkPage() {
  return (
    <>
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Legg til butikk' }]} />
          <div className="mt-4 max-w-2xl">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Legg til butikken din</h1>
            <p className="font-body text-base text-muted">Er du butikkeier? Slik kommer du i gang med Klesbutikk.no.</p>
          </div>
        </div>
      </section>
      <section className="bg-cream border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-10 md:py-14">
          <div className="space-y-6">
            {[
              { n: '1', title: 'Sjekk om butikken din allerede er listet', desc: 'Alle klesbutikker i Norge er allerede på Klesbutikk.no helt gratis. Søk etter butikknavnet ditt i søkefeltet på forsiden for å se oppføringen din.' },
              { n: '2', title: 'Oppdater informasjonen', desc: 'Stemmer ikke adressen, telefonnummeret eller andre opplysninger? Send oss en epost på hei@klesbutikk.no, så ordner vi det.' },
              { n: '3', title: 'Kontakt oss', desc: 'Har du andre sporsmal eller onsker om tilleggstjenester? Ta kontakt pa hei@klesbutikk.no, sa hjelper vi deg.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-5">
                <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-lg">{step.n}</span>
                </div>
                <div>
                  <h2 className="font-body text-base font-bold text-charcoal mb-1">{step.title}</h2>
                  <p className="font-body text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a href="mailto:hei@klesbutikk.no" className="btn-primary">Send oss en epost</a>
          </div>
        </div>
      </section>
    </>
  );
}
