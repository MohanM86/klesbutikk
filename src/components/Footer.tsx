import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/[0.04]">
      <div className="max-w-8xl mx-auto section-padding py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-14">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-body text-sm font-black tracking-tight uppercase">Klesbutikk</span>
              <span className="text-[9px] font-body text-white/55 tracking-[0.2em] uppercase ml-0.5">.no</span>
            </Link>
            <p className="text-white/70 font-body text-xs leading-relaxed max-w-xs mb-4">
              Norges mest komplette oversikt over klesbutikker. Over 1 500 butikker, 480+ merker, 7 900+ sider.
            </p>
            <p className="font-body text-[10px] text-white/65">hei@klesbutikk.no</p>
          </div>
          <div>
            <h4 className="font-body text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">Byer</h4>
            <ul className="space-y-2">
              {['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand', 'Drammen'].map((c) => (
                <li key={c}><Link href={`/${c.toLowerCase()}`} className="font-body text-xs text-white/60 hover:text-white transition-colors">{c}</Link></li>
              ))}
              <li><Link href="/by" className="font-body text-xs text-white/65 hover:text-white transition-colors">Alle byer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">Kategorier</h4>
            <ul className="space-y-2">
              {['Dameklaer', 'Herreklaer', 'Barneklaer', 'Designer', 'Vintage', 'Sport'].map((c) => (
                <li key={c}><Link href="/kategorier" className="font-body text-xs text-white/60 hover:text-white transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">Utforsk</h4>
            <ul className="space-y-2">
              {[
                { l: 'Alle merker', h: '/merker' }, { l: 'Alle fylker', h: '/fylker' },
                { l: 'Alle butikker', h: '/butikk' }, { l: 'Artikler', h: '/artikler' },
              ].map((n) => (
                <li key={n.h}><Link href={n.h} className="font-body text-xs text-white/60 hover:text-white transition-colors">{n.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">For butikker</h4>
            <ul className="space-y-2">
              {[
                { l: 'Legg til butikk', h: '/legg-til-butikk' },
                { l: 'Annonsering', h: '/annonser' },
                { l: 'Om oss', h: '/om-oss' },
              ].map((n) => (
                <li key={n.h}><Link href={n.h} className="font-body text-xs text-white/60 hover:text-white transition-colors">{n.l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/65 font-body text-[10px]">&copy; {new Date().getFullYear()} Klesbutikk.no</p>
          <p className="text-white/60 font-body text-[10px]">Data fra Bronnoysundregistrene. Naeringskode 47.710.</p>
        </div>
      </div>
    </footer>
  );
}
