import { ExternalLink } from "lucide-react";

interface UserCardProps {
  username: string;
  tone?: "positive" | "warning" | "neutral";
}

const toneStyles: Record<Required<UserCardProps>["tone"], string> = {
  positive: "border-emerald-100 bg-emerald-50/60 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-900/40 dark:text-emerald-100",
  warning: "border-amber-100 bg-amber-50/70 text-amber-800 dark:border-amber-900/60 dark:bg-amber-900/40 dark:text-amber-100",
  neutral: "border-slate-200 bg-white/70 text-slate-700 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-100"
};

export const UserCard = ({ username, tone = "neutral" }: UserCardProps) => {
  const instagramUrl = `https://instagram.com/${username}`;
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}&backgroundColor=f97316,818cf8&fontFamily=Nunito`;

  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md ${toneStyles[tone]}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={`${username} avatar`}
          className="h-10 w-10 rounded-xl border border-white/70 shadow-sm dark:border-slate-700/60"
          loading="lazy"
        />
        <div>
          <p className="font-semibold">@{username}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Tap to view on Instagram</p>
        </div>
      </div>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 rounded-xl border border-transparent bg-white/40 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:bg-slate-800/60"
      >
        View
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </li>
  );
};

