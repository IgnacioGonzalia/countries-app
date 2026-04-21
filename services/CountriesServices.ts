import axios from "axios";
import { GridCountry } from "../core/types/GridCountry";
import { Country } from "../core/types/Country";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const GRID_COUNTRY_FIELDS = "name,flags,population,region,capital,cca3";
const COUNTRY_SCREEN_FIELDS =
  "flags,name,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,cca3";

export const getAllCountries = async (): Promise<GridCountry[]> => {
  const response = await api.get(`/all?fields=${GRID_COUNTRY_FIELDS}`);
  return response.data;
};

export const getCountriesByTextSearch = async (
  text: string,
): Promise<GridCountry[]> => {
  const response = await api.get(
    `/translation/${text}?fields=${GRID_COUNTRY_FIELDS}`,
  );
  return response.data;
};

export const getCountriesByRegion = async (
  region: string,
): Promise<GridCountry[]> => {
  const response = await api.get(
    `/region/${region}?fields=${GRID_COUNTRY_FIELDS}`,
  );
  return response.data;
};

export const getCountry = async (cca3: string): Promise<Country> => {
  const response = await api.get(
    `/alpha/${cca3}?fields=${COUNTRY_SCREEN_FIELDS}`,
  );
  return response.data;
};

export const getBorders = async (
  borders: string[],
): Promise<
  {
    name: {
      common: string;
      nativeName: object;
      official: string;
    };
    cca3: string;
  }[]
> => {
  if (!borders?.length) return [];
  const response = await api.get(
    `/alpha?codes=${borders.join(",")}&fields=name,cca3`,
  );
  return response.data;
};
