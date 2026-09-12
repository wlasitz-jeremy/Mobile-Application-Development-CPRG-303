import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";


export default function IdCardScreen() {
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.app}>
        <Text style={styles.title}>Edit src/app/index.tsx to edit this screen.</Text>
        </ScrollView>
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
