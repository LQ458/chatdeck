import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      id="theme-toggle-btn"
    >
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md transition-colors ${
          theme === "light"
            ? "bg-white text-yellow-500 shadow-sm dark:bg-gray-700"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md transition-colors ${
          theme === "dark"
            ? "bg-white text-blue-500 shadow-sm dark:bg-gray-700"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
      >
        <Moon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-md transition-colors ${
          theme === "system"
            ? "bg-white text-white shadow-sm dark:bg-gray-700"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  );
}
