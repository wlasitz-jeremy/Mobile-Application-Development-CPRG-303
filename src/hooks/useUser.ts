import { useState } from "react";
import { User } from "../types/User";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  return {
    user,
    setUser,
    isLoggedIn: !!user,
  };
}
