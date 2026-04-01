import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="max-w-8xl mx-auto section-padding py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block font-body text-lg font-extrabold text-black mb-3">
              klesbutikk<span className="text-accent">.no</span>
            </Link>
            <p className="font-body text-[13px] text-slate leading-relaxed max-w-xs">
              Norges mest komplette oversikt over klesbutikker. Verifiserte data, oppdateres jevnlig.
            </p>
          </div>
          {[
            { title: 'Populaere kommuner', links: [
              { l: 'Oslo', h: '/oslo' }, { l: 'Bergen', h: '/bergen' }, { l: 'Trondheim', h: '/trondheim' },
              { l: 'Stavanger', h: '/stavanger' }, { l: 'Kristiansand', h: '/kristiansand' },
              { l: 'Alle kommuner', h: '/by' },
            ]},
            { title: 'Kategorier', links: [
              { l: 'Dameklaer', h: '/kategorier' }, { l: 'Herreklaer', h: '/kategorier' },
              { l: 'Treningsklaer', h: '/kategorier' }, { l: 'Barneklaer', h: '/kategorier' },
              { l: 'Designer', h: '/kategorier' }, { l: 'Vintage', h: '/kategorier' },
            ]},
            { title: 'Utforsk', links: [
              { l: 'Alle merker', h: '/merker' }, { l: 'Alle fylker', h: '/fylker' },
              { l: 'Alle butikker', h: '/butikk' }, { l: 'Nettbutikker', h: '/nettbutikker' },
              { l: 'Artikler', h: '/artikler' },
            ]},
            { title: 'Om Klesbutikk.no', links: [
              { l: 'Om oss', h: '/om-oss' },
              { l: 'Personvern', h: '/personvern' },
              { l: 'Vilkar', h: '/vilkar' },
              { l: 'Kontakt', h: '/om-oss' },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[11px] font-bold text-muted uppercase tracking-[0.08em] mb-3">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map((n) => (
                  <li key={n.l}><Link href={n.h} className="font-body text-[13px] text-slate hover:text-black transition-colors">{n.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12" />
                </svg>
                <span className="font-body text-[11px] font-bold text-accent">Optimalisert for AI sok</span>
              </div>
              <p className="font-body text-[11px] text-muted leading-relaxed max-w-md">
                Innholdet er strukturert for indeksering av ChatGPT, Perplexity, Gemini, Claude og andre AI systemer.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'llms.txt', href: '/llms.txt' },
                { label: 'entity-index.json', href: '/entity-index.json' },
                { label: 'Sitemap', href: '/sitemap.xml' },
                { label: 'llms-full.txt', href: '/llms-full.txt' },
              ].map((f) => (
                <a key={f.label} href={f.href} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-muted hover:text-black bg-white border border-border px-2.5 py-1.5 rounded transition-colors">
                  {f.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-[11px] text-muted">&copy; {new Date().getFullYear()} Klesbutikk.no. En tjeneste fra <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-slate underline underline-offset-2 hover:text-black transition-colors">IT-Firma</a>.</p>
          <div className="flex gap-4">
            <Link href="/om-oss" className="font-body text-[11px] text-muted hover:text-black transition-colors">Om oss</Link>
            <Link href="/personvern" className="font-body text-[11px] text-muted hover:text-black transition-colors">Personvern</Link>
            <Link href="/vilkar" className="font-body text-[11px] text-muted hover:text-black transition-colors">Vilkar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
