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
  { question: 'Hva er inkludert i gratispakken?', answer: 'Alle klesbutikker registrert med offisielle registerdata i offisielle registre er automatisk listet på Klesbutikk.no helt gratis. Oppføringen inkluderer butikknavn, adresse, postnummer og kommune.' },
  { question: 'Hva får jeg med Synlig?', answer: 'Med Synlig kan du legge til logo, kort beskrivelse og åpningstider på butikkprofilen din. I tillegg blir butikken din synlig på relevante merkesider og kategorisider, slik at flere finner deg.' },
  { question: 'Hva er fordelen med Premium?', answer: 'Premium gir deg alt i Synlig, pluss fremhevet badge, prioritert plassering øverst i byen, plass på forsiden, synlighet i nærliggende byer, lenke til nettbutikk, en Google-optimalisert butikkside med unik SEO-tekst, manuell kobling til alle merkene du fører, og en egen artikkelside om butikken din.' },
  { question: 'Kan jeg bytte pakke underveis?', answer: 'Ja, du kan oppgradere eller nedgradere når som helst. Endringen trer i kraft ved neste faktureringsperiode.' },
  { question: 'Er det bindingstid?', answer: 'Nei, ingen bindingstid. Du kan si opp når som helst og beholder pakken ut inneværende måned.' },
  { question: 'Hvordan betaler jeg?', answer: 'Vi sender faktura månedlig via epost. Du kan betale med bankoverføring eller kort.' },
  { question: 'Hvordan kommer jeg i gang?', answer: 'Send oss en epost på hei@klesbutikk.no med butikknavnet ditt og hvilken pakke du ønsker. Vi ordner alt innen 24 timer.' },
];

const CHECK = (
  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

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
                  {CHECK}
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
                {['Grunnleggende oppføring', 'Synlig i byoversikten', 'Adresse og kontaktinfo', 'Organisasjonsnummer', 'Automatisk registrert'].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">{CHECK}<span className="font-body text-sm text-muted">{f}</span></li>
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
                <li className="flex items-start gap-2.5">{CHECK}<span className="font-body text-sm font-bold text-charcoal">Alt i Gratis, pluss:</span></li>
                {['Logo på butikkprofilen', 'Kort beskrivelse av butikken', 'Åpningstider på butikksiden', 'Synlig på relevante merkesider', 'Synlig på kategorisider'].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">{CHECK}<span className="font-body text-sm text-charcoal">{f}</span></li>
                ))}
              </ul>
              <a href="mailto:hei@klesbutikk.no?subject=Bestill%20Synlig-pakken%20-%20Klesbutikk.no&body=Hei!%0A%0AJeg%20ønsker%20Synlig-pakken%20for%20min%20butikk.%0A%0AButikknavn:%0ABy:%0A%0AMvh"
                className="btn-primary w-full justify-center text-base py-4">Kom i gang</a>
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
                <li className="flex items-start gap-2.5">{CHECK}<span className="font-body text-sm font-bold text-white">Alt i Synlig, pluss:</span></li>
                {[
                  'Fremhevet badge på oppføringen',
                  'Prioritert plassering øverst i byen',
                  'Fremhevet på forsiden i «Populære butikker»',
                  'Synlig i nærliggende byer',
                  'Lenke til nettbutikk',
                  'Listet på nettbutikksiden',
                  'Google-optimalisert butikkside med unik SEO-tekst',
                  'Manuell merkekobling til alle merker du fører',
                  'Egen artikkelside om butikken din',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">{CHECK}<span className="font-body text-sm text-white/80">{f}</span></li>
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

      {/* ─── BEFORE / AFTER ───────────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold text-accent mb-1">Se forskjellen</p>
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Gratis vs Premium oppføring</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BEFORE — gratis */}
            <div>
              <p className="font-body text-[10px] font-bold text-muted tracking-wider uppercase mb-3">Gratis oppføring</p>
              <div className="bg-surface border-2 border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center">
                    <span className="font-body text-base font-extrabold text-accent">M</span>
                  </div>
                  <div>
                    <h3 className="font-body text-base font-bold text-charcoal">Motehuset.no AS</h3>
                    <p className="font-body text-xs text-muted">Storgata 12, 0184 Oslo</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <p className="font-body text-xs text-muted">Oslo</p>
                  <p className="font-body text-xs text-muted">Org.nr: 123 456 789</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-body text-[11px] text-muted/50 italic">Ingen logo, beskrivelse, merker eller åpningstider</p>
                </div>
              </div>
            </div>

            {/* AFTER — premium */}
            <div>
              <p className="font-body text-[10px] font-bold text-accent tracking-wider uppercase mb-3">Premium oppføring</p>
              <div className="bg-white border-2 border-accent rounded-2xl p-6 shadow-lg shadow-accent/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl bg-charcoal flex items-center justify-center">
                    <span className="font-body text-base font-extrabold text-white">M</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-body text-base font-bold text-charcoal">Motehuset.no AS</h3>
                      <span className="font-body text-[9px] font-bold bg-accent text-white px-2 py-0.5 rounded-md">Anbefalt</span>
                    </div>
                    <p className="font-body text-xs text-muted">Storgata 12, Oslo</p>
                  </div>
                </div>
                <p className="font-body text-xs text-slate leading-relaxed mb-3">
                  Oslos mest spennende motebutikk med et håndplukket utvalg av norske og internasjonale designermerker. Vi har klær for deg som setter pris på kvalitet og unik stil.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Holzweiler', 'Filippa K', 'Ganni', 'Stine Goya', 'BY TIMO'].map((m) => (
                    <span key={m} className="font-body text-[10px] font-medium bg-surface text-muted px-2 py-0.5 rounded-md">{m}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-xs text-muted mb-4">
                  <span>Man-fre 10-19</span>
                  <span>Lør 10-17</span>
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 inline-flex items-center justify-center gap-1.5 bg-accent text-white font-body text-xs font-bold py-2.5 rounded-xl">
                    Besøk nettbutikk
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  </span>
                  <span className="inline-flex items-center justify-center px-4 py-2.5 border-2 border-border text-muted font-body text-xs font-bold rounded-xl">Detaljer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE COMPARISON ───────────────────────────── */}
      <section className="bg-white border-t border-border">
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
              { f: 'Åpningstider', g: false, s: true, p: true },
              { f: 'Synlig på merkesider', g: false, s: true, p: true },
              { f: 'Synlig på kategorisider', g: false, s: true, p: true },
              { f: 'Fremhevet badge', g: false, s: false, p: true },
              { f: 'Prioritert plassering i byen', g: false, s: false, p: true },
              { f: 'Fremhevet på forsiden', g: false, s: false, p: true },
              { f: 'Synlig i nærliggende byer', g: false, s: false, p: true },
              { f: 'Lenke til nettbutikk', g: false, s: false, p: true },
              { f: 'Listet på nettbutikksiden', g: false, s: false, p: true },
              { f: 'Google-optimalisert SEO-tekst', g: false, s: false, p: true },
              { f: 'Manuell merkekobling', g: false, s: false, p: true },
              { f: 'Egen artikkelside', g: false, s: false, p: true },
            ].map((row, i) => (
              <div key={row.f} className={`grid grid-cols-4 gap-0 ${i % 2 === 0 ? 'bg-white' : 'bg-surface/50'} border-b border-border last:border-b-0`}>
                <div className="p-4 font-body text-sm text-charcoal">{row.f}</div>
                {[row.g, row.s, row.p].map((val, j) => (
                  <div key={j} className="p-4 flex justify-center">
                    {val ? CHECK : <span className="w-5 h-5 flex items-center justify-center text-border-dark">—</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TILLEGG A LA CARTE ───────────────────────────── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold text-accent mb-1">Tillegg</p>
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Ekstra synlighet du kan legge til</h2>
            <p className="font-body text-sm text-muted mt-2">Kan kombineres med alle pakker</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Ekstra artikkel',
                desc: 'Vi skriver en artikkel om butikken din som publiseres på Klesbutikk.no. God for SEO og synlighet.',
                price: '1 490 kr',
                period: 'engang',
                img: '/icons/dokument.png',
              },
              {
                title: 'Ekstra by',
                desc: 'Bli synlig i en ekstra by utover din egen. Perfekt for butikker som tiltrekker kunder fra nabobyer.',
                price: '490 kr',
                period: '/mnd',
                img: '/icons/lokasjon.png',
              },
              {
                title: 'Merkeside-sponsing',
                desc: 'Stå øverst på en merkeside du fører. Kunder som søker etter merket ser din butikk først.',
                price: '790 kr',
                period: '/mnd',
                img: '/icons/prislapp.png',
              },
            ].map((addon) => (
              <div key={addon.title} className="bg-white border-2 border-border rounded-2xl p-6 hover:border-accent hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center p-2">
                    <img src={addon.img} alt={addon.title} className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-body text-base font-bold text-charcoal">{addon.title}</h3>
                  </div>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed mb-4">{addon.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-body text-2xl font-extrabold text-charcoal">{addon.price}</span>
                  <span className="font-body text-sm text-muted">{addon.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="bg-white border-t border-border">
        <div className="max-w-5xl mx-auto section-padding py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold text-accent mb-1">Tall som teller</p>
            <h2 className="font-body text-display-sm font-extrabold text-charcoal">Derfor velger butikker oss</h2>
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
