import { Stack } from "expo-router";
import { UserProvider } from "./context/UserContext";

// import the user context provider then use it to wrap <Stack>

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}
