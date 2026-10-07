// File Location: app/edit.tsx
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function EditScreen() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Edit Screen</Text>

      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
