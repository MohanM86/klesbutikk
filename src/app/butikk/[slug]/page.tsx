import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import CTASection from '@/components/CTASection';
import { getAllStores, getStoreBySlug, getRelatedStores } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, localBusinessSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllStores().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const store = getStoreBySlug(params.slug);
  if (!store) return {};

  return createMetadata({
    title: `${store.navn} | Klesbutikk i ${store.poststed}`,
    description: `${store.navn} er en klesbutikk i ${store.poststed}, ${store.fylke}. Se adresse, kontaktinfo og lignende butikker i ${store.poststed}.`,
    path: `/butikk/${store.slug}`,
  });
}

export default function StorePage({ params }: PageProps) {
  const store = getStoreBySlug(params.slug);
  if (!store) notFound();

  const related = getRelatedStores(store, 6);
  const citySlug = slugify(store.poststed);

  const bcSchema = breadcrumbSchema([
    { name: 'Butikker', url: '/butikk' },
    { name: store.poststed, url: `/${citySlug}` },
    { name: store.navn, url: `/butikk/${store.slug}` },
  ]);

  const lbSchema = localBusinessSchema(store);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lbSchema) }} />

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <Breadcrumbs
          items={[
            { label: 'Butikker', href: '/butikk' },
            { label: store.poststed, href: `/${citySlug}` },
            { label: store.navn },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <span className="font-body text-2xl font-extrabold text-white">
                  {store.navn.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-body text-2xl md:text-3xl font-extrabold text-charcoal">
                    {store.navn}
                  </h1>
                </div>
                <p className="font-body text-muted">
                  Klesbutikk i{' '}
                  <Link href={`/${citySlug}`} className="underline hover:text-accent transition-colors">
                    {store.poststed}
                  </Link>
                  , {store.fylke}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-cream border border-border rounded-lg divide-y divide-border mb-8">
              <DetailRow label="Adresse" value={`${store.adresse}, ${store.postnummer} ${store.poststed}`} />
              <DetailRow label="Kommune" value={store.kommune} />
              <DetailRow label="Fylke" value={store.fylke} />
              <DetailRow label="Organisasjonsnummer" value={store.organisasjonsnummer} />
              {store.telefon && <DetailRow label="Telefon" value={store.telefon} href={`tel:${store.telefon.replace(/\s/g, '')}`} />}
              {store.epost && <DetailRow label="E-post" value={store.epost} href={`mailto:${store.epost}`} />}
              {store.nettside && (
                <DetailRow
                  label="Nettside"
                  value={store.nettside.replace(/^https?:\/\//, '')}
                  href={store.nettside}
                  external
                />
              )}
              {store.antallAnsatte && <DetailRow label="Antall ansatte" value={store.antallAnsatte.toString()} />}
              <DetailRow label="Kategori" value={store.kategori} />
            </div>

            {/* Brands / Merker */}
            {store.merker && store.merker.length > 0 && (
              <div className="mb-8">
                <h2 className="font-body text-xl font-extrabold text-charcoal mb-3">
                  Merker hos {store.navn}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {store.merker.map((merke) => (
                    <Link
                      key={merke}
                      href={`/merke/${merke.toLowerCase().replace(/ /g, '-').replace(/æ/g,'ae').replace(/ø/g,'oe').replace(/å/g,'aa').replace(/ö/g,'o').replace(/&/g,'and').replace(/\./g,'')}`}
                      className="inline-flex items-center gap-1.5 font-body text-sm border border-border rounded-lg px-4 py-2 hover:border-accent hover:text-accent transition-colors text-muted"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
                      </svg>
                      {merke}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Description / SEO text */}
            <div className="mb-8">
              <h2 className="font-body text-xl font-extrabold text-charcoal mb-3">
                Om {store.navn}
              </h2>
              <p className="font-body text-muted leading-relaxed">
                {store.navn} er en klesbutikk i {store.poststed}, {store.fylke}. Butikken holder til
                i {store.adresse}, {store.postnummer} {store.poststed} og er registrert med
                Kategori: Klesbutikk
                (org.nr. {store.organisasjonsnummer}).
                {store.telefon && ` Du kan kontakte butikken på telefon ${store.telefon}.`}
                {store.nettside && ` Besøk nettsiden for mer informasjon om utvalg og åpningstider.`}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Map placeholder */}
            <div className="bg-surface-alt border border-border rounded-lg h-48 flex items-center justify-center mb-6 sticky top-24">
              <div className="text-center">
                <svg className="w-8 h-8 text-muted mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="font-body text-xs text-muted">{store.postnummer} {store.poststed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related stores */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="font-body text-display-sm font-extrabold text-charcoal mb-6">
              Andre klesbutikker i {store.poststed}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((s) => (
                <StoreCard key={s.organisasjonsnummer} store={s} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href={`/${citySlug}`} className="btn-secondary text-sm">
                Se alle butikker i {store.poststed}
              </Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16">
          <CTASection />
        </div>
      </div>
    </>
  );
}

function DetailRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-start justify-between px-5 py-3.5">
      <span className="font-body text-sm text-muted flex-shrink-0 w-40">{label}</span>
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="font-body text-sm text-charcoal text-right hover:underline"
        >
          {value}
          {external && (
            <svg className="w-3 h-3 inline ml-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </a>
      ) : (
        <span className="font-body text-sm text-charcoal text-right">{value}</span>
      )}
    </div>
  );
}
