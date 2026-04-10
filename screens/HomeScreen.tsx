import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../core/context/ThemeContext";
import { getAllCountries } from "../services/CountriesServices";
import { ScrollView } from "react-native";
import { GridCountry } from "../core/types/GridCountry";
import { typhography } from "../core/theme/Typhography";
import Navbar from "../views/Navbar";
import Loader from "../views/Loader";
import CountryGrid from "../views/CountryGrid";
import TextComponent from "../components/TextComponent";

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

  const renderContent = () => {
    if (loading) return <Loader />;
    if (errorText)
      return (
        <TextComponent text={errorText} textStyle={typhography.errorText} />
      );
    return <CountryGrid countries={countries} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.navbarBg }}>
      <Navbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
