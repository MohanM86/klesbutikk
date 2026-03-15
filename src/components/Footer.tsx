import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-8xl mx-auto section-padding py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <svg className="w-7 h-5 text-accent" viewBox="0 0 28 20" fill="none">
                <path d="M6 13L14 7L22 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="14" cy="7" r="2.5" fill="currentColor" />
              </svg>
              <span className="font-body text-lg font-extrabold text-white">klesbutikk<span className="text-accent">.no</span></span>
            </Link>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs">
              Norges mest komplette oversikt over klesbutikker. Over 1 500 butikker, 480+ merker.
            </p>
          </div>
          {[
            { title: 'Populære byer', links: [
              { l: 'Oslo', h: '/oslo' }, { l: 'Bergen', h: '/bergen' }, { l: 'Trondheim', h: '/trondheim' },
              { l: 'Stavanger', h: '/stavanger' }, { l: 'Kristiansand', h: '/kristiansand' }, { l: 'Alle byer', h: '/by' },
            ]},
            { title: 'Kategorier', links: [
              { l: 'Dameklær', h: '/kategorier' }, { l: 'Herreklær', h: '/kategorier' },
              { l: 'Barneklær', h: '/kategorier' }, { l: 'Designer', h: '/kategorier' },
              { l: 'Vintage', h: '/kategorier' }, { l: 'Sport', h: '/kategorier' },
            ]},
            { title: 'Utforsk', links: [
              { l: 'Alle merker', h: '/merker' }, { l: 'Alle fylker', h: '/fylker' },
              { l: 'Alle butikker', h: '/butikk' }, { l: 'Artikler', h: '/artikler' },
            ]},
            { title: 'For butikker', links: [
              { l: 'Legg til butikk', h: '/legg-til-butikk' },
              { l: 'Annonsering', h: '/annonser' }, { l: 'Om oss', h: '/om-oss' },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-xs font-bold text-white/40 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((n) => (
                  <li key={n.l}><Link href={n.h} className="font-body text-sm text-white/60 hover:text-accent transition-colors">{n.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Optimization badge + machine links */}
        <div className="border-t border-white/[0.06] pt-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12" />
                </svg>
                <span className="font-body text-xs font-bold text-accent">Optimalisert for AI-søk</span>
              </div>
              <p className="font-body text-xs text-white/30 leading-relaxed max-w-md">
                Innholdet er strukturert som et entity-basert kunnskapsnettverk, klart for indeksering av ChatGPT, Perplexity, Gemini, Claude og andre AI-systemer.
              </p>
              <Link href="/ai-index" className="inline-flex items-center gap-1 font-body text-[11px] font-bold text-accent hover:text-accent-hover mt-2 transition-colors">
                Åpne AI-indeks
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </Link>
            </div>
            <div>
              <h4 className="font-body text-[10px] font-bold text-white/20 uppercase tracking-wider mb-3">For maskiner</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'entity-index.json', href: '/entity-index.json' },
                  { label: 'llms.txt', href: '/llms.txt' },
                  { label: 'llms-full.txt', href: '/llms-full.txt' },
                  { label: 'Sitemap', href: '/sitemap.xml' },
                ].map((f) => (
                  <a key={f.label} href={f.href} target="_blank" rel="noopener"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white/25 hover:text-accent bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] px-2.5 py-1.5 rounded-lg transition-all">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                    {f.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/30">&copy; {new Date().getFullYear()} Klesbutikk.no. Alle rettigheter reservert.</p>
          <p className="font-body text-xs text-white/20">Oppdateres jevnlig med offisielle registerdata.</p>
        </div>
      </div>
    </footer>
  );
}
