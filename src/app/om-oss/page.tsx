import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { createMetadata } from '@/lib/seo';
import { getStats } from '@/lib/stores';

export const metadata: Metadata = createMetadata({
  title: 'Om oss – Klesbutikk.no',
  description: 'Klesbutikk.no er Norges mest komplette oversikt over klesbutikker med data fra Brønnøysundregistrene.',
  path: '/om-oss',
});

export default function OmOssPage() {
  const stats = getStats();
  return (
    <>
      <section className="bg-gradient-to-b from-accent-light/50 to-white">
        <div className="max-w-8xl mx-auto section-padding pt-6 pb-10 md:pt-10">
          <Breadcrumbs items={[{ label: 'Om oss' }]} />
          <div className="mt-4 max-w-2xl">
            <h1 className="font-body text-hero-sm md:text-display font-extrabold text-charcoal mb-2">Om Klesbutikk.no</h1>
            <p className="font-body text-base text-muted">Norges mest komplette oversikt over klesbutikker.</p>
          </div>
        </div>
      </section>
      <section className="bg-white border-t border-border">
        <div className="max-w-3xl mx-auto section-padding py-10 md:py-14">
          <div className="font-body text-sm text-muted leading-relaxed space-y-4">
            <p>Klesbutikk.no samler alle registrerte klesbutikker i Norge og gjør dem søkbare etter by, fylke, merke og kategori. Vår database er basert på offisielle data fra Brønnøysundregistrene med næringskode 47.710 (butikkhandel med klær).</p>
            <p>Med over {stats.totalStores.toLocaleString('nb-NO')} butikker fordelt på 357 kommuner og 15 fylker dekker vi hele Norge. Vi har også kartlagt over {stats.totalBrands} klesmerker og identifisert hvilke butikker som fører dem.</p>
            <p>Alle butikker har en gratis oppføring. For butikkeiere som ønsker økt synlighet tilbyr vi fremhevede plasseringer med prioritert visning, badge og eksponering på relevante merke og kategorisider.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { val: stats.totalStores.toLocaleString('nb-NO'), label: 'Butikker' },
              { val: stats.totalBrands.toString(), label: 'Merker' },
              { val: '357', label: 'Kommuner' },
              { val: '7 928', label: 'Sider' },
            ].map((s) => (
              <div key={s.label} className="bg-surface rounded-2xl p-5 text-center">
                <span className="font-body text-2xl font-extrabold text-charcoal">{s.val}</span>
                <span className="block font-body text-xs text-muted mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <CTASection />
          </div>
        </div>
      </section>
    </>
  );
}
