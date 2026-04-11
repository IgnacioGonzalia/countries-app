import { GridCountry } from "../core/types/GridCountry";
import { typography } from "../core/theme/Typography";
import Column from "../components/layout/Column";
import TextComponent from "../components/TextComponent";
import Loader from "./Loader";
import CountryCard from "../components/CountryCard";

interface CountryGridProps {
  countries: GridCountry[];
  loading: boolean;
  errorText: string | null;
}

const CountryGrid = ({ countries, loading, errorText }: CountryGridProps) => {
  if (loading) return <Loader />;
  if (errorText)
    return <TextComponent text={errorText} textStyle={typography.errorText} />;

  return (
    <Column align="center" justify="center" gap={40}>
      {countries.map((country: GridCountry) => (
        <CountryCard country={country} key={country?.cca3} />
      ))}
    </Column>
  );
};

export default CountryGrid;
