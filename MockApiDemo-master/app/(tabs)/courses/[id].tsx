// `useEffect` runs side effects (like fetching data) after the component renders.
// `useState` lets the component hold and update local state across re-renders.
import { useEffect, useState } from "react";

// Core React Native UI primitives/components used by this screen:>)
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// useLocalSearchParams reads dynamic URL parameters (e.g., extracting `id` from the `[id]` route segment).
import { useLocalSearchParams } from "expo-router";

// Imports the Course type and the mock API function to fetch a course by id.
import { Course, getCourseById } from "../../../lib/api";

// CourseDetailScreen shows details for the specific course identified by the id route parameter.
export default function CourseDetailScreen() {
  // Extract the id route parameter and type it as a string.
  const { id } = useLocalSearchParams<{ id: string }>();

  // course state holds the fetched data (typed `Course | null`) until the request succeeds.
  const [course, setCourse] = useState<Course | null>(null);

  // Tracks the initial loading state (starts `true`) to show a spinner while fetching.
  const [isLoading, setIsLoading] = useState(true);

  // error state holds an error message string when a request fails, or `null` when no error
  const [error, setError] = useState<string | null>(null);

  // Fetches the course data; reusable by both the initial page mount (i.e., useEffect) and the retry button.
  async function loadCourse() {
    try {
      // Reset error and show spinner before the new request starts.
      setError(null);
      setIsLoading(true);

      const result = await getCourseById(id);
      // Update course state and re-render the component - success branch of the JSX renders the course details.
      setCourse(result);
    } catch (errorValue) {
      // `catch` receives `unknown`, not `Error`, so we narrow the type:
      // - If it's a real `Error` instance, use its `.message`
      // - Otherwise fall back to a generic message (e.g. if a string was thrown)
      setError(
        errorValue instanceof Error
          ? errorValue.message
          : "Something went wrong.",
      );
    } finally {
      // `finally` runs whether the request succeeded or failed, guaranteeing
      // the spinner is always turned off so the UI never gets stuck loading.
      setIsLoading(false);
    }
  }

  // Load the course whenever the `id` changes.
  // The dependency array `[id]` means the effect re-runs whenever `id` changes,
  // not just on mount. This matters because navigating from one course to
  // another reuses the same screen component — without `[id]`, the new id would
  // never trigger a re-fetch and the old course would stay on screen.
  // The `if (id)` guard prevents fetching before the param is available
  // (the param can briefly be undefined during the first render).
  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, [id]);

  // ---------- Conditional Rendering ----------
  // The screen renders one of four states, checked in priority order:
  //   1. Loading   → spinner + "Loading..." text
  //   2. Error     → error message + retry button
  //   3. No course → "Course not found" (e.g. a bad or unknown id)
  //   4. Success   → the course detail cards
  // Returning early keeps the success path at the bottom and avoids deeply
  // nested ternary expressions.

  // 1. Loading state
  if (isLoading) {
    return (
      <View style={styles.centered}>
        {/* Native spinner; `size="large"` and the brand blue color */}
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.statusText}>Loading course...</Text>
      </View>
    );
  }

  // 2. Error state — shown when the API call throws
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Could not load the course</Text>
        {/* Display the actual error message (e.g. "Network request failed...") */}
        <Text style={styles.errorText}>{error}</Text>
        {/* Retry button re-invokes the same loadCourse function, which resets
            error/loading state and tries the request again. */}
        <Pressable style={styles.retryButton} onPress={loadCourse}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  // 3. Not found — the request succeeded but returned `null`, which happens
  // when the id doesn't match any course (e.g. a stale or malformed link).
  if (!course) {
    return (
      <View style={styles.centered}>
        <Text style={styles.statusText}>Course not found.</Text>
      </View>
    );
  }

  // 4. Success state — `course` is now non-null, so it's safe to read fields.
  // ScrollView is used instead of View because the content (especially the
  // announcements list) can exceed the screen height.
  // `contentContainerStyle` styles the inner content area (padding/gap),
  // whereas `style` would style the ScrollView itself.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Course code (e.g. "CPRG 303") shown above the title */}
      <Text style={styles.code}>{course.code}</Text>
      {/* Full course title */}
      <Text style={styles.title}>{course.title}</Text>

      {/* Card: instructor */}
      <View style={styles.card}>
        <Text style={styles.label}>Instructor</Text>
        <Text style={styles.value}>{course.instructor}</Text>
      </View>

      {/* Card: schedule */}
      <View style={styles.card}>
        <Text style={styles.label}>Schedule</Text>
        <Text style={styles.value}>{course.schedule}</Text>
      </View>

      {/* Card: grade — handles the `null` case where no grade exists yet */}
      <View style={styles.card}>
        <Text style={styles.label}>Current grade</Text>
        <Text style={styles.value}>
          {course.grade === null ? "Not available" : `${course.grade}%`}
        </Text>
      </View>

      {/* Card: announcements — branches on empty vs. non-empty list */}
      <View style={styles.card}>
        <Text style={styles.label}>Announcements</Text>
        {course.announcements.length === 0 ? (
          // Empty state for this card
          <Text style={styles.value}>No announcements.</Text>
        ) : (
          // Render each announcement as a bulleted line.
          // `key` must be stable and unique — here the announcement string is
          // used as the key (fine when messages are unique).
          course.announcements.map((announcement) => (
            <Text key={announcement} style={styles.announcement}>
              • {announcement}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

// ---------- Styles ----------
// StyleSheet.create validates and optimizes the styles once at module load.
const styles = StyleSheet.create({
  // Inner content container for the ScrollView (padding + spacing between cards).
  // `flexGrow: 1` lets the content expand to fill the scroll area even when the
  // content is short, so the background color covers the whole screen.
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC", // light gray page background
    padding: 22,
    gap: 14, // space between children (title + cards)
  },
  // Shared container for loading/error/not-found states — centers content both
  // horizontally and vertically.
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  // Blue course code shown above the title
  code: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 18,
  },
  // Large, extra-bold course title
  title: {
    color: "#0F172A", // near-black
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 6,
  },
  // White card with a subtle border, used for each data point
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  // Small gray label above the value inside a card
  label: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 5,
  },
  // Larger, bolder value inside a card
  value: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "600",
  },
  // Each bulleted announcement line; `lineHeight` improves readability of
  // multi-line announcements.
  announcement: {
    color: "#334155",
    fontSize: 16,
    marginTop: 6,
    lineHeight: 22,
  },
  // Neutral text used for loading and not-found states
  statusText: {
    color: "#475569",
    textAlign: "center",
  },
  // Red heading in the error state
  errorTitle: {
    color: "#B91C1C",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  // Red body text showing the specific error message
  errorText: {
    color: "#DC2626",
    textAlign: "center",
  },
  // Blue button used to retry the request
  retryButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  // White bold label on the retry button
  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
