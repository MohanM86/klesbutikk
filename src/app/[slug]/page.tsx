import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import FAQAccordion from '@/components/FAQAccordion';
import { getAllCities, getCityBySlug, getStoresByCitySlug } from '@/lib/stores';
import { createMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { slugify } from '@/lib/slugify';

interface PageProps { params: { slug: string }; }

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  if (!city) return {};
  return createMetadata({
    title: 'Klesbutikker i ' + city.name + ' | ' + city.storeCount + ' butikker',
    description: 'Komplett oversikt over alle ' + city.storeCount + ' klesbutikker i ' + city.name + ', ' + city.fylke + '. Finn butikker med adresse og kontaktinfo.',
    path: '/' + city.slug,
  });
}

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  const stores = getStoresByCitySlug(params.slug);
  const fylkeSlug = slugify(city.fylke);

  const faqs = [
    { question: 'Hvor mange klesbutikker finnes i ' + city.name + '?', answer: city.name + ' har ' + city.storeCount + ' registrerte klesbutikker. Alle er hentet fra Brønnøysundregistrene og viser verifisert informasjon.' },
    { question: 'Hvordan finner jeg en klesbutikk i ' + city.name + '?', answer: 'Bla gjennom listen over alle butikker på denne siden. Du kan klikke på en butikk for å se adresse og annen tilgjengelig informasjon. Alle klesbutikker i ' + city.name + ' er oppført her.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Fylker', url: '/fylker' }, { name: city.fylke, url: '/fylke/' + fylkeSlug }, { name: city.name, url: '/' + city.slug }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <section className="bg-black text-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-8 md:pt-10 md:pb-10">
          <Breadcrumbs items={[{ label: city.fylke, href: '/fylke/' + fylkeSlug }, { label: city.name }]} />
          <div className="mt-4">
            <p className="font-body text-xs font-bold text-accent mb-2">{city.fylke}</p>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-white mb-3">Klesbutikker i {city.name}</h1>
            <p className="font-body text-base text-white/50">{city.storeCount} registrerte klesbutikker</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-8xl mx-auto section-padding">
          <h2 className="font-body text-display-sm font-extrabold text-black mb-6">Alle klesbutikker i {city.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stores.map((store) => (
              <StoreCard key={store.organisasjonsnummer} store={store} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-10 md:py-14">
        <div className="max-w-3xl mx-auto section-padding">
          <h2 className="font-body text-display-sm font-extrabold text-black mb-4">Om klesbutikker i {city.name}</h2>
          <div className="font-body text-[14px] text-slate leading-relaxed space-y-4">
            <p>{city.name} i {city.fylke} har {city.storeCount} registrerte klesbutikker. Alle oppføringer er basert på data fra Brønnøysundregistrene og viser butikknavn, adresse og organisasjonsnummer. Klikk på en butikk for å se fullstendig informasjon.</p>
          </div>
          <div className="mt-8">
            <FAQAccordion faqs={faqs} title={'Spørsmål om klesbutikker i ' + city.name} />
          </div>
        </div>
      </section>
    </>
  );
}
