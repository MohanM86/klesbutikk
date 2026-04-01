import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import WebshopSearch from '@/components/WebshopSearch';
import CTASection from '@/components/CTASection';
import { getStoresWithWebsite, getAllBrands } from '@/lib/stores';
import { createMetadata, faqSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Norske nettbutikker for klær – Kjøp klær på nett',
  description: 'Komplett oversikt over norske klesbutikker med nettbutikk. Handle klær på nett fra over 150 norske butikker med fri frakt og retur.',
  path: '/nettbutikker',
});

const FAQS = [
  { question: 'Hvor mange norske klesbutikker har nettbutikk?', answer: 'Vi har registrert over 150 norske klesbutikker som tilbyr netthandel. De fleste tilbyr fri frakt over et visst beløp og enkel retur.' },
  { question: 'Er det trygt å handle klær på nett fra norske butikker?', answer: 'Ja. Norske nettbutikker er regulert av forbrukerkjøpsloven og angrerettloven. Du har 14 dagers angrerett på alle nettkjøp, og butikkene er pålagt å gi tydelig informasjon om priser, frakt og retur.' },
  { question: 'Hvilke klesmerker kan jeg kjøpe på nett?', answer: 'De fleste populære merker er tilgjengelige via norske nettbutikker, inkludert Holzweiler, Filippa K, Ganni, Nike og mange flere. Bruk filteret over for å finne butikker som fører ditt favorittmerke.' },
  { question: 'Tilbyr norske nettbutikker fri frakt?', answer: 'Mange norske klesbutikker tilbyr fri frakt over et visst beløp, typisk 500 til 1 000 kr. Sjekk den enkelte butikkens nettside for fraktvilkår.' },
  { question: 'Kan jeg returnere klær kjøpt på nett?', answer: 'Ja, du har alltid 14 dagers angrerett ved nettkjøp i Norge. Mange butikker tilbyr også utvidet returrett på 30 til 60 dager og gratis retur.' },
  { question: 'Hvordan finner jeg de beste tilbudene?', answer: 'Følg med på nettbutikkene vi har listet her. Mange kjører kampanjer og sesongssalg. Vi anbefaler å melde seg på nyhetsbrev fra favorittbutikkene dine for å få tidlig tilgang til salg.' },
];

export default function NettbutikkerPage() {
  const webshops = getStoresWithWebsite();
  const allBrands = getAllBrands();

  // Get unique cities and fylker from webshops
  const cities = Array.from(new Set(webshops.map((s) => s.poststed))).sort();
  const fylker = Array.from(new Set(webshops.map((s) => s.fylke))).sort();

  // Find brands that have webshop stores
  const webshopBrands = allBrands.filter((b) =>
    webshops.some((s) => b.stores.includes(s.organisasjonsnummer) || s.merker?.some((m) => m === b.name))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-0 md:pt-10">
          <Breadcrumbs items={[{ label: 'Nettbutikker' }]} />

          <div className="flex items-end justify-between mt-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-surface text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                </svg>
                {webshops.length} nettbutikker
              </div>
              <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">
                Norske nettbutikker for klær
              </h1>
              <p className="font-body text-base text-muted max-w-lg">
                Handle klær på nett fra {webshops.length} norske klesbutikker. Alle har fysisk butikk i Norge og nettbutikk med levering hjem til deg.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-right">
              <div>
                <span className="font-body text-3xl font-extrabold text-accent">{webshops.length}</span>
                <span className="block font-body text-xs text-muted">Nettbutikker</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{cities.length}</span>
                <span className="block font-body text-xs text-muted">Byer</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="font-body text-3xl font-extrabold text-charcoal">{fylker.length}</span>
                <span className="block font-body text-xs text-muted">Fylker</span>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-10">
            {[
              { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622', label: 'Norske butikker' },
              { icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124', label: 'Levering i hele Norge' },
              { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7', label: '14 dagers angrerett' },
              { icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z', label: 'Trygg betaling' },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} />
                </svg>
                <span className="font-body text-xs font-medium text-slate">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEARCH + GRID ───────────────────────────────── */}
      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <WebshopSearch stores={webshops} />
        </div>
      </section>

      {/* ─── FOR BUTIKKEIERE ──────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="max-w-3xl mx-auto">
            <CTASection
              title="Har du nettbutikk?"
              description="Få din nettbutikk fremhevet på Klesbutikk.no og nå kunder som aktivt leter etter å handle klær på nett. Vi sender trafikk rett til din nettbutikk."
              primaryCta="Se annonsepriser"
              primaryHref="/legg-til-butikk"
              secondaryCta="Kontakt oss"
              secondaryHref="mailto:hei@klesbutikk.no"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="bg-cream border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-14 md:py-20">
          <div className="mb-8">
            <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.08em] mb-3">Vanlige spørsmål</p>
            <h2 className="font-body text-display-sm md:text-display font-extrabold text-charcoal">Netthandel av klær i Norge</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <details key={i} className="border border-border rounded-xl overflow-hidden group" open={i === 0}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-body text-sm font-bold text-charcoal hover:text-accent transition-colors list-none">
                  {faq.question}
                  <svg className="w-5 h-5 text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 font-body text-sm text-muted leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO TEXT ─────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-body text-lg font-extrabold text-charcoal mb-3">Handle klær på nett fra norske butikker</h2>
            <div className="font-body text-sm text-muted leading-relaxed space-y-2">
              <p>
                Stadig flere nordmenn handler klær på nett, men det kan være vanskelig å få oversikt over
                hvilke norske klesbutikker som tilbyr netthandel. På denne siden har vi samlet alle
                {webshops.length} klesbutikker i vår database som har nettbutikk.
              </p>
              <p>
                Alle butikkene som er listet her er registrerte norske foretak med fysisk butikk i Norge.
                Det betyr at du handler trygt med norsk forbrukervern, 14 dagers angrerett og enkel
                retur. Mange tilbyr også fri frakt over et visst beløp.
              </p>
              <p>
                Du kan filtrere etter by for å finne nettbutikker i ditt nærområde, eller etter fylke for
                å se det regionale tilbudet. Vi oppdaterer informasjonen jevnlig.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
