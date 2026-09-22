import { View, Text, StyleSheet } from "react-native";
export default function WorkoutsScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>Workouts</Text>
<Text>Workout Library</Text>
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