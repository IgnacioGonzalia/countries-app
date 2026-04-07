import { SafeAreaView } from "react-native-safe-area-context";
import TextComponent from "../components/TextComponent";
import { typhography } from "../core/theme/Typhography";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TextComponent text="Where in the world?" textStyle={typhography.logo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080",
  },
});

export default HomeScreen;
