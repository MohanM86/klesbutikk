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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-8xl mx-auto section-padding">
        <div className="flex items-center justify-between h-[58px]">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-5 h-3.5 text-accent" viewBox="0 0 28 20" fill="none">
              <path d="M6 13L14 7L22 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="14" cy="7" r="2.5" fill="currentColor" />
            </svg>
            <span className="font-body text-[16px] font-bold tracking-tight text-charcoal">klesbutikk<span className="text-accent">.no</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="font-body text-[12.5px] font-medium text-slate hover:text-charcoal px-3 py-2 rounded-lg hover:bg-surface transition-all duration-150">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
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
        </nav>
      </div>
    </header>
  );
}
