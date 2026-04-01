import Link from 'next/link';

export default function CTASection({
  title = 'Utforsk alle klesbutikker i Norge',
  description = 'Sok blant over 1 500 butikker, 483 merker og 357 kommuner.',
  primaryCta = 'Finn butikker naer deg',
  primaryHref = '/by',
  secondaryCta = 'Se alle merker',
  secondaryHref = '/merker',
}: {
  title?: string; description?: string; primaryCta?: string; primaryHref?: string; secondaryCta?: string; secondaryHref?: string;
}) {
  return (
    <section className="bg-accent text-white text-center py-14 md:py-16">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="font-body text-[22px] md:text-[28px] font-extrabold tracking-tight mb-2">{title}</h2>
        <p className="font-body text-sm text-white/70 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={primaryHref} className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-body font-bold text-sm rounded-full hover:bg-charcoal transition-colors">
            {primaryCta}
          </Link>
          <Link href={secondaryHref} className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-body font-semibold text-sm rounded-full hover:bg-white/10 transition-colors">
            {secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
