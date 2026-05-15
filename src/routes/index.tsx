import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { trends, type Category } from "@/data/trending";

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
                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-muted-foreground">{i + 1}</div>
                  <div className="font-hindi mt-0.5 truncate text-[17px] font-semibold text-foreground">
                    <span className="mr-1.5">{categoryEmoji[t.category]}</span>
                    {t.tag}
                  </div>
                </div>
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
