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

// Rich gradient backdrops per category (Awwwards-style)
const categoryBg: Record<Category, string> = {
  Politics:
    "bg-[radial-gradient(ellipse_at_top_left,#fb7185_0%,#9f1239_55%,#450a0a_100%)]",
  Cricket:
    "bg-[radial-gradient(ellipse_at_top_right,#34d399_0%,#047857_55%,#022c22_100%)]",
  Movie:
    "bg-[radial-gradient(ellipse_at_bottom_right,#c084fc_0%,#6d28d9_55%,#1e1b4b_100%)]",
  Festival:
    "bg-[radial-gradient(ellipse_at_top,#fbbf24_0%,#d97706_55%,#7c2d12_100%)]",
  Birthday:
    "bg-[radial-gradient(ellipse_at_bottom_left,#f9a8d4_0%,#db2777_55%,#500724_100%)]",
  Announcement:
    "bg-[radial-gradient(ellipse_at_top_left,#7dd3fc_0%,#0369a1_55%,#082f49_100%)]",
  Event:
    "bg-[radial-gradient(ellipse_at_center,#a5b4fc_0%,#4338ca_55%,#1e1b4b_100%)]",
};

// Bento span pattern for 10 tiles on a 2-col mobile grid
const spans = [
  "col-span-2 row-span-2", // 0 - hero
  "col-span-1 row-span-2", // 1 - tall
  "col-span-1 row-span-1", // 2
  "col-span-1 row-span-1", // 3
  "col-span-2 row-span-1", // 4 - wide
  "col-span-1 row-span-2", // 5 - tall
  "col-span-1 row-span-1", // 6
  "col-span-1 row-span-1", // 7
  "col-span-2 row-span-1", // 8 - wide
  "col-span-2 row-span-1", // 9 - wide
];

function Index() {
  const fetcher = useServerFn(fetchLiveTrends);
  const { data, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: ["live-trends"],
    queryFn: () => fetcher(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const live = data?.trends ?? [];
  const isLive = live.length > 0;
  const trends: Trend[] = (isLive ? live : fallbackTrends).slice(0, 10);

  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-3 pb-12">
        <div className="flex items-end justify-between pt-5 pb-4">
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
          <div className="grid auto-rows-[110px] grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={`${spans[i] ?? "col-span-1 row-span-1"} rounded-3xl`} />
            ))}
          </div>
        ) : (
          <div className="grid auto-rows-[110px] grid-cols-2 gap-3">
            {trends.map((t, i) => {
              const span = spans[i] ?? "col-span-1 row-span-1";
              const isHero = i === 0;
              const isWide = span.includes("col-span-2");
              const isTall = span.includes("row-span-2");
              return (
                <Link
                  key={t.id}
                  to="/topic/$tag"
                  params={{ tag: encodeURIComponent(t.tag) }}
                  className={`group relative overflow-hidden rounded-3xl ${span} ${categoryBg[t.category]} text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)]`}
                >
                  {/* Giant faded emoji as visual */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-3 -bottom-4 select-none opacity-25 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      isHero ? "text-[160px]" : isTall || isWide ? "text-[110px]" : "text-[88px]"
                    } leading-none drop-shadow-lg`}
                  >
                    {categoryEmoji[t.category]}
                  </span>

                  {/* Mesh overlay for depth */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_120%,rgba(255,255,255,0.18),transparent_55%)]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                  />

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium tracking-wide backdrop-blur-sm">
                        {t.category}
                      </span>
                      <span className="font-display text-[11px] tabular-nums opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`font-hindi font-semibold leading-tight drop-shadow ${
                          isHero ? "text-3xl" : isWide || isTall ? "text-xl" : "text-lg"
                        }`}
                      >
                        {t.tag}
                      </div>
                      {isLive && (isHero || isWide || isTall) && (
                        <div className="font-hindi mt-1 line-clamp-2 text-xs opacity-85">
                          {t.title}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
