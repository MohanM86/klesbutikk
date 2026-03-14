'use client';

import { useState, useMemo } from 'react';
import StoreCard from './StoreCard';
import { Store } from '@/lib/types';

const PER_PAGE = 24;

export default function StoreList({
  stores,
  showCity = false,
  initialLimit,
}: {
  stores: Store[];
  showCity?: boolean;
  initialLimit?: number;
}) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filtered = useMemo(() => {
    let list = stores;
    if (filter === 'featured') list = list.filter((s) => s.featured);
    return list;
  }, [stores, filter]);

  const limit = initialLimit || PER_PAGE;
  const totalPages = Math.ceil(filtered.length / limit);
  const visible = filtered.slice(0, page * limit);
  const hasMore = visible.length < filtered.length;

  const featuredCount = stores.filter((s) => s.featured).length;

  return (
    <div>
      {/* Filter bar */}
      {featuredCount > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setFilter('all'); setPage(1); }}
            className={`font-body text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
              filter === 'all'
                ? 'bg-charcoal text-white border-charcoal'
                : 'bg-white text-muted border-border hover:border-charcoal hover:text-charcoal'
            }`}
          >
            Alle ({stores.length})
          </button>
          <button
            onClick={() => { setFilter('featured'); setPage(1); }}
            className={`font-body text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
              filter === 'featured'
                ? 'bg-charcoal text-white border-charcoal'
                : 'bg-white text-muted border-border hover:border-charcoal hover:text-charcoal'
            }`}
          >
            Fremhevet ({featuredCount})
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visible.map((store) => (
          <StoreCard key={store.organisasjonsnummer} store={store} showCity={showCity} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="btn-secondary"
          >
            Vis flere butikker
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body text-muted">Ingen butikker funnet.</p>
        </div>
      )}
    </div>
  );
}
