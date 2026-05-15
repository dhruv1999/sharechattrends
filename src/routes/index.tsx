import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { trends } from "@/data/trending";
import { MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ट्रेंडिंग — शेयरचैट" },
      { name: "description", content: "भारत में अभी क्या ट्रेंड हो रहा है — हिंदी में टॉप विषय।" },
    ],
  }),
});

function fmtPosts(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K पोस्ट";
  return n + " पोस्ट";
}

function Index() {
  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-2xl">
        <div className="px-4 pt-5 pb-3">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            भारत में ट्रेंडिंग
          </h1>
        </div>

        <ul className="divide-y border-y bg-card">
          {trends.map((t, i) => (
            <li key={t.id}>
              <Link
                to="/topic/$tag"
                params={{ tag: encodeURIComponent(t.tag) }}
                className="flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-muted-foreground">
                    {i + 1} · ट्रेंडिंग
                  </div>
                  <div className="font-hindi mt-0.5 truncate text-[17px] font-semibold text-foreground">
                    {t.tag}
                  </div>
                  <div className="font-hindi mt-0.5 text-xs text-muted-foreground">
                    {fmtPosts(t.posts)}
                  </div>
                </div>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-background"
                  aria-label="अधिक"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-4 py-6">
          <button className="font-hindi text-sm text-primary">और दिखाएं</button>
        </div>
      </main>
    </div>
  );
}
