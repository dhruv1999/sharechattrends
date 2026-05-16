import { createServerFn } from "@tanstack/react-start";
import type { Category, Trend } from "@/data/trending";

const FEEDS = [
  // Google News — India, Hindi
  "https://news.google.com/rss?hl=hi&gl=IN&ceid=IN:hi",
  // Topic: Top Hindi (Nation)
  "https://news.google.com/rss/headlines/section/topic/NATION?hl=hi&gl=IN&ceid=IN:hi",
];

type RawItem = { title: string; pubDate?: string; source?: string };

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripCdata(s: string): string {
  const m = s.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return decodeEntities((m ? m[1] : s).trim());
}

function parseRss(xml: string): RawItem[] {
  const items: RawItem[] = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    const block = m[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1];
    const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1];
    if (title) {
      items.push({
        title: stripCdata(title),
        pubDate: pubDate?.trim(),
        source: source ? stripCdata(source) : undefined,
      });
    }
  }
  return items;
}

// Strip " - Source name" suffix that Google News appends
function cleanTitle(t: string): string {
  return t.replace(/\s+-\s+[^-]+$/u, "").trim();
}

const STOP = new Set([
  "और","या","के","का","की","को","में","से","पर","है","हैं","था","थे","थी",
  "एक","यह","वह","ये","वो","कि","भी","तो","ही","नहीं","ने","हो","हुई","हुआ",
  "the","a","an","of","to","in","on","for","and","or","is","are","was","were","at","by","with","from",
]);

function tokens(t: string): string[] {
  return t
    .replace(/[।,.\-:;!?"'()\[\]{}]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w.toLowerCase()));
}

const CATEGORY_KEYWORDS: { cat: Category; words: string[] }[] = [
  { cat: "Cricket", words: ["क्रिकेट","विराट","कोहली","रोहित","आईपीएल","भारत बनाम","टेस्ट","वनडे","टी20","ipl","cricket","wicket","विकेट"] },
  { cat: "Politics", words: ["चुनाव","मोदी","राहुल","भाजपा","कांग्रेस","सरकार","मंत्री","संसद","विधानसभा","election","bjp"] },
  { cat: "Movie", words: ["फिल्म","बॉक्स ऑफिस","ट्रेलर","टीज़र","अभिनेता","अभिनेत्री","बॉलीवुड","film","trailer","movie"] },
  { cat: "Festival", words: ["पूजा","त्योहार","दिवाली","होली","ईद","छठ","नवरात्रि","रक्षाबंधन"] },
  { cat: "Birthday", words: ["जन्मदिन","birthday"] },
  { cat: "Announcement", words: ["घोषणा","जारी","ऐलान","रिज़ल्ट","परिणाम","announcement"] },
  { cat: "Event", words: ["कार्यक्रम","समारोह","रैली","आयोजन"] },
];

function detectCategory(title: string): Category {
  const low = title.toLowerCase();
  for (const { cat, words } of CATEGORY_KEYWORDS) {
    if (words.some((w) => low.includes(w.toLowerCase()))) return cat;
  }
  return "Announcement";
}

function makeHashtag(title: string): string {
  const toks = tokens(title).slice(0, 3);
  if (toks.length === 0) return "#ट्रेंडिंग";
  return "#" + toks.join("_");
}

function hoursAgo(pub?: string): number {
  if (!pub) return 24;
  const t = Date.parse(pub);
  if (Number.isNaN(t)) return 24;
  return Math.max(0, (Date.now() - t) / 36e5);
}

export const fetchLiveTrends = createServerFn({ method: "GET" }).handler(async (): Promise<{ trends: Trend[]; error: string | null }> => {
  try {
    const responses = await Promise.all(
      FEEDS.map((u) =>
        fetch(u, { headers: { "user-agent": "Mozilla/5.0 ShareChatTrends/1.0" } }).then((r) =>
          r.ok ? r.text() : "",
        ).catch(() => ""),
      ),
    );
    const raw = responses.flatMap(parseRss).map((i) => ({ ...i, title: cleanTitle(i.title) }));

    // Score by recency + frequency of dominant token
    const tokenCount = new Map<string, number>();
    for (const it of raw) for (const t of tokens(it.title)) tokenCount.set(t, (tokenCount.get(t) ?? 0) + 1);

    const seen = new Set<string>();
    const trends: Trend[] = [];
    for (const it of raw) {
      const tag = makeHashtag(it.title);
      if (seen.has(tag) || tag === "#ट्रेंडिंग") continue;
      seen.add(tag);

      const h = hoursAgo(it.pubDate);
      const window: Trend["window"] = h < 0.25 ? "15m" : h < 1 ? "1h" : "24h";
      const toks = tokens(it.title);
      const freq = Math.max(...toks.map((t) => tokenCount.get(t) ?? 1), 1);
      const recency = Math.max(0, 24 - h) / 24; // 0..1
      const heat = Math.min(99, Math.round(50 + freq * 6 + recency * 30));

      trends.push({
        id: `live-${trends.length}`,
        tag,
        title: it.title,
        category: detectCategory(it.title),
        heat,
        posts: 500 + Math.round(freq * 1200 + recency * 4000),
        reasoning: it.title.split(/\s+/).slice(0, 6).join(" "),
        signals: ["Hindi News", "Google"],
        window,
      });

      if (trends.length >= 20) break;
    }

    trends.sort((a, b) => b.heat - a.heat);
    return { trends, error: trends.length ? null : "no_items" };
  } catch (e) {
    console.error("fetchLiveTrends failed", e);
    return { trends: [], error: "fetch_failed" };
  }
});
