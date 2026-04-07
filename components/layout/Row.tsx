import { View, ViewStyle } from "react-native";

interface RowProps {
  children: React.ReactNode;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: number;
  wrap?: boolean;
  style?: ViewStyle;
  reverse?: boolean;
}

const Row = ({
  children,
  align = "stretch",
  justify = "flex-start",
  gap = 0,
  wrap = false,
  style,
  reverse = false,
}: RowProps) => {
  return (
    <View
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        gap: gap,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default Row;
