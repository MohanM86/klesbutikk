'use client';
import { useState } from 'react';
import Link from 'next/link';

const NAV = [
  { label: 'Byer', href: '/by' },
  { label: 'Merker', href: '/merker' },
  { label: 'Kategorier', href: '/kategorier' },
  { label: 'Butikker', href: '/butikk' },
  { label: 'Artikler', href: '/artikler' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="max-w-8xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span className="font-body text-lg font-extrabold tracking-tight text-charcoal">klesbutikk</span>
            <span className="text-lg font-extrabold text-accent">.no</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="font-body text-sm font-medium text-charcoal hover:text-accent px-3 py-2 rounded-lg hover:bg-surface transition-all duration-150">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/legg-til-butikk" className="hidden sm:inline-flex btn-primary text-xs py-2.5 px-5">
              Legg til butikk
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Meny">
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-[2px] bg-charcoal rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[2px] bg-charcoal rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-[2px] bg-charcoal rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="section-padding py-4 flex flex-col gap-1 bg-white border-t border-border">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-body text-base font-medium text-charcoal hover:text-accent py-2.5 px-3 rounded-lg hover:bg-surface transition-all">{n.label}</Link>
          ))}
          <Link href="/legg-til-butikk" onClick={() => setOpen(false)} className="btn-primary text-sm mt-2">Legg til butikk</Link>
        </nav>
      </div>
    </header>
  );
}
