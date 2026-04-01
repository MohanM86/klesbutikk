'use client';
import Link from 'next/link';
import { BrandData } from '@/lib/types';

export default function BrandShowcase({ brands }: { brands: BrandData[] }) {
  const top = brands.filter((b) => b.storeCount >= 2);
  const mid = brands.filter((b) => b.storeCount === 1);
  const rest = brands.filter((b) => b.storeCount === 0).slice(0, 20);
  const row1 = [...top, ...mid.slice(0, 8)];
  const row2 = [...mid.slice(8), ...rest.slice(0, 12)];

  return (
    <section className="bg-surface border-y border-border overflow-hidden">
      <div className="max-w-8xl mx-auto section-padding pt-14 pb-6 md:pt-20 md:pb-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="overline mb-2">Klesmerker</p>
            <h2 className="font-body text-display-sm font-extrabold md:text-display text-charcoal">{brands.length} merkevarer kartlagt</h2>
          </div>
          <Link href="/merker" className="hidden sm:inline-flex items-center gap-1 font-body text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
            Alle merker
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </Link>
        </div>
      </div>
      <div className="relative pb-14 md:pb-20"
        onMouseEnter={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.btrack').forEach((el) => (el.style.animationPlayState = 'paused'))}
        onMouseLeave={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.btrack').forEach((el) => (el.style.animationPlayState = 'running'))}>
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="mb-3">
          <div className="btrack flex gap-3" style={{ animation: 'marqueeLeft 50s linear infinite', width: 'max-content' }}>
            {[...row1, ...row1].map((b, i) => (
              <Link key={'t-' + b.slug + '-' + i} href={'/merke/' + b.slug}
                className={'flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 hover:border-accent/40 ' +
                  (b.storeCount >= 3 ? 'bg-accent-light border-accent/20 hover:bg-accent-light' : 'bg-cream border-border hover:bg-surface-alt')
                }>
                <span className={'font-body text-[13px] font-semibold ' + (b.storeCount >= 3 ? 'text-accent' : 'text-slate')}>{b.name}</span>
                {b.storeCount > 0 && <span className="font-body text-[11px] text-muted bg-surface-alt px-1.5 py-0.5 rounded-full">{b.storeCount}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="btrack flex gap-3" style={{ animation: 'marqueeRight 60s linear infinite', width: 'max-content' }}>
            {[...row2, ...row2].map((b, i) => (
              <Link key={'g-' + b.slug + '-' + i} href={'/merke/' + b.slug}
                className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 bg-cream border border-border rounded-full hover:border-accent/30 hover:bg-surface-alt transition-all duration-200">
                <span className="font-body text-xs text-muted">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
