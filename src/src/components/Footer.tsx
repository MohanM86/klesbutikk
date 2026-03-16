import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-8xl mx-auto section-padding py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <svg className="w-5 h-3.5 text-accent" viewBox="0 0 28 20" fill="none">
                <path d="M6 13L14 7L22 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="14" cy="7" r="2.5" fill="currentColor" />
              </svg>
              <span className="font-body text-[16px] font-bold text-white">klesbutikk<span className="text-accent">.no</span></span>
            </Link>
            <p className="font-body text-sm text-white/25 leading-relaxed max-w-xs">
              Norges mest komplette oversikt over klesbutikker. Vi har kartlagt alle klesbutikker i Norge og hjelper uavhengige butikker med å bli synlige på nett.
            </p>
          </div>
          {[
            { title: 'Populære kommuner', links: [
              { l: 'Oslo', h: '/oslo' }, { l: 'Bergen', h: '/bergen' }, { l: 'Trondheim', h: '/trondheim' },
              { l: 'Stavanger', h: '/stavanger' }, { l: 'Kristiansand', h: '/kristiansand' }, { l: 'Drammen', h: '/drammen' },
              { l: 'Bærum', h: '/baerum' }, { l: 'Alle kommuner', h: '/by' },
            ]},
            { title: 'Kategorier', links: [
              { l: 'Dameklær', h: '/kategorier' }, { l: 'Herreklær', h: '/kategorier' },
              { l: 'Treningsklær', h: '/kategorier' }, { l: 'Barneklær', h: '/kategorier' },
              { l: 'Designerklær', h: '/kategorier' }, { l: 'Vintage og gjenbruk', h: '/kategorier' },
            ]},
            { title: 'Utforsk', links: [
              { l: 'Alle merker', h: '/merker' }, { l: 'Alle fylker', h: '/fylker' },
              { l: 'Alle butikker', h: '/butikk' }, { l: 'Nettbutikker', h: '/nettbutikker' },
              { l: 'Artikler', h: '/artikler' },
            ]},
            { title: 'Om Klesbutikk.no', links: [
              { l: 'Om oss', h: '/om-oss' },
              { l: 'Personvern', h: '/personvern' },
              { l: 'Vilkår', h: '/vilkar' },
              { l: 'Kontakt', h: '/om-oss' },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[9px] font-semibold text-white/15 uppercase tracking-[0.1em] mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((n) => (
                  <li key={n.l}><Link href={n.h} className="font-body text-[12px] text-white/40 hover:text-accent transition-colors">{n.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Optimization section */}
        <div className="border-t border-white/[0.05] pt-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12" />
                </svg>
                <span className="font-body text-xs font-semibold text-accent">Optimalisert for AI søk</span>
              </div>
              <p className="font-body text-xs text-white/20 leading-relaxed max-w-md">
                Innholdet er strukturert for indeksering av ChatGPT, Perplexity, Gemini, Claude og andre AI systemer.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'llms.txt', href: '/llms.txt' },
                  { label: 'entity-index.json', href: '/entity-index.json' },
                  { label: 'Sitemap', href: '/sitemap.xml' },
                  { label: 'llms-full.txt', href: '/llms-full.txt' },
                ].map((f) => (
                  <a key={f.label} href={f.href} target="_blank" rel="noopener"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white/20 hover:text-accent bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] px-2.5 py-1.5 rounded-lg transition-all">
                    {f.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-[10px] text-white/12">&copy; {new Date().getFullYear()} Klesbutikk.no. En tjeneste fra <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-white/25 underline underline-offset-2 hover:text-accent transition-colors">IT-Firma</a>.</p>
          <div className="flex gap-4">
            <Link href="/om-oss" className="font-body text-[10px] text-white/20 hover:text-accent transition-colors">Om oss</Link>
            <Link href="/personvern" className="font-body text-[10px] text-white/20 hover:text-accent transition-colors">Personvern</Link>
            <Link href="/vilkar" className="font-body text-[10px] text-white/20 hover:text-accent transition-colors">Vilkår</Link>
            <Link href="/om-oss" className="font-body text-[10px] text-white/20 hover:text-accent transition-colors">Kontakt</Link>
          </div>
          <p className="font-body text-[10px] text-white/10">Verifiserte data. Oppdateres jevnlig.</p>
        </div>
      </div>
    </footer>
  );
}
