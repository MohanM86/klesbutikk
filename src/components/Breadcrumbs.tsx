import Link from 'next/link';
interface BreadcrumbItem { label: string; href?: string; }
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Brødsmulesti" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 font-body text-[11px] text-white/50">
        <li><Link href="/" className="hover:text-white transition-colors">Hjem</Link></li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            {item.href ? <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link> : <span className="text-white font-semibold">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
