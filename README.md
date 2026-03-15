# Klesbutikk.no

Norges mest komplette oversikt over klesbutikker. Bygget med Next.js 14, TypeScript og Tailwind CSS.

## 📊 Data

- **1 574** aktive klesbutikker fra offisielle norske registre
- **372** byer
- **16** fylker
- **73** fremhevede butikker

## 🛠 Tech Stack

- **Next.js 14** med App Router
- **TypeScript**
- **Tailwind CSS**
- **Server Components**
- Statisk generering (SSG) for alle sider

## 📁 Prosjektstruktur

```
src/
├── app/
│   ├── page.tsx              # Forside
│   ├── layout.tsx            # Root layout
│   ├── not-found.tsx         # 404
│   ├── sitemap.ts            # Auto-generert sitemap
│   ├── robots.ts             # robots.txt
│   ├── [slug]/page.tsx       # Dynamiske bysider
│   ├── butikk/
│   │   ├── page.tsx          # Alle butikker
│   │   └── [slug]/page.tsx   # Butikkside
│   ├── fylke/[slug]/page.tsx # Fylkeside
│   ├── by/page.tsx           # Alle byer
│   ├── fylker/page.tsx       # Alle fylker
│   ├── blogg/page.tsx        # Blogg
│   ├── annonser/page.tsx     # Annonsering
│   ├── legg-til-butikk/      # Legg til butikk
│   ├── om-oss/page.tsx       # Om oss
│   └── api/search/route.ts   # Søke-API
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── StoreCard.tsx
│   ├── CityCard.tsx
│   ├── StoreList.tsx
│   ├── FAQAccordion.tsx
│   ├── Breadcrumbs.tsx
│   └── CTASection.tsx
├── lib/
│   ├── stores.ts             # Data access layer
│   ├── types.ts              # TypeScript interfaces
│   ├── seo.ts                # SEO/Schema helpers
│   ├── slugify.ts            # Norwegian slug generation
│   └── city-content.ts       # Editorial city content
└── data/
    └── stores.json           # 1574 butikker fra Brønnøysund
```

## 🚀 Deploy til Vercel

### 1. Push til GitHub

```bash
git init
git add .
git commit -m "Initial commit - klesbutikk.no"
git remote add origin https://github.com/DIN-BRUKER/klesbutikk-no.git
git push -u origin main
```

### 2. Koble til Vercel

1. Gå til vercel.com
2. Klikk "New Project"
3. Importer GitHub-repoet
4. Vercel auto-detekterer Next.js
5. Klikk "Deploy"

### 3. Custom Domain

1. I Vercel dashboard → Settings → Domains
2. Legg til `klesbutikk.no`
3. Følg DNS-instruksjonene

## 🔧 Lokal utvikling

```bash
npm install
npm run dev
```

Åpne http://localhost:3000

## 🔍 SEO Features

- Unike meta title/description per side
- JSON-LD schema: Organization, ClothingStore, FAQPage, BreadcrumbList, ItemList
- Open Graph og Twitter Cards
- Automatisk sitemap.xml med alle ~2000 sider
- robots.txt med AI bot tilgang (GPTBot, ClaudeBot, PerplexityBot)
- llms.txt for AI discoverability
- entity-index.json for strukturert AI-lesing
- Breadcrumbs på alle undersider
- Sterk intern lenkestruktur

## 📈 Sider som genereres

| Type | Antall | Eksempel |
|------|--------|---------|
| Forsiden | 1 | / |
| Bysider | 372 | /oslo, /bergen |
| Fylkesider | 16 | /fylke/oslo, /fylke/rogaland |
| Butikksider | 1 574 | /butikk/h-m-as |
| Statiske sider | 6 | /by, /fylker, /blogg, etc. |
| **Totalt** | **~1 970** | |

## 💰 Forretningsmodell

- Gratis oppføring for alle butikker
- Betalt fremheving (990 kr/mnd)
- Premium plassering (2 490 kr/mnd)
- Annonseplasser
