'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult { type: 'city' | 'store'; label: string; sublabel: string; href: string; }

export default function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); setIsOpen(false); return; }
    const t = setTimeout(async () => {
      try { const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`); const d = await r.json(); setResults(d.results || []); setIsOpen(true); } catch { setResults([]); }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  const isHero = variant === 'hero';
  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className={`relative flex items-center ${isHero ? 'bg-white/[0.04] border border-white/[0.08]' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
        <div className={`flex-shrink-0 ${isHero ? 'pl-5' : 'pl-4'}`}>
          <svg className={`${isHero ? 'w-4 h-4 text-white/55' : 'w-4 h-4 text-white/55'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Sok etter by, merke eller butikk..."
          className={`w-full bg-transparent font-body focus:outline-none text-white placeholder:text-white/70 ${isHero ? 'px-4 py-4 text-sm' : 'px-3 py-3 text-sm'}`} />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }} className="flex-shrink-0 pr-4 text-white/60 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-white/[0.08] overflow-hidden z-50">
          {results.map((r, i) => (
            <button key={i} onClick={() => { setIsOpen(false); setQuery(''); router.push(r.href); }}
              className="w-full text-left px-5 py-3 hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-b-0 flex items-center gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-white/[0.06] flex items-center justify-center">
                <span className="font-body text-[10px] font-bold text-white/70">{r.type === 'city' ? 'BY' : 'B'}</span>
              </span>
              <div>
                <p className="font-body text-sm font-semibold text-white">{r.label}</p>
                <p className="font-body text-xs text-white/60">{r.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
