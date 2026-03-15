import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-8xl mx-auto section-padding pt-20 pb-32 text-center">
      <div className="w-20 h-20 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-6">
        <span className="font-body text-3xl font-extrabold text-accent">404</span>
      </div>
      <h1 className="font-body text-2xl font-extrabold text-charcoal mb-3">Siden ble ikke funnet</h1>
      <p className="font-body text-base text-muted mb-8 max-w-md mx-auto">
        Beklager, men denne siden finnes ikke. Den kan ha blitt flyttet eller slettet.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="btn-primary">Tilbake til forsiden</Link>
        <Link href="/by" className="btn-outline">Se alle byer</Link>
      </div>
    </div>
  );
}
