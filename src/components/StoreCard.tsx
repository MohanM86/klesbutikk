import Link from 'next/link';
import { Store } from '@/lib/types';

export default function StoreCard({ store, showCity = false }: { store: Store; showCity?: boolean }) {
  return (
    <Link href={`/butikk/${store.slug}`}
      className="group block bg-cream border border-border rounded-xl p-5 card-hover relative hover:border-accent/30">
      {store.featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-accent text-white text-[10px] font-body font-bold px-2.5 py-1 rounded-md">
          Fremhevet
        </span>
      )}
      <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-200">
        <span className="font-body text-lg font-extrabold text-accent group-hover:text-white transition-colors">{store.navn.charAt(0)}</span>
      </div>
      <h3 className="font-body text-sm font-bold text-charcoal mb-1 group-hover:text-accent transition-colors line-clamp-1">{store.navn}</h3>
      <div className="space-y-0.5">
        {store.adresse && <p className="font-body text-xs text-muted line-clamp-1">{store.adresse}</p>}
        <p className="font-body text-xs text-muted/70">{store.postnummer} {showCity ? store.poststed : store.kommune || ''}</p>
      </div>
    </Link>
  );
}
