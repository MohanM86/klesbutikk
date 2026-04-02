'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NAV = [
  { label: 'Fylker', href: '/fylker' },
  { label: 'Kommuner', href: '/kommuner' },
  { label: 'Alle butikker', href: '/butikk' },
  { label: 'Om oss', href: '/om-oss' },
];

interface SearchResult { type: 'city' | 'store'; label: string; sublabel: string; href: string; }

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) { setResults([]); setShowResults(false); return; }
    const t = setTimeout(async () => {
      try { const r = await fetch('/api/search?q=' + encodeURIComponent(query)); const d = await r.json(); setResults(d.results || []); setShowResults(true); } catch { setResults([]); }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleSelect = (href: string) => { setShowResults(false); setQuery(''); router.push(href); };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-surface-alt text-center py-1.5 border-b border-border text-[11px] text-slate">
        <span>1 566 klesbutikker</span>
        <span className="mx-2 text-border-dark">·</span>
        <span>357 kommuner</span>
        <span className="mx-2 text-border-dark">·</span>
        <span>15 fylker</span>
      </div>
      <header className="bg-white border-b border-border">
        <div className="max-w-8xl mx-auto section-padding">
          <div className="flex items-center h-14 gap-6">
            <Link href="/" className="font-body text-xl font-extrabold text-black tracking-tight whitespace-nowrap">
              klesbutikk<span className="text-accent">.no</span>
            </Link>
            <nav className="hidden md:flex items-center gap-0">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="font-body text-[13px] font-semibold text-slate hover:text-black px-3.5 py-4 border-b-2 border-transparent hover:border-black transition-all duration-150">{n.label}</Link>
              ))}
            </nav>
            <div ref={searchRef} className="relative flex-1 max-w-sm ml-auto hidden md:block">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" strokeWidth={2.5} /><path d="m20 20-3.5-3.5" strokeWidth={2.5} strokeLinecap="round" /></svg>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => { if (results.length > 0) setShowResults(true); }}
                placeholder="Søk etter kommune eller butikk"
                className="w-full font-body text-sm bg-surface-alt border border-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-black transition-colors placeholder:text-muted" />
              {showResults && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  {results.slice(0, 6).map((r, i) => (
                    <button key={i} onClick={() => handleSelect(r.href)} className="w-full text-left px-4 py-2.5 hover:bg-surface-alt transition-colors border-b border-border last:border-b-0">
                      <p className="font-body text-[13px] font-bold text-black">{r.label}</p>
                      <p className="font-body text-[11px] text-muted">{r.sublabel}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Meny">
              <div className="w-5 flex flex-col gap-1.5">
                <span className={'block h-[2px] bg-black rounded-full transition-all duration-300 ' + (open ? 'rotate-45 translate-y-[7px]' : '')} />
                <span className={'block h-[2px] bg-black rounded-full transition-all duration-300 ' + (open ? 'opacity-0' : '')} />
                <span className={'block h-[2px] bg-black rounded-full transition-all duration-300 ' + (open ? '-rotate-45 -translate-y-[7px]' : '')} />
              </div>
            </button>
          </div>
        </div>
        <div className={'md:hidden overflow-hidden transition-all duration-300 ' + (open ? 'max-h-96' : 'max-h-0')}>
          <nav className="section-padding py-3 flex flex-col gap-0.5 bg-white border-t border-border">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-body text-base font-semibold text-charcoal hover:text-accent py-2.5 px-3 transition-colors">{n.label}</Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
