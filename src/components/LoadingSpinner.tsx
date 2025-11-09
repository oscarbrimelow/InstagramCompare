export const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/70 px-6 py-4 text-slate-600 shadow-card dark:bg-slate-900/70 dark:text-slate-300">
    <span className="relative flex h-4 w-4">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 opacity-75" />
      <span className="relative inline-flex h-4 w-4 rounded-full bg-gradient-brand" />
    </span>
    <span className="text-sm font-medium">Crunching follower insights...</span>
  </div>
);

