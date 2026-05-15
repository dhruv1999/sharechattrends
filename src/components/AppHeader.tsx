import { Link } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-saffron to-hot text-primary-foreground shadow">
            <span className="font-display text-lg font-bold">श</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">शेयरचैट</span>
        </Link>
        <div className="flex flex-1 items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span className="font-hindi truncate">ट्रेंडिंग खोजें…</span>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-full border bg-card">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
