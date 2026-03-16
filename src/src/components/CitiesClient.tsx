'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CityData } from '@/lib/types';

const FILTERS = [
  { label: 'Alle', min: 0 },
  { label: '10+ butikker', min: 10 },
  { label: '20+ butikker', min: 20 },
  { label: '50+ butikker', min: 50 },
];

export default function CitiesClient({ cities, fylker }: { cities: CityData[]; fylker: string[] }) {
  const [query, setQuery] = useState('');
  const [minFilter, setMinFilter] = useState(0);
  const [selectedFylke, setSelectedFylke] = useState('');

  const filtered = useMemo(() => {
    let result = cities;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.fylke.toLowerCase().includes(q)
      );
    }
    if (minFilter > 0) {
      result = result.filter((c) => c.storeCount >= minFilter);
    }
    if (selectedFylke) {
      result = result.filter((c) => c.fylke === selectedFylke);
    }
    return result;
  }, [cities, query, minFilter, selectedFylke]);

  const top5 = cities.slice(0, 5);

  return (
    <>
      {/* ─── TOP 5 HERO CARDS ──────────────────────────────── */}
      <div className="mb-12">
        <p className="font-body text-sm font-bold text-accent mb-3">Mest populære</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {top5.map((city, i) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                i === 0
                  ? 'bg-charcoal text-white row-span-1 sm:col-span-1'
                  : i === 1
                  ? 'bg-gradient-to-br from-accent to-accent-hover text-white'
                  : 'bg-surface border-2 border-border hover:border-accent text-charcoal'
              }`}
              style={{ minHeight: '130px' }}
            >
              {/* Big background letter */}
              <span
                className={`absolute right-2 top-0 font-body text-[80px] font-black leading-none select-none pointer-events-none ${
                  i === 0 ? 'text-white/[0.04]' : i === 1 ? 'text-white/[0.15]' : 'text-charcoal/[0.03]'
                }`}
              >
                {city.name.charAt(0)}
              </span>

              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="font-body text-lg font-extrabold mb-0.5">{city.name}</h3>
                <p className={`font-body text-xs ${i < 2 ? 'text-white/70' : 'text-muted'}`}>
                  {city.storeCount} butikker
                </p>
                <p className={`font-body text-[10px] mt-0.5 ${i < 2 ? 'text-white/40' : 'text-muted/60'}`}>
                  {city.fylke}
                </p>
              </div>

              <svg
                className={`absolute bottom-4 right-4 w-5 h-5 transition-all duration-200 group-hover:translate-x-0.5 ${
                  i < 2 ? 'text-white/30 group-hover:text-white/60' : 'text-border-dark group-hover:text-accent'
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── SEARCH + FILTERS ──────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
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
              className="w-full bg-surface border-2 border-border focus:border-accent rounded-xl pl-12 pr-4 py-3.5 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Fylke dropdown */}
          <select
            value={selectedFylke}
            onChange={(e) => setSelectedFylke(e.target.value)}
            className="bg-surface border-2 border-border focus:border-accent rounded-xl px-4 py-3.5 font-body text-sm text-charcoal focus:outline-none transition-colors appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="">Alle fylker</option>
            {fylker.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Min filter chips */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.min}
              onClick={() => setMinFilter(f.min === minFilter ? 0 : f.min)}
              className={`font-body text-xs font-bold px-4 py-2 rounded-lg transition-all duration-150 ${
                minFilter === f.min
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-muted hover:border-accent/30 hover:text-charcoal'
              }`}
            >
              {f.label}
            </button>
          ))}
          {(query || minFilter > 0 || selectedFylke) && (
            <button
              onClick={() => { setQuery(''); setMinFilter(0); setSelectedFylke(''); }}
              className="font-body text-xs font-bold px-4 py-2 rounded-lg text-accent hover:bg-accent-light transition-all"
            >
              Nullstill filter
            </button>
          )}
        </div>
      </div>

      {/* ─── RESULT COUNT ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-body text-sm text-muted">
          Viser <span className="font-bold text-charcoal">{filtered.length}</span> av {cities.length} byer
        </p>
      </div>

      {/* ─── CITY GRID ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <p className="font-body text-sm font-bold text-charcoal mb-1">Ingen byer funnet</p>
          <p className="font-body text-xs text-muted">Prøv å endre søket eller fjern filtre</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
          {filtered.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-3 hover:border-accent hover:shadow-sm transition-all duration-150"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-150">
                <span className="font-body text-sm font-extrabold text-accent group-hover:text-white transition-colors">
                  {city.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-body text-sm font-bold text-charcoal group-hover:text-accent transition-colors truncate">
                  {city.name}
                </h3>
                <p className="font-body text-[11px] text-muted truncate">{city.fylke}</p>
              </div>
              <span className="font-body text-xs font-bold text-muted bg-surface px-2 py-1 rounded-md flex-shrink-0">
                {city.storeCount}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
