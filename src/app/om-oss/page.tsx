import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { createMetadata } from '@/lib/seo';
import { getStats } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Om oss – Klesbutikk.no',
  description: 'Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Lær mer om plattformen og hvordan du kan bidra.',
  path: '/om-oss',
});

export default function AboutPage() {
  const stats = getStats();

  return (
    <div className="max-w-3xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Om oss' }]} />

      <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-6">
        Om Klesbutikk.no
      </h1>

      <div className="space-y-6 font-body text-muted leading-relaxed mb-12">
        <p>
          Klesbutikk.no er Norges mest komplette oversikt over klesbutikker. Vi har samlet
          alle {stats.totalStores.toLocaleString('nb-NO')} registrerte klesbutikker fra
          Brønnøysundregistrene og gjort dem tilgjengelige i en brukervennlig plattform.
        </p>
        <p>
          Målet vårt er å gjøre det enkelt å finne klesbutikker i hele Norge – enten du er
          på jakt etter en lokal favoritt, en designerbutikk, eller bare vil utforske
          motetilbudet i en ny by.
        </p>
        <p>
          Alle data er hentet fra Brønnøysundregistrene med næringskode 47.710 – Detaljhandel
          med klær. Vi oppdaterer jevnlig for å sikre at informasjonen er korrekt og komplett.
        </p>

        <h2 className="font-display text-xl font-semibold text-charcoal pt-4">
          For butikkeiere
        </h2>
        <p>
          Driver du en klesbutikk? Du er mest sannsynlig allerede listet hos oss. Du kan krev
          din oppføring for å oppdatere informasjon, legge til beskrivelse, og velge en
          fremhevet plassering for økt synlighet.
        </p>

        <h2 className="font-display text-xl font-semibold text-charcoal pt-4">
          Kontakt oss
        </h2>
        <p>
          Har du spørsmål, tilbakemeldinger eller ønsker å annonsere?
          Ta kontakt på{' '}
          <a href="mailto:hei@klesbutikk.no" className="text-charcoal underline hover:no-underline">
            hei@klesbutikk.no
          </a>
        </p>
      </div>

      <CTASection />
    </div>
  );
}
