export interface Store {
  organisasjonsnummer: string;
  navn: string;
  slug: string;
  adresse: string;
  postnummer: string;
  poststed: string;
  kommune: string;
  fylke: string;
  kategori: string;
  featured: boolean;
  telefon?: string;
  nettside?: string;
  epost?: string;
  beskrivelse?: string;
  antallAnsatte?: number;
}

export interface CityData {
  name: string;
  slug: string;
  fylke: string;
  storeCount: number;
  featuredCount: number;
}

export interface FylkeData {
  name: string;
  slug: string;
  storeCount: number;
  cities: string[];
}
