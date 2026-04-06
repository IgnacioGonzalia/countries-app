import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { typhography, loadFonts } from "./core/theme/Typhography";
import Column from "./components/layout/Column";
import TextComponent from "./components/TextComponent";

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
    <Column align="center" justify="center" style={styles.container}>
      <TextComponent text="Where in the world?" textStyle={typhography.logo} />
    </Column>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
