import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="bg-black text-white min-h-[60vh] flex items-center justify-center text-center">
      <div className="section-padding">
        <h1 className="font-body text-6xl font-extrabold text-accent mb-4">404</h1>
        <p className="font-body text-lg text-white/60 mb-8">Siden finnes ikke</p>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm rounded-full transition-colors">Tilbake til forsiden</Link>
      </div>
    </section>
  );
}
