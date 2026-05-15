import { Link } from "@tanstack/react-router";
import type { Trend } from "@/data/trending";
import { Flame, TrendingUp, Sparkles } from "lucide-react";

const categoryColor: Record<string, string> = {
  Politics: "bg-rose-100 text-rose-700",
  Cricket: "bg-emerald-100 text-emerald-700",
  Movie: "bg-violet-100 text-violet-700",
  Festival: "bg-amber-100 text-amber-800",
  Birthday: "bg-pink-100 text-pink-700",
  Announcement: "bg-sky-100 text-sky-700",
  Event: "bg-indigo-100 text-indigo-700",
};

export function TrendCard({ trend, rank }: { trend: Trend; rank: number }) {
  return (
    <Link
      to="/topic/$tag"
      params={{ tag: encodeURIComponent(trend.tag) }}
      className="group relative block rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-display text-base text-foreground/40">{String(rank).padStart(2, "0")}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${categoryColor[trend.category]}`}>{trend.category}</span>
            <span className="text-[11px]">{trend.window === "15m" ? "पिछले 15 मिनट" : trend.window === "1h" ? "पिछला 1 घंटा" : "पिछले 24 घंटे"}</span>
          </div>
          <h3 className="font-hindi mt-2 truncate text-2xl font-semibold text-foreground">{trend.tag}</h3>
          <p className="font-hindi text-sm text-muted-foreground">{trend.title}</p>
        </div>
        <HeatBadge value={trend.heat} />
      </div>

      <p className="font-hindi mt-4 flex items-start gap-2 text-sm text-foreground/80">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>"{trend.reasoning}"</span>
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5" />
          {trend.posts.toLocaleString("en-IN")} पोस्ट
        </span>
        <div className="flex items-center gap-1.5">
          {trend.signals.map((s) => (
            <span key={s} className="rounded-full border bg-background/60 px-2 py-0.5 text-[10px]">{s}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function HeatBadge({ value }: { value: number }) {
  return (
    <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-saffron to-hot text-primary-foreground shadow-lg">
      <Flame className="absolute h-14 w-14 opacity-15" />
      <div className="text-center leading-none">
        <div className="font-display text-lg font-bold">{value}</div>
        <div className="text-[8px] opacity-90">HEAT</div>
      </div>
    </div>
  );
}
