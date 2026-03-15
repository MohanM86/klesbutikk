import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import { createMetadata } from '@/lib/seo';
import { getStats } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Annonsering – Bli synlig på Klesbutikk.no',
  description: 'Nå tusenvis av kunder som aktivt leter etter klesbutikker. Tre pakker tilpasset din butikk.',
  path: '/annonser',
});

const FAQS = [
  { question: 'Hva er inkludert i gratispakken?', answer: 'Alle klesbutikker registrert med næringskode 47.710 i Brønnøysundregistrene er automatisk listet på Klesbutikk.no helt gratis. Oppføringen inkluderer butikknavn, adresse, postnummer og kommune.' },
  { question: 'Hva får jeg med Synlig?', answer: 'Med Synlig kan du legge til logo, kort beskrivelse og åpningstider på butikkprofilen din. I tillegg blir butikken din synlig på relevante merkesider og kategorisider, slik at flere finner deg.' },
  { question: 'Hva er fordelen med Premium?', answer: 'Premium gir deg alt i Synlig, pluss fremhevet badge, prioritert plassering øverst i din by, lenke til nettbutikkog en egen artikkelside om butikken din.' },
  { question: 'Kan jeg bytte pakke underveis?', answer: 'Ja, du kan oppgradere eller nedgradere når som helst. Endringen trer i kraft ved neste faktureringsperiode.' },
  { question: 'Er det bindingstid?', answer: 'Nei, ingen bindingstid. Du kan si opp når som helst og beholder pakken ut inneværende måned.' },
  { question: 'Hvordan betaler jeg?', answer: 'Vi sender faktura månedlig via epost. Du kan betale med bankoverføring eller kort.' },
  { question: 'Hvordan kommer jeg i gang?', answer: 'Send oss en epost på hei@klesbutikk.no med butikknavnet ditt og hvilken pakke du ønsker. Vi ordner alt innen 24 timer.' },
];

export default function AnnonserPage() {
  const stats = getStats();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-accent-light/50 to-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Annonsering' }]} />
          <div className="mt-4 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-4">
              For butikkeiere
            </div>
            <h1 className="font-body text-hero-sm md:text-hero font-extrabold text-charcoal mb-3">
              Bli synlig for tusenvis<br />av kunder
            </h1>
            <p className="font-body text-base md:text-lg text-muted max-w-lg mx-auto mb-6">
              Over {stats.totalStores.toLocaleString('nb-NO')} butikker er listet på Klesbutikk.no.
              Velg pakken som passer din butikk og nå kundene som leter etter klær i din by.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {['Ingen bindingstid', 'Enkel månedlig fakturering', 'Opp og kjøre innen 24 timer'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="font-body text-xs font-medium text-slate">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING CARDS ────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-5xl mx-auto section-padding py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* GRATIS */}
            <div className="bg-surface border-2 border-border rounded-2xl p-7 flex flex-col">
              <div className="mb-6">
                <p className="font-body text-xs font-bold text-muted mb-2">Gratis</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-body text-4xl font-extrabold text-charcoal">0 kr</span>
                </div>
                <p className="font-body text-sm text-muted mt-1">For alltid, automatisk</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Grunnleggende oppføring',
                  'Synlig i byoversikten',
                  'Adresse og kontaktinfo',
                  'Organisasjonsnummer',
                  'Automatisk fra Brønnøysund',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="font-body text-sm text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="font-body text-xs font-bold text-center text-muted bg-white border-2 border-border rounded-xl py-3.5">
                Allerede inkludert
              </div>
            </div>

            {/* SYNLIG */}
            <div className="bg-white border-2 border-accent rounded-2xl p-7 flex flex-col relative shadow-xl shadow-accent/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="font-body text-[11px] font-bold bg-accent text-white px-4 py-1.5 rounded-full shadow-lg">Mest populær</span>
              </div>
              <div className="mb-6">
                <p className="font-body text-xs font-bold text-accent mb-2">Synlig</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-body text-4xl font-extrabold text-charcoal">990 kr</span>
                  <span className="font-body text-sm text-muted">/mnd</span>
                </div>
                <p className="font-body text-sm text-muted mt-1">Ingen bindingstid</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                  <span className="font-body text-sm font-bold text-charcoal">Alt i Gratis, pluss:</span>
                </li>
                {[
                  'Logo på butikkprofilen',
                  'Kort beskrivelse av butikken',
                  'Synlig på relevante merkesider',
                  'Synlig på kategorisider',
                  'Åpningstider på butikksiden',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="font-body text-sm text-charcoal">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:hei@klesbutikk.no?subject=Bestill%20Synlig-pakken%20-%20Klesbutikk.no&body=Hei!%0A%0AJeg%20ønsker%20Synlig-pakken%20for%20min%20butikk.%0A%0AButikknavn:%0ABy:%0A%0AMvh"
                className="btn-primary w-full justify-center text-base py-4">
                Kom i gang
              </a>
            </div>

            {/* PREMIUM */}
            <div className="bg-charcoal text-white border-2 border-charcoal rounded-2xl p-7 flex flex-col relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
              <div className="relative mb-6">
                <p className="font-body text-xs font-bold text-accent mb-2">Premium</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-body text-4xl font-extrabold text-white">2 490 kr</span>
                  <span className="font-body text-sm text-white/50">/mnd</span>
                </div>
                <p className="font-body text-sm text-white/50 mt-1">For butikker som vil ha alt</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1 relative">
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                  <span className="font-body text-sm font-bold text-white">Alt i Synlig, pluss:</span>
                </li>
                {[
                  'Fremhevet badge på oppføringen',
                  'Prioritert plassering øverst i byen',
                  'Lenke til nettbutikk',
                  'Listet på nettbutikksiden',
                  'Egen artikkelside om butikken din',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="font-body text-sm text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:hei@klesbutikk.no?subject=Bestill%20Premium-pakken%20-%20Klesbutikk.no&body=Hei!%0A%0AJeg%20ønsker%20Premium-pakken%20for%20min%20butikk.%0A%0AButikknavn:%0ABy:%0A%0AMvh"
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-accent text-white font-body font-bold text-base rounded-xl hover:bg-accent-hover transition-all">
                Kontakt oss
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE COMPARISON ───────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold text-accent mb-1">Sammenlign pakker</p>
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Alt du trenger å vite</h2>
          </div>
          <div className="bg-white border-2 border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-0 border-b-2 border-border bg-surface">
              <div className="p-4 font-body text-xs font-bold text-muted">Funksjon</div>
              <div className="p-4 font-body text-xs font-bold text-muted text-center">Gratis</div>
              <div className="p-4 font-body text-xs font-bold text-accent text-center">Synlig</div>
              <div className="p-4 font-body text-xs font-bold text-charcoal text-center">Premium</div>
            </div>
            {[
              { f: 'Grunnoppføring med adresse', g: true, s: true, p: true },
              { f: 'Synlig i byoversikten', g: true, s: true, p: true },
              { f: 'Egen butikkside', g: true, s: true, p: true },
              { f: 'Logo på profilen', g: false, s: true, p: true },
              { f: 'Beskrivelse av butikken', g: false, s: true, p: true },
              { f: 'Synlig på merkesider', g: false, s: true, p: true },
              { f: 'Synlig på kategorisider', g: false, s: true, p: true },
              { f: 'Åpningstider', g: false, s: true, p: true },
              { f: 'Fremhevet badge', g: false, s: false, p: true },
              { f: 'Prioritert plassering i byen', g: false, s: false, p: true },
              { f: 'Lenke til nettbutikk', g: false, s: false, p: true },
              { f: 'Listet på nettbutikksiden', g: false, s: false, p: true },
              { f: 'Egen artikkelside', g: false, s: false, p: true },
            ].map((row, i) => (
              <div key={row.f} className={`grid grid-cols-4 gap-0 ${i % 2 === 0 ? 'bg-white' : 'bg-surface/50'} border-b border-border last:border-b-0`}>
                <div className="p-4 font-body text-sm text-charcoal">{row.f}</div>
                {[row.g, row.s, row.p].map((val, j) => (
                  <div key={j} className="p-4 flex justify-center">
                    {val ? (
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-border-dark">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-5xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold text-accent mb-1">Hvorfor Klesbutikk.no</p>
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Tall som teller</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: stats.totalStores.toLocaleString('nb-NO'), label: 'Butikker listet' },
              { val: '7 928', label: 'Unike sider' },
              { val: stats.totalBrands.toString(), label: 'Klesmerker' },
              { val: '357', label: 'Kommuner' },
            ].map((s) => (
              <div key={s.label} className="bg-surface rounded-2xl p-6 text-center">
                <span className="font-body text-3xl font-extrabold text-charcoal">{s.val}</span>
                <span className="block font-body text-sm font-bold text-muted mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-14 md:py-20">
          <FAQAccordion faqs={FAQS} title="Vanlige spørsmål om annonsering" />
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────── */}
      <section className="bg-accent">
        <div className="max-w-3xl mx-auto section-padding py-14 md:py-20 text-center">
          <h2 className="font-body text-display-sm md:text-display font-extrabold text-white mb-4">Klar til å bli synlig?</h2>
          <p className="font-body text-base text-white/70 max-w-md mx-auto mb-8">
            Ingen bindingstid. Send oss en epost, så er butikken din oppgradert innen 24 timer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:hei@klesbutikk.no?subject=Bestill%20annonsepakke%20-%20Klesbutikk.no"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-accent font-body font-bold text-base rounded-xl hover:bg-white/90 transition-all shadow-lg">
              Kom i gang nå
            </a>
            <a href="mailto:hei@klesbutikk.no?subject=Spørsmål%20om%20annonsering"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white font-body font-bold text-base rounded-xl hover:bg-white/10 transition-all">
              Har du spørsmål?
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
