import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";

export default function IdCardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}></View>
      <Text>Campus Id Card</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },

  card: {
    width: 320,
    height: 320,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
});
