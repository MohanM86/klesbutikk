'use client';
import { useState } from 'react';
import Link from 'next/link';

const NAV = [
  { label: 'Kommuner', href: '/by' },
  { label: 'Merker', href: '/merker' },
  { label: 'Butikker', href: '/butikk' },
  { label: 'Fylker', href: '/fylker' },
  { label: 'Kategorier', href: '/kategorier' },
  { label: 'Nettbutikker', href: '/nettbutikker' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-surface-alt text-center py-2 border-b border-border text-xs text-slate">
        <span>Verifiserte data</span>
        <span className="mx-3 text-border-dark">|</span>
        <span>1 566 butikker kartlagt</span>
        <span className="mx-3 text-border-dark">|</span>
        <span>Helt gratis</span>
      </div>
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-center h-14 gap-6">
            <Link href="/" className="font-body text-xl font-extrabold text-black tracking-tight whitespace-nowrap">
              klesbutikk<span className="text-accent">.no</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-0">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="font-body text-[13px] font-semibold text-slate hover:text-black px-3.5 py-4 border-b-2 border-transparent hover:border-black transition-all duration-150">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="relative flex-1 max-w-md ml-auto hidden md:block">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" strokeWidth={2.5} /><path d="m20 20-3.5-3.5" strokeWidth={2.5} strokeLinecap="round" /></svg>
              <input type="text" placeholder="Søk etter by, merke eller butikk"
                className="w-full font-body text-sm bg-surface-alt border border-border rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-black transition-colors placeholder:text-muted" />
            </div>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2" aria-label="Meny">
              <div className="w-5 flex flex-col gap-1.5">
                <span className={'block h-[2px] bg-black rounded-full transition-all duration-300 ' + (open ? 'rotate-45 translate-y-[7px]' : '')} />
                <span className={'block h-[2px] bg-black rounded-full transition-all duration-300 ' + (open ? 'opacity-0' : '')} />
                <span className={'block h-[2px] bg-black rounded-full transition-all duration-300 ' + (open ? '-rotate-45 -translate-y-[7px]' : '')} />
              </div>
            </button>
          </div>
        </div>
        <div className={'lg:hidden overflow-hidden transition-all duration-300 ' + (open ? 'max-h-96' : 'max-h-0')}>
          <nav className="section-padding py-3 flex flex-col gap-0.5 bg-white border-t border-border">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-body text-base font-semibold text-charcoal hover:text-accent py-2.5 px-3 transition-colors">{n.label}</Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
