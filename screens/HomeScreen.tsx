import { Image, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../views/Navbar";
import CountryGrid from "../views/CountryGrid";
import Space from "../components/layout/Space";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import { useTheme } from "../core/context/ThemeContext";
import { typography } from "../core/theme/Typography";
import { useCountries } from "../hooks/useCountries";

const HomeScreen = () => {
  const { colors, theme } = useTheme();
  const { countries, searchText, setSearchText, loading, errorText } =
    useCountries();

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
        <Column style={{ paddingHorizontal: 16 }}>
          <Space height={32} />

          <Row
            gap={26}
            align="center"
            style={{ ...styles.input, backgroundColor: colors.cardBg }}
          >
            <Image
              source={require("../assets/images/search.png")}
              tintColor={colors.searchIcon}
            />
            <TextInput
              value={searchText}
              placeholder="Search for a country..."
              onChangeText={setSearchText}
              style={{ ...typography.inputText, color: colors.inputText }}
              autoCorrect={false}
              keyboardAppearance={theme === "dark" ? "dark" : "light"}
              placeholderTextColor={colors.inputText}
              returnKeyType="done"
              maxLength={50}
            />
          </Row>

          <Space height={32} />

          <CountryGrid
            countries={countries}
            loading={loading}
            errorText={errorText}
          />

          <Space height={64} />
        </Column>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
});

export default HomeScreen;
