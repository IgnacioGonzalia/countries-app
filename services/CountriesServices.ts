import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const getAllCountries = async () => {
  const flags = "name,flag,population,region,capital,cca3";
  const response = await api.get(`/all?fields=${flags}`);
  return response.data;
};
