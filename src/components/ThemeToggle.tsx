import { Moon, Sun, Monitor } from "lucide-react";
import { RadioGroup } from "@headlessui/react";
import { useTheme } from "../hooks/useTheme";

const themes = [
  { value: "light", icon: Sun, label: "亮色" },
  { value: "dark", icon: Moon, label: "暗色" },
  { value: "system", icon: Monitor, label: "系统" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={theme}
      onChange={setTheme}
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      id="theme-toggle-btn"
    >
      {themes.map(({ value, icon: Icon }) => (
        <RadioGroup.Option
          key={value}
          value={value}
          className={({ checked }) =>
            `p-2 rounded-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              checked
                ? "bg-white text-primary-500 shadow-sm dark:bg-gray-700"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`
          }
        >
          <Icon className="h-5 w-5" />
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
