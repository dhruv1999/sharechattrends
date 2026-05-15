import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Settings2 } from "lucide-react";
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
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-3 py-2.5">
          <Link to="/" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] text-muted-foreground">ट्रेंडिंग</div>
            <div className="font-hindi truncate text-base font-semibold leading-tight">{trend.tag}</div>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl">
        <ul className="divide-y border-b">
          {posts.map((p) => (
            <li key={p.id} className="bg-card transition-colors hover:bg-muted/40">
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
