import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Defines the data the MovieCard component expects
interface MovieCardProps {
  title: string;
  year: number;
  rating: number;
  genre: string;
  posterUrl: string;
  onPress?: () => void;
}

// Reusable component for displaying one movie
export default function MovieCard({
  title,
  year,
  rating,
  genre,
  posterUrl,
  onPress,
}: MovieCardProps) {
  return (
    // Makes the card respond to taps
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      accessibilityRole="button"
    >
      {/* Movie poster */}
      <Image
        source={{ uri: posterUrl }}
        style={styles.poster}
        resizeMode="cover"
      />

      {/* Movie information section */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.year}>{year}</Text>

        <View style={styles.bottom}>
          <Text style={styles.badge}>{genre}</Text>
          <Text style={styles.rating}>⭐ {rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}

// Component styles
const styles = StyleSheet.create({
  // ── The card container ─────────────────────────────────────────────
  card: {
    backgroundColor: "#FFFFFF", // opaque bg (required for shadow)
    borderRadius: 16, // rounded corners
    marginHorizontal: 16, // page gutters
    marginBottom: 12, // space between cards
    overflow: "hidden", // clips children to borderRadius

    // iOS shadow:
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Android shadow:
    elevation: 4,
  },

  // Apply opacity (transparency) while pressing the card
  cardPressed: {
    opacity: 0.8,
  },

  // ── The image inside the card ──────────────────────────────────────
  poster: {
    width: "100%", // fills card width
    height: 220, // fixed height
  },

  // ── Info section below the image ──────────────────────────────────
  info: {
    padding: 16,
  },

  // ── Title text ────────────────────────────────────────────────────
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 26,
    marginBottom: 4,
  },

  // ── Year text ─────────────────────────────────────────────────────
  year: {
    color: "#64748B",
    marginBottom: 10,
  },

  // ── Bottom section ─────────────────────────────────────────────────
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // ── Genre badge ───────────────────────────────────────────────────
  badge: {
    alignSelf: "flex-start", // shrink to text width
    backgroundColor: "#F1F5F9",
    borderRadius: 999, // pill shape
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  // ── Rating text ───────────────────────────────────────────────────
  rating: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F59E0B", // amber
    position: "absolute", // top-right corner
    top: 16,
    right: 16,
  },
});
