import { View, ViewStyle } from "react-native";

interface ColumnProps {
  children: React.ReactNode;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: number;
  style?: ViewStyle;
}

const Column = ({
  children,
  align = "stretch",
  justify = "flex-start",
  gap = 0,
  style,
}: ColumnProps) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: align,
        justifyContent: justify,
        gap: gap,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default Column;
