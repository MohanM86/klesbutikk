'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RecentItem {
  name: string;
  href: string;
  type: 'by' | 'butikk' | 'merke';
  timestamp: number;
}

const STORAGE_KEY = 'kb-recent';
const MAX_ITEMS = 5;

export function trackVisit(name: string, href: string, type: RecentItem['type']) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items: RecentItem[] = raw ? JSON.parse(raw) : [];
    const filtered = items.filter((i) => i.href !== href);
    filtered.unshift({ name, href, type, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  if (items.length === 0) return null;

  const typeLabel = (t: string) => t === 'by' ? 'By' : t === 'butikk' ? 'Butikk' : 'Merke';

  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-8xl mx-auto section-padding py-4">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <span className="font-body text-xs font-bold text-muted whitespace-nowrap flex-shrink-0">Nylig sett</span>
          {items.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-2 bg-cream border border-border rounded-xl px-3 py-2 hover:border-accent transition-colors flex-shrink-0">
              <div className="w-6 h-6 rounded-lg bg-accent-light flex items-center justify-center">
                <span className="font-body text-[10px] font-extrabold text-accent">{item.name.charAt(0)}</span>
              </div>
              <span className="font-body text-xs font-semibold text-charcoal whitespace-nowrap">{item.name}</span>
              <span className="font-body text-[10px] text-muted">{typeLabel(item.type)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
