//import { View, Text, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import styles from "../../constants/styles/tabs_style";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Application settings.</Text>
    </View>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
*/
