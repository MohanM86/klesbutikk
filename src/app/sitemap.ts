import { MetadataRoute } from 'next';
import { getAllStores, getAllCities, getAllFylker, getAllBrands } from '@/lib/stores';
import { slugify } from '@/lib/slugify';

const BASE_URL = 'https://klesbutikk.no';

const TOP_10_CITIES = [
  'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand',
  'Drammen', 'Tromsø', 'Fredrikstad', 'Sandnes', 'Haugesund',
];

const TOP_50_CITIES = [
  ...TOP_10_CITIES,
  'Tønsberg', 'Holmestrand', 'Porsgrunn', 'Ålesund', 'Bodø',
  'Sarpsborg', 'Arendal', 'Hamar', 'Larvik', 'Kongsberg',
  'Molde', 'Moss', 'Skien', 'Lillehammer', 'Harstad', 'Halden',
  'Sandefjord', 'Gjøvik', 'Narvik', 'Kristiansund', 'Horten',
  'Mandal', 'Grimstad', 'Lillestrøm', 'Ski', 'Asker', 'Bærum',
  'Lørenskog', 'Jessheim', 'Eidsvoll', 'Råholt', 'Ås', 'Drøbak',
  'Vestby', 'Son', 'Askim', 'Mysen', 'Rakkestad', 'Elverum', 'Kongsvinger',
];

const CATEGORY_SLUGS = [
  'dameklar', 'herreklar', 'barneklar', 'designer', 'vintage',
  'sport', 'arbeidsklar', 'brud', 'undertoy', 'bunad',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/by`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/fylker`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/merker`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/kategorier`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/butikk`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/artikler`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/annonser`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/legg-til-butikk`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/om-oss`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // City pages
  const cityPages: MetadataRoute.Sitemap = getAllCities().map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Fylke pages
  const fylkePages: MetadataRoute.Sitemap = getAllFylker().map((f) => ({
    url: `${BASE_URL}/fylke/${f.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Store pages
  const storePages: MetadataRoute.Sitemap = getAllStores().map((s) => ({
    url: `${BASE_URL}/butikk/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Brand pages
  const brands = getAllBrands();
  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${BASE_URL}/merke/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Brand + City cross-pages
  const brandCityPages: MetadataRoute.Sitemap = [];
  for (const brand of brands) {
    for (const city of TOP_10_CITIES) {
      brandCityPages.push({
        url: `${BASE_URL}/merke/${brand.slug}/${slugify(city)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  // Category + City cross-pages
  const catCityPages: MetadataRoute.Sitemap = [];
  for (const catSlug of CATEGORY_SLUGS) {
    for (const city of TOP_50_CITIES) {
      catCityPages.push({
        url: `${BASE_URL}/kategori/${catSlug}/${slugify(city)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  // Fylke + Category cross-pages
  const fylkeCatPages: MetadataRoute.Sitemap = [];
  for (const f of getAllFylker()) {
    for (const catSlug of CATEGORY_SLUGS) {
      fylkeCatPages.push({
        url: `${BASE_URL}/fylke/${f.slug}/${catSlug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return [
    ...staticPages,
    ...cityPages,
    ...fylkePages,
    ...brandPages,
    ...brandCityPages,
    ...catCityPages,
    ...fylkeCatPages,
    ...storePages,
  ];
}
