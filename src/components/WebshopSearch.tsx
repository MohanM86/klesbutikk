'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/types';

export default function WebshopSearch({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...stores];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((s) =>
        s.navn.toLowerCase().includes(q) ||
        s.poststed.toLowerCase().includes(q) ||
        (s.nettside && s.nettside.toLowerCase().includes(q))
      );
    }
    return result;
  }, [stores, query]);

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-xl mb-8">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        </div>
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk etter nettbutikk..."
          className="w-full bg-surface border border-border rounded-lg font-body text-sm text-charcoal placeholder:text-muted/60 pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <p className="font-body text-sm text-muted mb-4">
        Viser {filtered.length} nettbutikker
      </p>

      {/* Store grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((store) => (
          <Link key={store.organisasjonsnummer} href={'/butikk/' + store.slug}
            className="group block bg-surface border border-border rounded-lg p-5 hover:border-accent/40 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                <span className="font-body text-base font-extrabold text-charcoal group-hover:text-white transition-colors">
                  {store.navn.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-body text-sm font-bold text-charcoal line-clamp-1 group-hover:text-accent transition-colors">{store.navn}</h3>
                <p className="font-body text-xs text-muted">{store.poststed}, {store.fylke}</p>
              </div>
            </div>
            {store.nettside && (
              <p className="font-body text-xs text-accent truncate">{store.nettside.replace(/^https?:\/\//, '')}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
