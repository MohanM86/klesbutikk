'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Store } from '@/lib/types';
export default function AllStoresSearch({ stores, cities, fylker }: { stores: Store[]; cities: string[]; fylker: string[]; }) {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFylke, setSelectedFylke] = useState('');
  const [activeLetter, setActiveLetter] = useState('');
  const filtered = useMemo(() => {
    let result = [...stores];
    if (query) { const q = query.toLowerCase(); result = result.filter((s) => s.navn.toLowerCase().includes(q) || s.poststed.toLowerCase().includes(q) || s.kommune.toLowerCase().includes(q)); }
    if (selectedCity) result = result.filter((s) => s.poststed === selectedCity);
    if (selectedFylke) result = result.filter((s) => s.fylke === selectedFylke);
    if (activeLetter) result = result.filter((s) => s.navn.charAt(0).toUpperCase() === activeLetter);
    return result;
  }, [stores, query, selectedCity, selectedFylke, activeLetter]);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const storeLetters = new Set(stores.map((s) => s.navn.charAt(0).toUpperCase()));
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1"><svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Søk etter butikknavn..." className="w-full bg-surface-alt border border-border rounded-full font-body text-sm text-charcoal placeholder:text-muted pl-10 pr-4 py-2.5 focus:outline-none focus:border-black transition-colors" /></div>
        <select value={selectedFylke} onChange={(e) => { setSelectedFylke(e.target.value); setSelectedCity(''); }} className="bg-surface-alt border border-border rounded-full font-body text-sm text-charcoal px-4 py-2.5 focus:outline-none focus:border-black"><option value="">Alle fylker</option>{fylker.map((f) => <option key={f} value={f}>{f}</option>)}</select>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-surface-alt border border-border rounded-full font-body text-sm text-charcoal px-4 py-2.5 focus:outline-none focus:border-black"><option value="">Alle kommuner</option>{cities.map((c) => <option key={c} value={c}>{c}</option>)}</select>
      </div>
      <div className="flex flex-wrap gap-1 mb-6">
        <button onClick={() => setActiveLetter('')} className={'font-body text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors ' + (!activeLetter ? 'bg-black text-white' : 'bg-surface-alt text-muted hover:text-charcoal')}>Alle</button>
        {letters.map((l) => (<button key={l} onClick={() => setActiveLetter(activeLetter === l ? '' : l)} disabled={!storeLetters.has(l)} className={'font-body text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors ' + (activeLetter === l ? 'bg-black text-white' : storeLetters.has(l) ? 'bg-surface-alt text-slate hover:text-charcoal' : 'bg-surface-alt text-muted/30 cursor-not-allowed')}>{l}</button>))}
      </div>
      <p className="font-body text-sm text-muted mb-4">Viser {filtered.length} av {stores.length} butikker</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.slice(0, 60).map((store) => (
          <Link key={store.organisasjonsnummer} href={'/butikk/' + store.slug} className="group flex items-center gap-3 border border-border rounded-lg p-4 hover:border-black transition-all duration-150">
            <div className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center flex-shrink-0 text-charcoal font-body text-sm font-extrabold group-hover:bg-black group-hover:text-white transition-colors">{store.navn.charAt(0)}</div>
            <div className="min-w-0 flex-1"><p className="font-body text-sm font-bold text-black line-clamp-1">{store.navn}</p><p className="font-body text-xs text-muted line-clamp-1">{store.poststed}, {store.fylke}</p></div>
          </Link>
        ))}
      </div>
      {filtered.length > 60 && <p className="font-body text-sm text-muted text-center mt-8">Viser 60 av {filtered.length} resultater. Bruk søk eller filtre for å snevre inn.</p>}
    </div>
  );
}
