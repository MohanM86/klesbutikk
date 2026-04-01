'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CityData, FylkeData } from '@/lib/types';

type Filter = 'alle' | '10+' | '5+' | 'fylke';

export default function CitySearch({ cities, fylker }: { cities: CityData[]; fylker: FylkeData[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('alle');
  const [selectedFylke, setSelectedFylke] = useState('');

  const filtered = useMemo(() => {
    let result = cities;
    if (query.length >= 1) {
      const q = query.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.fylke.toLowerCase().includes(q));
    }
    if (filter === '10+') result = result.filter((c) => c.storeCount >= 10);
    if (filter === '5+') result = result.filter((c) => c.storeCount >= 5);
    if (filter === 'fylke' && selectedFylke) result = result.filter((c) => c.fylke === selectedFylke);
    return result;
  }, [cities, query, filter, selectedFylke]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-body text-sm font-bold text-accent mb-1">Alle byer</p>
          <h2 className="font-body text-display-sm font-extrabold text-charcoal">
            {filtered.length} {filtered.length === 1 ? 'by' : 'byer'}
          </h2>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter by eller fylke..."
            className="w-full bg-surface border-2 border-border focus:border-accent rounded-lg pl-11 pr-4 py-3.5 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none transition-colors"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {[
            { key: 'alle' as Filter, label: 'Alle' },
            { key: '10+' as Filter, label: '10+ butikker' },
            { key: '5+' as Filter, label: '5+ butikker' },
          ].map((f) => (
            <button key={f.key} onClick={() => { setFilter(f.key); setSelectedFylke(''); }}
              className={`font-body text-xs font-bold px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                filter === f.key
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              {f.label}
            </button>
          ))}
          <div className="relative">
            <select
              value={filter === 'fylke' ? selectedFylke : ''}
              onChange={(e) => {
                if (e.target.value) {
                  setFilter('fylke');
                  setSelectedFylke(e.target.value);
                } else {
                  setFilter('alle');
                  setSelectedFylke('');
                }
              }}
              className={`font-body text-xs font-bold px-4 py-3 pr-8 rounded-lg transition-all appearance-none cursor-pointer ${
                filter === 'fylke'
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              <option value="">Velg fylke</option>
              {fylker.map((f) => (
                <option key={f.slug} value={f.name}>{f.name} ({f.storeCount})</option>
              ))}
            </select>
            <svg className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${filter === 'fylke' ? 'text-white' : 'text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`}
              className="group flex items-center gap-3 bg-cream border border-border rounded-lg p-3 hover:border-accent  transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-200">
                <span className="font-body text-sm font-extrabold text-accent group-hover:text-white transition-colors">
                  {city.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-body text-sm font-bold text-charcoal group-hover:text-accent transition-colors truncate">
                  {city.name}
                </h3>
                <p className="font-body text-[11px] text-muted truncate">{city.fylke}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="font-body text-xs font-bold text-charcoal bg-surface px-2 py-0.5 rounded-md">
                  {city.storeCount}
                </span>
                <svg className="w-3.5 h-3.5 text-border-dark group-hover:text-accent group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-lg bg-surface flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="font-body text-sm font-bold text-charcoal mb-1">Ingen byer funnet</p>
          <p className="font-body text-xs text-muted">Prøv å endre søket eller fjern filteret</p>
          <button onClick={() => { setQuery(''); setFilter('alle'); setSelectedFylke(''); }}
            className="mt-4 font-body text-xs font-bold text-accent hover:text-accent-hover transition-colors">
            Nullstill alle filtre
          </button>
        </div>
      )}
    </div>
  );
}
