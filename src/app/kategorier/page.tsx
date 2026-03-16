import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/seo';
import { getAllStores, getAllCities } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Kategorier – Klesbutikker etter type',
  description: 'Utforsk klesbutikker etter kategori. Dameklær, herreklær, barneklær, designer, vintage, sport og mer.',
  path: '/kategorier',
});

const CATEGORIES = [
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker, bukser og alt for henne. Finn de beste dameklesbutikkene i din by.', letter: 'D', count: 342, accent: true },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser, yttertøy og accessoirer for menn.', letter: 'H', count: 289, accent: false },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby i alle aldre, fra nyfødt til tenåring.', letter: 'B', count: 156, accent: true },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive designermerker og luksusklær fra norske og internasjonale motehus.', letter: 'D', count: 87, accent: false },
  { name: 'Vintage og gjenbruk', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig mote. Unike funn og tidløse klassikere.', letter: 'V', count: 64, accent: true },
  { name: 'Sportsklær', slug: 'sport', desc: 'Treningsklær, outdoor, friluftsutstyr og sportsmerker for aktive mennesker.', letter: 'S', count: 201, accent: false },
  { name: 'Arbeidsklær', slug: 'arbeidsklar', desc: 'Profesjonelle arbeidsklær, uniformer og vernetøy.', letter: 'A', count: 45, accent: true },
  { name: 'Brudebutikker', slug: 'brud', desc: 'Brudekjoler, festantrekk og tilbehør for den store dagen.', letter: 'B', count: 32, accent: false },
  { name: 'Undertøy', slug: 'undertoy', desc: 'Undertøy, sokker, nattøy og loungewear for dame og herre.', letter: 'U', count: 78, accent: true },
  { name: 'Bunad', slug: 'bunad', desc: 'Norske bunader, bunadssølv og tradisjonelle festdrakter fra hele landet.', letter: 'B', count: 23, accent: false },
];

export default function KategorierPage() {
  const stores = getAllStores();
  const cities = getAllCities().slice(0, 10);

  return (
    <>
      <section className="bg-gradient-to-b from-accent-light/50 to-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Kategorier' }]} />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 bg-surface text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" /></svg>
              {CATEGORIES.length} kategorier
            </div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Kategorier</h1>
            <p className="font-body text-base text-muted max-w-lg">Utforsk klesbutikker etter type. Finn akkurat det du leter etter i din by.</p>
          </div>
        </div>
      </section>
      <section className="bg-cream border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.slug} id={cat.slug} className={`rounded-2xl p-6 border-2 transition-all relative overflow-hidden ${
                i === 0 ? 'bg-charcoal text-white border-charcoal md:col-span-2' :
                i === 1 ? 'bg-accent text-white border-accent' :
                'bg-cream border-border hover:border-accent'
              }`}>
                {/* Ghost letter */}
                <span className={`absolute -right-2 -top-4 font-body text-[80px] md:text-[100px] font-black leading-none select-none pointer-events-none ${
                  i === 0 ? 'text-white/[0.04]' :
                  i === 1 ? 'text-white/[0.1]' :
                  cat.accent ? 'text-accent/[0.06]' : 'text-charcoal/[0.04]'
                }`}>{cat.letter}</span>

                <div className="relative flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className={`font-body text-lg font-extrabold ${i >= 2 ? 'text-charcoal' : 'text-white'}`}>{cat.name}</h2>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-[3px] rounded-full ${
                        i === 0 ? 'bg-white/20' : i === 1 ? 'bg-white/30' : cat.accent ? 'bg-accent' : 'bg-charcoal'
                      }`} />
                      <span className={`font-body text-[11px] font-bold ${
                        i === 0 ? 'text-white/30' : i === 1 ? 'text-white/40' : 'text-muted'
                      }`}>{cat.count} butikker</span>
                    </div>
                  </div>
                  <p className={`font-body text-sm leading-relaxed mb-4 ${
                    i === 0 ? 'text-white/60' : i === 1 ? 'text-white/70' : 'text-muted'
                  }`}>{cat.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cities.slice(0, 5).map((city) => (
                      <Link key={city.slug} href={`/kategori/${cat.slug}/${city.slug}`}
                        className={`font-body text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors ${
                          i === 0 ? 'bg-white/[0.06] text-white/60 hover:bg-white/10' :
                          i === 1 ? 'bg-white/10 text-white/70 hover:bg-white/20' :
                          'bg-surface text-muted hover:bg-accent-light hover:text-accent'
                        }`}>{cat.name} i {city.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
