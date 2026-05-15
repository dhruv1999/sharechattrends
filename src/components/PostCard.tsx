import type { Post } from "@/data/trending";
import { Heart, MessageCircle, Share2, Eye, Play } from "lucide-react";

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="snap-start min-h-[88vh] rounded-3xl border bg-card p-5 shadow-sm">
      <header className="flex items-center gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-full text-base font-semibold text-white"
          style={{ background: `linear-gradient(135deg, oklch(0.7 0.18 ${post.avatarHue}), oklch(0.55 0.2 ${(post.avatarHue + 60) % 360}))` }}
        >
          {post.author[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-hindi truncate text-sm font-semibold">{post.author}</div>
          <div className="text-xs text-muted-foreground">@{post.handle} · {post.time}</div>
        </div>
        <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">फ़ॉलो</button>
      </header>

      <p className="font-hindi mt-4 text-[17px] leading-relaxed text-foreground">{post.text}</p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="font-hindi text-xs text-primary">{t}</span>
        ))}
      </div>

      {post.media && (
        <div
          className="relative mt-4 grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(135deg, oklch(0.78 0.14 ${post.media.hue}), oklch(0.5 0.2 ${(post.media.hue + 80) % 360}))`,
          }}
        >
          <span className="font-hindi font-display px-6 text-center text-3xl font-bold text-white drop-shadow">
            {post.media.label}
          </span>
          {post.media.kind === "video" && (
            <div className="absolute grid h-16 w-16 place-items-center rounded-full bg-black/40 backdrop-blur">
              <Play className="h-7 w-7 fill-white text-white" />
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
            {post.media.kind}
          </div>
        </div>
      )}

      <footer className="mt-5 flex items-center justify-between text-muted-foreground">
        <Stat icon={<Heart className="h-4.5 w-4.5" />} label={fmt(post.likes)} color="text-rose-500" />
        <Stat icon={<MessageCircle className="h-4.5 w-4.5" />} label={fmt(post.comments)} />
        <Stat icon={<Share2 className="h-4.5 w-4.5" />} label={fmt(post.shares)} />
        <Stat icon={<Eye className="h-4.5 w-4.5" />} label={fmt(post.views)} />
      </footer>
    </article>
  );
}

function Stat({ icon, label, color }: { icon: React.ReactNode; label: string; color?: string }) {
  return (
    <button className={`flex items-center gap-1.5 text-sm transition-colors hover:text-foreground ${color ?? ""}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
