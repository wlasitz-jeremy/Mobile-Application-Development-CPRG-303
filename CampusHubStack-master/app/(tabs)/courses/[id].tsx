// File Location: app/(tabs)/courses/[id].tsx
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: id?.toUpperCase(),
          headerRight: () => (
            //Replace: router.push("/edit") with: router.replace("/edit")
            <Text
              onPress={() => router.push("/edit")}
              style={{ color: "blue" }}
            >
              Edit
            </Text>
          ),
        }}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, marginBottom: 10 }}>Course: {id}</Text>
        <Text>Description goes here.</Text>
      </View>
    </>
  );
}
