import { NextResponse } from 'next/server';

const BLOG_POSTS = [
  { slug: 'beste-klesbutikker-i-norge', title: 'De beste klesbutikkene i Norge i 2026', date: '2026-03-10', description: 'Vår guide til Norges beste klesbutikker fra Lindesnes til Nordkapp.' },
  { slug: 'klesbutikker-oslo-guide', title: 'Komplett guide til klesbutikker i Oslo', date: '2026-03-05', description: 'Alt du trenger å vite om shopping i Oslo.' },
  { slug: 'norske-motemerker', title: 'Norske motemerker du bør kjenne til', date: '2026-02-28', description: 'En oversikt over norske klesmerker som setter Norge på motekartet.' },
  { slug: 'barekraftig-mote-norge', title: 'Bærekraftig mote i Norge', date: '2026-02-20', description: 'De beste stedene for miljøvennlig shopping i Norge.' },
  { slug: 'shopping-bergen-guide', title: 'Shopping i Bergen – en komplett guide', date: '2026-02-15', description: 'Utforsk Bergens varierte shopping-scene.' },
  { slug: 'skandinavisk-minimalisme', title: 'Skandinavisk minimalisme – stilen som aldri dør', date: '2026-02-10', description: 'Guide til tidløs skandinavisk stil.' },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Klesbutikk.no – Artikler</title>
    <link>https://klesbutikk.no/artikler</link>
    <description>Guider, tips og inspirasjon om klesbutikker og norsk mote.</description>
    <language>nb</language>
    <atom:link href="https://klesbutikk.no/rss.xml" rel="self" type="application/rss+xml"/>
${BLOG_POSTS.map(
  (post) => `    <item>
      <title>${post.title}</title>
      <link>https://klesbutikk.no/artikkel/${post.slug}</link>
      <guid>https://klesbutikk.no/artikkel/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${post.description}</description>
    </item>`
).join('\n')}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
