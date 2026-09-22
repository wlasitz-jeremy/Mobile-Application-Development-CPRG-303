// Import core React Native UI components:

import { Pressable, StyleSheet, Text, View } from "react-native";

// Import from Expo Router:
// Link = a declarative navigation component (like an <a> tag on web)
// useRouter = a hook that returns a router object for programmatic navigation
import { Link, useRouter } from "expo-router";

// This component is the screen rendered for this file's route (i.e. "/")
export default function HomeScreen() {
  // Get the router instance so we can trigger navigation on button press
  const router = useRouter();

  return (
    // Outer container: fills the screen and centers its children
    <View style={styles.container}>
      {/* Screen heading */}
      <Text style={styles.title}>Home Screen</Text>

      {/* Declarative navigation:
          <Link> renders a pressable element that navigates to "/about"
          when tapped. Same as HHTML <a> tag.
          Styled with styles.link (blue, bold). */}
      <Link href="/about" style={styles.link}>
        About Page
      </Link>

      {/* Imperative navigation:
          Pressable button that navigates to "/profile" on press.
          router.push() adds the new screen ON TOP of the stack,
          so the user CAN go back to Home afterward.
          (Contrast with router.replace(), which wipes the current screen.) */}
      <Pressable style={styles.button} onPress={() => router.push("/profile")}>
        <Text style={styles.buttonText}>Go To Profile</Text>
      </Pressable>
    </View>
  );
}

// Styles are defined once and referenced by name for performance and readability
const styles = StyleSheet.create({
  // Full-screen container, centered content, consistent spacing between children
  container: {
    flex: 1, // Take up all available space
    justifyContent: "center", // Center children vertically
    alignItems: "center", // Center children horizontally
    gap: 20, // Space between each child element
  },

  // Style for the "Home Screen" heading
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  // Style for the "Go To Profile" button
  button: {
    backgroundColor: "#2563EB", // Blue background
    padding: 12, // Inner spacing (makes button bigger)
    borderRadius: 8, // Rounded corners
  },

  // Style for the text inside the button
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  // Style for the <Link> text (styled like a hyperlink)
  link: {
    color: "#2563EB",
    fontWeight: "bold",
  },
});
