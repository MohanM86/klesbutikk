import Link from 'next/link';

const FOOTER_LINKS = {
  'Populære byer': [
    { label: 'Oslo', href: '/oslo' },
    { label: 'Bergen', href: '/bergen' },
    { label: 'Trondheim', href: '/trondheim' },
    { label: 'Stavanger', href: '/stavanger' },
    { label: 'Kristiansand', href: '/kristiansand' },
    { label: 'Drammen', href: '/drammen' },
    { label: 'Tromsø', href: '/tromsoe' },
    { label: 'Fredrikstad', href: '/fredrikstad' },
  ],
  'Utforsk': [
    { label: 'Alle byer', href: '/by' },
    { label: 'Alle fylker', href: '/fylker' },
    { label: 'Klesmerker', href: '/merker' },
    { label: 'Alle butikker', href: '/butikk' },
    { label: 'Blogg', href: '/blogg' },
  ],
  'For butikker': [
    { label: 'Legg til butikk', href: '/legg-til-butikk' },
    { label: 'Annonsering', href: '/annonser' },
    { label: 'Kontakt oss', href: '/om-oss' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-8xl mx-auto section-padding py-16 md:py-22">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-semibold">Klesbutikk</span>
              <span className="text-xs font-body font-medium text-white/50 tracking-widest uppercase ml-1">.no</span>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed max-w-sm">
              Norges ledende plattform for å finne klesbutikker. Oppdag motebutikker,
              designerbutikker og lokale favoritter i hele landet.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-body text-xs">
            &copy; {new Date().getFullYear()} Klesbutikk.no. Alle rettigheter reservert.
          </p>
          <p className="text-white/30 font-body text-xs">
            Data fra Brønnøysundregistrene. Næringskode 47.710.
          </p>
        </div>
      </div>
    </footer>
  );
}
