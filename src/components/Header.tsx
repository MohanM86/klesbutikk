'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Byer', href: '/by' },
  { label: 'Fylker', href: '/fylker' },
  { label: 'Merker', href: '/merker' },
  { label: 'Butikker', href: '/butikk' },
  { label: 'Artikler', href: '/artikler' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border">
      <div className="max-w-8xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl md:text-2xl font-semibold tracking-tight text-charcoal">
              Klesbutikk
            </span>
            <span className="text-xs font-body font-medium text-muted tracking-widest uppercase">.no</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-sm font-medium text-slate hover:text-charcoal transition-colors duration-200 tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/legg-til-butikk"
              className="hidden sm:inline-flex btn-primary text-xs py-2.5 px-6"
            >
              Legg til butikk
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -mr-2"
              aria-label="Meny"
            >
              <div className="w-5 flex flex-col gap-1">
                <span
                  className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-[5.5px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-[5.5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-border ${
          isOpen ? 'max-h-80' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="section-padding py-6 flex flex-col gap-4 bg-cream">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-body text-base font-medium text-slate hover:text-charcoal transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/legg-til-butikk"
            onClick={() => setIsOpen(false)}
            className="btn-primary text-sm mt-2 w-full"
          >
            Legg til butikk
          </Link>
        </nav>
      </div>
    </header>
  );
}
