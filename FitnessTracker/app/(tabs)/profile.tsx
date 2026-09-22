import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
export default function ProfileScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>Profile</Text>
<Button
title="Open Settings"
onPress={() => router.push("/settings")}
/>
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},
title: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
},
});