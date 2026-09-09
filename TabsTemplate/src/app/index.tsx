import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";

export default function IdCardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>SAIT CAMPUS ID</Text>
        <Image source={{uri: "https://picsum.photos/200"}} style={styles.photo} />
        <View style={styles.infoRow}>
          <Text style={styles.name}>Jeremy Wlasitz</Text>
          <Text style={styles.studentId}>ID: 000123456</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Software Development</Text>
        </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0a66c2",
  },

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

  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  studentId: {
    fontSize: 16,
    color: "#555",
  },

  badge: {
    backgroundColor: "#0a66c2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
  }
});
