'use client';
import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/types';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('');

type TypeFilter = 'alle' | 'fremhevet' | 'nettbutikk';

export default function AllStoresSearch({ stores, featured, cities, fylker }: {
  stores: Store[]; featured: Store[]; cities: string[]; fylker: string[];
}) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('alle');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFylke, setSelectedFylke] = useState('');
  const [activeLetter, setActiveLetter] = useState('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    let result = stores;
    if (query.length >= 1) {
      const q = query.toLowerCase();
      result = result.filter((s) => s.navn.toLowerCase().includes(q) || s.poststed.toLowerCase().includes(q) || s.adresse.toLowerCase().includes(q));
    }
    if (typeFilter === 'fremhevet') result = result.filter((s) => s.featured);
    if (typeFilter === 'nettbutikk') result = result.filter((s) => s.nettside && s.nettside.length > 3);
    if (selectedCity) result = result.filter((s) => s.poststed === selectedCity);
    if (selectedFylke) result = result.filter((s) => s.fylke === selectedFylke);
    if (activeLetter) result = result.filter((s) => s.navn.charAt(0).toUpperCase() === activeLetter);
    return result;
  }, [stores, query, typeFilter, selectedCity, selectedFylke, activeLetter]);

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, Store[]> = {};
    filtered.forEach((s) => {
      const letter = s.navn.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(s);
    });
    return groups;
  }, [filtered]);

  const sortedLetters = Object.keys(grouped).sort((a, b) => {
    const order = ALPHABET;
    return order.indexOf(a) - order.indexOf(b);
  });

  // Letters that have stores
  const activeLetters = new Set(stores.map((s) => s.navn.charAt(0).toUpperCase()));

  const featuredCount = stores.filter((s) => s.featured).length;
  const webCount = stores.filter((s) => s.nettside && s.nettside.length > 3).length;

  const clearAll = () => { setQuery(''); setTypeFilter('alle'); setSelectedCity(''); setSelectedFylke(''); setActiveLetter(''); };

  const scrollToLetter = (letter: string) => {
    setActiveLetter('');
    setTimeout(() => {
      const el = sectionRefs.current[letter];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div>
      {/* Featured stores horizontal scroll */}
      {featured.length > 0 && !query && typeFilter === 'alle' && !selectedCity && !selectedFylke && !activeLetter && (
        <div className="mb-10">
          <p className="font-body text-sm font-bold text-accent mb-3">Fremhevede butikker</p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
            {featured.map((store) => (
              <Link key={store.organisasjonsnummer} href={`/butikk/${store.slug}`}
                className="flex-shrink-0 w-[200px] bg-white border-2 border-accent/20 rounded-2xl p-4 hover:border-accent hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <span className="font-body text-xs font-extrabold text-white">{store.navn.charAt(0)}</span>
                  </div>
                  <span className="font-body text-[9px] font-bold bg-accent text-white px-2 py-0.5 rounded-md">Anbefalt</span>
                </div>
                <h3 className="font-body text-sm font-bold text-charcoal group-hover:text-accent transition-colors truncate">{store.navn}</h3>
                <p className="font-body text-[11px] text-muted truncate">{store.poststed}, {store.fylke}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input type="text" value={query} onChange={(e) => { setQuery(e.target.value); setActiveLetter(''); }}
              placeholder="Søk etter butikknavn, by eller adresse..."
              className="w-full bg-surface border-2 border-border focus:border-accent rounded-xl pl-11 pr-4 py-3.5 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none transition-colors" />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedFylke(''); setActiveLetter(''); }}
                className={`font-body text-xs font-bold px-4 py-3.5 pr-8 rounded-xl appearance-none cursor-pointer transition-all ${
                  selectedCity ? 'bg-accent text-white' : 'bg-surface border border-border text-muted hover:border-border-dark'
                }`}>
                <option value="">Alle byer</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${selectedCity ? 'text-white' : 'text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </div>
            <div className="relative">
              <select value={selectedFylke} onChange={(e) => { setSelectedFylke(e.target.value); setSelectedCity(''); setActiveLetter(''); }}
                className={`font-body text-xs font-bold px-4 py-3.5 pr-8 rounded-xl appearance-none cursor-pointer transition-all ${
                  selectedFylke ? 'bg-accent text-white' : 'bg-surface border border-border text-muted hover:border-border-dark'
                }`}>
                <option value="">Alle fylker</option>
                {fylker.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <svg className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${selectedFylke ? 'text-white' : 'text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </div>
          </div>
        </div>

        {/* Type filters + alphabet */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {[
            { key: 'alle' as TypeFilter, label: 'Alle', count: stores.length },
            { key: 'fremhevet' as TypeFilter, label: 'Fremhevet', count: featuredCount },
            { key: 'nettbutikk' as TypeFilter, label: 'Med nettbutikk', count: webCount },
          ].map((f) => (
            <button key={f.key} onClick={() => { setTypeFilter(f.key); setActiveLetter(''); }}
              className={`font-body text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
                typeFilter === f.key && !activeLetter
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              {f.label} <span className="text-[10px] ml-1 opacity-60">{f.count}</span>
            </button>
          ))}

          {(query || typeFilter !== 'alle' || selectedCity || selectedFylke || activeLetter) && (
            <button onClick={clearAll} className="font-body text-xs font-bold text-accent hover:text-accent-hover transition-colors ml-1">
              Nullstill
            </button>
          )}
        </div>

        {/* Alphabet nav */}
        <div className="flex flex-wrap gap-1">
          {ALPHABET.map((letter) => {
            const hasStores = activeLetters.has(letter);
            const isActive = activeLetter === letter;
            return (
              <button key={letter}
                onClick={() => {
                  if (hasStores) {
                    if (isActive) { setActiveLetter(''); } else {
                      setActiveLetter(letter);
                      setTypeFilter('alle');
                      setQuery('');
                    }
                  }
                }}
                disabled={!hasStores}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-body text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                    : hasStores
                    ? 'bg-surface border border-border text-muted hover:text-charcoal hover:border-accent'
                    : 'bg-surface/50 text-border-dark cursor-not-allowed'
                }`}>
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-body text-sm text-muted">
          Viser <span className="font-bold text-charcoal">{filtered.length}</span> av {stores.length} butikker
        </p>
      </div>

      {/* Grouped results */}
      {sortedLetters.length > 0 ? (
        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <div key={letter} ref={(el) => { sectionRefs.current[letter] = el; }}>
              {/* Letter header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-body text-3xl font-black text-accent">{letter}</span>
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-xs font-bold text-muted">{grouped[letter].length} butikker</span>
              </div>

              {/* Store grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {grouped[letter].map((store) => (
                  <Link key={store.organisasjonsnummer} href={`/butikk/${store.slug}`}
                    className="group flex items-center gap-3 bg-white border border-border rounded-xl p-3 hover:border-accent hover:shadow-md transition-all duration-200">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      store.featured ? 'bg-accent' : 'bg-accent-light'
                    }`}>
                      <span className={`font-body text-xs font-extrabold ${store.featured ? 'text-white' : 'text-accent'}`}>
                        {store.navn.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-body text-sm font-bold text-charcoal group-hover:text-accent transition-colors truncate">{store.navn}</h3>
                        {store.featured && (
                          <span className="font-body text-[8px] font-bold bg-accent text-white px-1.5 py-0.5 rounded flex-shrink-0">Anbefalt</span>
                        )}
                      </div>
                      <p className="font-body text-[11px] text-muted truncate">{store.poststed}, {store.fylke}</p>
                    </div>
                    {store.nettside && (
                      <div className="w-6 h-6 rounded-md bg-accent-light flex items-center justify-center flex-shrink-0" title="Har nettbutikk">
                        <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                        </svg>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="font-body text-sm font-bold text-charcoal mb-1">Ingen butikker funnet</p>
          <p className="font-body text-xs text-muted">Prøv å endre søket eller fjern filtrene</p>
          <button onClick={clearAll} className="mt-4 font-body text-xs font-bold text-accent hover:text-accent-hover transition-colors">
            Nullstill alle filtre
          </button>
        </div>
      )}
    </div>
  );
}
