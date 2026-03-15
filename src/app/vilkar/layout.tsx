import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vilkår og betingelser | Klesbutikk.no',
  description: 'Vilkår og betingelser for bruk av Klesbutikk.no.',
  robots: { index: false, follow: false },
};

export default function VilkarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
