import { MetadataRoute } from 'next';
import { getAllStores, getAllCities, getAllFylker } from '@/lib/stores';

const BASE_URL = 'https://klesbutikk.no';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/by`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/fylker`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/butikk`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/blogg`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/annonser`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/legg-til-butikk`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/om-oss`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const cityPages: MetadataRoute.Sitemap = getAllCities().map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const fylkePages: MetadataRoute.Sitemap = getAllFylker().map((f) => ({
    url: `${BASE_URL}/fylke/${f.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const storePages: MetadataRoute.Sitemap = getAllStores().map((s) => ({
    url: `${BASE_URL}/butikk/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...fylkePages, ...storePages];
}
