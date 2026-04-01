'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/types';

export default function WebshopSearch({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return stores;
    const q = query.toLowerCase();
    return stores.filter((s) => s.navn.toLowerCase().includes(q) || s.poststed.toLowerCase().includes(q) || (s.nettside && s.nettside.toLowerCase().includes(q)));
  }, [stores, query]);

  return (
    <div>
      <div className="relative max-w-xl mb-8">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Søk etter nettbutikk..."
          className="w-full bg-surface-alt border border-border rounded-full font-body text-sm text-charcoal placeholder:text-muted pl-10 pr-4 py-2.5 focus:outline-none focus:border-black transition-colors" />
      </div>
      <p className="font-body text-sm text-muted mb-4">Viser {filtered.length} nettbutikker</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((store) => (
          <Link key={store.organisasjonsnummer} href={'/butikk/' + store.slug}
            className="group block border border-border rounded-lg p-5 hover:border-black transition-all duration-150">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0 text-white font-body text-base font-extrabold">{store.navn.charAt(0)}</div>
              <div className="min-w-0">
                <h3 className="font-body text-sm font-bold text-black line-clamp-1">{store.navn}</h3>
                <p className="font-body text-xs text-muted">{store.poststed}, {store.fylke}</p>
              </div>
            </div>
            {store.nettside && <p className="font-body text-xs text-accent truncate">{store.nettside.replace(/^https?:\/\//, '')}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
