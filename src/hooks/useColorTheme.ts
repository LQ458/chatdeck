// the global color theme of the app
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ColorTheme = "blue" | "violet" | "green" | "rose";

interface ColorThemeStore {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
}

// 获取初始主题的逻辑移到单独的util文件
export const getStoredTheme = (): ColorTheme => {
  try {
    const stored = localStorage.getItem("color-theme");
    if (!stored) return "blue";
    const data = JSON.parse(stored);
    return data.state?.theme || "blue";
  } catch {
    return "blue";
  }
};

export const useColorTheme = create<ColorThemeStore>()(
  persist(
    (set) => ({
      theme: getStoredTheme(), // 使用相同的获取逻辑
      setTheme: (theme) => {
        // 只有当主题真正改变时才更新DOM
        if (theme !== getStoredTheme()) {
          set({ theme });
          document.documentElement.classList.remove(
            "theme-blue",
            "theme-violet",
            "theme-green",
            "theme-rose",
          );
          document.documentElement.classList.add(`theme-${theme}`);
        }
      },
    }),
    {
      name: "color-theme",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // 跳过hydration阶段的状态同步
      partialize: (state) => ({ theme: state.theme }), // 只持久化theme字段
      onRehydrateStorage: () => {
        // 状态恢复后的回调
        return (state) => {
          if (state) {
            // 确保DOM类与恢复的状态一致
            const currentTheme = state.theme;
            document.documentElement.classList.remove(
              "theme-blue",
              "theme-violet",
              "theme-green",
              "theme-rose",
            );
            document.documentElement.classList.add(`theme-${currentTheme}`);
          }
        };
      },
    },
  ),
);
