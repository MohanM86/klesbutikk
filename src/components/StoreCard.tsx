import Link from 'next/link';
import { Store } from '@/lib/types';

export default function StoreCard({ store, showCity = false }: { store: Store; showCity?: boolean }) {
  return (
    <Link href={'/butikk/' + store.slug}
      className="group block border border-border rounded-lg p-4 transition-all duration-150 hover:border-black">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center flex-shrink-0 text-white font-body text-sm font-extrabold">
          {store.navn.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="font-body text-[13px] font-bold text-black line-clamp-1">{store.navn}</h3>
          <p className="font-body text-[11px] text-slate">{showCity ? store.poststed : store.kommune}, {store.fylke}</p>
        </div>
      </div>
      {store.adresse && <p className="font-body text-[11px] text-muted line-clamp-1">{store.adresse}, {store.postnummer}</p>}
    </Link>
  );
}
