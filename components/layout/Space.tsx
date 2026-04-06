import { View } from "react-native";

interface SpaceProps {
  height?: number;
  width?: number;
}

const Space = ({ height, width }: SpaceProps) => {
  return <View style={{ height, width }} />;
};

export default Space;
