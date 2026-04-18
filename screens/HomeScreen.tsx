import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../views/Navbar";
import CountryGrid from "../views/CountryGrid";
import Space from "../components/layout/Space";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import { useTheme } from "../core/context/ThemeContext";
import { typography } from "../core/theme/Typography";
import { useCountries } from "../hooks/useCountries";
import Button from "../components/Button";
import RegionDropdown from "../components/RegionDropdown";
import { useRef, useState } from "react";

const HomeScreen = () => {
  const { colors, theme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);
  const { countries, searchText, setSearchText, loading, errorText } =
    useCountries(region);

  const handleFilterPress = () => {
    buttonRef.current?.measure((_x, _y, _width, height, pageX, pageY) => {
      setButtonPosition({ x: pageX, y: pageY + height });
      setDropdownVisible(true);
    });
  };

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

          <Space height={40} />

          <View ref={buttonRef} style={{ width: 200 }}>
            <Button
              onPress={handleFilterPress}
              text={region ?? "Filter by Region"}
              textStyle={{ ...typography.inputText, color: colors.text }}
              icon={
                <Image
                  source={require("../assets/images/arrow-down.png")}
                  tintColor={colors.text}
                  style={{ marginTop: 3 }}
                />
              }
              justify="space-between"
              style={{
                ...styles.dropdownButton,
                backgroundColor: colors.cardBg,
              }}
            />
          </View>

          <Space height={32} />

          <CountryGrid
            countries={countries}
            loading={loading}
            errorText={errorText}
          />

          <Space height={64} />
        </Column>
      </ScrollView>

      <RegionDropdown
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        onSelect={setRegion}
        position={buttonPosition}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  dropdownButton: {
    width: 200,
    paddingVertical: 14,
    paddingLeft: 24,
    paddingRight: 19,
    borderRadius: 5,
  },
});

export default HomeScreen;
