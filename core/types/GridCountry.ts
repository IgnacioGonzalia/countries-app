export interface GridCountry {
  name: {
    common: string;
    nativeName: object;
    official: string;
  };
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  population: number;
  region: string;
  capital: string[];
  cca3: string;
}
