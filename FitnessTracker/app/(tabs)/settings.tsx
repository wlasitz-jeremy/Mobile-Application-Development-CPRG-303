import { View, Text, StyleSheet } from "react-native";
export default function SettingsScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>Settings</Text>
<Text>App preferences and configuration</Text>
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
},
});