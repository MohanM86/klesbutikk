import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Annonsering – Bli synlig på Klesbutikk.no',
  description: 'Nå tusenvis av kunder som leter etter klesbutikker. Se våre priser for fremhevet oppføring.',
  path: '/annonser',
});

export default function AnnonserPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-accent-light/50 to-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Annonsering' }]} />
          <div className="mt-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">For butikkeiere</div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Bli synlig for tusenvis av kunder</h1>
            <p className="font-body text-base text-muted">Klesbutikk.no er der folk søker når de leter etter klesbutikker. Få din butikk fremhevet og bli synlig i din by.</p>
          </div>
        </div>
      </section>
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-surface border-2 border-border rounded-2xl p-8">
              <div className="font-body text-xs font-bold text-muted mb-4">Gratis</div>
              <div className="font-body text-4xl font-extrabold text-charcoal mb-1">0 kr</div>
              <div className="font-body text-sm text-muted mb-6">For alltid</div>
              <ul className="space-y-3 mb-8">
                {['Grunnleggende oppføring', 'Synlig i byoversikten', 'Adresse og kontaktinfo', 'Automatisk fra Brønnøysund'].map((f) => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-muted">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/legg-til-butikk" className="btn-outline w-full justify-center">Allerede inkludert</Link>
            </div>
            <div className="bg-accent text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent-hover/30 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="inline-flex font-body text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full mb-4">Anbefalt</div>
                <div className="font-body text-4xl font-extrabold text-white mb-1">990 kr</div>
                <div className="font-body text-sm text-white/70 mb-6">Per måned</div>
                <ul className="space-y-3 mb-8">
                  {['Alt i gratis, pluss:', 'Fremhevet plassering øverst', 'Synlig i alle relevante sider', 'Merke og kategorisider', 'Fremhevet badge', 'Prioritert i søkeresultater'].map((f, i) => (
                    <li key={f} className={`flex items-center gap-2 font-body text-sm ${i === 0 ? 'text-white/50' : 'text-white/90'}`}>
                      {i > 0 && <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>}
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="mailto:hei@klesbutikk.no" className="inline-flex items-center justify-center w-full px-8 py-4 bg-white text-accent font-body font-bold text-sm rounded-xl hover:bg-white/90 transition-all shadow-lg">
                  Kontakt oss
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
