'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult { type: 'city' | 'store'; label: string; sublabel: string; href: string; }

const TYPING_SUGGESTIONS = [
  'Holzweiler i Oslo',
  'Vintage butikker i Bergen',
  'Barneklær Trondheim',
  'Filippa K i Stavanger',
  'Designerbutikker i Kristiansand',
  'Nike i Oslo',
  'Ganni i Bergen',
];

const CATEGORIES = [
  { label: 'Byer', href: '/by', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
  { label: 'Merker', href: '/merker', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' },
  { label: 'Butikker', href: '/butikk', icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349' },
  { label: 'Kategorier', href: '/kategorier', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z' },
];

const POPULAR = [
  { label: 'Holzweiler', href: '/merke/holzweiler' },
  { label: 'Ganni', href: '/merke/ganni' },
  { label: 'Vintage Oslo', href: '/kategori/vintage/oslo' },
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
        const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
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
    // Compact variant — simple
    return (
      <div ref={ref} className="relative w-full max-w-xl">
        <div className="relative flex items-center bg-surface border-2 border-border focus-within:border-accent rounded-lg transition-colors">
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-cream border border-border rounded-xl shadow-xl overflow-hidden z-50">
            {results.map((r, i) => (
              <button key={i} onClick={() => handleSelect(r.href)}
                className="w-full text-left px-4 py-3 hover:bg-accent-light transition-colors border-b border-border last:border-b-0 flex items-center gap-3">
                <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
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

  // ─── HERO VARIANT — WOW ─────────────────────────────
  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      {/* Main search box */}
      <div className={`relative flex items-center bg-cream border-[3px] rounded-2xl p-1.5 transition-all duration-300 ${
        isFocused || query ? 'border-accent shadow-xl shadow-accent/15' : 'border-accent/30 shadow-lg shadow-accent/10'
      }`}>
        <div className="flex-shrink-0 pl-4">
          <svg className={`w-6 h-6 transition-colors duration-200 ${isFocused || query ? 'text-accent' : 'text-accent/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="w-full bg-transparent font-body text-base text-charcoal placeholder:text-muted/40 focus:outline-none px-4 py-3.5"
        />
        {query ? (
          <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
            className="flex-shrink-0 mr-2 p-2 text-muted hover:text-charcoal transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        ) : null}
        <button
          onClick={() => { if (query) { /* submit */ } else { inputRef.current?.focus(); } }}
          className="flex-shrink-0 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97] mr-0.5"
        >
          Søk
        </button>
      </div>

      {/* Category pills */}
      <div className="flex justify-center gap-2 mt-4">
        {CATEGORIES.map((cat) => (
          <Link key={cat.label} href={cat.href}
            className="group flex items-center gap-1.5 bg-cream border border-border px-3 py-1.5 rounded-full hover:border-accent hover:bg-accent-light transition-all duration-200">
            <svg className="w-3.5 h-3.5 text-accent/60 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
            </svg>
            <span className="font-body text-xs font-semibold text-muted group-hover:text-accent transition-colors">{cat.label}</span>
          </Link>
        ))}
      </div>

      {/* Popular now */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <span className="font-body text-[11px] text-muted/50">Populært nå:</span>
        {POPULAR.map((p, i) => (
          <span key={p.label}>
            <Link href={p.href} className="font-body text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors">
              {p.label}
            </Link>
            {i < POPULAR.length - 1 && <span className="text-muted/30 mx-1">·</span>}
          </span>
        ))}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-[72px] left-0 right-0 bg-cream border-2 border-border rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 pt-3 pb-1">
            <p className="font-body text-[10px] font-bold text-muted/50 tracking-wider uppercase">Resultater</p>
          </div>
          {results.map((r, i) => (
            <button key={i} onClick={() => handleSelect(r.href)}
              className="w-full text-left px-4 py-3 hover:bg-accent-light transition-colors flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                r.type === 'city' ? 'bg-accent' : 'bg-accent-light'
              }`}>
                <svg className={`w-5 h-5 ${r.type === 'city' ? 'text-white' : 'text-accent'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
