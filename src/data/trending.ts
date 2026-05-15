export type Category = "Politics" | "Cricket" | "Movie" | "Festival" | "Birthday" | "Announcement" | "Event";

export type Trend = {
  id: string;
  tag: string; // #hindi
  title: string; // hindi label
  category: Category;
  heat: number; // 0-100
  posts: number;
  reasoning: string; // 6-word AI reason
  signals: ("Facebook" | "Google" | "Hindi News")[];
  window: "15m" | "1h" | "24h";
};

export type Post = {
  id: string;
  author: string;
  handle: string;
  avatarHue: number;
  time: string;
  text: string;
  media?: { kind: "image" | "video"; hue: number; label: string };
  likes: number;
  comments: number;
  views: number;
  shares: number;
  tags: string[];
};

export const trends: Trend[] = [
  { id: "t1", tag: "#यूपी_चुनाव_2025", title: "यूपी चुनाव 2025", category: "Politics", heat: 94, posts: 18420, reasoning: "यूपी में आज मतदान शुरू हुआ", signals: ["Hindi News", "Google", "Facebook"], window: "15m" },
  { id: "t2", tag: "#भारत_बनाम_ऑस्ट्रेलिया", title: "भारत बनाम ऑस्ट्रेलिया", category: "Cricket", heat: 91, posts: 15230, reasoning: "कोहली का शानदार शतक मुंबई में", signals: ["Facebook", "Google"], window: "15m" },
  { id: "t3", tag: "#छठ_पूजा", title: "छठ पूजा", category: "Festival", heat: 88, posts: 12980, reasoning: "उगते सूर्य को अर्घ्य आज", signals: ["Hindi News", "Facebook"], window: "1h" },
  { id: "t4", tag: "#पुष्पा_3", title: "पुष्पा 3 टीज़र", category: "Movie", heat: 85, posts: 11500, reasoning: "अल्लू अर्जुन का नया लुक वायरल", signals: ["Google", "Facebook"], window: "1h" },
  { id: "t5", tag: "#अमिताभ_बच्चन", title: "अमिताभ बच्चन का जन्मदिन", category: "Birthday", heat: 79, posts: 9320, reasoning: "बिग बी आज 83 साल के", signals: ["Hindi News", "Facebook"], window: "24h" },
  { id: "t6", tag: "#दिल्ली_प्रदूषण", title: "दिल्ली प्रदूषण", category: "Announcement", heat: 76, posts: 8740, reasoning: "AQI 450 पार, स्कूल बंद", signals: ["Hindi News", "Google"], window: "1h" },
  { id: "t7", tag: "#मुंबई_इंडियंस", title: "मुंबई इंडियंस", category: "Cricket", heat: 72, posts: 7210, reasoning: "नई कप्तानी की घोषणा कल", signals: ["Facebook"], window: "24h" },
  { id: "t8", tag: "#बिहार_बोर्ड_रिज़ल्ट", title: "बिहार बोर्ड रिज़ल्ट", category: "Announcement", heat: 70, posts: 6980, reasoning: "12वीं का परिणाम कल जारी", signals: ["Google", "Hindi News"], window: "24h" },
  { id: "t9", tag: "#शाहरुख_खान", title: "शाहरुख खान", category: "Movie", heat: 68, posts: 6420, reasoning: "किंग की पहली झलक रिलीज़", signals: ["Facebook", "Google"], window: "1h" },
  { id: "t10", tag: "#किसान_आंदोलन", title: "किसान आंदोलन", category: "Politics", heat: 64, posts: 5870, reasoning: "दिल्ली कूच की घोषणा आज", signals: ["Hindi News"], window: "24h" },
];

const sampleTextsByTag: Record<string, string[]> = {
  "#यूपी_चुनाव_2025": [
    "लखनऊ में सुबह से ही मतदान केंद्रों पर लंबी कतारें लगी हुई हैं। पहली बार वोट डालने वालों में जबरदस्त उत्साह देखा जा रहा है। 🗳️",
    "वाराणसी की गलियों में आज लोकतंत्र का त्योहार है। हर वोट कीमती है, ज़रूर मतदान करें।",
    "गाज़ियाबाद के बूथ नंबर 142 पर अब तक 60% मतदान हो चुका है — रिकॉर्ड बनने की उम्मीद।",
  ],
  "#भारत_बनाम_ऑस्ट्रेलिया": [
    "विराट कोहली का 51वां शतक! वानखेड़े स्टेडियम तालियों से गूंज उठा। 🏏🇮🇳",
    "बुमराह की वो यॉर्कर देखी क्या? सीधे ऑफ स्टंप उड़ा दिया। क्या गेंदबाज़ है यार!",
    "रोहित कप्तान साहब का कैच — हवा में उड़कर! highlight का सीन बन गया।",
  ],
  "#छठ_पूजा": [
    "नदी किनारे दीपों की कतार, सूर्य देव की आराधना, और मन में अपार श्रद्धा। छठी मैया की जय! 🙏",
    "व्रती माताओं को नमन — 36 घंटे का निर्जला व्रत, असली शक्ति यही है।",
    "दिल्ली के यमुना घाट पर आज लाखों श्रद्धालु अर्घ्य देने पहुंचे।",
  ],
  "#पुष्पा_3": [
    "पुष्पा झुकेगा नहीं — और अब लौट रहा है पूरे रौद्र रूप में। टीज़र देखकर रोंगटे खड़े हो गए! 🔥",
    "अल्लू अर्जुन की दाढ़ी और वो entry — सिनेमा हॉल में सीटियां पक्की।",
  ],
  "#अमिताभ_बच्चन": [
    "सदी के महानायक को जन्मदिन की हार्दिक शुभकामनाएं। आपकी आवाज़ आज भी जादू है। 🎂",
    "जलसा के बाहर फैंस का हुजूम — बिग बी ने हाथ हिलाकर अभिवादन किया।",
  ],
  "#दिल्ली_प्रदूषण": [
    "आज सुबह दिल्ली का AQI 462 — सांस लेना भी मुश्किल। मास्क पहनकर ही बाहर निकलें।",
    "GRAP-4 लागू, सभी प्राइमरी स्कूल अगले आदेश तक बंद।",
  ],
  "#मुंबई_इंडियंस": [
    "MI ने नई कप्तानी की घोषणा कल करेगी — सूर्यकुमार का नाम सबसे आगे।",
  ],
  "#बिहार_बोर्ड_रिज़ल्ट": [
    "12वीं का रिज़ल्ट कल दोपहर 2 बजे — सभी विद्यार्थियों को शुभकामनाएं। 📚",
  ],
  "#शाहरुख_खान": [
    "किंग का first look — चश्मा, दाढ़ी, और वो स्वैग। SRK is back! 👑",
  ],
  "#किसान_आंदोलन": [
    "MSP की मांग को लेकर किसान संगठनों ने दिल्ली कूच का ऐलान किया है।",
  ],
};

const authors = [
  { author: "रवि शर्मा", handle: "ravi_lko" },
  { author: "प्रिया सिंह", handle: "priya.singh" },
  { author: "अमित कुमार", handle: "amit_bihar" },
  { author: "नेहा वर्मा", handle: "nehaverma" },
  { author: "सूरज यादव", handle: "suraj.up" },
  { author: "दीपिका मिश्रा", handle: "deepika_m" },
];

export function postsForTrend(trend: Trend): Post[] {
  const texts = sampleTextsByTag[trend.tag] ?? [
    `${trend.title} पर चर्चा ज़ोरों पर है। आपकी क्या राय है?`,
  ];
  const out: Post[] = [];
  for (let i = 0; i < 12; i++) {
    const a = authors[i % authors.length];
    const text = texts[i % texts.length];
    const hasMedia = i % 2 === 0;
    out.push({
      id: `${trend.id}-p${i}`,
      author: a.author,
      handle: a.handle,
      avatarHue: (i * 53) % 360,
      time: `${(i + 1) * 3}मि`,
      text,
      media: hasMedia ? { kind: i % 4 === 0 ? "video" : "image", hue: (i * 73) % 360, label: trend.title } : undefined,
      likes: 1200 + i * 317,
      comments: 80 + i * 11,
      views: 18000 + i * 2310,
      shares: 200 + i * 19,
      tags: [trend.tag, "#शेयरचैट", "#वायरल"],
    });
  }
  return out;
}
