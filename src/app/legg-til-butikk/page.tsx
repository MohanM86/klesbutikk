import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Legg til butikk – Bli synlig på Klesbutikk.no',
  description: 'Legg til eller oppdater din klesbutikk på Klesbutikk.no. Nå tusenvis av kunder som søker etter motebutikker.',
  path: '/legg-til-butikk',
});

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
        {[
          { icon: '👥', title: 'Flere kunder', desc: 'Bli funnet av folk som søker etter klesbutikker i din by' },
          { icon: '📍', title: 'Lokal synlighet', desc: 'Vis at du finnes når noen søker etter mote i ditt område' },
          { icon: '⭐', title: 'Bli fremhevet', desc: 'Få ekstra eksponering med en premium plassering' },
        ].map((b) => (
          <div key={b.title} className="bg-white border border-border rounded-lg p-5">
            <span className="text-2xl mb-3 block">{b.icon}</span>
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
