import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

const GRID_COUNTRY_FIELDS = "name,flags,population,region,capital,cca3";

export const getAllCountries = async () => {
  const response = await api.get(`/all?fields=${GRID_COUNTRY_FIELDS}`);
  return response.data;
};

export const getCountriesByTextSearch = async (text: string) => {
  const response = await api.get(`/name/${text}?fields=${GRID_COUNTRY_FIELDS}`);
  return response.data;
};
