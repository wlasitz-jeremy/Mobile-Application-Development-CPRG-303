// File Location: constants/settingsStyles.ts

import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  section: {
    marginBottom: 18,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    marginBottom: 14,
    fontSize: 20,
    fontWeight: "600",
    color: "#003865",
  },
  inputLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    fontSize: 16,
    color: "#0F172A",
  },
  settingRow: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  settingText: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  settingDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: "#64748B",
  },
  saveButton: {
    marginTop: 6,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#003865",
    borderRadius: 10,
  },
  saveButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  savedMsg: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#16A34A",
  },
});

export default s;
