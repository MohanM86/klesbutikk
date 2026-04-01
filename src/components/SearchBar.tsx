'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult { type: 'city' | 'store'; label: string; sublabel: string; href: string; }

const TYPING = ['Holzweiler i Oslo', 'Vintage butikker i Bergen', 'Barneklær Trondheim', 'Filippa K Stavanger', 'Nike i Oslo'];

export default function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (variant !== 'hero' || isFocused || query) return;
    let si = 0, ci = 0, del = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const c = TYPING[si];
      if (!del) { ci++; setPlaceholder(c.slice(0, ci)); if (ci >= c.length) { t = setTimeout(() => { del = true; tick(); }, 2000); return; } t = setTimeout(tick, 60 + Math.random() * 40); }
      else { ci--; setPlaceholder(c.slice(0, ci)); if (ci <= 0) { del = false; si = (si + 1) % TYPING.length; t = setTimeout(tick, 400); return; } t = setTimeout(tick, 30); }
    };
    t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, [variant, isFocused, query]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); setIsOpen(false); return; }
    const t = setTimeout(async () => {
      try { const r = await fetch('/api/search?q=' + encodeURIComponent(query)); const d = await r.json(); setResults(d.results || []); setIsOpen(true); } catch { setResults([]); }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (href: string) => { setIsOpen(false); setQuery(''); router.push(href); };

  if (variant !== 'hero') {
    return (
      <div ref={ref} className="relative w-full max-w-xl">
        <div className="relative flex items-center bg-surface-alt border border-border focus-within:border-black rounded-full transition-colors">
          <svg className="absolute left-3.5 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" strokeWidth={2.5} /><path d="m20 20-3.5-3.5" strokeWidth={2.5} strokeLinecap="round" /></svg>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Søk etter by, merke eller butikk..."
            className="w-full bg-transparent font-body text-sm text-charcoal placeholder:text-muted focus:outline-none pl-10 pr-4 py-2.5" />
        </div>
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
            {results.map((r, i) => (
              <button key={i} onClick={() => handleSelect(r.href)} className="w-full text-left px-4 py-3 hover:bg-surface-alt transition-colors border-b border-border last:border-b-0 flex items-center gap-3">
                <div><p className="font-body text-sm font-bold text-black">{r.label}</p><p className="font-body text-xs text-muted">{r.sublabel}</p></div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full max-w-[540px] mx-auto">
      <div className="relative">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" strokeWidth={2.5} /><path d="m20 20-3.5-3.5" strokeWidth={2.5} strokeLinecap="round" /></svg>
        <input ref={inputRef} type="text" value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          placeholder={placeholder || 'Søk etter by, merke eller butikk...'}
          className="w-full font-body text-[15px] bg-white text-black placeholder:text-muted/60 rounded-full py-3.5 pl-12 pr-28 focus:outline-none" />
        <button onClick={() => { if (!query) inputRef.current?.focus(); }}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm px-6 py-2.5 rounded-full transition-colors">
          Søk
        </button>
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-[56px] left-0 right-0 bg-white border border-border rounded-lg shadow-xl overflow-hidden z-50">
          <div className="px-4 pt-3 pb-1"><p className="font-body text-[10px] font-bold text-muted tracking-wider uppercase">Resultater</p></div>
          {results.map((r, i) => (
            <button key={i} onClick={() => handleSelect(r.href)} className="w-full text-left px-4 py-3 hover:bg-surface-alt transition-colors flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-bold text-black">{r.label}</p>
                <p className="font-body text-xs text-muted">{r.sublabel}</p>
              </div>
              <svg className="w-4 h-4 text-border-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
