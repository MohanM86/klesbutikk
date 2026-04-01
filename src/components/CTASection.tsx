import Link from 'next/link';

export default function CTASection({
  title = 'Utforsk alle klesbutikker i Norge',
  description = 'Søk blant over 1 500 butikker, 483 merker og 357 kommuner. Fra Lindesnes til Nordkapp.',
  primaryCta = 'Finn butikker nær deg',
  primaryHref = '/by',
  secondaryCta = 'Se alle merker',
  secondaryHref = '/merker',
}: {
  title?: string; description?: string; primaryCta?: string; primaryHref?: string; secondaryCta?: string; secondaryHref?: string;
}) {
  return (
    <section className="bg-accent rounded-lg p-10 md:p-14 text-center relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent-hover/30 to-transparent pointer-events-none" />
      <div className="relative">
        <h2 className="font-body text-display-sm font-extrabold md:text-display text-white mb-3">{title}</h2>
        <p className="font-body text-[15px] text-white/70 max-w-xl mx-auto mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={primaryHref} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-charcoal font-body font-bold text-sm rounded-lg hover:bg-white/90 transition-all shadow-lg">
            {primaryCta}
          </Link>
          <Link href={secondaryHref} className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-body font-semibold text-sm rounded-lg hover:bg-white/10 transition-all">
            {secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
