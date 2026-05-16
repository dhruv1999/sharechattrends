import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/AppHeader";
import { trends as fallbackTrends, type Category, type Trend } from "@/data/trending";
import { fetchLiveTrends } from "@/lib/trending.functions";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ट्रेंडिंग — शेयरचैट" },
      { name: "description", content: "भारत में अभी क्या ट्रेंड हो रहा है — हिंदी में टॉप विषय।" },
    ],
  }),
});

const categoryEmoji: Record<Category, string> = {
  Politics: "🗳️",
  Cricket: "🏏",
  Movie: "🎬",
  Festival: "🪔",
  Birthday: "🎂",
  Announcement: "📢",
  Event: "🎉",
};

function Index() {
  const fetcher = useServerFn(fetchLiveTrends);
  const { data, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: ["live-trends"],
    queryFn: () => fetcher(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const live = data?.trends ?? [];
  const trends: Trend[] = live.length > 0 ? live : fallbackTrends;
  const isLive = live.length > 0;

  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-2xl">
        <div className="flex items-end justify-between px-4 pt-5 pb-3">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">भारत में ट्रेंडिंग</h1>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {isLoading
                ? "लोड हो रहा है…"
                : isLive
                  ? "🟢 लाइव · Google News"
                  : isError
                    ? "ऑफ़लाइन डेमो डेटा"
                    : "डेमो डेटा"}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </div>

        {isLoading ? (
          <ul className="divide-y border-y bg-card">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="px-4 py-3">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="mt-2 h-5 w-2/3" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y border-y bg-card">
            {trends.map((t, i) => (
              <li key={t.id}>
                <Link
                  to="/topic/$tag"
                  params={{ tag: encodeURIComponent(t.tag) }}
                  className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-muted-foreground">{i + 1}</div>
                    <div className="font-hindi mt-0.5 truncate text-[17px] font-semibold text-foreground">
                      <span className="mr-1.5">{categoryEmoji[t.category]}</span>
                      {t.tag}
                    </div>
                    {isLive && (
                      <div className="font-hindi mt-0.5 truncate text-xs text-muted-foreground">
                        {t.title}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="px-4 py-6">
          <button onClick={() => refetch()} className="font-hindi text-sm text-primary">
            और दिखाएं
          </button>
        </div>
      </main>
    </div>
  );
}
