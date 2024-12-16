import { createContext } from "react";

type Theme = "light" | "dark" | "system";
type ColorTheme = "blue" | "violet" | "green" | "rose";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => null,
  colorTheme: "blue",
  setColorTheme: () => null,
});
