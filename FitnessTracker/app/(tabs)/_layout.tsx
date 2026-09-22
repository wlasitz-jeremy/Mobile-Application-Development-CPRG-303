import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
return (
<Tabs
screenOptions={{
tabBarActiveTintColor: "#FFC107",
tabBarInactiveTintColor: "#A0A0A0",
tabBarStyle: {
backgroundColor: "#0A2342",
},
headerStyle: {
backgroundColor: "#0A2342",
},
headerTintColor: "#FFFFFF",
}}
>
<Tabs.Screen
name="index"
options={{
title: "Today",
tabBarBadge: 3,
tabBarIcon: ({ color, focused }) => (
<Ionicons
name={focused ? "home" : "home-outline"}
size={24}
color={color}
/>
),
}}
/>
<Tabs.Screen
name="workouts"
options={{
title: "Workouts",
tabBarIcon: ({ color, focused }) => (
<Ionicons
name={focused ? "barbell" : "barbell-outline"}
size={24}
color={color}
/>
),
}}
/>
<Tabs.Screen
name="stats"
options={{
title: "Stats",
tabBarIcon: ({ color, focused }) => (
<Ionicons
name={focused ? "stats-chart" : "stats-chart-outline"}
size={24}
color={color}
/>
),
}}
/>
<Tabs.Screen
name="profile"
options={{
title: "Profile",
tabBarIcon: ({ color, focused }) => (
<Ionicons
name={focused ? "person" : "person-outline"}
size={24}
color={color}
/>
),
}}
/>
</Tabs>
);
}