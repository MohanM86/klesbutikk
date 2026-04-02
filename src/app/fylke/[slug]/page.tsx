import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllFylker, getFylkeBySlug, getStoresByFylkeSlug, getAllCities } from '@/lib/stores';
import { createMetadata, breadcrumbSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

interface PageProps { params: { slug: string }; }

export async function generateStaticParams() {
  return getAllFylker().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fylke = getFylkeBySlug(params.slug);
  if (!fylke) return {};
  return createMetadata({
    title: 'Klesbutikker i ' + fylke.name + ' | ' + fylke.storeCount + ' butikker',
    description: 'Finn alle ' + fylke.storeCount + ' klesbutikker i ' + fylke.name + '. Se butikker i ' + fylke.cities.slice(0, 5).join(', ') + ' og andre kommuner.',
    path: '/fylke/' + fylke.slug,
  });
}

export default function FylkePage({ params }: PageProps) {
  const fylke = getFylkeBySlug(params.slug);
  if (!fylke) notFound();

  const stores = getStoresByFylkeSlug(params.slug);
  const allCities = getAllCities().filter((c) => c.fylke === fylke.name);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Fylker', url: '/fylker' }, { name: fylke.name, url: '/fylke/' + fylke.slug }])) }} />

      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: 'Fylker', href: '/fylker' }, { label: fylke.name }]} />
          <div className="mt-4">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-3">Klesbutikker i {fylke.name}</h1>
            <p className="font-body text-base text-white/50">{fylke.storeCount} butikker i {fylke.cities.length} kommuner</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-8xl mx-auto section-padding">
          <h2 className="font-body text-display-sm font-extrabold text-black mb-6">Kommuner i {fylke.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {allCities.map((city) => (
              <Link key={city.slug} href={'/' + city.slug} className="group border border-border rounded-lg p-4 hover:border-black transition-all duration-150">
                <h3 className="font-body text-[14px] font-bold text-black group-hover:text-accent transition-colors">{city.name}</h3>
                <p className="font-body text-[12px] text-accent font-semibold mt-1">{city.storeCount} butikker</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-10 md:py-14">
        <div className="max-w-3xl mx-auto section-padding">
          <h2 className="font-body text-display-sm font-extrabold text-black mb-4">Om kleshandel i {fylke.name}</h2>
          <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
            <p>{fylke.name} har {fylke.storeCount} registrerte klesbutikker fordelt på {fylke.cities.length} kommuner. {fylke.cities.length > 3 ? fylke.cities.slice(0, 3).join(', ') + ' og ' + fylke.cities[3] + ' er blant kommunene med flest klesbutikker i fylket.' : fylke.cities.join(' og ') + ' har klesbutikker registrert.'}</p>
            <p>Alle butikker er hentet fra Brønnøysundregistrene og viser verifisert informasjon som butikknavn, adresse og organisasjonsnummer. Velg en kommune over for å se alle klesbutikker i ditt nærområde.</p>
          </div>
        </div>
      </section>
    </>
  );
}
