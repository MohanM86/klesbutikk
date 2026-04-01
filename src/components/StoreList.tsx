'use client';
import { useState } from 'react';
import StoreCard from './StoreCard';
import { Store } from '@/lib/types';

export default function StoreList({ stores, showCity = false }: { stores: Store[]; showCity?: boolean }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? stores : stores.slice(0, 12);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {visible.map((store) => <StoreCard key={store.organisasjonsnummer} store={store} showCity={showCity} />)}
      </div>
      {!showAll && stores.length > 12 && (
        <div className="text-center mt-8">
          <button onClick={() => setShowAll(true)} className="btn-outline text-sm">Vis alle {stores.length} butikker</button>
        </div>
      )}
    </div>
  );
}
