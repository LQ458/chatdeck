import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const themes = [
  { id: "blue", name: "蓝色" },
  { id: "violet", name: "紫色" },
  { id: "green", name: "绿色" },
  { id: "rose", name: "玫瑰" },
] as const;

type ColorTheme = "blue" | "violet" | "green" | "rose";

export function ColorThemeToggle() {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors">
            <Palette className="h-5 w-5" />
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="fixed right-4 z-50 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:absolute sm:right-0 sm:left-auto"
              static
            >
              <div className="p-2 space-y-1">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setColorTheme(theme.id as ColorTheme)}
                    className={`
                      flex items-center w-full px-3 py-2 text-sm rounded-md
                      ${
                        colorTheme === theme.id
                          ? "text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/50"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-${theme.id}-500 mr-3`}
                    />
                    {theme.name}
                  </button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
