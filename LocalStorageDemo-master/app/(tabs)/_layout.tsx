import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Optional: for tab icons

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2563eb" }}>
      <Tabs.Screen
        name="account/profile" // Note: If profile is inside 'account/', this path might need to be 'account/profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
