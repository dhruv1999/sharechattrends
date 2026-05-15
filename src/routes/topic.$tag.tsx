import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Sparkles } from "lucide-react";
import { trends, postsForTrend } from "@/data/trending";
import { PostCard } from "@/components/PostCard";

export const Route = createFileRoute("/topic/$tag")({
  component: TopicPage,
});

function TopicPage() {
  const { tag } = Route.useParams();
  const decoded = decodeURIComponent(tag);
  const trend = trends.find((t) => t.tag === decoded);

  if (!trend) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="font-hindi text-muted-foreground">यह विषय नहीं मिला।</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">वापस जाएं</Link>
      </div>
    );
  }

  const posts = postsForTrend(trend);

  return (
    <div>
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link to="/" className="grid h-9 w-9 place-items-center rounded-full border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="font-hindi truncate text-base font-semibold">{trend.tag}</div>
            <div className="font-hindi truncate text-xs text-muted-foreground">{trend.posts.toLocaleString("en-IN")} पोस्ट · {trend.category}</div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-saffron to-hot text-primary-foreground">
            <Flame className="h-4 w-4" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-5">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-hindi font-display text-3xl font-bold leading-tight">{trend.title}</h1>
              <p className="font-hindi mt-2 flex items-start gap-2 text-sm text-foreground/80">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                "{trend.reasoning}"
              </p>
            </div>
            <div className="grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-saffron to-hot px-4 py-3 text-primary-foreground shadow-lg">
              <div className="font-display text-2xl font-bold leading-none">{trend.heat}</div>
              <div className="text-[9px] tracking-widest opacity-90">HEAT</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {trend.signals.map((s) => (
              <span key={s} className="rounded-full border bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                Signal · {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-3 flex items-center justify-between">
          <h2 className="font-hindi text-lg font-semibold">हिंदी पोस्ट्स</h2>
          <span className="text-xs text-muted-foreground">स्क्रॉल करें ↓</span>
        </div>

        <div className="scroll-snap-y flex flex-col gap-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
