'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/types';

type Filter = 'alle' | 'featured';

export default function WebshopSearch({ stores, cities, fylker }: { stores: Store[]; cities: string[]; fylker: string[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('alle');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFylke, setSelectedFylke] = useState('');

  const filtered = useMemo(() => {
    let result = stores;
    if (query.length >= 1) {
      const q = query.toLowerCase();
      result = result.filter((s) =>
        s.navn.toLowerCase().includes(q) ||
        s.poststed.toLowerCase().includes(q) ||
        s.merker?.some((m) => m.toLowerCase().includes(q))
      );
    }
    if (filter === 'featured') result = result.filter((s) => s.featured);
    if (selectedCity) result = result.filter((s) => s.poststed === selectedCity);
    if (selectedFylke) result = result.filter((s) => s.fylke === selectedFylke);
    return result;
  }, [stores, query, filter, selectedCity, selectedFylke]);

  const featuredCount = stores.filter((s) => s.featured).length;

  const clearAll = () => { setQuery(''); setFilter('alle'); setSelectedCity(''); setSelectedFylke(''); };

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-body text-sm font-bold text-accent mb-1">Alle nettbutikker</p>
          <h2 className="font-body text-display-sm font-extrabold text-charcoal">
            {filtered.length} {filtered.length === 1 ? 'nettbutikk' : 'nettbutikker'}
          </h2>
        </div>
        {(query || filter !== 'alle' || selectedCity || selectedFylke) && (
          <button onClick={clearAll} className="font-body text-xs font-bold text-accent hover:text-accent-hover transition-colors">
            Nullstill filtre
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter butikk, by eller merke..."
            className="w-full bg-surface border-2 border-border focus:border-accent rounded-xl pl-11 pr-4 py-3.5 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none transition-colors" />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'alle' as Filter, label: 'Alle', count: stores.length },
            ...(featuredCount > 0 ? [{ key: 'featured' as Filter, label: 'Fremhevet', count: featuredCount }] : []),
          ].map((f) => (
            <button key={f.key} onClick={() => { setFilter(f.key); setSelectedCity(''); setSelectedFylke(''); }}
              className={`font-body text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                filter === f.key && !selectedCity && !selectedFylke
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              {f.label} <span className="text-[10px] ml-1 opacity-60">{f.count}</span>
            </button>
          ))}
          <div className="relative">
            <select value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedFylke(''); setFilter('alle'); }}
              className={`font-body text-xs font-bold px-4 py-2.5 pr-8 rounded-xl appearance-none cursor-pointer transition-all ${
                selectedCity ? 'bg-accent text-white' : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              <option value="">Velg by</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <svg className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${selectedCity ? 'text-white' : 'text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
          <div className="relative">
            <select value={selectedFylke} onChange={(e) => { setSelectedFylke(e.target.value); setSelectedCity(''); setFilter('alle'); }}
              className={`font-body text-xs font-bold px-4 py-2.5 pr-8 rounded-xl appearance-none cursor-pointer transition-all ${
                selectedFylke ? 'bg-accent text-white' : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              <option value="">Velg fylke</option>
              {fylker.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <svg className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${selectedFylke ? 'text-white' : 'text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((store) => (
            <div key={store.organisasjonsnummer}
              className="bg-cream border-2 border-border rounded-2xl p-5 hover:border-accent hover:shadow-lg transition-all duration-200 group">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  store.featured ? 'bg-accent' : 'bg-accent-light'
                }`}>
                  <span className={`font-body text-lg font-extrabold ${store.featured ? 'text-white' : 'text-accent'}`}>
                    {store.navn.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-body text-base font-bold text-charcoal truncate">{store.navn}</h3>
                    {store.featured && (
                      <span className="font-body text-[10px] font-bold bg-accent text-white px-2 py-0.5 rounded-md flex-shrink-0">Fremhevet</span>
                    )}
                  </div>
                  <p className="font-body text-xs text-muted">{store.poststed}, {store.fylke}</p>
                </div>
              </div>

              {/* Merker */}
              {store.merker && store.merker.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {store.merker.slice(0, 4).map((m) => (
                    <span key={m} className="font-body text-[11px] font-medium bg-surface text-muted px-2 py-0.5 rounded-md">{m}</span>
                  ))}
                  {store.merker.length > 4 && (
                    <span className="font-body text-[11px] text-muted/50 px-1">+{store.merker.length - 4} til</span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {/* Affiliate-ready external link */}
                <a href={store.nettside} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white font-body text-xs font-bold py-3 rounded-xl hover:bg-accent-hover transition-colors"
                  data-store-id={store.organisasjonsnummer}
                  data-store-name={store.navn}
                  data-store-city={store.poststed}>
                  Besøk nettbutikk
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link href={`/butikk/${store.slug}`}
                  className="inline-flex items-center justify-center px-4 py-3 border-2 border-border text-muted font-body text-xs font-bold rounded-xl hover:border-accent hover:text-accent transition-colors">
                  Detaljer
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3" />
            </svg>
          </div>
          <p className="font-body text-sm font-bold text-charcoal mb-1">Ingen nettbutikker funnet</p>
          <p className="font-body text-xs text-muted">Prøv å endre søket eller fjern filteret</p>
          <button onClick={clearAll} className="mt-4 font-body text-xs font-bold text-accent hover:text-accent-hover transition-colors">
            Nullstill alle filtre
          </button>
        </div>
      )}
    </div>
  );
}
