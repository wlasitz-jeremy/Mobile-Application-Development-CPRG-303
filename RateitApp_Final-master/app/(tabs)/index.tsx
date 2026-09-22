import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import MovieCard from "../../components/MovieCard";

// Sample movie data
const MOVIES = [
  {
    id: "1",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    posterUrl: "https://picsum.photos/id/29/600/900",
  },
  {
    id: "2",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    posterUrl: "https://picsum.photos/id/36/600/900",
  },
  {
    id: "3",
    title: "The Martian",
    year: 2015,
    genre: "Adventure",
    rating: 8.0,
    posterUrl: "https://picsum.photos/id/42/600/900",
  },
];

// Main application screen
export default function MovieListScreen() {
  // Stores the search text entered by the user
  const [search, setSearch] = useState("");

  // Stores whether Dark Mode is enabled
  const [darkMode, setDarkMode] = useState(false);

  // Returns only movies that match the search text
  const filtered = MOVIES.filter((movie) =>
    //includes() checks whether one string contains another string. it returns true or false
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Dynamic colors based on theme
  const bg = darkMode ? "#0F172A" : "#F8FAFC";
  const inputBg = darkMode ? "#1E293B" : "#E2E8F0";
  const textColor = darkMode ? "#F1F5F9" : "#1E293B";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {/* Search bar and dark mode toggle */}
      <View style={styles.controlRow}>
        {/* Search movies */}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: inputBg,
              color: textColor,
            },
          ]}
          value={search}
          onChangeText={setSearch}
          placeholder="Search movies..."
        />

        {/* Enable or disable Dark Mode */}
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Display movies using FlatList */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard {...item} onPress={() => alert(item.title)} />
        )}
        // ListEmptyComponent is a built-in prop that renders only when the list's data array is empty.
        ListEmptyComponent={<Text>No movies found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
  },
});
