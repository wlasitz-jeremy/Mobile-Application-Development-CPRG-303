import { createContext, useContext, useState } from "react";

export type Theme = {
  dark: boolean;
  toggle: () => void;
  colors: {
    bg: string;
    card: string;
    text: string;
  };
};

export const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark(d => !d);

  const colors = dark
    ? { bg: "#0F172A", card: "#1E293B", text: "#F1F5F9" }
    : { bg: "#F8FAFC", card: "#FFFFFF", text: "#0F172A" };

  return (
    <ThemeContext.Provider value={{ dark, toggle, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
