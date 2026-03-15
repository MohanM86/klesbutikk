'use client';
import Link from 'next/link';
import { BrandData } from '@/lib/types';

export default function BrandShowcase({ brands }: { brands: BrandData[] }) {
  const top = brands.filter((b) => b.storeCount >= 2);
  const mid = brands.filter((b) => b.storeCount === 1);
  const ghost = brands.filter((b) => b.storeCount === 0).slice(0, 20);
  const ghostNames = [...top, ...mid, ...ghost].map((b) => b.name.toUpperCase()).slice(0, 15);

  return (
    <section className="bg-black relative overflow-hidden border-t border-white/[0.04]">
      {/* Ghost marquee background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="flex gap-8 whitespace-nowrap opacity-[0.025] absolute top-8" style={{ animation: 'marqueeLeft 30s linear infinite' }}>
          {[...ghostNames, ...ghostNames].map((n, i) => (
            <span key={i} className="font-body text-[80px] md:text-[120px] font-black tracking-tight">{n}</span>
          ))}
        </div>
        <div className="flex gap-8 whitespace-nowrap opacity-[0.015] absolute bottom-8" style={{ animation: 'marqueeRight 40s linear infinite' }}>
          {[...ghostNames.reverse(), ...ghostNames].map((n, i) => (
            <span key={i} className="font-display text-[60px] md:text-[90px] font-light italic tracking-tight">{n}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto section-padding pt-16 pb-6 md:pt-22 md:pb-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-[9px] font-bold tracking-[0.3em] uppercase text-white/70 mb-2">Klesmerker</p>
            <h2 className="font-display text-display-sm md:text-display font-black text-white">Populaere merker</h2>
          </div>
          <Link href="/merker" className="hidden sm:inline-flex items-center gap-1.5 font-body text-[10px] font-bold text-white/55 hover:text-white transition-colors tracking-[0.12em] uppercase">
            Alle {brands.length} merker
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </Link>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden pb-16 md:pb-22"
        onMouseEnter={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.btrack').forEach((el) => (el.style.animationPlayState = 'paused'))}
        onMouseLeave={(e) => e.currentTarget.querySelectorAll<HTMLElement>('.btrack').forEach((el) => (el.style.animationPlayState = 'running'))}>
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="mb-2">
          <div className="btrack flex gap-2" style={{ animation: 'marqueeLeft 50s linear infinite', width: 'max-content' }}>
            {[...top, ...mid.slice(0, 8), ...top, ...mid.slice(0, 8)].map((b, i) => (
              <Link key={`t-${b.slug}-${i}`} href={`/merke/${b.slug}`}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 border transition-all duration-200 hover:bg-white/[0.08] ${
                  b.storeCount >= 3 ? 'bg-white/[0.06] border-white/[0.1] brand-glow' : 'bg-white/[0.02] border-white/[0.05]'
                }`}>
                <span className={`font-body text-xs font-black ${b.storeCount >= 3 ? 'text-white' : 'text-white/70'}`}>{b.name}</span>
                {b.storeCount > 0 && <span className="font-body text-[10px] text-white/55">{b.storeCount}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="btrack flex gap-2" style={{ animation: 'marqueeRight 60s linear infinite', width: 'max-content' }}>
            {[...ghost.slice(0, 15), ...mid, ...ghost.slice(0, 15), ...mid].map((b, i) => (
              <Link key={`g-${b.slug}-${i}`} href={`/merke/${b.slug}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 bg-white/[0.015] border border-white/[0.03] hover:bg-white/[0.05] transition-all duration-200">
                <span className="font-body text-[11px] text-white/60">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
