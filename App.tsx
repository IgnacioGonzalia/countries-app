import { useEffect, useState } from "react";
import { loadFonts } from "./core/theme/Typography";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./core/context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./core/types/Navigation";
import HomeScreen from "./screens/HomeScreen";
import CountryScreen from "./screens/CountryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      <StatusBarWrapper />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="country_screen" component={CountryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
