import { Pressable, StyleSheet, Text, View } from "react-native";
export function TabBarPlaceholder() {
  return (
    <View style={s.c}>
      <Pressable style={[s.t, s.a]}>
        <Text>Posts</Text>
      </Pressable>
      <Pressable style={s.t}>
        <Text>Reels</Text>
      </Pressable>
      <Pressable style={s.t}>
        <Text>Tagged</Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  c: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  t: { flex: 1, padding: 12, alignItems: "center" },
  a: { borderBottomWidth: 2 },
});
