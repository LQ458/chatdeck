import { createContext, useContext, useEffect, useState } from "react";
import { getSystemTheme } from "../lib/utils";

type Theme = "light" | "dark" | "system";
type ColorScheme = "violet" | "blue" | "green" | "rose";

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  colorScheme: "violet",
  setTheme: () => {},
  setColorScheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("violet");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme;

    if (savedTheme) setTheme(savedTheme);
    if (savedColorScheme) setColorScheme(savedColorScheme);

    const root = window.document.documentElement;
    const isDark =
      theme === "dark" || (theme === "system" && getSystemTheme() === "dark");

    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
    root.setAttribute("data-color-scheme", colorScheme);
  }, [theme, colorScheme]);

  const value = {
    theme,
    colorScheme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    setColorScheme: (newScheme: ColorScheme) => {
      setColorScheme(newScheme);
      localStorage.setItem("colorScheme", newScheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
