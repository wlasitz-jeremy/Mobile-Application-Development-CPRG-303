// File Location: app/(tabs)/settings.tsx

import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import SettingsRow from "../../components/SettingsRow";
import s from "../../constants/settingsStyles";

export default function CourseSettingsScreen() {
  // Controlled TextInput state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Each independent Switch has its own boolean state.
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [discussionReplies, setDiscussionReplies] = useState(false);
  const [announcements, setAnnouncements] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);

  // Controls whether the temporary confirmation message is visible.
  const [saved, setSaved] = useState(false);

  // Show confirmation, then hide it after 2 seconds.
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={s.heading}>Course Settings</Text>

      {/* Section 1: Profile */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Profile</Text>

        <Text style={s.inputLabel}>Name</Text>
        <TextInput
          style={s.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#94A3B8"
          autoCapitalize="words"
        />

        <Text style={s.inputLabel}>Email</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Section 2: Four notification settings */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Notifications</Text>

        <SettingsRow
          label="Course Updates"
          description="Receive changes and news about your courses."
          value={courseUpdates}
          onValueChange={setCourseUpdates}
        />
        <SettingsRow
          label="Assignment Alerts"
          description="Receive reminders about assignment deadlines."
          value={assignmentAlerts}
          onValueChange={setAssignmentAlerts}
        />
        <SettingsRow
          label="Discussion Replies"
          description="Receive an alert when someone replies."
          value={discussionReplies}
          onValueChange={setDiscussionReplies}
        />
        <SettingsRow
          label="Announcements"
          value={announcements}
          onValueChange={setAnnouncements}
        />
      </View>

      {/* Section 3: Display settings */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Display</Text>

        <SettingsRow
          label="Dark Mode"
          description="Use a dark background across the app."
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingsRow
          label="Compact View"
          description="Reduce spacing to show more content."
          value={compactView}
          onValueChange={setCompactView}
        />
      </View>

      {/* Section 4: Save button */}
      <Pressable
        style={({ pressed }) => [
          s.saveButton,
          pressed && s.saveButtonPressed,
        ]}
        onPress={handleSave}
        accessibilityRole="button"
        accessibilityLabel="Save settings"
      >
        <Text style={s.saveButtonText}>Save Settings</Text>
      </Pressable>

      {/* Render only while saved is true. */}
      {saved && <Text style={s.savedMsg}>✓ Settings saved!</Text>}
    </ScrollView>
  );
}
