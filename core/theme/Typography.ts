import { StyleSheet } from "react-native";
import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    NunitoSansLight: require("../../assets/typography/NunitoSans-Light.ttf"),
    NunitoSansRegular: require("../../assets/typography/NunitoSans-Regular.ttf"),
    NunitoSansSemiBold: require("../../assets/typography/NunitoSans-SemiBold.ttf"),
    NunitoSansExtraBold: require("../../assets/typography/NunitoSans-ExtraBold.ttf"),
  });
};

export const typography = StyleSheet.create({
  logo: {
    fontFamily: "NunitoSansExtraBold",
    fontSize: 14,
    lineHeight: 20,
  },
  themeToggle: {
    fontFamily: "NunitoSansSemiBold",
    fontSize: 12,
  },
  errorText: {
    fontFamily: "NunitoSansSemiBold",
    fontSize: 14,
    color: "red",
    marginTop: 50,
    textAlign: "center",
  },
  countryCardName: {
    fontFamily: "NunitoSansExtraBold",
    fontSize: 16,
    lineHeight: 26,
  },
  countryCardDataLabel: {
    fontFamily: "NunitoSansSemiBold",
    fontSize: 14,
    lineHeight: 16,
  },
  countryCardData: {
    fontFamily: "NunitoSansLight",
    fontSize: 14,
    lineHeight: 16,
  },
  inputText: {
    flex: 1,
    fontFamily: "NunitoSansRegular",
    fontSize: 12,
    lineHeight: 16,
  },
});
