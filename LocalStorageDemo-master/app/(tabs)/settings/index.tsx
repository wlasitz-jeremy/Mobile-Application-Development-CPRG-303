import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import * as storage from "../../../lib/storage";
import { STORAGE_KEYS } from "../../../lib/storage";

export default function SettingsScreen() {
  // on/off switch state
  const [notifications, setNotifications] = useState(true);

  // true while reading saved setting
  const [isLoading, setIsLoading] = useState(true);

  // On mount: load the saved notification preference (runs once)
  useEffect(() => {
    const loadNotifications = async () => {
      // Promise<boolean | null> = resolves to the saved true/false, or null if never set
      const saved = await storage.get<boolean>(STORAGE_KEYS.NOTIFICATIONS);

      // only override default if a value exists
      if (saved !== null) setNotifications(saved);

      // loading done
      setIsLoading(false);
    };
    loadNotifications();
  }, []); // empty array = run only once on mount

  // On toggle: update the UI immediately, then persist the new value
  // Promise<void> = async save that resolves with no value when the write finishes
  const handleToggle = async (value: boolean) => {
    // update — switch responds instantly
    setNotifications(value);
    await storage.set(STORAGE_KEYS.NOTIFICATIONS, value);
  };

  // Loading state while we read from AsyncStorage
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        {/* Switch reports the new value to onValueChange, which saves it */}
        <Switch value={notifications} onValueChange={handleToggle} />
      </View>
      <Text style={styles.note}>
        Change the switch, restart the app, and check that the value is
        remembered.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 18 },
  note: { color: "#555", lineHeight: 20 },
});
