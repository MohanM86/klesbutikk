import Link from 'next/link';
import { Store } from '@/lib/types';

export default function StoreCard({ store, showCity = false }: { store: Store; showCity?: boolean }) {
  return (
    <Link href={`/butikk/${store.slug}`}
      className="group block bg-surface border border-border rounded-lg p-5 card-hover hover:border-accent/40">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-200">
          <span className="font-body text-base font-extrabold text-charcoal group-hover:text-white transition-colors">{store.navn.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <h3 className="font-body text-sm font-bold text-charcoal mb-0.5 group-hover:text-accent transition-colors line-clamp-1">{store.navn}</h3>
          <p className="font-body text-xs text-muted line-clamp-1">{store.postnummer} {showCity ? store.poststed : store.kommune || ''}</p>
        </div>
      </div>
      {store.adresse && (
        <p className="font-body text-xs text-muted/70 line-clamp-1">{store.adresse}</p>
      )}
    </Link>
  );
}
