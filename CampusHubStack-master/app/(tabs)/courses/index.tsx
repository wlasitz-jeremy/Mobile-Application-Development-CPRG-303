// File Location: app/(tabs)/courses/index.tsx
import { Link } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

const COURSES = [
  { code: "cprg303", title: "Mobile Application Development" },
  { code: "cprg216", title: "Programming Fundamentals" },
  { code: "cprg306", title: "Web Development II" },
];

export default function CoursesScreen() {
  return (
    <FlatList
      data={COURSES}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <Link href={`/courses/${item.code}`} asChild>
          <Pressable
            style={{
              padding: 16,
              margin: 8,
              backgroundColor: "#E5E7EB",
              borderRadius: 8,
            }}
          >
            <Text>{item.code.toUpperCase()}</Text>
            <Text>{item.title}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}
