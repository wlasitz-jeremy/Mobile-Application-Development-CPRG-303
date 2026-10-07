// app/(tabs)/courses/_layout.tsx
import { Stack } from "expo-router";

export default function CoursesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Courses",
          headerShown: false, // Hide header since tabs already have one, or set to true if you want it
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Course Details",
          // headerShown: true (default)
        }}
      />
    </Stack>
  );
}
