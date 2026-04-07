import { Text, TextProps, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "../core/context/ThemeContext";

interface TextComponentProps {
  text: string | number;
  textStyle?: TextStyle;
  numberOfLines?: number;
  style?: ViewStyle;
  props?: TextProps;
}

const TextComponent = ({
  text,
  textStyle,
  numberOfLines,
  style,
  props,
}: TextComponentProps) => {
  const { colors } = useTheme();

  return (
    <View style={style}>
      <Text
        style={[{ color: colors.text }, textStyle]}
        numberOfLines={numberOfLines ?? undefined}
        ellipsizeMode={numberOfLines ? "tail" : undefined}
        {...props}
      >
        {text}
      </Text>
    </View>
  );
};

export default TextComponent;
