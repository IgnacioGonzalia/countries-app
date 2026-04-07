import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../core/context/ThemeContext";
import Navbar from "../views/Navbar";

const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.navbarBg }}>
      <Navbar />
    </SafeAreaView>
  );
};

export default HomeScreen;
