import { getAllFylker } from '@/lib/stores';

export async function GET() {
  const fylker = getAllFylker();
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Klesbutikk.no</title>
    <link>https://klesbutikk.no</link>
    <description>Norges mest komplette oversikt over klesbutikker.</description>
    <language>nb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://klesbutikk.no/rss.xml" rel="self" type="application/rss+xml"/>
    ${fylker.map((f) => `<item>
      <title>Klesbutikker i ${f.name}</title>
      <link>https://klesbutikk.no/fylke/${f.slug}</link>
      <description>${f.storeCount} klesbutikker i ${f.cities.length} kommuner i ${f.name}.</description>
      <guid>https://klesbutikk.no/fylke/${f.slug}</guid>
    </item>`).join('\n    ')}
  </channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
