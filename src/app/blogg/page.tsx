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
    excerpt: 'Vår guide til Norges beste klesbutikker – fra Lindesnes til Nordkapp. Oppdag moteperler, designerbutikker og lokale favoritter.',
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

function CategoryIcon({ category }: { category: string }) {
  const iconClass = 'w-5 h-5 text-white/60';
  switch (category) {
    case 'Byguide':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      );
    case 'Mote':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      );
    case 'Bærekraft':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
  }
}

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
          <Link key={post.slug} href={`/blogg/${post.slug}`}>
            <article className="group bg-white border border-border rounded-lg overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-charcoal to-charcoal/80 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <CategoryIcon category={post.category} />
                </div>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
