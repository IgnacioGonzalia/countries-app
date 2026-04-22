export interface Country {
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    nativeName: Record<string, { common: string; official: string }>;
    official: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  cca3: string;
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  borders: string[];
}
