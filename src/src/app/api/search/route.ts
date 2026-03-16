import { NextRequest, NextResponse } from 'next/server';
import { searchStores, getAllCities } from '@/lib/stores';
import { slugify } from '@/lib/slugify';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const qLower = q.toLowerCase();

  // Search cities
  const cities = getAllCities()
    .filter((c) => c.name.toLowerCase().includes(qLower))
    .slice(0, 3)
    .map((c) => ({
      type: 'city' as const,
      label: c.name,
      sublabel: `${c.storeCount} butikker · ${c.fylke}`,
      href: `/${c.slug}`,
    }));

  // Search stores
  const stores = searchStores(q)
    .slice(0, 5)
    .map((s) => ({
      type: 'store' as const,
      label: s.navn,
      sublabel: `${s.poststed} · ${s.fylke}`,
      href: `/butikk/${s.slug}`,
    }));

  return NextResponse.json({ results: [...cities, ...stores] });
}
