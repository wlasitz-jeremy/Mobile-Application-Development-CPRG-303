import { StyleSheet, Text, TextInput, View } from "react-native";

//import useUser hook from UserContext file
import { useUser } from "../context/UserContext";

export default function HomeScreen() {
  // create a state to hold the user name using useUser()
  const { username, setUserName } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/*  add value and onChangeText to <TextInput> */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={{ username }}
        onChangeText={setUserName}
      />
      {/*  add username or nothing entered  */}
      <Text style={styles.text}>Username: {username || "No name entered"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
