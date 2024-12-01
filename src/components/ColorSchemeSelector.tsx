import { Check, Palette } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const colorSchemes = [
  { id: "violet", name: "Violet", class: "bg-violet-500" },
  { id: "blue", name: "Blue", class: "bg-blue-500" },
  { id: "green", name: "Green", class: "bg-green-500" },
  { id: "rose", name: "Rose", class: "bg-rose-500" },
] as const;

export function ColorSchemeSelector() {
  const { colorScheme, setColorScheme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <Palette className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      <div className="flex gap-2">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => setColorScheme(scheme.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${scheme.class} transition-transform ${
              colorScheme === scheme.id
                ? "scale-110 ring-2 ring-white ring-offset-2"
                : ""
            }`}
          >
            {colorScheme === scheme.id && (
              <Check className="h-4 w-4 text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
