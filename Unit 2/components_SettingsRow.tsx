// File Location: components/SettingsRow.tsx

import { Switch, Text, View } from "react-native";
import s from "../constants/settingsStyles";

// Defines the data that each reusable settings row must receive.
interface SettingsRowProps {
  label: string;
  description?: string; // Optional description
  value: boolean;
  onValueChange: (v: boolean) => void;
}

export default function SettingsRow({
  label,
  description,
  value,
  onValueChange,
}: SettingsRowProps) {
  return (
    <View style={s.settingRow}>
      <View style={s.settingText}>
        <Text style={s.settingLabel}>{label}</Text>

        {/* Display the description only when one is provided. */}
        {description && (
          <Text style={s.settingDescription}>{description}</Text>
        )}
      </View>

      {/* Controlled Switch: state enters through value and changes through the callback. */}
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#CBD5E1", true: "#003865" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#CBD5E1"
      />
    </View>
  );
}
