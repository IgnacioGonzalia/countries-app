import { useEffect, useState } from "react";
import { GridCountry } from "../core/types/GridCountry";
import {
  getAllCountries,
  getCountriesByTextSearch,
} from "../services/CountriesServices";

export const useCountries = () => {
  const [countries, setCountries] = useState<GridCountry[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (!searchText.trim()) {
      const getCountries = async () => {
        setLoading(true);
        try {
          const response = await getAllCountries();
          setErrorText(null);
          setCountries(response);
        } catch (error) {
          console.error("Error fetching countries.", error);
          setErrorText("Error fetching countries, try again later.");
        } finally {
          setLoading(false);
        }
      };

      getCountries();
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await getCountriesByTextSearch(searchText.trim());
        setErrorText(null);
        setCountries(response);
      } catch (error) {
        console.error("Error fetching countries by text search", error);
        setErrorText("There are no countries with that name.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  return {
    countries,
    searchText,
    setSearchText,
    loading,
    errorText,
  };
};
