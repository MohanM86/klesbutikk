import Link from 'next/link';
import { CityData } from '@/lib/types';

export default function CityCard({ city }: { city: CityData }) {
  return (
    <Link href={'/' + city.slug}
      className="group block border border-border rounded-lg overflow-hidden transition-all duration-150 hover:border-black">
      <div className="h-14 bg-black flex items-center justify-center">
        <span className="font-body text-2xl font-extrabold text-accent">{city.name.charAt(0)}</span>
      </div>
      <div className="p-3">
        <h3 className="font-body text-[13px] font-bold text-black">{city.name}</h3>
        <p className="font-body text-[11px] text-muted">{city.fylke}</p>
        <p className="font-body text-[11px] font-bold text-accent mt-1.5">{city.storeCount} butikker</p>
      </div>
    </Link>
  );
}
