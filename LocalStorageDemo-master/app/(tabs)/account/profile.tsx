import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import * as storage from "../../../lib/storage";
import { STORAGE_KEYS } from "../../../lib/storage";

// Zod schema = single source of truth for validation rules AND the form's type
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  studentId: z.string().length(9, "Student ID must be 9 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must contain 10 digits"),
});

// z.infer derives the TypeScript type directly from the schema, so the form
// type and validation rules can never drift out of sync.
type ProfileForm = z.infer<typeof profileSchema>;

// Blank starting values so the form is fully controlled from the first render
const emptyProfile: ProfileForm = {
  firstName: "",
  lastName: "",
  email: "",
  studentId: "",
  phone: "",
};

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true); // true while reading saved profile
  const [isEditing, setIsEditing] = useState(false); // toggles view vs. edit mode
  const [hasSavedData, setHasSavedData] = useState(false); // whether a saved profile exists
  const {
    control, // connects inputs to react-hook-form
    handleSubmit, // validates via Zod, then calls onSubmit
    reset, // repopulates the form with given values
    watch, // subscribe to live form values for rendering/derived checks
    formState: { errors }, // validation error messages per field
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema), // run Zod validation on submit
    defaultValues: emptyProfile,
  });

  // On mount: load any saved profile from storage (runs once)
  useEffect(() => {
    const loadProfile = async () => {
      // Promise<ProfileForm | null> = resolves to the saved profile or null if none
      const saved = await storage.get<ProfileForm>(STORAGE_KEYS.PROFILE);
      if (saved !== null) {
        reset(saved); // prefill the form with saved data
        setHasSavedData(true);
      } else {
        setIsEditing(true); // no data yet — go straight to edit mode
      }
      setIsLoading(false); // loading done either way
    };
    loadProfile();
  }, [reset]); // reset is stable, so this effectively runs once on mount

  // On submit (after Zod passes): persist to storage and switch to view mode
  // data: the entire ProfileForm object containing
  // the firstName, lastName, email, studentId, and phone values
  // that the user typed into the inputs.
  // Promise<void> = async save that resolves with no value when the write finishes
  const onSubmit = async (data: ProfileForm) => {
    await storage.set(STORAGE_KEYS.PROFILE, data);
    setHasSavedData(true);
    setIsEditing(false);
  };

  // Cancel editing: restore the last saved values (or keep blanks if none)
  const handleCancel = async () => {
    const saved = await storage.get<ProfileForm>(STORAGE_KEYS.PROFILE);
    if (saved !== null) reset(saved);
    setIsEditing(false);
  };

  const values = watch(); // live form values, used for the read-only view
  // Save button is enabled only when every field has at least one character
  const isFormFilled = Object.values(values).every((v) => v.length > 0);

  // Loading state while we read from AsyncStorage
  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  // Read-only view: shown when a profile exists and we're not editing
  if (hasSavedData && !isEditing) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text>
          {values.firstName} {values.lastName}
        </Text>
        <Text>{values.email}</Text>
        <Text>Student ID: {values.studentId}</Text>
        <Text>Phone: {values.phone}</Text>
        <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
      </View>
    );
  }

  // Field config drives the form render loop below (label, name, keyboard type)
  const fields: Array<{
    name: keyof ProfileForm; // keyof ensures names are valid form keys
    label: string;
    keyboard?: "email-address" | "number-pad";
  }> = [
    { name: "firstName", label: "First name" },
    { name: "lastName", label: "Last name" },
    { name: "email", label: "Email", keyboard: "email-address" },
    { name: "studentId", label: "Student ID" },
    { name: "phone", label: "Phone", keyboard: "number-pad" },
  ];

  // Edit mode: render a TextInput per field via Controller
  return (
    <View style={styles.container}>    
      <Text style={styles.title}>Edit Profile</Text>
      {fields.map((f) => (
        <View key={f.name}>
          <Text>{f.label}</Text>
          <Controller
            control={control}
            name={f.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur} // mark field as touched
                onChangeText={onChange} // push text into form state
                keyboardType={f.keyboard}
              />
            )}
          />
          {/* Show the Zod validation message for this field, if any */}
          {errors[f.name] && (
            <Text style={styles.error}>{errors[f.name]?.message}</Text>
          )}
        </View>
      ))}
      <Pressable
        disabled={!isFormFilled} // block submit until all fields are filled
        style={[styles.button, !isFormFilled && styles.disabled]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      {/* Cancel only makes sense if there's saved data to revert to */}
      {hasSavedData && (
        <Pressable style={styles.secondary} onPress={handleCancel}>
          <Text>Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
  error: { color: "#b00020", marginTop: 4 },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "white", fontWeight: "700" },
  disabled: { opacity: 0.4 }, // visual cue that Save is unavailable
  secondary: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    alignItems: "center",
  },
});
