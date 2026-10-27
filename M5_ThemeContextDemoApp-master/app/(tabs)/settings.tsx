import { View, Text, Switch } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const { dark, toggle, colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text, fontSize: 24, marginBottom: 20 }}>
        Dark Mode
      </Text>
      <Switch value={dark} onValueChange={toggle} />
    </View>
  );
}
