// Import core React Native UI components:
import { Pressable, StyleSheet, Text, View } from "react-native";

// Import useRouter hook from Expo Router to programmatically navigate between screens
import { useRouter } from "expo-router";

// This component is the screen rendered for this file's route (e.g. /profile)
export default function ProfileScreen() {
  // Get the router instance so we can trigger navigation on button press
  const router = useRouter();

  return (
    // Outer container: fills the screen and centers its children
    <View style={styles.container}>
      {/* Screen heading */}
      <Text style={styles.title}>Profile Screen</Text>

      {/* Subtitle / body text */}
      <Text>Welcome to your profile.</Text>

      {/* Button that signs the user out.
          router.replace("/") navigates to the root route ("/")
          and REPLACES the current screen in history,
          so the user can't go "back" to the profile after signing out. */}
      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

// Styles are defined once and referenced by name for performance and readability
const styles = StyleSheet.create({
  // Full-screen container, centered content, with padding
  container: {
    flex: 1, // Take up all available space
    justifyContent: "center", // Center children vertically
    alignItems: "center", // Center children horizontally
    padding: 20, // Inner spacing around edges
  },

  // Style for the "Profile Screen" heading
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15, // Space below the title
  },

  // Style for the Sign Out button
  button: {
    marginTop: 20, // Space above the button
    backgroundColor: "#2563EB", // Blue background
    padding: 12, // Inner spacing (makes button bigger)
    borderRadius: 8, // Rounded corners
  },

  // Style for the text inside the button
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
