import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "../core/context/ThemeContext";
import TextComponent from "./TextComponent";
import { typography } from "../core/theme/Typography";

const REGIONS = [
  "Africa",
  "America",
  "Asia",
  "Europe",
  "Oceania",
  "All Countries",
];

interface DropdownPosition {
  x: number;
  y: number;
}

interface RegionDropdownProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (region: string | null) => void;
  position: DropdownPosition;
}

const RegionDropdown = ({
  visible,
  onClose,
  onSelect,
  position,
}: RegionDropdownProps) => {
  const { colors } = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={StyleSheet.absoluteFill}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.dropdown,
                {
                  top: position.y + 10,
                  left: position.x,
                  backgroundColor: colors.cardBg,
                },
              ]}
            >
              {REGIONS.map((region) => (
                <TouchableOpacity
                  key={region}
                  onPress={() => {
                    onSelect(region === "All Countries" ? null : region);
                    onClose();
                  }}
                  style={styles.region}
                  activeOpacity={0.7}
                >
                  <TextComponent
                    text={region}
                    textStyle={typography.inputText}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    borderRadius: 5,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  region: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default RegionDropdown;
