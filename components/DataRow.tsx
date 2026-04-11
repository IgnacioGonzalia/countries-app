import { Text } from "react-native";
import { useTheme } from "../core/context/ThemeContext";
import { typography } from "../core/theme/Typography";

const DataRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  const { colors } = useTheme();
  return (
    <Text style={[typography.countryCardData, { color: colors.text }]}>
      <Text style={[typography.countryCardDataLabel, { color: colors.text }]}>
        {`${label}: `}
      </Text>
      {value !== null && value !== "" ? String(value) : "-"}
    </Text>
  );
};

export default DataRow;
