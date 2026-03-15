import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-8xl mx-auto section-padding py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-baseline mb-4">
              <span className="font-body text-lg font-extrabold text-white">klesbutikk</span>
              <span className="text-lg font-extrabold text-accent">.no</span>
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
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/30">&copy; {new Date().getFullYear()} Klesbutikk.no. Alle rettigheter reservert.</p>
          <p className="font-body text-xs text-white/20">Data fra Brønnøysundregistrene. Næringskode 47.710.</p>
        </div>
      </div>
    </footer>
  );
}
