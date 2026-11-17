// `useEffect` runs side effects (like fetching data) after the component renders.
// `useState` lets the component hold and update local state across re-renders.
import { useEffect, useState } from "react";

// Core React Native UI primitives used by this screen:
//   - ActivityIndicator → the spinning loading spinner
//   - FlatList          → performant virtualized list for many items
//   - Pressable         → touchable wrapper (course cards + retry button)
//   - StyleSheet        → creates optimized style objects
//   - Text              → renders text
//   - View              → the basic layout container (like a <div>)
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// `useRouter` gives programmatic access to Expo Router's navigation methods,
// such as `router.push()` to navigate to another screen.
import { useRouter } from "expo-router";

// Import the Course type and the async function that fetches all courses.
// The function is a mock API that simulates a network request with a delay
// and can optionally throw an error or return an empty list.
import { Course, getCourses } from "../../../lib/api";

// CoursesScreen lists all courses and lets the user tap one to open its details.
export default function CoursesScreen() {
  // Router instance used to navigate to the course detail screen on tap.
  const router = useRouter();

  // ---------- State ----------
  // `courses` holds the fetched list. Starts as an empty array (not null)
  // because the success UI is a FlatList, which expects an array. While
  // loading, the spinner screen is shown instead, so the empty array is never
  // visible prematurely.
  const [courses, setCourses] = useState<Course[]>([]);

  // `isLoading` tracks whether the **initial** request is in flight. Starts
  // `true` so the spinner shows on first mount. Used to render the full-screen
  // loading state (not the pull-to-refresh spinner).
  const [isLoading, setIsLoading] = useState(true);

  // `refreshing` tracks whether a **pull-to-refresh** gesture is in flight.
  // Separate from `isLoading` so a refresh shows the small native spinner at
  // the top of the list rather than replacing the whole screen with a spinner.
  const [refreshing, setRefreshing] = useState(false);

  // `error` holds an error message when a request fails, or `null` when there
  // is no error. Used to render the full-screen error state.
  const [error, setError] = useState<string | null>(null);

  // ---------- Data Loading ----------
  // Loads the course list for the initial mount and for the retry button.
  // Sets `isLoading` (full-screen spinner), NOT `refreshing`.
  async function loadCourses() {
    try {
      // Clear any previous error before starting a new attempt.
      setError(null);
      // Show the full-screen spinner while the initial request runs.
      setIsLoading(true);

      const result = await getCourses();
      // Store the result. Re-render swaps the spinner out for the FlatList.
      setCourses(result);
    } catch (errorValue) {
      // `catch` receives `unknown`, so narrow it: use `.message` if it's a real
      // Error, otherwise fall back to a generic string.
      setError(
        errorValue instanceof Error
          ? errorValue.message
          : "Something went wrong.",
      );
    } finally {
      // Always turn off the spinner, success or failure.
      setIsLoading(false);
    }
  }

  // Handles pull-to-refresh. Deliberately separate from `loadCourses` because
  // it uses a different loading flag (`refreshing`) so the UI shows the small
  // pull-to-refresh spinner instead of replacing the whole list with a spinner.
  async function handleRefresh() {
    try {
      setRefreshing(true);
      setError(null);

      const result = await getCourses();
      setCourses(result);
    } catch (errorValue) {
      setError(
        errorValue instanceof Error
          ? errorValue.message
          : "Something went wrong.",
      );
    } finally {
      setRefreshing(false);
    }
  }

  // Load courses once when the screen mounts.
  // `[]` means "run only on mount". Without it, the effect would re-run every
  // render and cause an infinite fetch loop.
  useEffect(() => {
    loadCourses();
  }, []);

  // ---------- Conditional Rendering ----------
  // Only two full-screen states are handled before the list:
  //   1. Loading → full-screen spinner (initial load only)
  //   2. Error   → full-screen error + retry button
  // The "empty list" and "pull-to-refresh" states are handled *inside* the
  // FlatList via props, so the list itself is always rendered on success.

  // 1. Initial loading state
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.statusText}>Loading courses...</Text>
      </View>
    );
  }

  // 2. Error state — shown when the API call throws
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Could not load courses</Text>
        <Text style={styles.errorText}>{error}</Text>
        {/* Retry re-runs the initial load (full-screen spinner, not refresh) */}
        <Pressable style={styles.retryButton} onPress={loadCourses}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  // 3. Success state — render the list of courses.
  // FlatList is used instead of ScrollView + map because it virtualizes rows:
  // only the visible items are rendered, which scales well to long lists.
  return (
    <FlatList
      data={courses}
      // `keyExtractor` gives each row a stable unique key. Using the course id
      // (not the array index) keeps React from mixing up rows when the list
      // changes order or content.
      keyExtractor={(item) => item.id}
      // Styles the inner content area (padding/gap/background), not the
      // FlatList itself. `flexGrow: 1` lets short/empty content fill the screen.
      contentContainerStyle={styles.listContent}
      // Pull-to-refresh wiring: `refreshing` controls the native spinner, and
      // `onRefresh` fires when the user pulls down. FlatList provides this UI
      // for free — no extra component needed.
      refreshing={refreshing}
      onRefresh={handleRefresh}
      // Renders above the first row — the "My Courses" heading.
      ListHeaderComponent={<Text style={styles.title}>My Courses</Text>}
      // Renders when `data` is empty (e.g. RETURN_EMPTY_COURSES = true in the
      // mock API). Because it lives inside the FlatList, pull-to-refresh still
      // works even when there are no courses.
      ListEmptyComponent={
        <Text style={styles.emptyText}>No courses found.</Text>
      }
      // Renders one course card per item. `item` is the current Course.
      renderItem={({ item }) => (
        <Pressable
          style={styles.courseCard}
          // Navigate to the dynamic detail route. The id becomes the `[id]`
          // route param that CourseDetailScreen reads via useLocalSearchParams.
          onPress={() => router.push(`/courses/${item.id}`)}
        >
          <Text style={styles.courseCode}>{item.code}</Text>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseMeta}>Instructor: {item.instructor}</Text>
          <Text style={styles.courseMeta}>{item.schedule}</Text>
        </Pressable>
      )}
    />
  );
}

// ---------- Styles ----------
// StyleSheet.create validates and optimizes the styles once at module load.
const styles = StyleSheet.create({
  // Inner content container for the FlatList (padding + spacing + background).
  // `flexGrow: 1` makes the content fill the screen even when the list is short
  // or empty, so the background color covers the whole screen and the empty
  // state's centered text sits where expected.
  listContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8FAFC", // light gray page background
    gap: 12, // space between cards
  },
  // Shared container for the loading and error states — centers content both
  // horizontally and vertically.
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  // "My Courses" heading rendered via ListHeaderComponent
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A", // near-black
    marginBottom: 8,
  },
  // White bordered card for each course row
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  // Blue course code (e.g. "CPRG 303")
  courseCode: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 16,
  },
  // Bold course title
  courseTitle: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 19,
    marginVertical: 4,
  },
  // Muted gray metadata lines (instructor, schedule)
  courseMeta: {
    color: "#475569",
    marginTop: 2,
  },
  // Neutral text used for the loading state
  statusText: {
    color: "#475569",
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
  // Centered muted text shown via ListEmptyComponent when there are no courses.
  // `marginTop: 80` pushes it down so it doesn't sit right under the header.
  emptyText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
  },
});
