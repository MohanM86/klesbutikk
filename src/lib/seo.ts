import { Metadata } from 'next';

const SITE_NAME = 'Klesbutikk.no';
const SITE_URL = 'https://klesbutikk.no';
const SITE_DESC = 'Finn klesbutikker i hele Norge. 1 566 registrerte klesbutikker i 357 kommuner og 15 fylker.';

export function createMetadata(options: { title: string; description: string; path?: string; noIndex?: boolean; }): Metadata {
  const url = SITE_URL + (options.path || '');
  return {
    title: options.title + ' | ' + SITE_NAME,
    description: options.description,
    alternates: { canonical: url },
    openGraph: { title: options.title + ' | ' + SITE_NAME, description: options.description, url, siteName: SITE_NAME, locale: 'nb_NO', type: 'website' },
    twitter: { card: 'summary_large_image', title: options.title + ' | ' + SITE_NAME, description: options.description },
    robots: options.noIndex ? { index: false, follow: true } : undefined,
  };
}

export function organizationSchema() {
  return { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: SITE_URL, description: SITE_DESC, logo: SITE_URL + '/icon-512x512.png', foundingDate: '2026', contactPoint: { '@type': 'ContactPoint', email: 'hei@klesbutikk.no', contactType: 'customer service', availableLanguage: 'Norwegian' } };
}

export function webSiteSchema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL, description: SITE_DESC, inLanguage: 'nb', potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: SITE_URL + '/api/search?q={search_term_string}' }, 'query-input': 'required name=search_term_string' } };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: SITE_URL + item.url })) };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
}

export function localBusinessSchema(store: { navn: string; adresse: string; postnummer: string; poststed: string; }) {
  return { '@context': 'https://schema.org', '@type': 'ClothingStore', name: store.navn, address: { '@type': 'PostalAddress', streetAddress: store.adresse, postalCode: store.postnummer, addressLocality: store.poststed, addressCountry: 'NO' } };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: SITE_URL + item.url })) };
}

export { SITE_NAME, SITE_URL, SITE_DESC };
