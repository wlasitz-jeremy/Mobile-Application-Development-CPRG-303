import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";

export default function IdCardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* ID Card */}
      <View style={styles.card}>
        {/* Card Header */}
        <Text style={styles.title}>SAIT CAMPUS ID</Text>

        {/* Student Photo */}
        <Image
          source={{
            uri: "https://picsum.photos/200",
          }}
          style={styles.photo}
        />

        {/* Name and ID Row */}
        <View style={styles.infoRow}>
          <Text style={styles.name}>Hamdy Ibrahim</Text>

          <Text style={styles.studentId}>000123456</Text>
        </View>

        {/* Program Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Software Development</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },

  // ID card container
  card: {
    width: 320,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  // Card title
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0a66c2",
    textAlign: "center",
    marginBottom: 20,
  },

  // Student profile photo
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },

  // Row for name and ID
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  // Student name
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // Student ID
  studentId: {
    fontSize: 16,
    color: "#555",
  },

  // Program badge
  badge: {
    backgroundColor: "#0a66c2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  // Badge text
  badgeText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
