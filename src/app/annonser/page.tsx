import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Annonsering – Bli synlig på Klesbutikk.no',
  description: 'Annonser din klesbutikk på Norges ledende plattform for å finne motebutikker. Nå tusenvis av kunder.',
  path: '/annonser',
});

export default function AdvertisePage() {
  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Annonsering' }]} />

      <div className="max-w-3xl mb-16">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          For butikkeiere
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-6">
          Bli fremhevet på<br />
          <span className="italic font-normal">Klesbutikk.no</span>
        </h1>
        <p className="editorial-text">
          Nå tusenvis av kunder som aktivt søker etter klesbutikker i din by.
          Klesbutikk.no er Norges mest komplette oversikt over motebutikker.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <PricingCard
          title="Gratis"
          price="0"
          description="Standard oppføring for alle klesbutikker"
          features={[
            'Grunnleggende oppføring',
            'Vises i by- og fylkessider',
            'Adresse og kontaktinfo',
            'Søkbar i databasen',
          ]}
          cta="Allerede inkludert"
          ctaHref="/butikk"
          muted
        />
        <PricingCard
          title="Fremhevet"
          price="990"
          description="Økt synlighet i din by"
          features={[
            'Alt i Gratis',
            'Fremhevet merke',
            'Prioritert plassering',
            'Vises på forsiden',
            'Utvidet butikkprofil',
          ]}
          cta="Kom i gang"
          ctaHref="/legg-til-butikk"
          highlighted
        />
        <PricingCard
          title="Premium"
          price="2 490"
          description="Maksimal eksponering"
          features={[
            'Alt i Fremhevet',
            'Toppplassering i din by',
            'Artikleromtale',
            'Dedikert landingsside',
            'Månedlig rapport',
          ]}
          cta="Kontakt oss"
          ctaHref="/om-oss"
        />
      </div>

      {/* Benefits */}
      <div className="bg-white border border-border rounded-2xl p-8 md:p-12">
        <h2 className="font-display text-display-sm font-semibold text-charcoal mb-8 text-center">
          Hvorfor annonsere hos oss?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'SEO-optimalisert',
              desc: 'Vi rangerer høyt i Google for klesbutikk-søk i hele Norge',
              svg: <svg className="w-7 h-7 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" /></svg>,
            },
            {
              title: 'AI-synlighet',
              desc: 'Strukturert for å bli sitert av ChatGPT, Perplexity og Gemini',
              svg: <svg className="w-7 h-7 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>,
            },
            {
              title: 'Lokalt fokus',
              desc: 'Kunder finner butikker i sin egen by og sitt nærområde',
              svg: <svg className="w-7 h-7 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
            },
            {
              title: 'Målbar effekt',
              desc: 'Se hvor mange som besøker din butikkprofil',
              svg: <svg className="w-7 h-7 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
            },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <div className="flex justify-center mb-3">{b.svg}</div>
              <h3 className="font-display text-base font-semibold text-charcoal mb-1">{b.title}</h3>
              <p className="font-body text-sm text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  ctaHref,
  highlighted,
  muted,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-6 md:p-8 flex flex-col ${
        highlighted
          ? 'bg-charcoal text-white border-2 border-charcoal relative'
          : 'bg-white border border-border'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-charcoal text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
          Mest populær
        </span>
      )}
      <h3 className={`font-display text-xl font-semibold mb-1 ${highlighted ? 'text-white' : 'text-charcoal'}`}>
        {title}
      </h3>
      <p className={`font-body text-sm mb-4 ${highlighted ? 'text-white/60' : 'text-muted'}`}>
        {description}
      </p>
      <div className="mb-6">
        <span className={`font-display text-4xl font-semibold ${highlighted ? 'text-white' : 'text-charcoal'}`}>
          {price}
        </span>
        <span className={`font-body text-sm ml-1 ${highlighted ? 'text-white/60' : 'text-muted'}`}>
          kr/mnd
        </span>
      </div>
      <ul className="space-y-2.5 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlighted ? 'text-white/80' : 'text-charcoal'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`font-body text-sm ${highlighted ? 'text-white/80' : 'text-muted'}`}>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`inline-flex items-center justify-center px-6 py-3 font-body font-medium text-sm tracking-wide transition-all duration-300 text-center ${
          highlighted
            ? 'bg-white text-charcoal hover:bg-white/90'
            : muted
            ? 'bg-cream text-muted border border-border cursor-default'
            : 'bg-charcoal text-white hover:bg-slate'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
