import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../core/context/ThemeContext";
import { getAllCountries } from "../services/CountriesServices";
import { ScrollView } from "react-native";
import { GridCountry } from "../core/types/GridCountry";
import Navbar from "../views/Navbar";
import CountryGrid from "../views/CountryGrid";
import Space from "../components/layout/Space";

const HomeScreen = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<GridCountry[]>([]);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      try {
        const response = await getAllCountries();
        setCountries(response);
      } catch (error) {
        console.error("Error fetching countries.", error);
        setErrorText("Error fetching countries, try again later.");
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.navbarBg }}
    >
      <Navbar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}
      >
        <Space height={32} />

        <CountryGrid
          countries={countries}
          loading={loading}
          errorText={errorText}
        />

        <Space height={64} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
