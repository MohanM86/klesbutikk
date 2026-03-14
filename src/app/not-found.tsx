import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-8xl mx-auto section-padding pt-20 pb-32 text-center">
      <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-4">
        404
      </p>
      <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
        Siden ble ikke funnet
      </h1>
      <p className="editorial-text mx-auto mb-8">
        Beklager, vi fant ikke siden du leter etter. Kanskje du vil utforske klesbutikker i en av våre byer?
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Til forsiden
        </Link>
        <Link href="/by" className="btn-secondary">
          Se alle byer
        </Link>
      </div>
    </div>
  );
}
