import { useEffect, useState } from "react";
import { loadFonts } from "./core/theme/Typhography";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./core/context/ThemeContext";
import HomeScreen from "./screens/HomeScreen";

const StatusBarWrapper = () => {
  const { theme } = useTheme();
  return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function getFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }

    getFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBarWrapper />
        <HomeScreen />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
