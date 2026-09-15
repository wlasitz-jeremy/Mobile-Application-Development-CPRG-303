import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Movies</Text>
      <Text style={styles.subtitle}>Movies are coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 30,
    fontSize: 20,
    color: "#475A7C",
  },
});
