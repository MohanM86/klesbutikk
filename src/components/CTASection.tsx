import Link from 'next/link';

export default function CTASection({
  title = 'Driver du en klesbutikk?',
  description = 'Bli fremhevet på Klesbutikk.no og nå tusenvis av kunder som leter etter motebutikker i din by.',
  primaryCta = 'Bli fremhevet i din by',
  primaryHref = '/annonser',
  secondaryCta = 'Legg til butikk gratis',
  secondaryHref = '/legg-til-butikk',
}: {
  title?: string; description?: string; primaryCta?: string; primaryHref?: string; secondaryCta?: string; secondaryHref?: string;
}) {
  return (
    <section className="bg-accent rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent-hover/30 to-transparent pointer-events-none" />
      <div className="relative">
        <h2 className="font-body text-display-sm md:text-display font-extrabold text-white mb-4">{title}</h2>
        <p className="font-body text-base text-white/70 max-w-xl mx-auto mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={primaryHref} className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-body font-bold text-sm rounded-xl hover:bg-white/90 transition-all shadow-lg">
            {primaryCta}
          </Link>
          <Link href={secondaryHref} className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-body font-bold text-sm rounded-xl hover:bg-white/10 transition-all">
            {secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
