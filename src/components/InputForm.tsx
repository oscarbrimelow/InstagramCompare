import { FormEvent, useState } from "react";
import { Search, UserCircle } from "lucide-react";

interface InputFormProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
  defaultUsername?: string;
}

export const InputForm = ({ onSubmit, isLoading, defaultUsername = "" }: InputFormProps) => {
  const [value, setValue] = useState(defaultUsername);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim() || isLoading) {
      return;
    }
    onSubmit(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-card backdrop-blur-md transition dark:bg-slate-900/80"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg">
          <UserCircle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">InstaCheck</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Discover your follower balance</p>
        </div>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Enter Instagram username</span>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            @
          </span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-base font-medium text-slate-800 outline-none ring-2 ring-transparent transition focus:border-slate-300 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-800/60"
            placeholder="username"
            autoComplete="off"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </label>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
      >
        <Search className="h-5 w-5 transition group-hover:translate-x-0.5" />
        {isLoading ? "Checking..." : "Check Followers"}
      </button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Note: Works only with public profiles. This tool does not store or share any data.
      </p>
    </form>
  );
};

