import { StyleSheet } from "react-native";

/**
 * Shared styles for the profile form demo.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 6,
    padding: 10,
  },

  // Applied only when validation fails.
  inputError: {
    borderColor: "red",
  },

  // Displays Zod validation messages.
  error: {
    color: "red",
    marginTop: 4,
  },

  button: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
