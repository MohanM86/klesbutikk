'use client';
import { useEffect, useRef, useState } from 'react';

const DATA = [
  { year: '2019', vintage: 18, barekraft: 12 },
  { year: '2020', vintage: 24, barekraft: 19 },
  { year: '2021', vintage: 32, barekraft: 28 },
  { year: '2022', vintage: 41, barekraft: 38 },
  { year: '2023', vintage: 52, barekraft: 49 },
  { year: '2024', vintage: 58, barekraft: 56 },
  { year: '2025', vintage: 64, barekraft: 65 },
];

export default function SustainabilityTrend() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const w = 400;
  const h = 180;
  const padL = 32;
  const padR = 12;
  const padT = 12;
  const padB = 28;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const maxVal = 70;

  const toX = (i: number) => padL + (i / (DATA.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const vintagePath = DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.vintage)}`).join(' ');
  const barekraftPath = DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.barekraft)}`).join(' ');

  // Area fill
  const vintageArea = vintagePath + ` L${toX(DATA.length - 1)},${h - padB} L${padL},${h - padB} Z`;

  return (
    <div ref={ref} className="bg-white border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-body text-xs font-bold text-accent mb-0.5">Trend</p>
          <p className="font-body text-base font-extrabold text-charcoal">Bærekraft og vintage i vekst</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-[3px] rounded-full bg-accent" />
            <span className="font-body text-[10px] text-muted">Vintage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-[3px] rounded-full bg-charcoal/20" />
            <span className="font-body text-[10px] text-muted">Bærekraft</span>
          </div>
        </div>
      </div>

      <div className="relative" onMouseLeave={() => setHovered(null)}>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 20, 40, 60].map((v) => (
            <g key={v}>
              <line x1={padL} y1={toY(v)} x2={w - padR} y2={toY(v)} stroke="#e8e8e8" strokeWidth="0.5" />
              <text x={padL - 6} y={toY(v) + 3} textAnchor="end" className="font-body" fill="#aaa" fontSize="8">{v}</text>
            </g>
          ))}

          {/* Year labels */}
          {DATA.map((d, i) => (
            <text key={d.year} x={toX(i)} y={h - 6} textAnchor="middle" className="font-body" fill="#aaa" fontSize="8">
              {d.year.slice(2)}
            </text>
          ))}

          {/* Area fill */}
          <path
            d={vintageArea}
            fill="url(#vintageGrad)"
            style={{
              opacity: visible ? 0.12 : 0,
              transition: 'opacity 1s ease 0.5s',
            }}
          />

          {/* Lines */}
          <path
            d={vintagePath}
            fill="none"
            stroke="#FF6900"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: visible ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          />
          <path
            d={barekraftPath}
            fill="none"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.15"
            style={{
              strokeDasharray: 600,
              strokeDashoffset: visible ? 0 : 600,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
            }}
          />

          {/* Dots */}
          {DATA.map((d, i) => (
            <g key={`dot-${i}`}>
              <circle
                cx={toX(i)}
                cy={toY(d.vintage)}
                r={hovered === i ? 5 : 3}
                fill="#FF6900"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `all 0.3s ease ${0.8 + i * 0.08}s`,
                }}
              />
              <circle
                cx={toX(i)}
                cy={toY(d.barekraft)}
                r={hovered === i ? 4 : 2.5}
                fill="#111111"
                opacity="0.2"
                style={{
                  opacity: visible ? 0.2 : 0,
                  transition: `all 0.3s ease ${0.8 + i * 0.08}s`,
                }}
              />
            </g>
          ))}

          {/* Hover zones */}
          {DATA.map((d, i) => (
            <rect
              key={`zone-${i}`}
              x={toX(i) - chartW / DATA.length / 2}
              y={padT}
              width={chartW / DATA.length}
              height={chartH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
            />
          ))}

          {/* Hover line */}
          {hovered !== null && (
            <line
              x1={toX(hovered)}
              y1={padT}
              x2={toX(hovered)}
              y2={h - padB}
              stroke="#FF6900"
              strokeWidth="0.5"
              strokeDasharray="3,3"
              opacity="0.4"
            />
          )}

          <defs>
            <linearGradient id="vintageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6900" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF6900" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hover tooltip */}
        {hovered !== null && (
          <div
            className="absolute bg-charcoal text-white rounded-xl px-3 py-2 pointer-events-none shadow-lg z-10"
            style={{
              left: `${(toX(hovered) / w) * 100}%`,
              top: `${(toY(DATA[hovered].vintage) / h) * 100 - 14}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <span className="font-body text-[10px] text-white/50 block">{DATA[hovered].year}</span>
            <span className="font-body text-xs font-bold text-accent">{DATA[hovered].vintage} butikker</span>
          </div>
        )}
      </div>
    </div>
  );
}
