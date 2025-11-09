import { Users, UserMinus, UserPlus } from "lucide-react";

interface SummaryProps {
  followerCount: number;
  followingCount: number;
  mutualCount: number;
}

const summaryItems = [
  {
    label: "Followers",
    icon: Users,
    key: "followerCount",
    tone: "from-indigo-500 via-purple-500 to-pink-500"
  },
  {
    label: "Following",
    icon: UserPlus,
    key: "followingCount",
    tone: "from-emerald-500 to-lime-500"
  },
  {
    label: "Mutuals",
    icon: UserMinus,
    key: "mutualCount",
    tone: "from-orange-500 to-rose-500"
  }
] as const;

export const Summary = ({ followerCount, followingCount, mutualCount }: SummaryProps) => {
  const counts: Record<(typeof summaryItems)[number]["key"], number> = {
    followerCount,
    followingCount,
    mutualCount
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaryItems.map(({ label, icon: Icon, key, tone }) => (
        <div
          key={label}
          className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-card transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70"
        >
          <div className={`flex items-center gap-3 bg-gradient-to-r ${tone} px-5 py-4 text-white`}>
            <span className="rounded-2xl bg-white/20 p-2">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium uppercase tracking-wide">{label}</p>
          </div>
          <div className="px-6 py-6">
            <p className="text-4xl font-semibold text-slate-800 dark:text-slate-100">{counts[key]}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Updated just now
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

