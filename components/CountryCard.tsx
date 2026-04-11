import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { useTheme } from "../core/context/ThemeContext";
import { GridCountry } from "../core/types/GridCountry";
import { typography } from "../core/theme/Typography";
import Column from "./layout/Column";
import Space from "./layout/Space";
import TextComponent from "./TextComponent";
import DataRow from "./DataRow";

// Module-level cache: lives outside the component so it persists across renders and re-mounts.
// Maps each flag URL to its calculated aspect ratio (width / height).
// This way, Image.getSize is only called once per unique URL — not once per card per render.
const flagRatioCache = new Map<string, number>();

const CountryCard = ({ country }: { country: GridCountry }) => {
  const { colors } = useTheme();
  const [aspectRatio, setAspectRatio] = useState(3 / 2);

  useEffect(() => {
    const url = country.flags.png;
    if (!url) return;

    // If we already fetched this flag's dimensions before, reuse the cached ratio.
    const cached = flagRatioCache.get(url);
    if (cached !== undefined) {
      setAspectRatio(cached);
      return;
    }

    // Otherwise, fetch the real dimensions from the image URL,
    // store the result in the cache, and update the component state.
    Image.getSize(
      url,
      (w, h) => {
        const ratio = w / h;
        flagRatioCache.set(url, ratio);
        setAspectRatio(ratio);
      },
      () => {}, // silently fall back to the default 3/2 ratio on error
    );
  }, [country.flags.png]);

  return (
    <Column style={{ ...styles.container, backgroundColor: colors.cardBg }}>
      <Image
        source={{ uri: country?.flags?.png }}
        style={[styles.flag, { aspectRatio }]}
      />

      <Space height={24} />

      <Column style={{ paddingHorizontal: 24 }} gap={16}>
        <TextComponent
          text={country?.name?.common ?? "-"}
          textStyle={typography.countryCardName}
        />
        <Column gap={8}>
          <DataRow
            label="Population"
            value={country?.population?.toLocaleString()}
          />
          <DataRow label="Region" value={country?.region} />
          <DataRow label="Capital" value={country?.capital?.join(", ")} />
        </Column>
      </Column>

      <Space height={46} />
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 264,
    borderRadius: 5,
  },
  flag: {
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default CountryCard;
