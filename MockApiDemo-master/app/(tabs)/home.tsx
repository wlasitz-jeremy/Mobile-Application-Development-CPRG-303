/*
- useEffect runs side effects (e.g., fetching data) after the component renders.
- useState lets the component hold and update local state across re-renders.
*/
import { useEffect, useState } from "react";

// Core React Native UI components used by this screen:
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

//Import the data type and the async mock API function that fetches dashboard data.
import { DashboardData, getDashboard } from "../../lib/api";

// HomeScreen shown when the user opens the app.
export default function HomeScreen() {
  /*
  - dashboard holds the fetched data. It starts as `null` because nothing has been loaded yet. 
  - Its type is `DashboardData | null` so TypeScript forces us  to handle the "not loaded" case before reading fields.
*/
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  /* 
  - isLoading tracks whether a request is currently in flight. 
  - initial value: true -->  // because the screen mounts and immediately begins fetching. 
  - Used to decide which UI to render (spinner vs. content vs. error).
  */
  const [isLoading, setIsLoading] = useState(true);

  /*
  - error holds an error message string when a request fails, or `null` when there's no error. 
  - Used to render the error state with a retry button.
  */
  const [error, setError] = useState<string | null>(null);

  // ---------- Data Loading ----------
  // Loads dashboard data from the API. Defined as a named function (not inline)
  // so it can be reused by both the initial `useEffect` and the retry button.
  async function loadDashboard() {
    try {
      // Reset error state before each attempt so a stale error doesn't linger while the retry is in progress.
      setError(null);
      // Show the spinner while the request runs. On the initial load this is  already true, but on a retry it may be false, so we set it again.
      setIsLoading(true);

      const result = await getDashboard();

      // Store the result.
      // When this runs, the component re-renders and the success branch of the JSX renders the dashboard cards.
      setDashboard(result);
    } catch (errorValue) {
      // catch receives unknown, not Error, so we narrow the type:
      // - If it's a real Error instance, use its message. Otherwise fall back to a generic message (e.g. if a string was thrown)
      setError(
        errorValue instanceof Error
          ? errorValue.message
          : "Something went wrong.",
      );
    } finally {
      // finally runs whether the request succeeded or failed, guaranteeing the spinner is always turned off so the UI never gets stuck loading.
      setIsLoading(false);
    }
  }

  // Run loadDashboard once when the screen mounts because of an empty dependency array [].
  useEffect(() => {
    loadDashboard();
  }, []);

  // ---------- Conditional Rendering ----------
  // The screen renders one of four states, checked in priority order:
  //   1. Loading   → spinner + "Loading..." text
  //   2. Error     → error message + retry button
  //   3. No data   → "No dashboard data found" (defensive; shouldn't normally hit)
  //   4. Success   → the actual dashboard cards
  // Returning early keeps the success path at the bottom and avoids deeply
  // nested ternary expressions.

  // 1. Loading state
  if (isLoading) {
    return (
      <View style={styles.centered}>
        {/* large blue spinner */}
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.statusText}>Loading dashboard...</Text>
      </View>
    );
  }

  // 2. Error state — shown when the API call throws
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Could not load the dashboard</Text>
        {/* Display the actual error message (e.g. "Network request failed...") */}
        <Text style={styles.errorText}>{error}</Text>
        {/* Retry button re-invokes the same loadDashboard function, which
            resets error/loading state and tries the request again. */}
        <Pressable style={styles.retryButton} onPress={loadDashboard}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  // 3. Empty state — defensive guard. If the request succeeded but somehow
  // returned no data (shouldn't happen with the current mock), show a message
  // instead of crashing on `dashboard.studentName` below.
  if (!dashboard) {
    return (
      <View style={styles.centered}>
        <Text style={styles.statusText}>No dashboard data found.</Text>
      </View>
    );
  }

  // 4. Success state — `dashboard` is now non-null, so it's safe to read fields
  return (
    <View style={styles.container}>
      {/* Greeting using the student's name from the fetched data */}
      <Text style={styles.title}>Welcome, {dashboard.studentName}</Text>

      {/* Card showing the next deadline */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Next deadline</Text>
        <Text style={styles.cardValue}>{dashboard.nextDeadline}</Text>
      </View>

      {/* Card showing the attendance summary */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Attendance</Text>
        <Text style={styles.cardValue}>{dashboard.attendanceText}</Text>
      </View>
    </View>
  );
}

// ---------- Styles ----------
// StyleSheet.create validates and optimizes the styles once at module load.
// `flex: 1` on the main containers makes them fill the available screen space.
const styles = StyleSheet.create({
  // Main content container for the success state
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // light gray page background
    padding: 24,
    gap: 16, // space between children (title + cards)
  },
  // Shared container for loading/error/empty states — centers content both
  // horizontally and vertically.
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  // Large screen title ("Welcome, Taylor")
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A", // near-black
    marginBottom: 8,
  },
  // White card with a subtle border, used for each data point
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  // Small gray label above the value inside a card
  cardLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 6,
  },
  // Larger, bolder value inside a card
  cardValue: {
    fontSize: 18,
    color: "#0F172A",
    fontWeight: "600",
  },
  // Neutral text used for loading and empty states
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
