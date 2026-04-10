export interface GridCountry {
  name: {
    common: string;
    nativeName: any;
    official: string;
  };
  flag: string;
  population: number;
  region: string;
  capital: string[];
  cca3: string;
}
