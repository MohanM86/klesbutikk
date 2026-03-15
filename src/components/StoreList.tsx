'use client';
import { useState, useMemo } from 'react';
import StoreCard from './StoreCard';
import { Store } from '@/lib/types';

const PER_PAGE = 24;

export default function StoreList({ stores, showCity = false, initialLimit }: { stores: Store[]; showCity?: boolean; initialLimit?: number }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filtered = useMemo(() => {
    if (filter === 'featured') return stores.filter((s) => s.featured);
    return stores;
  }, [stores, filter]);

  const limit = initialLimit || PER_PAGE;
  const visible = filtered.slice(0, page * limit);
  const hasMore = visible.length < filtered.length;
  const featuredCount = stores.filter((s) => s.featured).length;

  return (
    <div>
      {featuredCount > 0 && (
        <div className="flex items-center gap-2 mb-6">
          {[
            { key: 'all' as const, label: `Alle (${stores.length})` },
            { key: 'featured' as const, label: `Fremhevet (${featuredCount})` },
          ].map((f) => (
            <button key={f.key} onClick={() => { setFilter(f.key); setPage(1); }}
              className={`font-body text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                filter === f.key
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-surface border border-border text-muted hover:text-charcoal hover:border-border-dark'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visible.map((store) => (
          <StoreCard key={store.organisasjonsnummer} store={store} showCity={showCity} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <button onClick={() => setPage((p) => p + 1)} className="btn-primary">
            Vis flere butikker
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </div>
      )}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349" /></svg>
          </div>
          <p className="font-body text-sm font-bold text-charcoal mb-1">Ingen butikker funnet</p>
          <p className="font-body text-xs text-muted">Prøv å endre filteret</p>
        </div>
      )}
    </div>
  );
}
