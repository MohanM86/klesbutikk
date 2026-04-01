'use client';
import Link from 'next/link';
import { BrandData } from '@/lib/types';

export default function BrandShowcase({ brands }: { brands: BrandData[] }) {
  const top = brands.filter((b) => b.storeCount >= 2);
  const mid = brands.filter((b) => b.storeCount === 1);
  const rest = brands.filter((b) => b.storeCount === 0).slice(0, 16);
  const row1 = [...top, ...mid.slice(0, 8)];
  const row2 = [...mid.slice(8, 20), ...rest];

  return (
    <section className="border-y border-border overflow-hidden">
      <div className="max-w-8xl mx-auto section-padding pt-10 pb-4 md:pt-14 md:pb-6">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">{brands.length} merker</h2>
          <Link href="/merker" className="font-body text-[13px] font-semibold text-black border-b border-black pb-px hover:text-accent hover:border-accent transition-colors">Alle merker</Link>
        </div>
      </div>
      <div className="relative pb-10 md:pb-14"
        onMouseEnter={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.btrack').forEach((el) => (el.style.animationPlayState = 'paused'))}
        onMouseLeave={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.btrack').forEach((el) => (el.style.animationPlayState = 'running'))}>
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="mb-2">
          <div className="btrack flex gap-2" style={{ animation: 'marqueeLeft 45s linear infinite', width: 'max-content' }}>
            {[...row1, ...row1].map((b, i) => (
              <Link key={'t-' + b.slug + '-' + i} href={'/merke/' + b.slug}
                className={'flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-150 hover:border-accent hover:text-accent ' +
                  (b.storeCount >= 3 ? 'border-black text-black font-bold' : 'border-border text-slate font-semibold')
                }>
                <span className="font-body text-[13px]">{b.name}</span>
                {b.storeCount > 0 && <span className="font-body text-[11px] text-muted">{b.storeCount}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="btrack flex gap-2" style={{ animation: 'marqueeRight 55s linear infinite', width: 'max-content' }}>
            {[...row2, ...row2].map((b, i) => (
              <Link key={'g-' + b.slug + '-' + i} href={'/merke/' + b.slug}
                className="flex-shrink-0 inline-flex items-center px-3 py-1.5 border border-border rounded-full hover:border-accent transition-colors duration-150">
                <span className="font-body text-xs text-muted hover:text-accent">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
