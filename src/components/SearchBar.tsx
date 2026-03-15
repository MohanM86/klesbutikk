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
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
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
      <div className={`relative flex items-center bg-surface border-2 transition-colors duration-150 ${isHero ? 'border-border focus-within:border-accent rounded-xl' : 'border-border focus-within:border-accent rounded-lg'}`}>
        <div className={`flex-shrink-0 ${isHero ? 'pl-5' : 'pl-4'}`}>
          <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk etter by, merke eller butikk..."
          className={`w-full bg-transparent font-body text-charcoal placeholder:text-muted/60 focus:outline-none ${isHero ? 'px-3 py-4 text-base' : 'px-3 py-3 text-sm'}`} />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }} className="flex-shrink-0 pr-4 text-muted hover:text-charcoal transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {results.map((r, i) => (
            <button key={i} onClick={() => { setIsOpen(false); setQuery(''); router.push(r.href); }}
              className="w-full text-left px-4 py-3 hover:bg-accent-light transition-colors border-b border-border last:border-b-0 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-surface rounded-lg flex items-center justify-center">
                <span className="font-body text-[10px] font-bold text-muted">{r.type === 'city' ? 'BY' : 'B'}</span>
              </span>
              <div>
                <p className="font-body text-sm font-semibold text-charcoal">{r.label}</p>
                <p className="font-body text-xs text-muted">{r.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
