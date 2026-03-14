'use client';

import Link from 'next/link';
import { BrandData } from '@/lib/types';

function BrandPill({
  brand,
  size,
}: {
  brand: BrandData;
  size: 'lg' | 'md' | 'sm';
}) {
  const sizeClasses = {
    lg: 'px-5 py-2.5 gap-3 rounded-full',
    md: 'px-4 py-2 gap-2.5 rounded-full',
    sm: 'px-3 py-1.5 gap-2 rounded-full',
  };
  const avatarClasses = {
    lg: 'w-9 h-9 text-sm',
    md: 'w-7 h-7 text-xs',
    sm: 'w-6 h-6 text-[10px]',
  };
  const textClasses = {
    lg: 'text-sm font-medium',
    md: 'text-[13px] font-medium',
    sm: 'text-xs',
  };
  const countClasses = {
    lg: 'text-xs px-2.5 py-0.5',
    md: 'text-[11px] px-2 py-0.5',
    sm: 'text-[10px] px-1.5 py-0.5',
  };

  const isTop = size === 'lg';

  return (
    <Link
      href={`/merke/${brand.slug}`}
      className={`group flex-shrink-0 inline-flex items-center ${sizeClasses[size]} transition-all duration-300 hover:-translate-y-0.5 ${
        isTop
          ? 'bg-white/[0.08] border border-white/[0.12] hover:bg-white/[0.12] brand-glow'
          : 'bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08]'
      }`}
    >
      <div
        className={`rounded-full flex items-center justify-center font-display font-semibold ${avatarClasses[size]} ${
          isTop ? 'bg-white text-charcoal' : 'bg-white/10 text-white/80'
        }`}
      >
        {brand.storeCount > 0 ? brand.storeCount : brand.name.charAt(0)}
      </div>
      <span className={`font-body ${textClasses[size]} ${isTop ? 'text-white' : 'text-white/70'}`}>
        {brand.name}
      </span>
      {brand.storeCount > 0 && size !== 'lg' && (
        <span className={`font-body ${countClasses[size]} rounded-full bg-white/[0.06] text-white/40`}>
          {brand.storeCount}
        </span>
      )}
    </Link>
  );
}

export default function BrandShowcase({ brands }: { brands: BrandData[] }) {
  // Split into tiers
  const topBrands = brands.filter((b) => b.storeCount >= 3);
  const midBrands = brands.filter((b) => b.storeCount >= 1 && b.storeCount < 3);
  const restBrands = brands.filter((b) => b.storeCount === 0).slice(0, 30);

  // Duplicate for seamless loop
  const row1 = [...topBrands, ...midBrands.slice(0, 6)];
  const row2 = [...midBrands.slice(6), ...restBrands.slice(0, 12)];
  const row1Loop = [...row1, ...row1];
  const row2Loop = [...row2, ...row2];

  return (
    <section className="bg-charcoal relative overflow-hidden">
      <div className="max-w-8xl mx-auto section-padding pt-16 pb-6 md:pt-22 md:pb-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
              Klesmerker
            </p>
            <h2 className="font-display text-display-sm md:text-display font-semibold text-white">
              Populære merker
            </h2>
          </div>
          <Link
            href="/merker"
            className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-white/40 hover:text-white transition-colors"
          >
            Se alle {brands.length} merker
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Marquee area */}
      <div
        className="relative pb-16 md:pb-22"
        onMouseEnter={(e) => {
          e.currentTarget.querySelectorAll<HTMLElement>('.brand-track').forEach(
            (el) => (el.style.animationPlayState = 'paused')
          );
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelectorAll<HTMLElement>('.brand-track').forEach(
            (el) => (el.style.animationPlayState = 'running')
          );
        }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

        {/* Row 1 — top brands, scroll left */}
        <div className="mb-3">
          <div
            className="brand-track flex gap-3"
            style={{
              animation: 'marqueeLeft 50s linear infinite',
              width: 'max-content',
            }}
          >
            {row1Loop.map((brand, i) => (
              <BrandPill
                key={`r1-${brand.slug}-${i}`}
                brand={brand}
                size={brand.storeCount >= 3 ? 'lg' : 'md'}
              />
            ))}
          </div>
        </div>

        {/* Row 2 — smaller brands, scroll right */}
        <div>
          <div
            className="brand-track flex gap-3"
            style={{
              animation: 'marqueeRight 60s linear infinite',
              width: 'max-content',
            }}
          >
            {row2Loop.map((brand, i) => (
              <BrandPill
                key={`r2-${brand.slug}-${i}`}
                brand={brand}
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-8xl mx-auto section-padding py-6 flex items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <span className="font-display text-xl sm:text-2xl font-semibold text-white">{brands.length}</span>
            <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-white/30 mt-0.5">merker</span>
          </div>
          <div className="text-center">
            <span className="font-display text-xl sm:text-2xl font-semibold text-white">42</span>
            <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-white/30 mt-0.5">med butikker</span>
          </div>
          <div className="text-center">
            <span className="font-display text-xl sm:text-2xl font-semibold text-white">15</span>
            <span className="block font-body text-[10px] sm:text-xs tracking-[0.12em] uppercase text-white/30 mt-0.5">fylker</span>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="pb-8 text-center sm:hidden">
        <Link href="/merker" className="inline-flex items-center gap-2 border border-white/20 text-white/60 rounded-full px-6 py-2.5 font-body text-sm hover:text-white hover:border-white/40 transition-colors">
          Se alle merker
        </Link>
      </div>
    </section>
  );
}
