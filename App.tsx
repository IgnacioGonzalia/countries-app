import { useEffect, useState } from "react";
import { loadFonts } from "./core/theme/Typhography";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";

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
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <HomeScreen />
    </SafeAreaProvider>
  );
}
