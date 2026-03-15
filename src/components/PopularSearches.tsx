import Link from 'next/link';

const POPULAR = [
  { label: 'Holzweiler i Oslo', href: '/merke/holzweiler/oslo' },
  { label: 'Vintage Bergen', href: '/kategori/vintage/bergen' },
  { label: 'Barneklær Trondheim', href: '/kategori/barneklar/trondheim' },
  { label: 'Nike butikker', href: '/merke/nike' },
  { label: 'Designer Oslo', href: '/kategori/designer/oslo' },
  { label: 'Klesbutikker Stavanger', href: '/stavanger' },
  { label: 'Filippa K', href: '/merke/filippa-k' },
  { label: 'Ganni', href: '/merke/ganni' },
];

export default function PopularSearches() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-body text-xs font-bold text-muted mr-1">Populære søk</span>
      {POPULAR.map((p) => (
        <Link key={p.href} href={p.href}
          className="font-body text-[11px] font-medium text-muted bg-surface border border-border px-2.5 py-1 rounded-lg hover:border-accent hover:text-accent transition-colors">
          {p.label}
        </Link>
      ))}
    </div>
  );
}
