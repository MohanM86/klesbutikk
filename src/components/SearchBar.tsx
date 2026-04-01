'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult { type: 'city' | 'store'; label: string; sublabel: string; href: string; }

const TYPING_SUGGESTIONS = [
  'Holzweiler i Oslo',
  'Vintage butikker i Bergen',
  'Barneklær Trondheim',
  'Filippa K i Stavanger',
  'Nike i Oslo',
];

export default function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-typing placeholder
  useEffect(() => {
    if (variant !== 'hero' || isFocused || query) return;
    let suggestionIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = TYPING_SUGGESTIONS[suggestionIdx];
      if (!deleting) {
        charIdx++;
        setPlaceholder(current.slice(0, charIdx));
        if (charIdx >= current.length) {
          timeout = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
        timeout = setTimeout(tick, 60 + Math.random() * 40);
      } else {
        charIdx--;
        setPlaceholder(current.slice(0, charIdx));
        if (charIdx <= 0) {
          deleting = false;
          suggestionIdx = (suggestionIdx + 1) % TYPING_SUGGESTIONS.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, [variant, isFocused, query]);

  // Click outside
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Search API
  useEffect(() => {
    if (query.length < 2) { setResults([]); setIsOpen(false); return; }
    const t = setTimeout(async () => {
      try {
        const r = await fetch('/api/search?q=' + encodeURIComponent(query));
        const d = await r.json();
        setResults(d.results || []);
        setIsOpen(true);
      } catch { setResults([]); }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  const isHero = variant === 'hero';

  if (!isHero) {
    return (
      <div ref={ref} className="relative w-full max-w-xl">
        <div className="relative flex items-center bg-surface border border-border focus-within:border-accent rounded-lg transition-colors">
          <div className="flex-shrink-0 pl-4">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter by, merke eller butikk..."
            className="w-full bg-transparent font-body text-sm text-charcoal placeholder:text-muted/60 focus:outline-none px-3 py-3" />
          {query && (
            <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }} className="flex-shrink-0 pr-3 text-muted hover:text-charcoal transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-50">
            {results.map((r, i) => (
              <button key={i} onClick={() => handleSelect(r.href)}
                className="w-full text-left px-4 py-3 hover:bg-surface-alt transition-colors border-b border-border last:border-b-0 flex items-center gap-3">
                <div className="w-8 h-8 bg-surface-alt rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {r.type === 'city' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64" />
                    )}
                  </svg>
                </div>
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

  // HERO VARIANT
  return (
    <div ref={ref} className="relative w-full max-w-[580px] mx-auto">
      <div className={'relative flex items-center bg-surface border rounded-lg p-1.5 transition-all duration-300 ' +
        (isFocused || query ? 'border-accent shadow-xl shadow-accent/10' : 'border-border shadow-lg')
      }>
        <div className="flex-shrink-0 pl-4">
          <svg className={'w-5 h-5 transition-colors duration-200 ' + (isFocused || query ? 'text-accent' : 'text-muted')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" strokeWidth={2.5} />
            <path d="m20 20-3.5-3.5" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || 'Søk etter by, merke eller butikk...'}
          className="w-full bg-transparent font-body text-[15px] text-charcoal placeholder:text-muted/50 focus:outline-none px-4 py-3"
        />
        {query ? (
          <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
            className="flex-shrink-0 mr-2 p-2 text-muted hover:text-charcoal transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        ) : null}
        <button
          onClick={() => { if (!query) { inputRef.current?.focus(); } }}
          className="flex-shrink-0 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.97] mr-0.5"
        >
          Sok
        </button>
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-[68px] left-0 right-0 bg-surface border border-border rounded-lg shadow-2xl overflow-hidden z-50">
          <div className="px-4 pt-3 pb-1">
            <p className="font-body text-[10px] font-bold text-muted/60 tracking-wider uppercase">Resultater</p>
          </div>
          {results.map((r, i) => (
            <button key={i} onClick={() => handleSelect(r.href)}
              className="w-full text-left px-4 py-3 hover:bg-surface-alt transition-colors flex items-center gap-3">
              <div className={'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ' +
                (r.type === 'city' ? 'bg-blue-50 text-blue-600' : 'bg-surface-alt text-accent')
              }>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {r.type === 'city' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349" />
                  )}
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-bold text-charcoal">{r.label}</p>
                <p className="font-body text-xs text-muted">{r.sublabel}</p>
              </div>
              <svg className="w-4 h-4 text-border-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
