import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../context/UserContext";

export default function ProfileScreen() {
  const { username } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <Text style={styles.text}>User: {username || "Guest"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  text: {
    fontSize: 22,
  },
});
