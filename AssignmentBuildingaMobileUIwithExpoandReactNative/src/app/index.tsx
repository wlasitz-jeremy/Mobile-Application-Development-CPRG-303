import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IdCardScreen() {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.app}>
        <Text style={styles.title}>Edit src/app/index.tsx to edit this screen.</Text>
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  app: {},
  title: {},
});
