import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personvernerklæring | Klesbutikk.no',
  description:
    'Personvernerklæring for Klesbutikk.no. Les om hvordan vi behandler dine personopplysninger i henhold til GDPR.',
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Juridisk side · /personvern                                       */
/* ------------------------------------------------------------------ */

export default function PersonvernPage() {
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
              <li className="text-charcoal font-medium">Personvernerklæring</li>
            </ol>
          </nav>
          <h1 className="text-display sm:text-display font-bold text-charcoal">
            Personvernerklæring
          </h1>
          <p className="mt-3 text-muted text-sm">
            Sist oppdatert: 15.&nbsp;mars&nbsp;2026
          </p>
        </div>
      </div>

      {/* Innhold */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="space-y-10 text-[15px] leading-[1.75] text-slate">
          {/* 1 */}
          <Section n={1} title="Behandlingsansvarlig">
            <p>
              Klesbutikk.no er en tjeneste levert av IT-FIRMA.
              Henvendelser om personvern kan rettes til{' '}
              <A href="mailto:hei@klesbutikk.no">hei@klesbutikk.no</A>.
            </p>
          </Section>

          {/* 2 */}
          <Section n={2} title="Hvilke opplysninger vi samler inn">
            <p>
              Klesbutikk.no samler ikke inn personopplysninger direkte fra
              besøkende. Vi bruker ingen brukerkontoer, skjemaer eller
              påloggingsfunksjoner for forbrukere.
            </p>
            <p className="mt-3">
              Følgende data kan samles inn indirekte gjennom analyseverktøy:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-border-dark">
              <li>Anonymisert IP-adresse (via Google Analytics&nbsp;4)</li>
              <li>Sidevisninger, besøkstid og navigasjonsmønstre</li>
              <li>Enhetstype, nettleser og operativsystem</li>
              <li>Geografisk region (ikke nøyaktig lokasjon)</li>
            </ul>
          </Section>

          {/* 3 */}
          <Section n={3} title="Formål med behandlingen">
            <p>Vi bruker innsamlede data til å:</p>
            <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-border-dark">
              <li>Forstå hvordan besøkende bruker nettstedet</li>
              <li>Forbedre innhold, navigasjon og brukeropplevelse</li>
              <li>Generere anonymisert besøksstatistikk</li>
            </ul>
          </Section>

          {/* 4 */}
          <Section n={4} title="Rettslig grunnlag">
            <p>
              Behandling av personopplysninger skjer i henhold til
              GDPR&nbsp;artikkel&nbsp;6(1)(a)&nbsp;— samtykke (for
              analysecookies) og artikkel&nbsp;6(1)(f)&nbsp;— berettiget
              interesse (for nødvendige cookies og grunnleggende
              nettstedsfunksjonalitet).
            </p>
          </Section>

          {/* 5 */}
          <Section n={5} title="Cookies">
            <p>
              Vi bruker cookies for analyse og grunnleggende funksjonalitet.
              For fullstendig informasjon om hvilke cookies vi bruker, se
              vår{' '}
              <Link
                href="/cookies"
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                cookie-policy
              </Link>
              .
            </p>
          </Section>

          {/* 6 */}
          <Section n={6} title="Tredjeparter og databehandlere">
            <p>Vi bruker følgende tredjepartstjenester:</p>
            <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-border-dark">
              <li>
                <strong className="text-charcoal">Google Analytics&nbsp;4</strong>{' '}
                — webanalyse med IP-anonymisering aktivert. Google opptrer
                som databehandler. Data kan overføres til USA under Googles
                standardkontraktsklausuler og EU–US Data Privacy Framework.
              </li>
              <li>
                <strong className="text-charcoal">Vercel</strong> — hosting
                og infrastruktur. Vercel behandler tekniske logger i henhold
                til deres personvernerklæring.
              </li>
            </ul>
          </Section>

          {/* 7 */}
          <Section n={7} title="Lagring og sletting">
            <p>
              Analysedata lagres i Google Analytics i opptil 14&nbsp;måneder.
              Cookies utløper i henhold til tidspunktene angitt i vår
              cookie-policy. Vi lagrer ingen personopplysninger i egne
              systemer.
            </p>
          </Section>

          {/* 8 */}
          <Section n={8} title="Dine rettigheter">
            <p>I henhold til GDPR har du rett til å:</p>
            <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-border-dark">
              <li>Be om innsyn i hvilke opplysninger vi har om deg</li>
              <li>Be om retting av uriktige opplysninger</li>
              <li>Be om sletting av dine opplysninger</li>
              <li>Trekke tilbake samtykke til cookies når som helst</li>
              <li>
                Klage til Datatilsynet dersom du mener behandlingen er
                ulovlig
              </li>
            </ul>
            <p className="mt-3">
              Kontakt oss på{' '}
              <A href="mailto:hei@klesbutikk.no">hei@klesbutikk.no</A> for
              å utøve dine rettigheter.
            </p>
          </Section>

          {/* 9 */}
          <Section n={9} title="Sikkerhet">
            <p>
              Nettstedet er levert over HTTPS og hostes på Vercel med moderne
              sikkerhetsstandarder. Vi gjennomfører ingen innsamling av
              sensitive personopplysninger.
            </p>
          </Section>

          {/* 10 */}
          <Section n={10} title="Endringer">
            <p>
              Vi kan oppdatere denne personvernerklæringen ved behov.
              Vesentlige endringer vil bli publisert på denne siden med
              oppdatert dato.
            </p>
          </Section>
        </div>
      </article>
    </main>
  );
}

/* ---------- Tiny helpers to keep the JSX clean ---------- */

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-charcoal mb-3">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

function A({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  );
}
