import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeolocateBar from '@/components/GeolocateBar';
import { organizationSchema, SITE_NAME, SITE_URL, SITE_DESC } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Finn klesbutikker i hele Norge`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: { type: 'website', locale: 'nb_NO', siteName: SITE_NAME, images: [{ url: '/og-image.svg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL, types: { 'application/rss+xml': '/rss.xml' } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6900" />
        <link rel="author" href="https://klesbutikk.no/om-oss" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <GeolocateBar />
      </body>
    </html>
  );
}
