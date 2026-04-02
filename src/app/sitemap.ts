import { MetadataRoute } from 'next';
import { getAllStores, getAllCities, getAllFylker } from '@/lib/stores';

const BASE = 'https://klesbutikk.no';

export default function sitemap(): MetadataRoute.Sitemap {
  const stores = getAllStores();
  const cities = getAllCities();
  const fylker = getAllFylker();

  const pages = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: BASE + '/fylker', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: BASE + '/kommuner', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: BASE + '/butikk', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: BASE + '/om-oss', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: BASE + '/personvern', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: BASE + '/vilkar', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
  ];

  const fylkePages = fylker.map((f) => ({ url: BASE + '/fylke/' + f.slug, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }));
  const cityPages = cities.map((c) => ({ url: BASE + '/' + c.slug, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }));
  const storePages = stores.map((s) => ({ url: BASE + '/butikk/' + s.slug, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 }));

  return [...pages, ...fylkePages, ...cityPages, ...storePages];
}
