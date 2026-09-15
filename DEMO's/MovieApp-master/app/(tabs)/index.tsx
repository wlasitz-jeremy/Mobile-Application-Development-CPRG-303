import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Home</Text>
      <Text style={styles.subtitle}>Discover, rate, and save movies</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',   
  },
  subtitle: {
    marginTop: 30,
    fontSize: 20,
    color: '#475A7C',
  },
});
