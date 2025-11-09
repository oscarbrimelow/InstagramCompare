import { useMemo, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import { InputForm } from "./components/InputForm";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Results } from "./components/Results";
import { Summary } from "./components/Summary";
import { ThemeToggle } from "./components/ThemeToggle";
import { fetchInstagramData } from "./api/fetchInstagramData";
import { useTheme } from "./hooks/useTheme";
import { compareProfileData } from "./utils/compareLists";
import type { ComparisonResult } from "./types/instagram";

const Hero = () => (
  <section className="mx-auto max-w-2xl text-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-white shadow-lg backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-800/60">
      Real-time Instagram insights
    </span>
    <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 transition lg:text-5xl dark:text-slate-100">
      Understand your Instagram relationships in seconds.
    </h1>
    <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
      InstaCheck compares followers and following lists for public profiles. Find out who&apos;s not following you
      back, who you&apos;re missing, and celebrate your mutuals.
    </p>
  </section>
);

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeUsername, setActiveUsername] = useState<string | null>(null);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const requestController = useRef<AbortController | null>(null);

  const handleSubmit = async (username: string) => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    setIsLoading(true);
    setError(null);
    setActiveUsername(username);

    try {
      const data = await fetchInstagramData(username, { signal: controller.signal });
      setFollowerCount(data.followers.length);
      setFollowingCount(data.following.length);
      setComparison(compareProfileData(data));
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        return;
      }
      setError((err as Error).message || "Something went wrong. Please try again.");
      setActiveUsername(null);
      setComparison(null);
      setFollowerCount(0);
      setFollowingCount(0);
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
      }
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    requestController.current?.abort();
    setActiveUsername(null);
    setComparison(null);
    setFollowerCount(0);
    setFollowingCount(0);
    setError(null);
  };

  const mutualCount = useMemo(() => comparison?.mutuals.length ?? 0, [comparison]);

  return (
    <div className="min-h-screen bg-slate-100/60 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.35),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(96,165,250,0.35),_transparent_55%)] pb-16 pt-12 transition dark:bg-slate-950 dark:bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.08),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),_transparent_55%)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg">
              <span className="font-display text-xl font-semibold">IC</span>
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">InstaCheck</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Follower relationship dashboard</p>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <Hero />

        <main className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-sm font-medium text-rose-600 shadow-card dark:border-rose-900/70 dark:bg-rose-950/60 dark:text-rose-200">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {comparison && activeUsername ? (
            <div className="space-y-6">
              <Summary
                followerCount={followerCount}
                followingCount={followingCount}
                mutualCount={mutualCount}
              />
              <Results
                mutuals={comparison.mutuals}
                notFollowingYouBack={comparison.notFollowingYouBack}
                youDontFollowBack={comparison.youDontFollowBack}
                onReset={handleReset}
                username={activeUsername}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-6 rounded-3xl border border-dashed border-slate-300/80 bg-white/60 p-8 text-center shadow-card dark:border-slate-700/80 dark:bg-slate-900/60">
              <h3 className="font-display text-2xl font-semibold text-slate-800 dark:text-slate-100">
                See who’s in your circle ✨
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter any public Instagram username to reveal follower insights:
              </p>
              <ul className="mx-auto flex w-full max-w-md flex-col gap-3 text-left text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-orange-600 dark:bg-orange-500/20 dark:text-orange-200">
                    1
                  </span>
                  Discover who doesn’t follow you back.
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
                    2
                  </span>
                  Spot followers you might want to reconnect with.
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200">
                    3
                  </span>
                  Celebrate your strongest mutual connections.
                </li>
              </ul>
            </div>
          )}
        </main>

        <footer className="rounded-3xl border border-white/60 bg-white/70 px-6 py-5 text-center text-xs text-slate-500 shadow-card dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-400">
          Built for creators. Future roadmap includes Instagram login, exported analytics, and smart insights.
        </footer>
      </div>
    </div>
  );
}

export default App;

