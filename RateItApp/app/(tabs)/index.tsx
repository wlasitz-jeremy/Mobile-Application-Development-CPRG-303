// Safe area components prevent content from overlapping
// the device notch, status bar, or home indicator.
import s from "../../constants/styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Core React Native components used to build the UI.
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

// Import a local image from the assets folder.
import posterImg from "../../assets/images/interstellarr.jpg";

// Array containing movie genres.
// We will use map() to display one badge per genre.
const genres = ["Sci-Fi", "Adventure", "Drama"];

export default function RateItApp() {
  return (
    // Root provider for safe area support.
    <SafeAreaProvider>

      {/* Keeps content inside safe screen boundaries */}
      <SafeAreaView style={s.screen}>

        {/* Makes the screen vertically scrollable */}
        <ScrollView contentContainerStyle={s.content}>

          {/* Movie poster image */}
          <Image source={posterImg} style={s.poster} resizeMode="cover" />

          {/* Movie information section */}
          <View style={s.info}>

            {/* Movie title */}
            <Text style={s.title}>Interstellar</Text>

            {/* Movie release year */}
            <Text style={s.year}>2014</Text>

            {/* Container for genre badges */}
            <View style={s.genreRow}>
              
              {/* Create one badge for each genre */}
              {genres.map((g) => (
                <View key={g} style={s.badge}>
                  <Text style={s.badgeText}>{g}</Text>
                </View>
              ))}
            </View>

            {/* Movie description */}
            <Text style={s.description}>
              A team of astronauts travels through a wormhole in search of a new
              home for humanity.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
/*
// Styles used throughout the screen.
const s = StyleSheet.create({
  // Main screen container
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // ScrollView content layout
  content: {
    padding: 20,
    alignItems: "center",
  },

  // Movie poster styling
  poster: {
    width: 250,
    height: 370,
    borderRadius: 12,
  },

  // Movie details section
  info: {
    marginTop: 20,
    alignItems: "center",
  },

  // Movie title styling
  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  // Movie year styling
  year: {
    marginTop: 6,
    fontSize: 18,
    color: "#64748B",
  },

  // Places badges in a horizontal row
  genreRow: {
    flexDirection: "row",
    marginTop: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  // Individual genre badge
  badge: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },

  // Text inside the badge
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Movie description styling
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#334155",
    lineHeight: 24,
  },
});
*/
