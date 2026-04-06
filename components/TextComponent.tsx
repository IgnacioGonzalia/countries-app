import { Text, TextProps, TextStyle, View, ViewStyle } from "react-native";

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
  return (
    <View style={style}>
      <Text
        style={textStyle}
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
