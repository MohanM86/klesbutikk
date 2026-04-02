import { NextRequest, NextResponse } from 'next/server';
import { searchStores, getAllCities } from '@/lib/stores';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() || '';
  if (q.length < 2) return NextResponse.json({ results: [] });

  const results: { type: string; label: string; sublabel: string; href: string }[] = [];

  const cities = getAllCities().filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  for (const city of cities.slice(0, 5)) {
    results.push({ type: 'city', label: city.name, sublabel: city.fylke + ' · ' + city.storeCount + ' butikker', href: '/' + city.slug });
  }

  const stores = searchStores(q);
  for (const store of stores.slice(0, 5)) {
    results.push({ type: 'store', label: store.navn, sublabel: store.adresse + ', ' + store.poststed, href: '/butikk/' + store.slug });
  }

  return NextResponse.json({ results: results.slice(0, 8) });
}
