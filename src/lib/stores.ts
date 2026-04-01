import storesData from '../data/stores.json';
import brandsData from '../data/brands.json';
import { Store, CityData, FylkeData, BrandData } from './types';
import { slugify } from './slugify';

const stores: Store[] = storesData as Store[];
const brands: BrandData[] = brandsData as BrandData[];

// ─── ALL STORES ───────────────────────────────────────────
export function getAllStores(): Store[] {
  return stores;
}

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug);
}

export function searchStores(query: string): Store[] {
  const q = query.toLowerCase();
  return stores.filter(
    (s) =>
      s.navn.toLowerCase().includes(q) ||
      s.poststed.toLowerCase().includes(q) ||
      s.kommune.toLowerCase().includes(q) ||
      s.fylke.toLowerCase().includes(q) ||
      (s.merker && s.merker.some((m) => m.toLowerCase().includes(q)))
  );
}

// ─── CITIES ───────────────────────────────────────────────
export function getAllCities(): CityData[] {
  const cityMap = new Map<string, { fylke: string; count: number }>();

  for (const s of stores) {
    const key = s.poststed;
    if (!cityMap.has(key)) {
      cityMap.set(key, { fylke: s.fylke, count: 0 });
    }
    cityMap.get(key)!.count++;
  }

  return Array.from(cityMap.entries())
    .map(([name, data]) => ({
      name,
      slug: slugify(name),
      fylke: data.fylke,
      storeCount: data.count,
    }))
    .sort((a, b) => b.storeCount - a.storeCount);
}

export function getCityBySlug(slug: string): CityData | undefined {
  return getAllCities().find((c) => c.slug === slug);
}

export function getStoresByCity(cityName: string): Store[] {
  return stores.filter((s) => s.poststed === cityName);
}

export function getStoresByCitySlug(slug: string): Store[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return getStoresByCity(city.name);
}

export function getTopCities(limit: number = 10): CityData[] {
  return getAllCities().slice(0, limit);
}

// ─── FYLKER ───────────────────────────────────────────────
export function getAllFylker(): FylkeData[] {
  const fylkeMap = new Map<string, { count: number; cities: Set<string> }>();

  for (const s of stores) {
    if (!s.fylke) continue;
    if (!fylkeMap.has(s.fylke)) {
      fylkeMap.set(s.fylke, { count: 0, cities: new Set() });
    }
    const f = fylkeMap.get(s.fylke)!;
    f.count++;
    f.cities.add(s.poststed);
  }

  return Array.from(fylkeMap.entries())
    .map(([name, data]) => ({
      name,
      slug: slugify(name),
      storeCount: data.count,
      cities: Array.from(data.cities).sort(),
    }))
    .sort((a, b) => b.storeCount - a.storeCount);
}

export function getFylkeBySlug(slug: string): FylkeData | undefined {
  return getAllFylker().find((f) => f.slug === slug);
}

export function getStoresByFylke(fylkeName: string): Store[] {
  return stores.filter((s) => s.fylke === fylkeName);
}

export function getStoresByFylkeSlug(slug: string): Store[] {
  const fylke = getFylkeBySlug(slug);
  if (!fylke) return [];
  return getStoresByFylke(fylke.name);
}

// ─── BRANDS ──────────────────────────────────────────────
export function getAllBrands(): BrandData[] {
  return brands;
}

export function getBrandBySlug(slug: string): BrandData | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getStoresByBrand(brandName: string): Store[] {
  return stores.filter((s) => s.merker && s.merker.includes(brandName));
}

export function getStoresByBrandSlug(slug: string): Store[] {
  const brand = getBrandBySlug(slug);
  if (!brand) return [];
  return getStoresByBrand(brand.name);
}

export function getBrandsByCity(cityName: string): BrandData[] {
  const cityStores = getStoresByCity(cityName);
  const brandNames = new Set<string>();
  for (const s of cityStores) {
    if (s.merker) s.merker.forEach((m) => brandNames.add(m));
  }
  return brands.filter((b) => brandNames.has(b.name));
}

export function getTopBrands(limit: number = 20): BrandData[] {
  return brands.slice(0, limit);
}

// ─── RELATED ──────────────────────────────────────────────
export function getRelatedStores(store: Store, limit: number = 6): Store[] {
  return stores
    .filter((s) => s.slug !== store.slug && s.poststed === store.poststed)
    .slice(0, limit);
}

// ─── STATS ────────────────────────────────────────────────
export function getStats() {
  return {
    totalStores: stores.length,
    totalCities: getAllCities().length,
    totalFylker: getAllFylker().length,
    totalBrands: brands.length,
  };
}

// ─── WEBSHOPS ─────────────────────────────────────────────
export function getStoresWithWebsite(): Store[] {
  return stores.filter((s) => s.nettside && s.nettside.length > 3);
}
