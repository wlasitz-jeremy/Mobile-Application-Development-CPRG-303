import { Pressable, Text, View } from "react-native";

import { router } from "expo-router";

/**
 * SettingsScreen
 *
 * This screen acts as the main Settings page.
 * Users can navigate to the Edit Profile form.
 */
export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      {/* Screen title */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Settings
      </Text>

      {/* Account section */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Account
      </Text>

      {/* Navigate to the profile form screen */}
      <Pressable
        onPress={() => router.push("/(tabs)/settings/profile")}
        style={{
          padding: 16,
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Edit Profile
        </Text>

        <Text
          style={{
            color: "#6B7280",
            marginTop: 4,
          }}
        >
          Update your personal information
        </Text>
      </Pressable>
    </View>
  );
}
