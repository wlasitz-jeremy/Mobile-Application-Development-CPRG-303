// Import necessary hooks createContext, useContext, useState from React:
import { createContext, useContext, useState } from "react";

// Step 1: Create a Context UserContext with a default value of `null`.
const UserContext = createContext(null);

// Step 2: Create UserProvider component that wraps parts of the app and supplies the user state
export function UserProvider({ children }) {
  const [username, setUserName] = useState("");
  return (
    <UserContext.Provider value={{ username, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
// Step 3: useUser(): Custom hook that gives components easy access to the UserContext.
export function useUser() {
  return useContext(UserContext);
}
