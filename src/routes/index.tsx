import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { TrendCard } from "@/components/TrendCard";
import { trends } from "@/data/trending";
import { useState } from "react";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "शेयरचैट ट्रेंडिंग — Hindi Trending Topics" },
      { name: "description", content: "भारत में अभी क्या ट्रेंड हो रहा है — हिंदी में टॉप 10 विषय, हीट स्कोर और AI-संचालित कारण।" },
    ],
  }),
});

const windows = [
  { id: "15m" as const, label: "15 मिनट" },
  { id: "1h" as const, label: "1 घंटा" },
  { id: "24h" as const, label: "24 घंटे" },
  { id: "all" as const, label: "सभी" },
];

function Index() {
  const [win, setWin] = useState<"15m" | "1h" | "24h" | "all">("all");
  const filtered = win === "all" ? trends : trends.filter((t) => t.window === win);

  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              ट्रेंडिंग <span className="text-primary">अभी</span>
            </h1>
            <p className="font-hindi mt-1 text-sm text-muted-foreground">
              <Flame className="mr-1 inline h-3.5 w-3.5 text-hot" />
              भारत में सबसे ज़्यादा चर्चा में — AI द्वारा रैंक किए गए विषय
            </p>
          </div>
        </div>

        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => setWin(w.id)}
              className={`font-hindi whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
                win === w.id
                  ? "border-transparent bg-foreground text-background"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {filtered.map((t, i) => (
            <li key={t.id}>
              <TrendCard trend={t} rank={i + 1} />
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="font-hindi rounded-2xl border bg-card p-8 text-center text-muted-foreground">
              इस समय अंतराल में कोई ट्रेंड नहीं
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}
