import axios from "axios";
import { GridCountry } from "../core/types/GridCountry";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const GRID_COUNTRY_FIELDS = "name,flags,population,region,capital,cca3";

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
