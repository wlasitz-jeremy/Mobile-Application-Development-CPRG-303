import { StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Favorites Movies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
