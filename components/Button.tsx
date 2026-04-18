import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import TextComponent from "./TextComponent";
import Column from "./layout/Column";
import Row from "./layout/Row";

interface ButtonProps {
  onPress: () => void;
  text: string;
  textStyle?: TextStyle;
  orientation?: "horizontal" | "vertical";
  reverse?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
  iconStyle?: ViewStyle;
  gap?: number;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
}

const Button = ({
  onPress,
  text,
  textStyle,
  orientation = "horizontal",
  reverse = false,
  style = {},
  icon = <></>,
  iconStyle = {},
  gap = 0,
  justify = undefined,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
      {orientation === "horizontal" ? (
        <Row justify={justify} reverse={reverse} gap={gap}>
          <TextComponent text={text} textStyle={textStyle} />
          <View style={iconStyle}>{icon}</View>
        </Row>
      ) : (
        <Column reverse={reverse} gap={gap}>
          <TextComponent text={text} textStyle={textStyle} />
          <View style={iconStyle}>{icon}</View>
        </Column>
      )}
    </TouchableOpacity>
  );
};

export default Button;
