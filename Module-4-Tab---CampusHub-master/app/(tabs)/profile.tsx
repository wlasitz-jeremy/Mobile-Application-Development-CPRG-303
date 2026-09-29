//import { View, Text, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import styles from "../../constants/styles/tabs_style";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Student profile information.</Text>
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
