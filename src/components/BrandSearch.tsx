'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BrandData } from '@/lib/types';

type Filter = 'alle' | 'norske' | 'internasjonale' | 'med-butikker';

export default function BrandSearch({ brands, norwegianNames }: { brands: BrandData[]; norwegianNames: Set<string> }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('alle');

  const filtered = useMemo(() => {
    let result = brands;
    if (query.length >= 1) {
      const q = query.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q));
    }
    if (filter === 'norske') result = result.filter((b) => norwegianNames.has(b.name));
    if (filter === 'internasjonale') result = result.filter((b) => !norwegianNames.has(b.name));
    if (filter === 'med-butikker') result = result.filter((b) => b.storeCount > 0);
    return result;
  }, [brands, query, filter, norwegianNames]);

  const norskCount = brands.filter((b) => norwegianNames.has(b.name)).length;
  const intlCount = brands.filter((b) => !norwegianNames.has(b.name)).length;
  const withStores = brands.filter((b) => b.storeCount > 0).length;

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-body text-sm font-bold text-accent mb-1">Alle merker</p>
          <h2 className="font-body text-display-sm font-extrabold text-charcoal">
            {filtered.length} {filtered.length === 1 ? 'merke' : 'merker'}
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
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter merke..."
            className="w-full bg-surface border-2 border-border focus:border-accent rounded-lg pl-11 pr-4 py-3.5 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none transition-colors" />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'alle' as Filter, label: 'Alle', count: brands.length },
            { key: 'norske' as Filter, label: 'Norske', count: norskCount },
            { key: 'internasjonale' as Filter, label: 'Internasjonale', count: intlCount },
            { key: 'med-butikker' as Filter, label: 'Med butikker', count: withStores },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`font-body text-xs font-bold px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                filter === f.key
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              {f.label}
              <span className={`ml-1.5 text-[10px] ${filter === f.key ? 'text-white/70' : 'text-muted/50'}`}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((brand) => (
            <Link key={brand.slug} href={`/merke/${brand.slug}`}
              className="group flex items-center gap-3 bg-cream border border-border rounded-lg p-3 hover:border-accent  transition-all duration-200">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                brand.storeCount >= 3
                  ? 'bg-accent group-hover:bg-accent-hover'
                  : 'bg-accent-light group-hover:bg-accent'
              }`}>
                <span className={`font-body text-sm font-extrabold transition-colors ${
                  brand.storeCount >= 3 ? 'text-white' : 'text-accent group-hover:text-white'
                }`}>
                  {brand.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-body text-sm font-bold text-charcoal group-hover:text-accent transition-colors truncate">
                  {brand.name}
                </h3>
                <p className="font-body text-[11px] text-muted truncate">
                  {norwegianNames.has(brand.name) ? 'Norsk' : 'Internasjonalt'}
                  {brand.storeCount > 0 && ` · ${brand.storeCount} ${brand.storeCount === 1 ? 'butikk' : 'butikker'}`}
                </p>
              </div>
              {brand.storeCount > 0 && (
                <span className="font-body text-xs font-bold text-charcoal bg-surface px-2 py-0.5 rounded-md flex-shrink-0">
                  {brand.storeCount}
                </span>
              )}
              <svg className="w-3.5 h-3.5 text-border-dark group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-lg bg-surface flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            </svg>
          </div>
          <p className="font-body text-sm font-bold text-charcoal mb-1">Ingen merker funnet</p>
          <p className="font-body text-xs text-muted">Prøv å endre søket eller fjern filteret</p>
          <button onClick={() => { setQuery(''); setFilter('alle'); }}
            className="mt-4 font-body text-xs font-bold text-accent hover:text-accent-hover transition-colors">
            Nullstill alle filtre
          </button>
        </div>
      )}
    </div>
  );
}
