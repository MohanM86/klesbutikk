'use client';

const ITEMS = [
  '1 566 butikker registrert',
  '357 kommuner dekket',
  '15 fylker fra sør til nord',
  'Basert på offentlige data',
  'Oppdateres jevnlig',
  'Gratis å bruke',
];

export default function Ticker() {
  return (
    <div className="border-y border-border overflow-hidden py-2.5"
      onMouseEnter={(e) => { const t = e.currentTarget.querySelector('.ticker-track') as HTMLElement; if (t) t.style.animationPlayState = 'paused'; }}
      onMouseLeave={(e) => { const t = e.currentTarget.querySelector('.ticker-track') as HTMLElement; if (t) t.style.animationPlayState = 'running'; }}>
      <div className="ticker-track flex gap-8" style={{ animation: 'marqueeLeft 25s linear infinite', width: 'max-content' }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-2 font-body text-[12px] text-muted whitespace-nowrap">
            <span className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
