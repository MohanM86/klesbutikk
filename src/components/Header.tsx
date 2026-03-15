'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Byer', href: '/by' },
  { label: 'Merker', href: '/merker' },
  { label: 'Kategorier', href: '/kategorier' },
  { label: 'Butikker', href: '/butikk' },
  { label: 'Artikler', href: '/artikler' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-8xl mx-auto section-padding">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-baseline gap-1.5 group">
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-white uppercase">
              Klesbutikk
            </span>
            <span className="text-[10px] font-body font-medium text-white/40 tracking-[0.15em] uppercase">.no</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-xs font-medium text-white/50 hover:text-white transition-colors duration-200 tracking-[0.08em] uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/legg-til-butikk"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 bg-white text-charcoal font-body font-semibold text-[10px] tracking-[0.12em] uppercase transition-all duration-300 hover:bg-white/90"
            >
              Legg til butikk
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -mr-2"
              aria-label="Meny"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="section-padding py-6 flex flex-col gap-4 bg-charcoal border-t border-white/[0.06]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-body text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/legg-til-butikk"
            onClick={() => setIsOpen(false)}
            className="btn-white text-xs mt-2 w-full"
          >
            Legg til butikk
          </Link>
        </nav>
      </div>
    </header>
  );
}
