'use client';

import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Juridisk side · /cookies                                          */
/* ------------------------------------------------------------------ */

const COOKIES = [
  {
    name: 'cookie_consent',
    category: 'Nødvendig',
    purpose: 'Lagrer ditt valg om cookie-samtykke',
    duration: '365 dager',
  },
  {
    name: '_ga',
    category: 'Analyse',
    purpose: 'Google Analytics — skiller mellom besøkende',
    duration: '2 år',
  },
  {
    name: '_ga_*',
    category: 'Analyse',
    purpose: 'Google Analytics 4 — opprettholder sesjonstilstand',
    duration: '2 år',
  },
] as const;

export default function CookiesPage() {
  const resetCookieConsent = () => {
    document.cookie =
      'cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Hjem
                </Link>
              </li>
              <li className="text-border-dark">/</li>
              <li className="text-charcoal font-medium">Cookie-policy</li>
            </ol>
          </nav>
          <h1 className="text-display font-bold text-charcoal">
            Cookie-policy
          </h1>
          <p className="mt-3 text-muted text-sm">
            Sist oppdatert: 15.&nbsp;mars&nbsp;2026
          </p>
        </div>
      </div>

      {/* Innhold */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="space-y-10 text-[15px] leading-[1.75] text-slate">
          {/* Intro */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-3">
              Hva er cookies?
            </h2>
            <p>
              Cookies er små tekstfiler som lagres i nettleseren din når du
              besøker et nettsted. De brukes til å huske innstillinger,
              analysere trafikk og forbedre brukeropplevelsen.
            </p>
          </section>

          {/* Tabell */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Cookies vi bruker
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 font-semibold text-charcoal border-b border-border">
                      Cookie
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-charcoal border-b border-border">
                      Kategori
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-charcoal border-b border-border">
                      Formål
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-charcoal border-b border-border">
                      Varighet
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="hover:bg-surface/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-charcoal">
                        {c.name}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            c.category === 'Nødvendig'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">{c.purpose}</td>
                      <td className="px-4 py-3 text-muted whitespace-nowrap">
                        {c.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Kategorier */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-3">
              Kategorier
            </h2>

            <h3 className="font-medium text-charcoal mt-4 mb-2">
              Nødvendige cookies
            </h3>
            <p>
              Disse er påkrevd for at nettstedet skal fungere korrekt. De kan
              ikke slås av. Inkluderer kun{' '}
              <code className="bg-surface px-1.5 py-0.5 rounded text-xs font-mono text-charcoal">
                cookie_consent
              </code>{' '}
              som lagrer ditt samtykkevalg.
            </p>

            <h3 className="font-medium text-charcoal mt-6 mb-2">
              Analysecookies
            </h3>
            <p>
              Brukes for å samle anonymisert statistikk om hvordan besøkende
              bruker nettstedet. Disse settes kun dersom du gir samtykke. Vi
              bruker Google Analytics&nbsp;4 med IP-anonymisering aktivert.
            </p>
          </section>

          {/* Samtykke */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-3">
              Samtykke
            </h2>
            <p>
              Når du besøker Klesbutikk.no for første gang, vises et
              cookie-banner der du kan velge å akseptere eller avvise
              analysecookies. Nødvendige cookies settes uansett da de er
              påkrevd for grunnleggende funksjonalitet.
            </p>
            <p className="mt-3">
              Du kan når som helst endre ditt samtykke:
            </p>
            <button
              onClick={resetCookieConsent}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal/85 active:scale-[0.98] transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Nullstill cookie-samtykke
            </button>
          </section>

          {/* Nettleser */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-3">
              Administrere cookies i nettleseren
            </h2>
            <p>
              Du kan også slette eller blokkere cookies direkte i nettleseren
              din. Merk at blokkering av nødvendige cookies kan påvirke
              nettstedets funksjonalitet. Se nettleserens hjelpesider for
              instruksjoner.
            </p>
          </section>

          {/* Tredjepart */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-3">
              Tredjepartscookies
            </h2>
            <p>
              Google Analytics (Google Ireland Limited) opptrer som
              databehandler på vegne av Klesbutikk.no. IP-anonymisering er
              aktivert slik at fullstendig IP-adresse aldri lagres. Data kan
              overføres til Google&nbsp;LLC i USA under Googles
              standardkontraktsklausuler og EU–US Data Privacy Framework.
            </p>
          </section>

          {/* Mer info */}
          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-3">
              Mer informasjon
            </h2>
            <p>
              Se vår{' '}
              <Link
                href="/personvern"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                personvernerklæring
              </Link>{' '}
              for mer informasjon om hvordan vi behandler personopplysninger.
              Spørsmål kan rettes til{' '}
              <a
                href="mailto:hei@klesbutikk.no"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                hei@klesbutikk.no
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
