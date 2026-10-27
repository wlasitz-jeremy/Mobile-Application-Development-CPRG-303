import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function About() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text, fontSize: 28 }}>About Screen</Text>
    </View>
  );
}
