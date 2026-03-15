'use client';

import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Footer · Klesbutikk.no                                           */
/*  Bruker prosjektets Tailwind-farger: charcoal, muted, accent, etc  */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'Alle byer', href: '/by' },
  { label: 'Alle merker', href: '/merker' },
  { label: 'Alle fylker', href: '/fylker' },
  { label: 'Kategorier', href: '/kategorier' },
  { label: 'Nettbutikker', href: '/nettbutikker' },
];

const INFO_LINKS = [
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Artikler', href: '/artikler' },
  { label: 'Annonsering', href: '/annonser' },
];

const LEGAL_LINKS = [
  { label: 'Personvernerklæring', href: '/personvern' },
  { label: 'Vilkår', href: '/vilkar' },
  { label: 'Cookie-policy', href: '/cookies' },
];

export default function Footer() {
  const resetCookieConsent = () => {
    document.cookie =
      'cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block group">
              <span className="text-lg font-bold text-charcoal group-hover:text-accent transition-colors">
                Klesbutikk.no
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Norges mest komplette oversikt over klesbutikker.
              1&nbsp;566&nbsp;butikker i 368&nbsp;byer.
            </p>
            <a
              href="mailto:hei@klesbutikk.no"
              className="inline-block mt-4 text-sm text-muted hover:text-accent transition-colors"
            >
              hei@klesbutikk.no
            </a>
          </div>

          {/* Utforsk */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-4">
              Utforsk
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-4">
              Info
            </h3>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisk */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-4">
              Juridisk
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={resetCookieConsent}
                  className="text-sm text-muted hover:text-charcoal transition-colors text-left"
                >
                  Cookie-innstillinger
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bunnlinje */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Klesbutikk.no — en tjeneste
            fra IT-FIRMA
          </p>
          <p className="text-xs text-muted">
            Data fra offisielle norske registre
          </p>
        </div>
      </div>
    </footer>
  );
}
