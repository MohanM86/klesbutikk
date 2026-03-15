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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/[0.04]">
      <div className="max-w-8xl mx-auto section-padding">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-body text-sm md:text-base font-black tracking-tight text-white uppercase">Klesbutikk</span>
            <span className="text-[9px] font-body font-medium text-white/20 tracking-[0.2em] uppercase">.no</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="font-body text-[10px] font-semibold text-white/30 hover:text-white transition-colors tracking-[0.12em] uppercase">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/legg-til-butikk" className="hidden sm:inline-flex items-center justify-center px-5 py-2 bg-white text-black font-body font-black text-[9px] tracking-[0.15em] uppercase transition-all hover:bg-white/90">
              Legg til butikk
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Meny">
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="section-padding py-6 flex flex-col gap-4 bg-black border-t border-white/[0.04]">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-body text-sm font-semibold text-white/40 hover:text-white transition-colors tracking-wide uppercase">{n.label}</Link>
          ))}
          <Link href="/legg-til-butikk" onClick={() => setOpen(false)} className="btn-primary text-xs mt-2 w-full">Legg til butikk</Link>
        </nav>
      </div>
    </header>
  );
}
