import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personvernerklæring | Klesbutikk.no',
  description: 'Personvernerklæring for Klesbutikk.no.',
  robots: { index: false, follow: false },
};

export default function PersonvernLayout({ children }: { children: React.ReactNode }) {
  return children;
}
