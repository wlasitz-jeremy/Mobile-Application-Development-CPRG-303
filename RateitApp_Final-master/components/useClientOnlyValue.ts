// This function is web-only as native doesn't currently support server (or build-time) rendering.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  return client;
}
/*
// Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // Add the following to _layout.tsx in screeOptions
        headerShown: useClientOnlyValue(false, true),
*/
