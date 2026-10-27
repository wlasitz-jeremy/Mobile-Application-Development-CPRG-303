import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  RegistrationForm,
  registrationSchema,
} from "../schema/registrationSchema";

export default function Index() {
  // 3. Create and configure the form.
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      studentName: "",
      courseCode: "",
    },
    mode: "onSubmit",
  });

  // 4. This function runs only after the form is valid.
  const onSubmit = (data: RegistrationForm) => {
    Alert.alert(
      "Registration Successful",
      `${data.studentName} registered for ${data.courseCode}.`,
      [{ text: "OK", onPress: () => reset() }],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Registration</Text>
      <Text style={styles.subtitle}>Enter a student name and course code.</Text>

      <Text style={styles.label}>Student Name</Text>
      <Controller
        control={control}
        name="studentName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.studentName && styles.inputError]}
            placeholder="Example: Alex"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.studentName && (
        <Text style={styles.errorText}>{errors.studentName.message}</Text>
      )}

      <Text style={styles.label}>Course Code</Text>
      <Controller
        control={control}
        name="courseCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.courseCode && styles.inputError]}
            placeholder="Example: CPRG303"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.courseCode && (
        <Text style={styles.errorText}>{errors.courseCode.message}</Text>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: "#172554",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#475569",
    fontSize: 16,
    marginBottom: 28,
  },
  label: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#94a3b8",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: "#dc2626",
    borderWidth: 2,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 14,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
