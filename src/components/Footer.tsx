import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="max-w-8xl mx-auto section-padding py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block font-body text-lg font-extrabold text-black mb-3">klesbutikk<span className="text-accent">.no</span></Link>
            <p className="font-body text-[13px] text-slate leading-relaxed max-w-xs">Norges mest komplette oversikt over klesbutikker. Basert på offentlige data fra Brønnøysundregistrene.</p>
          </div>
          <div>
            <h4 className="font-body text-[11px] font-bold text-muted uppercase tracking-[0.08em] mb-3">Fylker</h4>
            <ul className="space-y-1.5">
              {['Oslo', 'Vestland', 'Rogaland', 'Trøndelag', 'Agder', 'Alle fylker'].map((f) => (
                <li key={f}><Link href={f === 'Alle fylker' ? '/fylker' : '/fylke/' + f.toLowerCase().replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/å/g, 'a')} className="font-body text-[13px] text-slate hover:text-black transition-colors">{f}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[11px] font-bold text-muted uppercase tracking-[0.08em] mb-3">Kommuner</h4>
            <ul className="space-y-1.5">
              {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand', 'Alle kommuner'].map((c) => (
                <li key={c}><Link href={c === 'Alle kommuner' ? '/kommuner' : '/' + c.toLowerCase()} className="font-body text-[13px] text-slate hover:text-black transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[11px] font-bold text-muted uppercase tracking-[0.08em] mb-3">Om</h4>
            <ul className="space-y-1.5">
              {[{ l: 'Om oss', h: '/om-oss' }, { l: 'Alle butikker', h: '/butikk' }, { l: 'Personvern', h: '/personvern' }, { l: 'Vilkår', h: '/vilkar' }].map((n) => (
                <li key={n.l}><Link href={n.h} className="font-body text-[13px] text-slate hover:text-black transition-colors">{n.l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-[11px] text-muted">&copy; {new Date().getFullYear()} Klesbutikk.no. En tjeneste fra <a href="https://it-firma.no" target="_blank" rel="noopener" className="text-slate underline underline-offset-2 hover:text-black transition-colors">IT-Firma</a>.</p>
          <p className="font-body text-[11px] text-muted">Data fra Brønnøysundregistrene</p>
        </div>
      </div>
    </footer>
  );
}
