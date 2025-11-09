import { ArrowRight, RefreshCw } from "lucide-react";
import { UserCard } from "./UserCard";

interface ResultsProps {
  mutuals: string[];
  notFollowingYouBack: string[];
  youDontFollowBack: string[];
  onReset: () => void;
  username: string;
}

const Section = ({
  title,
  description,
  users,
  tone
}: {
  title: string;
  description: string;
  users: string[];
  tone: "positive" | "warning" | "neutral";
}) => (
  <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800/70 dark:bg-slate-900/70">
    <header className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <ArrowRight className="h-3.5 w-3.5" />
        {users.length} profiles
      </span>
    </header>

    {users.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-300/80 p-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
        All clear! No users in this list right now.
      </div>
    ) : (
      <ul className="grid gap-3 md:grid-cols-2">
        {users.map((username) => (
          <UserCard key={username} username={username} tone={tone} />
        ))}
      </ul>
    )}
  </section>
);

export const Results = ({
  mutuals,
  notFollowingYouBack,
  youDontFollowBack,
  onReset,
  username
}: ResultsProps) => (
  <div className="space-y-6">
    <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-600 p-6 text-white shadow-card md:flex-row md:items-center">
      <div>
        <p className="text-sm uppercase tracking-widest text-white/80">Insights for</p>
        <h2 className="font-display text-3xl font-semibold">@{username}</h2>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          Here&apos;s who you follow that doesn&apos;t follow back, and who follows you that you might have missed.
        </p>
      </div>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <RefreshCw className="h-4 w-4" />
        Search another username
      </button>
    </div>

    <Section
      title="Not Following You Back"
      description="Users you follow, but they’re not following you yet."
      users={notFollowingYouBack}
      tone="warning"
    />
    <Section
      title="You Don’t Follow Back"
      description="Users who follow you, but you’re not following them."
      users={youDontFollowBack}
      tone="positive"
    />
    <Section
      title="Mutuals"
      description="Profiles where the love goes both ways."
      users={mutuals}
      tone="neutral"
    />
  </div>
);

