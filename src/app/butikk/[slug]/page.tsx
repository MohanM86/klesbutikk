import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import { getAllStores, getStoreBySlug, getRelatedStores } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, localBusinessSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

interface PageProps { params: { slug: string }; }

export async function generateStaticParams() {
  return getAllStores().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const store = getStoreBySlug(params.slug);
  if (!store) return {};
  return createMetadata({
    title: store.navn + ' | Klesbutikk i ' + store.poststed,
    description: store.navn + ' er en klesbutikk i ' + store.poststed + ', ' + store.fylke + '. Se adresse og annen informasjon.',
    path: '/butikk/' + store.slug,
  });
}

export default function StorePage({ params }: PageProps) {
  const store = getStoreBySlug(params.slug);
  if (!store) notFound();

  const related = getRelatedStores(store, 6);
  const citySlug = slugify(store.poststed);
  const fylkeSlug = slugify(store.fylke);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: store.fylke, url: '/fylke/' + fylkeSlug }, { name: store.poststed, url: '/' + citySlug }, { name: store.navn, url: '/butikk/' + store.slug }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(store)) }} />

      {/* Hero */}
      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: store.fylke, href: '/fylke/' + fylkeSlug }, { label: store.poststed, href: '/' + citySlug }, { label: store.navn }]} />
          <div className="flex items-center gap-4 mt-4">
            <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <span className="font-body text-xl font-extrabold text-white">{store.navn.charAt(0)}</span>
            </div>
            <div>
              <h1 className="font-body text-2xl md:text-3xl font-extrabold text-white">{store.navn}</h1>
              <p className="font-body text-white/50">Klesbutikk i <Link href={'/' + citySlug} className="underline hover:text-accent transition-colors">{store.poststed}</Link>, {store.fylke}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Public info */}
            <h2 className="font-body text-lg font-extrabold text-black mb-4">Butikkinformasjon</h2>
            <div className="border border-border rounded-lg divide-y divide-border mb-8">
              <Row label="Butikknavn" value={store.navn} />
              <Row label="Adresse" value={store.adresse + ', ' + store.postnummer + ' ' + store.poststed} />
              <Row label="Kommune" value={store.kommune} />
              <Row label="Fylke" value={store.fylke} />
              <Row label="Organisasjonsnummer" value={store.organisasjonsnummer} />
            </div>

            {/* Locked info - CTA */}
            <div className="border border-border rounded-lg p-6 mb-8 bg-surface-alt">
              <h3 className="font-body text-base font-bold text-black mb-2">Mer informasjon</h3>
              <p className="font-body text-[13px] text-slate mb-4">Nettside, telefon, åpningstider, beskrivelse og mer er tilgjengelig for butikker som har oppdatert sin oppføring.</p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {['Nettside', 'Telefon', 'Åpningstider', 'Beskrivelse', 'Bilder', 'Sosiale medier'].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-body text-[12px] text-muted">
                    <svg className="w-3.5 h-3.5 text-border-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    {item}
                  </div>
                ))}
              </div>
              <a href="mailto:hei@klesbutikk.no" className="inline-flex items-center justify-center px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-body font-bold text-sm rounded-full transition-colors">
                Er dette din butikk? Oppgrader oppføringen
              </a>
            </div>

            {/* About */}
            <h2 className="font-body text-lg font-extrabold text-black mb-3">Om {store.navn}</h2>
            <p className="font-body text-[14px] text-slate leading-relaxed">
              {store.navn} er en registrert klesbutikk i {store.poststed}, {store.fylke}. Butikken holder til i {store.adresse}, {store.postnummer} {store.poststed} og er registrert i Brønnøysundregistrene med organisasjonsnummer {store.organisasjonsnummer}.
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface-alt rounded-lg p-5 mb-6 sticky top-[90px]">
              <h3 className="font-body text-sm font-bold text-black mb-3">Hurtiginfo</h3>
              <div className="space-y-3 font-body text-[13px]">
                <div className="flex justify-between"><span className="text-muted">Kommune</span><Link href={'/' + citySlug} className="text-accent font-semibold">{store.poststed}</Link></div>
                <div className="flex justify-between"><span className="text-muted">Fylke</span><Link href={'/fylke/' + fylkeSlug} className="text-accent font-semibold">{store.fylke}</Link></div>
                <div className="flex justify-between"><span className="text-muted">Postnummer</span><span className="text-black">{store.postnummer}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="font-body text-display-sm font-extrabold text-black mb-6">Andre klesbutikker i {store.poststed}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((s) => <StoreCard key={s.organisasjonsnummer} store={s} />)}
            </div>
            <div className="mt-6 text-center">
              <Link href={'/' + citySlug} className="btn-outline text-sm">Se alle butikker i {store.poststed}</Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between px-5 py-3.5">
      <span className="font-body text-sm text-muted flex-shrink-0 w-44">{label}</span>
      <span className="font-body text-sm text-black text-right">{value}</span>
    </div>
  );
}
