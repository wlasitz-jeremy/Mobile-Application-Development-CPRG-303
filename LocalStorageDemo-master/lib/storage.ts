import AsyncStorage from "@react-native-async-storage/async-storage";

// Centralized list of storage keys to avoid typos and keep keys consistent app-wide
export const STORAGE_KEYS = {
  PROFILE: "profile",
  NOTIFICATIONS: "notifications",
} as const;

// T is a generic type parameter: the caller specifies the expected shape of the
// stored data (e.g. get<Profile>("profile")), so the returned value is fully typed
// instead of `any` — giving type safety and autocomplete when reading storage.
// Promise<T | null> = an async result that resolves to either the stored value of
// type T, or null if the key doesn't exist; it must be awaited (or .then'd) by the caller.
export const get = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  if (value === null) return null; // Key not found — return null instead of throwing
  return JSON.parse(value) as T; // Convert stored JSON string back to the expected type
};

// Save any value to storage by converting it to a JSON string.
// Promise<void> = an async operation that resolves with no value once the write finishes.
export const set = async (key: string, value: unknown): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

// Delete a single key from storage (e.g., on logout or clearing user data).
// Promise<void> = an async operation that resolves with no value once the key is removed.
export const remove = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
