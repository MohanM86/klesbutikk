import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Trust bar */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-8xl mx-auto section-padding py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            'Data fra Brønnøysundregistrene',
            'Næringskode 47.710',
            'Dekker hele Norge',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 font-body text-xs text-white/40">
              <svg className="w-3.5 h-3.5 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-8xl mx-auto section-padding py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-semibold">Klesbutikk</span>
              <span className="text-xs font-body font-medium text-white/50 tracking-widest uppercase ml-1">.no</span>
            </Link>
            <p className="text-white/50 font-body text-sm leading-relaxed max-w-sm mb-6">
              Norges mest komplette oversikt over klesbutikker. Søk blant over 1 500 butikker,
              480+ merker og 7 900+ sider med informasjon om norsk klesmote.
            </p>
            <p className="font-body text-xs text-white/30">
              hei@klesbutikk.no
            </p>
          </div>

          {/* Popular cities */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-white/30 mb-5">
              Populære byer
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Oslo', href: '/oslo' },
                { label: 'Bergen', href: '/bergen' },
                { label: 'Trondheim', href: '/trondheim' },
                { label: 'Stavanger', href: '/stavanger' },
                { label: 'Kristiansand', href: '/kristiansand' },
                { label: 'Drammen', href: '/drammen' },
                { label: 'Tromsø', href: '/tromsoe' },
                { label: 'Alle byer', href: '/by' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-white/30 mb-5">
              Kategorier
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Dameklær', href: '/kategorier#dameklar' },
                { label: 'Herreklær', href: '/kategorier#herreklar' },
                { label: 'Barneklær', href: '/kategorier#barneklar' },
                { label: 'Designerbutikker', href: '/kategorier#designer' },
                { label: 'Vintage', href: '/kategorier#vintage' },
                { label: 'Sportsklær', href: '/kategorier#sport' },
                { label: 'Alle kategorier', href: '/kategorier' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-white/30 mb-5">
              Utforsk
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Alle merker', href: '/merker' },
                { label: 'Alle fylker', href: '/fylker' },
                { label: 'Alle butikker', href: '/butikk' },
                { label: 'Artikler', href: '/artikler' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <span className="font-body text-xs font-semibold tracking-widest uppercase text-white/30">
                  For butikker
                </span>
              </li>
              {[
                { label: 'Legg til butikk', href: '/legg-til-butikk' },
                { label: 'Annonsering', href: '/annonser' },
                { label: 'Om oss', href: '/om-oss' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 font-body text-xs">
            &copy; {new Date().getFullYear()} Klesbutikk.no. Alle rettigheter reservert.
          </p>
          <p className="text-white/20 font-body text-xs">
            Data fra Brønnøysundregistrene. Næringskode 47.710 – Butikkhandel med klær.
          </p>
        </div>
      </div>
    </footer>
  );
}
