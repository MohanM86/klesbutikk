import Link from 'next/link';

export default function CTASection({
  title = 'Driver du en klesbutikk?',
  description = 'Bli fremhevet på Klesbutikk.no og nå tusenvis av kunder som leter etter motebutikker i din by.',
  primaryCta = 'Bli fremhevet i din by',
  primaryHref = '/annonser',
  secondaryCta = 'Legg til butikk gratis',
  secondaryHref = '/legg-til-butikk',
}: {
  title?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-charcoal rounded-2xl p-10 md:p-16 text-center">
      <h2 className="font-display text-display-sm md:text-display font-semibold text-white mb-4">
        {title}
      </h2>
      <p className="font-body text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-charcoal font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/90"
        >
          {primaryCta}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white font-body font-medium text-sm tracking-wide transition-all duration-300 hover:border-white/60"
        >
          {secondaryCta}
        </Link>
      </div>
    </section>
  );
}
