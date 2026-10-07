// FILE LOCATION: app/(tabs)/index.tsx
// Home tab. Demonstrates a simple screen rendered by Expo Router.

import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusHub</Text>
      <Text>Welcome to the student portal.</Text>
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
    fontWeight: "bold",
    marginBottom: 10,
  },
});
