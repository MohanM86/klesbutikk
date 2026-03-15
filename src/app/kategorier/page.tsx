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
  { name: 'Dameklær', slug: 'dameklar', desc: 'Kjoler, topper, jakker, bukser og alt for henne. Finn de beste dameklesbutikkene i din by.', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
  { name: 'Herreklær', slug: 'herreklar', desc: 'Dresser, skjorter, bukser, yttertøy og accessoirer for menn.', icon: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V7.5' },
  { name: 'Barneklær', slug: 'barneklar', desc: 'Klær for barn og baby i alle aldre, fra nyfødt til tenåring.', icon: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Designer', slug: 'designer', desc: 'Eksklusive designermerker og luksusklær fra norske og internasjonale motehus.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12' },
  { name: 'Vintage og gjenbruk', slug: 'vintage', desc: 'Secondhand, retro og bærekraftig mote. Unike funn og tidløse klassikere.', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182' },
  { name: 'Sportsklær', slug: 'sport', desc: 'Treningsklær, outdoor, friluftsutstyr og sportsmerker for aktive mennesker.', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58' },
  { name: 'Arbeidsklær', slug: 'arbeidsklar', desc: 'Profesjonelle arbeidsklær, uniformer og vernetøy.', icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63' },
  { name: 'Brudebutikker', slug: 'brud', desc: 'Brudekjoler, festantrekk og tilbehør for den store dagen.', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  { name: 'Undertøy', slug: 'undertoy', desc: 'Undertøy, sokker, nattøy og loungewear for dame og herre.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25' },
  { name: 'Bunad', slug: 'bunad', desc: 'Norske bunader, bunadssølv og tradisjonelle festdrakter fra hele landet.', icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21' },
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
            <div className="inline-flex items-center gap-2 bg-white text-accent font-body text-xs font-bold px-3 py-1 rounded-full border border-accent/10 mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" /></svg>
              {CATEGORIES.length} kategorier
            </div>
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Kategorier</h1>
            <p className="font-body text-base text-muted max-w-lg">Utforsk klesbutikker etter type. Finn akkurat det du leter etter i din by.</p>
          </div>
        </div>
      </section>
      <section className="bg-white border-t border-border">
        <div className="max-w-8xl mx-auto section-padding py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.slug} id={cat.slug} className={`rounded-2xl p-6 border-2 transition-all ${
                i === 0 ? 'bg-charcoal text-white border-charcoal md:col-span-2' :
                i === 1 ? 'bg-accent text-white border-accent' :
                'bg-white border-border hover:border-accent'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    i === 0 ? 'bg-white/10' : i === 1 ? 'bg-white/20' : 'bg-accent-light'
                  }`}>
                    <svg className={`w-6 h-6 ${i < 2 ? 'text-white' : 'text-accent'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={`font-body text-lg font-extrabold mb-1 ${i >= 2 ? 'text-charcoal' : 'text-white'}`}>{cat.name}</h2>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
