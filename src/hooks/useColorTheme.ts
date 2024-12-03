import { create } from "zustand";
import { persist } from "zustand/middleware";

type ColorTheme = "blue" | "violet" | "green" | "rose";

interface ColorThemeStore {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
}

export const useColorTheme = create<ColorThemeStore>()(
  persist(
    (set) => ({
      theme: "blue",
      setTheme: (theme) => {
        set({ theme });
        // 更新主题色类
        document.documentElement.classList.remove(
          "theme-blue",
          "theme-violet",
          "theme-green",
          "theme-rose",
          "theme-amber",
        );
        document.documentElement.classList.add(`theme-${theme}`);
      },
    }),
    {
      name: "color-theme",
    },
  ),
);
