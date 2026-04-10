import LottieView from "lottie-react-native";
import Column from "../components/layout/Column";

const Loader = () => (
  <Column align="center" justify="center" style={{ marginTop: 50 }}>
    <LottieView
      source={require("../assets/loader/ArgentinaFlagAnimation.json")}
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
  </Column>
);

export default Loader;
