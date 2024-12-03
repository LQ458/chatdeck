import { Palette, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useColorTheme } from "../hooks/useColorTheme";

const themes = [
  { id: "blue", name: "蓝色" },
  { id: "violet", name: "紫色" },
  { id: "green", name: "绿色" },
  { id: "rose", name: "玫瑰" },
];

type ColorTheme = "blue" | "violet" | "green" | "rose";

export function ColorThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useColorTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 rounded-lg"
        title="选择颜色主题"
      >
        <Palette className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id as ColorTheme);
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className={`w-4 h-4 rounded-full bg-${t.id}-500 mr-3`} />
              <span>{t.name}</span>
              {theme === t.id && (
                <Check className="h-4 w-4 ml-auto text-primary-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
