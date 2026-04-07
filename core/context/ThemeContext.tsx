import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Colors } from "../theme/Colors";

type Theme = "light" | "dark";

const ThemeCtx = createContext({
  theme: "light" as Theme,
  colors: Colors.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    [],
  );

  const value = useMemo(
    () => ({ theme, colors: Colors[theme], toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};

export const useTheme = () => useContext(ThemeCtx);
