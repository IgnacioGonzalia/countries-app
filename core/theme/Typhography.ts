import { StyleSheet } from "react-native";
import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    NunitoSansLight: require("../../assets/typhography/NunitoSans-Light.ttf"),
    NunitoSansRegular: require("../../assets/typhography/NunitoSans-Regular.ttf"),
    NunitoSansSemiBold: require("../../assets/typhography/NunitoSans-SemiBold.ttf"),
    NunitoSansExtraBold: require("../../assets/typhography/NunitoSans-ExtraBold.ttf"),
  });
};

export const typhography = StyleSheet.create({
  logo: {
    fontFamily: "NunitoSansExtraBold",
    fontSize: 14,
    lineHeight: 20,
  },
  themeToggle: {
    fontFamily: "NunitoSansSemiBold",
    fontSize: 12,
  },
});
