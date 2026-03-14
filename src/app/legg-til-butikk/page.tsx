import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Legg til butikk – Bli synlig på Klesbutikk.no',
  description: 'Legg til eller oppdater din klesbutikk på Klesbutikk.no. Nå tusenvis av kunder som søker etter motebutikker.',
  path: '/legg-til-butikk',
});

const BENEFITS = [
  {
    title: 'Flere kunder',
    desc: 'Bli funnet av folk som søker etter klesbutikker i din by',
    icon: (
      <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Lokal synlighet',
    desc: 'Vis at du finnes når noen søker etter mote i ditt område',
    icon: (
      <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: 'Bli fremhevet',
    desc: 'Få ekstra eksponering med en premium plassering',
    icon: (
      <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

export default function AddStorePage() {
  return (
    <div className="max-w-3xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Legg til butikk' }]} />

      <div className="mb-10">
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Legg til din butikk
        </h1>
        <p className="editorial-text">
          Er du butikkeier? Legg til eller krev din oppføring på Klesbutikk.no for å bli
          synlig for tusenvis av kunder som leter etter klesbutikker.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {BENEFITS.map((b) => (
          <div key={b.title} className="bg-white border border-border rounded-lg p-5">
            <div className="mb-3">{b.icon}</div>
            <h3 className="font-display text-base font-semibold text-charcoal mb-1">{b.title}</h3>
            <p className="font-body text-sm text-muted">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white border border-border rounded-lg p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold text-charcoal mb-6">
          Butikkinformasjon
        </h2>

        <form action="mailto:hei@klesbutikk.no" method="POST" encType="text/plain" className="space-y-5">
          <FormField label="Butikknavn" name="butikknavn" required />
          <FormField label="Organisasjonsnummer" name="orgnr" placeholder="9 siffer" />
          <FormField label="Adresse" name="adresse" required />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Postnummer" name="postnummer" required />
            <FormField label="Poststed" name="poststed" required />
          </div>
          <FormField label="Telefon" name="telefon" type="tel" />
          <FormField label="E-post" name="epost" type="email" required />
          <FormField label="Nettside" name="nettside" type="url" placeholder="https://" />
          <div>
            <label className="block font-body text-sm font-medium text-charcoal mb-1.5">
              Beskrivelse
            </label>
            <textarea
              name="beskrivelse"
              rows={4}
              className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-charcoal transition-colors resize-none"
              placeholder="Fortell kort om butikken din..."
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn-primary w-full">
              Send inn
            </button>
            <p className="font-body text-xs text-muted text-center mt-3">
              Vi gjennomgår alle innsendte butikker manuelt.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-sm font-medium text-charcoal mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-charcoal transition-colors"
      />
    </div>
  );
}
