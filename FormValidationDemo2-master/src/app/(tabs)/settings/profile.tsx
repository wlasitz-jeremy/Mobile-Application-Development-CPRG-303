import { Alert, Pressable, Text, TextInput, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { ProfileForm, profileSchema } from "../../../schemas/profileSchema";

import { styles } from "../../../styles/profileStyles";

/**
 * ProfileScreen
 * Demonstrates React Hook Form + Zod validation.
 */
export default function ProfileScreen() {
  // Create and configure the form.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  // Runs only after validation succeeds.
  const onSubmit = (data: ProfileForm) => {
    Alert.alert("Profile Saved", JSON.stringify(data, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter first name"
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}

      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter last name"
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter email"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Student ID</Text>
      <Controller
        control={control}
        name="studentId"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.studentId && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter student ID"
          />
        )}
      />
      {errors.studentId && (
        <Text style={styles.error}>{errors.studentId.message}</Text>
      )}

      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </Pressable>
    </View>
  );
}
