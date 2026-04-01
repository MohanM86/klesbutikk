'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/types';

type TypeFilter = 'alle';

export default function AllStoresSearch({ stores, cities, fylker }: {
  stores: Store[]; cities: string[]; fylker: string[];
}) {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFylke, setSelectedFylke] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  const filtered = useMemo(() => {
    let result = [...stores];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((s) =>
        s.navn.toLowerCase().includes(q) ||
        s.poststed.toLowerCase().includes(q) ||
        s.kommune.toLowerCase().includes(q)
      );
    }
    if (selectedCity) result = result.filter((s) => s.poststed === selectedCity);
    if (selectedFylke) result = result.filter((s) => s.fylke === selectedFylke);
    if (activeLetter) result = result.filter((s) => s.navn.charAt(0).toUpperCase() === activeLetter);
    return result;
  }, [stores, query, selectedCity, selectedFylke, activeLetter]);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const storeLetters = new Set(stores.map((s) => s.navn.charAt(0).toUpperCase()));

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          </div>
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Sok etter butikknavn..."
            className="w-full bg-surface border border-border rounded-lg font-body text-sm text-charcoal placeholder:text-muted/60 pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <select
          value={selectedFylke} onChange={(e) => { setSelectedFylke(e.target.value); setSelectedCity(''); }}
          className="bg-surface border border-border rounded-lg font-body text-sm text-charcoal px-4 py-3 focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Alle fylker</option>
          {fylker.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <select
          value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-surface border border-border rounded-lg font-body text-sm text-charcoal px-4 py-3 focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Alle byer</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Alphabet */}
      <div className="flex flex-wrap gap-1 mb-6">
        <button onClick={() => setActiveLetter('')}
          className={'font-body text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ' +
            (!activeLetter ? 'bg-accent text-white' : 'bg-surface-alt text-muted hover:text-charcoal')
          }>Alle</button>
        {letters.map((l) => (
          <button key={l} onClick={() => setActiveLetter(activeLetter === l ? '' : l)}
            disabled={!storeLetters.has(l)}
            className={'font-body text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ' +
              (activeLetter === l ? 'bg-accent text-white' :
               storeLetters.has(l) ? 'bg-surface-alt text-slate hover:text-charcoal hover:bg-warm-200' :
               'bg-surface-alt text-muted/30 cursor-not-allowed')
            }>{l}</button>
        ))}
      </div>

      {/* Results count */}
      <p className="font-body text-sm text-muted mb-4">
        Viser {filtered.length} av {stores.length} butikker
        {query && <span> for &laquo;{query}&raquo;</span>}
      </p>

      {/* Store grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.slice(0, 100).map((store) => (
          <Link key={store.organisasjonsnummer} href={'/butikk/' + store.slug}
            className="group flex items-center gap-3 bg-surface border border-border rounded-lg p-4 hover:border-accent/40 hover:shadow-sm transition-all">
            <div className="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
              <span className="font-body text-sm font-extrabold text-charcoal group-hover:text-white transition-colors">
                {store.navn.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm font-bold text-charcoal line-clamp-1 group-hover:text-accent transition-colors">{store.navn}</p>
              <p className="font-body text-xs text-muted line-clamp-1">{store.poststed}, {store.fylke}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length > 100 && (
        <p className="font-body text-sm text-muted text-center mt-8">
          Viser 100 av {filtered.length} resultater. Bruk sok eller filtre for a snevre inn.
        </p>
      )}
    </div>
  );
}
