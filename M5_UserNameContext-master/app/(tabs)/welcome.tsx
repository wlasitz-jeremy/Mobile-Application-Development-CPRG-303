import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../context/UserContext";

export default function WelcomeScreen() {
  const { username } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Screen</Text>

      <Text style={styles.message}>Welcome {username || "Guest"}</Text>
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

  message: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
