import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  // Main screen container
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // ScrollView content layout
  content: {
    padding: 20,
    alignItems: "center",
  },

  // Movie poster styling
  poster: {
    width: 250,
    height: 370,
    borderRadius: 12,
  },

  // Movie details section
  info: {
    marginTop: 20,
    alignItems: "center",
  },

  // Movie title styling
  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  // Movie year styling
  year: {
    marginTop: 6,
    fontSize: 18,
    color: "#64748B",
  },

  // Places badges in a horizontal row
  genreRow: {
    flexDirection: "row",
    marginTop: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  // Individual genre badge
  badge: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },

  // Text inside the badge
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Movie description styling
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#334155",
    lineHeight: 24,
  },
});

export default s;
