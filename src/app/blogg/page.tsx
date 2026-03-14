import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Blogg – Motetips og klesbutikk-guider',
  description: 'Les våre guider om klesbutikker, norsk mote, shoppingtips og de beste stedene å handle klær i Norge.',
  path: '/blogg',
});

const BLOG_POSTS = [
  {
    slug: 'beste-klesbutikker-i-norge',
    title: 'De beste klesbutikkene i Norge i 2026',
    excerpt: 'Vår guide til Norges beste klesbutikker – fra Oslo til Tromsø. Oppdag moteperler, designerbutikker og lokale favoritter.',
    date: '2026-03-10',
    category: 'Guide',
  },
  {
    slug: 'klesbutikker-oslo-guide',
    title: 'Komplett guide til klesbutikker i Oslo',
    excerpt: 'Alt du trenger å vite om shopping i Oslo. De beste handlegatene, kjøpesentrene og skjulte perlene.',
    date: '2026-03-05',
    category: 'Byguide',
  },
  {
    slug: 'norske-motemerker',
    title: 'Norske motemerker du bør kjenne til',
    excerpt: 'Fra Holzweiler til Moods of Norway – en oversikt over norske klesmerker som setter Norge på motekartet.',
    date: '2026-02-28',
    category: 'Mote',
  },
  {
    slug: 'barekraftig-mote-norge',
    title: 'Bærekraftig mote i Norge – hvor handler du?',
    excerpt: 'Stadig flere norske klesbutikker satser på bærekraft. Her er de beste stedene for miljøvennlig shopping.',
    date: '2026-02-20',
    category: 'Bærekraft',
  },
  {
    slug: 'shopping-bergen-guide',
    title: 'Shopping i Bergen – en komplett guide',
    excerpt: 'Utforsk Bergens varierte shopping-scene, fra Bryggen til Galleriet og de sjarmerende nisjebutikkene i Skostredet.',
    date: '2026-02-15',
    category: 'Byguide',
  },
  {
    slug: 'skandinavisk-minimalisme',
    title: 'Skandinavisk minimalisme – stilen som aldri dør',
    excerpt: 'Lær mer om den skandinaviske motestilen og hvor du finner butikker som selger tidløse, minimalistiske klær.',
    date: '2026-02-10',
    category: 'Mote',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-8xl mx-auto section-padding pt-8 pb-16 md:pt-12 md:pb-22">
      <Breadcrumbs items={[{ label: 'Blogg' }]} />

      <div className="mb-12">
        <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-3">
          Artikler og guider
        </p>
        <h1 className="font-display text-hero-sm md:text-display font-semibold text-charcoal mb-4">
          Blogg
        </h1>
        <p className="editorial-text">
          Guider, tips og inspirasjon for alle som er interessert i norsk mote og shopping.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="group bg-white border border-border rounded-lg overflow-hidden card-hover">
            <div className="h-48 bg-gradient-to-br from-charcoal/5 to-charcoal/10 flex items-center justify-center">
              <span className="font-display text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                {post.category === 'Byguide' ? '🏙️' : post.category === 'Mote' ? '👗' : post.category === 'Bærekraft' ? '🌿' : '📖'}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted bg-cream px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <time className="font-body text-xs text-muted/60">{post.date}</time>
              </div>
              <h2 className="font-display text-lg font-semibold text-charcoal mb-2 group-hover:text-slate transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="font-body text-sm text-muted line-clamp-3">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
