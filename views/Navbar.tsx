import { Image, StyleSheet } from "react-native";
import { useTheme } from "../core/context/ThemeContext";
import { typography } from "../core/theme/Typography";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../core/types/Navigation";
import Row from "../components/layout/Row";
import Button from "../components/Button";

const Navbar = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, theme, toggleTheme } = useTheme();

  const icons = {
    light: require("../assets/images/moon-outline.png"),
    dark: require("../assets/images/filled-moon.png"),
  };

  return (
    <Row
      justify="space-between"
      align="center"
      style={{ ...styles.container, backgroundColor: colors.navbarBg }}
    >
      <Button
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "home" }] })
        }
        text="Where in the world?"
        textStyle={typography.logo}
      />
      <Button
        onPress={toggleTheme}
        text="Dark Mode"
        textStyle={typography.themeToggle}
        icon={<Image source={icons[theme]} />}
        gap={8}
      />
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    zIndex: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Navbar;
