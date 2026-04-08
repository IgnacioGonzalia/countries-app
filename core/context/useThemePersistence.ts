import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const THEME_STORAGE_KEY = "app_theme";

export const useThemePersistence = (
  theme: "light" | "dark",
  onThemeLoad: (theme: "light" | "dark") => void,
) => {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "light" || savedTheme === "dark")
          onThemeLoad(savedTheme);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async (themeToSave: "light" | "dark") => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, themeToSave);
      } catch (error) {
        console.error("Error saving theme:", error);
      }
    };

    saveTheme(theme);
  }, [theme]);
};
