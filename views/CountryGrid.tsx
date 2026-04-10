import { GridCountry } from "../core/types/GridCountry";
import Column from "../components/layout/Column";
import TextComponent from "../components/TextComponent";

const CountryGrid = ({ countries }: { countries: GridCountry[] }) => {
  return (
    <Column align="center" justify="center" gap={10}>
      {countries.map((country: GridCountry) => (
        <TextComponent text={country?.name?.common} key={country?.cca3} />
      ))}
    </Column>
  );
};

export default CountryGrid;
