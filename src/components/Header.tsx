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
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/92 backdrop-blur-xl border-b border-border h-[60px]">
      <div className="max-w-8xl mx-auto section-padding">
        <div className="flex items-center justify-between h-[60px]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
                <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="6" r="1.8" fill="currentColor" />
              </svg>
            </div>
            <span className="font-body text-[16px] font-bold tracking-tight text-charcoal">klesbutikk<span className="text-accent">.no</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="font-body text-[13px] font-medium text-slate hover:text-charcoal px-3 py-2 rounded-lg hover:bg-surface-alt transition-all duration-150">
                {n.label}
              </Link>
            ))}
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Meny">
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-[2px] bg-charcoal rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] bg-charcoal rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] bg-charcoal rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="section-padding py-4 flex flex-col gap-1 bg-cream border-t border-border">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-body text-base font-medium text-charcoal hover:text-accent py-2.5 px-3 rounded-lg hover:bg-surface-alt transition-all">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
