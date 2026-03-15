import Link from 'next/link';
import { Store } from '@/lib/types';

export default function StoreCard({ store, showCity = false }: { store: Store; showCity?: boolean }) {
  return (
    <Link
      href={`/butikk/${store.slug}`}
      className="group block bg-white/[0.04] border border-white/[0.06] p-5 card-hover relative hover:bg-white/[0.08] transition-all duration-200"
    >
      {store.featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-white text-black text-[8px] font-body font-black tracking-[0.1em] uppercase px-2.5 py-1">
          Fremhevet
        </span>
      )}

      <div className="w-10 h-10 bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.12] transition-all duration-200">
        <span className="font-body text-base font-black text-white/60 group-hover:text-white transition-colors">
          {store.navn.charAt(0)}
        </span>
      </div>

      <h3 className="font-body text-sm font-bold text-white mb-1.5 group-hover:text-white/80 transition-colors line-clamp-1">
        {store.navn}
      </h3>

      <div className="space-y-0.5">
        {store.adresse && (
          <p className="font-body text-[11px] text-white/60 line-clamp-1">{store.adresse}</p>
        )}
        <p className="font-body text-[11px] text-white/70">
          {store.postnummer} {showCity ? store.poststed : store.kommune || ''}
        </p>
      </div>
    </Link>
  );
}
