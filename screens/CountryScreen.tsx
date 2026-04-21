import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../core/types/Navigation";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../core/context/ThemeContext";
import { typography } from "../core/theme/Typography";
import { getBorders, getCountry } from "../services/CountriesServices";
import { Country } from "../core/types/Country";
import Button from "../components/Button";
import Column from "../components/layout/Column";
import Space from "../components/layout/Space";
import Navbar from "../views/Navbar";
import Row from "../components/layout/Row";
import TextComponent from "../components/TextComponent";
import DataRow from "../components/DataRow";
import Loader from "../views/Loader";

type Props = NativeStackScreenProps<RootStackParamList, "country_screen">;

const CountryScreen = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const { cca3 } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [flagAspectRatio, setFlagAspectRatio] = useState(3 / 2);
  const [borders, setBorders] = useState<Awaited<
    ReturnType<typeof getBorders>
  > | null>(null);

  useEffect(() => {
    const url = countryData?.flags?.png;
    if (!url) return;
    Image.getSize(
      url,
      (w, h) => setFlagAspectRatio(w / h),
      () => {},
    );
  }, [countryData?.flags?.png]);

  useEffect(() => {
    const getCountryData = async () => {
      setLoading(true);
      setErrorText("");
      setBorders(null);
      try {
        const response = await getCountry(cca3);
        setCountryData(response);
        const borderData = await getBorders(response?.borders);
        setBorders(borderData);
      } catch (error) {
        console.error("error fetching country", error);
        setErrorText("Error getting country data, please try again.");
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [cca3]);

  if (loading || errorText)
    return (
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: colors.navbarBg }}
      >
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <TextComponent
            text={errorText}
            textStyle={typography.errorText}
            style={{ marginTop: 50 }}
          />
        )}
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.navbarBg }}
    >
      <ScrollView>
        <Navbar />

        <Column style={styles.container}>
          <Space height={40} />

          <Button
            onPress={() => navigation.goBack()}
            text="Back"
            icon={
              <Image
                source={require("../assets/images/back.png")}
                tintColor={colors.text}
              />
            }
            reverse
            gap={8}
            style={{
              ...styles.button,
              ...styles.shadow,
              backgroundColor: colors.cardBg,
            }}
          />

          <Space height={64} />

          <Row justify="center">
            <Image
              source={{ uri: countryData?.flags?.png }}
              style={[styles.flag, { aspectRatio: flagAspectRatio }]}
            />
          </Row>

          <Space height={44} />

          <TextComponent
            text={countryData?.name?.common ?? "-"}
            textStyle={typography.countryScreenName}
          />

          <Space height={16} />

          <Column gap={12}>
            <DataRow
              label="Native Name"
              value={
                countryData
                  ? Object.values(countryData?.name?.nativeName)?.[0]?.common
                  : "-"
              }
            />
            <DataRow
              label="Population"
              value={countryData?.population?.toLocaleString() ?? "-"}
            />
            <DataRow label="Region" value={countryData?.region ?? "-"} />
            <DataRow label="Sub Region" value={countryData?.subregion ?? "-"} />
            <DataRow
              label="Capital"
              value={
                countryData?.capital ? countryData?.capital?.join(", ") : "-"
              }
            />
          </Column>

          <Space height={32} />

          <Column gap={12}>
            <DataRow
              label="Top Level Domain"
              value={countryData?.topLevelDomain ?? "-"}
            />
            <DataRow
              label="Currencies"
              value={
                countryData?.currencies
                  ? Object.values(countryData.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "-"
              }
            />
            <DataRow
              label="Languages"
              value={
                countryData?.languages
                  ? Object.values(countryData.languages).join(", ")
                  : "-"
              }
            />
          </Column>

          <Space height={34} />

          {countryData && countryData?.borders?.length > 0 && (
            <>
              <TextComponent
                text="Border Countries:"
                textStyle={typography.countryScreenSubtitle}
              />

              <Space height={16} />

              <Row gap={10} wrap>
                {borders?.map((border) => (
                  <Button
                    key={border.cca3}
                    onPress={() =>
                      navigation.push("country_screen", {
                        cca3: border?.cca3,
                      })
                    }
                    text={border?.name?.common}
                    textStyle={typography.inputText}
                    style={{
                      ...styles.shadow,
                      ...styles.border,
                      backgroundColor: colors.cardBg,
                    }}
                  />
                ))}
              </Row>
            </>
          )}

          <Space height={96} />
        </Column>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 28, maxWidth: 320, alignSelf: "center" },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
  },
  flag: {
    borderRadius: 8,
    width: "100%",
    maxWidth: 320,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  border: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

export default CountryScreen;
