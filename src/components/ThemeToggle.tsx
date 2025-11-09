import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    className="relative inline-flex h-11 w-20 items-center rounded-full border border-slate-200 bg-white/80 px-1 text-slate-600 shadow-card transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
    aria-label="Toggle color mode"
  >
    <span
      className={`absolute inset-y-1 w-8 rounded-full bg-gradient-brand shadow-lg transition-all duration-300 ease-out ${
        theme === "dark" ? "right-1 translate-x-0" : "left-1 translate-x-0"
      }`}
    />
    <div className="relative flex w-full justify-between px-2">
      <Sun className={`h-5 w-5 ${theme === "light" ? "text-white" : "text-slate-400"}`} />
      <Moon className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-slate-400"}`} />
    </div>
  </button>
);

