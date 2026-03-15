import { Metadata } from 'next';

const SITE_NAME = 'Klesbutikk.no';
const SITE_URL = 'https://klesbutikk.no';
const SITE_DESC = 'Finn klesbutikker i hele Norge. Oppdag motebutikker, designerbutikker og lokale favoritter nær deg.';

export function createMetadata(options: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${options.path || ''}`;
  return {
    title: `${options.title} | ${SITE_NAME}`,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${options.title} | ${SITE_NAME}`,
      description: options.description,
      url,
      siteName: SITE_NAME,
      locale: 'nb_NO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${options.title} | ${SITE_NAME}`,
      description: options.description,
    },
    robots: options.noIndex ? { index: false, follow: true } : undefined,
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESC,
    logo: `${SITE_URL}/icon-512x512.png`,
    foundingDate: '2026',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hei@klesbutikk.no',
      contactType: 'customer service',
      availableLanguage: 'Norwegian',
    },
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESC,
    inLanguage: 'nb',
    dateModified: new Date().toISOString().split('T')[0],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/api/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function datasetSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Klesbutikker i Norge',
    description: 'Komplett oversikt over 1 566 klesbutikker i Norge med verifiserte data.',
    url: SITE_URL,
    license: 'https://data.norge.no/nlod/no/2.0',
    creator: { '@type': 'Organization', name: 'Klesbutikk.no' },
    distribution: {
      '@type': 'DataDownload',
      contentUrl: `${SITE_URL}/entity-index.json`,
      encodingFormat: 'application/json',
    },
    spatialCoverage: { '@type': 'Place', name: 'Norge' },
    temporalCoverage: '2026',
    variableMeasured: ['Store count', 'Brand count', 'City count'],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function localBusinessSchema(store: {
  navn: string;
  adresse: string;
  postnummer: string;
  poststed: string;
  telefon?: string;
  nettside?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: store.navn,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.adresse,
      postalCode: store.postnummer,
      addressLocality: store.poststed,
      addressCountry: 'NO',
    },
    ...(store.telefon && { telephone: store.telefon }),
    ...(store.nettside && { url: store.nettside }),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

export { SITE_NAME, SITE_URL, SITE_DESC };
