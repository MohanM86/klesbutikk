import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie-policy | Klesbutikk.no',
  description:
    'Informasjon om cookies på Klesbutikk.no og hvordan du administrerer dem.',
  robots: { index: false, follow: false },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
