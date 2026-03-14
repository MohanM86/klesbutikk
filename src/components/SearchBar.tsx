'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  type: 'city' | 'store';
  label: string;
  sublabel: string;
  href: string;
}

export default function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  const isHero = variant === 'hero';

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center ${
          isHero
            ? 'bg-white border border-border-dark shadow-lg rounded-full'
            : 'bg-white border border-border rounded-lg'
        }`}
      >
        {/* Search icon */}
        <div className={`flex-shrink-0 ${isHero ? 'pl-6' : 'pl-4'}`}>
          <svg
            className={`text-muted ${isHero ? 'w-5 h-5' : 'w-4 h-4'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk etter by, butikk eller fylke..."
          className={`w-full bg-transparent font-body text-charcoal placeholder:text-muted/60 focus:outline-none ${
            isHero ? 'px-4 py-4.5 text-base' : 'px-3 py-3 text-sm'
          }`}
        />

        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
            className="flex-shrink-0 pr-4 text-muted hover:text-charcoal transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => handleSelect(r.href)}
              className="w-full text-left px-5 py-3.5 hover:bg-cream transition-colors border-b border-border last:border-b-0 flex items-center gap-3"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cream flex items-center justify-center">
                {r.type === 'city' ? (
                  <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0A2.006 2.006 0 014.5 7.5h15A2.006 2.006 0 0121 9.349" />
                  </svg>
                )}
              </span>
              <div>
                <p className="font-body text-sm font-medium text-charcoal">{r.label}</p>
                <p className="font-body text-xs text-muted">{r.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
