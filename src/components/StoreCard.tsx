import Link from 'next/link';
import { Store } from '@/lib/types';

export default function StoreCard({ store, showCity = false }: { store: Store; showCity?: boolean }) {
  return (
    <Link
      href={`/butikk/${store.slug}`}
      className="group block bg-white border border-border rounded-lg p-5 card-hover relative"
    >
      {store.featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-charcoal text-white text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Fremhevet
        </span>
      )}

      {/* Store initial as visual element */}
      <div className="w-12 h-12 rounded-full bg-cream border border-border flex items-center justify-center mb-4 group-hover:bg-charcoal group-hover:border-charcoal transition-all duration-300">
        <span className="font-display text-lg font-semibold text-charcoal group-hover:text-white transition-colors duration-300">
          {store.navn.charAt(0)}
        </span>
      </div>

      <h3 className="font-display text-base font-semibold text-charcoal mb-1.5 group-hover:text-slate transition-colors line-clamp-1">
        {store.navn}
      </h3>

      <div className="space-y-1">
        {store.adresse && (
          <p className="font-body text-sm text-muted line-clamp-1">{store.adresse}</p>
        )}
        <p className="font-body text-sm text-muted">
          {store.postnummer} {showCity ? store.poststed : ''}
          {!showCity && store.kommune ? store.kommune : ''}
        </p>
      </div>

      {(store.telefon || store.nettside) && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-4">
          {store.telefon && (
            <span className="font-body text-xs text-muted flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {store.telefon}
            </span>
          )}
          {store.nettside && (
            <span className="font-body text-xs text-muted flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Nettside
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
