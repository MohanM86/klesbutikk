import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Artikler om mote og klesbutikker i Norge',
  description: 'Les artikler om norsk mote, klesbutikker, handleguider og motetrender.',
  path: '/artikler',
});

const ARTICLES = [
  { slug: 'beste-klesbutikker-oslo', title: 'De beste klesbutikkene i Oslo', desc: 'En komplett guide til Oslos beste klesbutikker, fra designerbutikker på Aker Brygge til vintage i Grünerløkka.', date: '2026-01-15', cat: 'Guide' },
  { slug: 'norske-klesmerker', title: 'Norske klesmerker du bør kjenne til', desc: 'Fra Holzweiler til Devold. En oversikt over de viktigste norske klesmerkene og hvor du kan kjøpe dem.', date: '2026-01-10', cat: 'Merker' },
  { slug: 'barekraftig-mote-norge', title: 'Bærekraftig mote i Norge', desc: 'Vintage, gjenbruk og bærekraftige merker. Slik handler du klær med god samvittighet.', date: '2026-01-08', cat: 'Bærekraft' },
  { slug: 'handle-klaer-pa-nett', title: 'Slik handler du klær på nett trygt', desc: 'Tips og råd for å handle klær på nett fra norske butikker. Størrelsesveiledning og returrettigheter.', date: '2026-01-05', cat: 'Tips' },
  { slug: 'motetrender-2026', title: 'Motetrender 2026: Hva er inn?', desc: 'De viktigste motetrendene for 2026 og hvilke norske butikker som fører dem.', date: '2025-12-28', cat: 'Trender' },
  { slug: 'klesbutikker-bergen', title: 'Klesbutikker i Bergen: En komplett guide', desc: 'Alt du trenger å vite om klesbutikkene i Bergen, fra sentrum til Lagunen.', date: '2025-12-20', cat: 'Guide' },
];

export default function ArtiklerPage() {
  return (
    <>
      <section className="bg-surface-alt">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Artikler' }]} />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 bg-surface text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              {ARTICLES.length} artikler
            </div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Artikler</h1>
            <p className="font-body text-base text-muted max-w-lg">Les om norsk mote, handleguider, bærekraftig mote og de beste klesbutikkene i Norge.</p>
          </div>
        </div>
      </section>
      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.map((a, i) => (
              <Link key={a.slug} href={`/artikkel/${a.slug}`}
                className={`group rounded-lg p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                  i === 0 ? 'bg-charcoal text-white md:col-span-2 lg:col-span-1' : 'bg-cream border border-border hover:border-accent'
                }`}>
                <div className={`inline-flex font-body text-[11px] font-bold px-2.5 py-1 rounded-lg mb-4 ${
                  i === 0 ? 'bg-accent text-white' : 'bg-accent-light text-accent'
                }`}>{a.cat}</div>
                <h2 className={`font-body text-base font-extrabold mb-2 transition-colors ${
                  i === 0 ? 'text-white' : 'text-charcoal group-hover:text-accent'
                }`}>{a.title}</h2>
                <p className={`font-body text-sm leading-relaxed mb-3 ${i === 0 ? 'text-white/60' : 'text-muted'}`}>{a.desc}</p>
                <span className={`font-body text-xs ${i === 0 ? 'text-white/30' : 'text-muted/50'}`}>{new Date(a.date).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
