import { StyleSheet, View, Text, Image, ScrollView } from "react-native";


export default function App() {
  return (
      <View style={styles.appContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
    borderRadius: 50,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
