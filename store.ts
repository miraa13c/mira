import { useSyncExternalStore } from "react";

/* ---------------------------------- types --------------------------------- */

export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export interface TextItem {
  id: string;
  text: string;
}

export interface ImportantDate {
  id: string;
  label: string;
  date: string; // YYYY-MM-DD
  emoji: string;
  repeats: boolean;
}

export interface LoveNote {
  id: string;
  text: string;
}

export interface SurpriseNote {
  id: string;
  teaser: string;
  text: string;
}

export interface HiddenPhoto {
  id: string;
  url: string;
  message: string;
}

export interface TimelineEntry {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  location: string;
  note: string;
  photoUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  spotifyUrl: string;
  note: string;
}

export interface Settings {
  siteTitle: string;
  partnerNickname: string;
  fromName: string;
  anniversary: string; // YYYY-MM-DD
  themeId: ThemeId;
  darkMode: boolean;
  background: BackgroundId;
  coverPhotoUrl: string;
}

export type ThemeId = "rose" | "terracotta" | "sage" | "lavender";
export type BackgroundId = "plain" | "dots" | "paper";

export interface AppData {
  settings: Settings;
  homeMessages: string[];
  dailyMessages: string[];
  photos: Photo[];
  memories: TextItem[];
  importantDates: ImportantDate[];
  insideJokes: TextItem[];
  places: TextItem[];
  plans: TextItem[];
  loveNotes: LoveNote[];
  surpriseNotes: SurpriseNote[];
  hiddenPhotos: HiddenPhoto[];
  timeline: TimelineEntry[];
  tracks: Track[];
  foundSurprises: string[];
  heartPops: number;
}

/* --------------------------------- images ---------------------------------
 * IMPORTANT: these are hotlinked to a previous B12 site + one temporary
 * chatgpt.com share link. Both are outside your control on a standalone
 * GitHub/Vercel deploy:
 *   - the b12.io CDN links will break the moment that B12 account/site is
 *     deactivated (README says B12 isn't needed anymore, but the images
 *     still depend on it staying alive).
 *   - `cover1` points at a chatgpt.com/backend-api/... URL. Those are
 *     short-lived signed links and WILL expire — likely already have.
 *
 * Fix: download the real photos, drop them in /public/images/, and point
 * these at local paths instead, e.g. coffee: "/images/coffee.jpg".
 * That's the only way they survive a rebuild/redeploy.
 * ---------------------------------------------------------------------- */

export const IMG = {
  coffee: "https://cdn.b12.io/client_media/eLdSOA26/17788cca-adaa-11f1-acca-0242ac110002-LL61Qtj1mEyvEGsluPHnh_ybELR5Ff.jpg",
  roadtrip: "https://cdn.b12.io/client_media/eLdSOA26/177fc9b3-adaa-11f1-8bcb-0242ac110002-BvXLAvitENa56mUXqSbxf_QQout679.jpg",
  noodles: "https://cdn.b12.io/client_media/eLdSOA26/169c271e-adaa-11f1-8400-0242ac110002-xI7ZwA8aDZZOdx3ntkghu_ayQlweM0.jpg",
  beach: "https://cdn.b12.io/client_media/eLdSOA26/1777e94e-adaa-11f1-b61c-0242ac110002-MmStH-DVIssEezAccCXEZ_efYXW6HG.jpg",
  homecorner: "https://cdn.b12.io/client_media/eLdSOA26/177ef1bd-adaa-11f1-a612-0242ac110002-0lp3MIUHmpy6CPbUWTwNn_uEA6ThLi.jpg",
  rooftop: "https://cdn.b12.io/client_media/eLdSOA26/178c49bc-adaa-11f1-bf51-0242ac110002-PdmSATKrW7JBlTMQD3jMk_fVfkPwhb.jpg",
  chai: "https://cdn.b12.io/client_media/eLdSOA26/1729a9ea-adaa-11f1-8575-0242ac110002-s3aIWN-FsbUGcIh1WQbgt_RbYvS89m.jpg",
  pancakes: "https://cdn.b12.io/client_media/eLdSOA26/177a704f-adaa-11f1-b01f-0242ac110002-Oi_MWGrFWTJfo7gt8YwdP_h5HkpPYI.jpg",
  hiddenbook: "https://cdn.b12.io/client_media/eLdSOA26/1774c99a-adaa-11f1-8648-0242ac110002-0pNUrX6kuwwN1zGAZDL9q_H3ZDYdSQ.jpg",
  cover1: "https://chatgpt.com/backend-api/estuary/content?id=file_000000000afc820b85b8ea51f49271a7&ts=497001&p=fs&cid=1&sig=169713eb3c4b09b9c3995aa1b368fd600dc0499c2d604aa653dde203353a38a2&v=0",
  cover2: "https://cdn.b12.io/client_media/eLdSOA26/17792255-adaa-11f1-b278-0242ac110002-N2QeFVp9SiiOyL5e3-WOo_Dc0KBU9r.jpg",
  cover3: "https://cdn.b12.io/client_media/eLdSOA26/17029082-adaa-11f1-8a4a-0242ac110002-h4uuAwJb7ye1WiKM7ZnyZ_9zVbokvc.jpg",
};

/* -------------------------------- seed data ------------------------------- */

export const defaultData: AppData = {
  settings: {
    siteTitle: "us, obviously",
    partnerNickname: "Mary",
    fromName: "Pulhunu",
    anniversary: "2023-01-14",
    themeId: "rose",
    darkMode: false,
    background: "dots",
    coverPhotoUrl: "https://cdn.b12.io/client_media/eLdSOA26/f66e78ec-ae8f-11f1-9a93-0242ac110002-ChatGPT_Image_Sep_12_2026_03_18_39_PM.png",
  },
  homeMessages: [
    "hey Mary. yes, you. stop scrolling and smile for a second.",
    "reminder: you still owe me a rematch in sudoku. i've been practicing.",
    "i looked at that photo of us again. still grinning like an idiot.",
    "did you eat? don't lie to me, i will find out.",
    "nothing important here. i just wanted you to open this.",
    "plot twist: today's actually a good day. i made sure of it.",
    "you're doing great. also you left your charger at my place. again.",
  ],
  dailyMessages: [
    "good morning, trouble. the world can have the rest of the day — mornings are ours.",
    "whatever today throws at you, remember: someone thinks you're the funniest person alive.",
    "drink water. stretch. then come back and tell me something that made you laugh.",
    "you've been on my mind all day and frankly it's disrupting my productivity.",
    "fun fact: statistically, thinking about me makes any day 40% better. sources: me.",
    "if today is hard, just wait. tomorrow you get to annoy me again.",
    "i hope something small and good happens to you today. like good chai. or a green light.",
    "you're my favourite person. that's it. that's the whole message.",
    "hey — breathe. you don't have to win today. you just have to be you, which is already winning.",
    "someday we'll tell this story to our kids and they'll be SO embarrassed. can't wait.",
    "sending you one (1) forehead kiss via internet. it will arrive within 5 business minutes.",
    "today's mood: us on the couch, terrible show on, snacks between us. hold on to that.",
  ],
  photos: [
    { id: "p1", url: IMG.coffee, caption: "our cafe. terrible music, perfect coffee, zero rush." },
    { id: "p2", url: IMG.roadtrip, caption: "the Lonavala drive. you navigated. we got lost. worth it." },
    { id: "p3", url: IMG.noodles, caption: "midnight maggi, extra cheese, zero regrets." },
    { id: "p4", url: IMG.beach, caption: "that evening at the beach when you said the sky looked 'okay'. it did not look okay." },
    { id: "p5", url: IMG.homecorner, caption: "your reading corner. i'm not allowed to move the blanket." },
    { id: "p6", url: IMG.rooftop, caption: "terrace night. you named three stars wrong and refused correction." },
    { id: "p7", url: IMG.chai, caption: "rainy day protocol: chai, notebook, and one doodled heart." },
    { id: "p8", url: IMG.pancakes, caption: "the great pancake incident. we still talk about it." },
  ],
  memories: [
    { id: "m1", text: "you fell asleep on my shoulder during that movie and drooled a little. i didn't move for 40 minutes." },
    { id: "m2", text: "the time we got completely lost and rebranded it as 'exploring'." },
    { id: "m3", text: "singing badly in the car at 2 a.m. while the driver pretended not to hear us." },
    { id: "m4", text: "you defended pineapple pizza to a stranger for nine whole minutes. i was so proud." },
    { id: "m5", text: "our first 'five more minutes' that turned into forty. every single morning since." },
  ],
  importantDates: [
    { id: "d1", label: "Our anniversary", date: "2023-01-14", emoji: "🌙", repeats: true },
    { id: "d2", label: "Mary's birthday", date: "2003-11-26", emoji: "🎂", repeats: true },
    { id: "d3", label: "First date day (the 'lemon tea,coffee,frenchfries' one)", date: "2023-01-14", emoji: "☕", repeats: true },
    { id: "d4", label: "Pulhunu's birthday", date: "2003-05-20", emoji: "🪔", repeats: true },
    { id: "d5", label: "The Goa plan (finally!)", date: "2026-12-24", emoji: "🏖️", repeats: false },
  ],
  insideJokes: [
    { id: "j1", text: "'tune kaha tha!' — officially our most-used sentence, award-winning, timeless." },
    { id: "j2", text: "the 'five more minutes' lie. both of us. every morning. no winners." },
    { id: "j3", text: "pineapple pizza is fine and we will die on this hill together." },
    { id: "j4", text: "'just one episode' — a work of fiction we co-author nightly." },
    { id: "j5", text: "the guy at the cafe who thinks we're siblings. we let him believe it." },
  ],
  places: [
    { id: "pl1", text: "the corner cafe — terrible playlists, great coffee, our table by the window." },
    { id: "pl2", text: "our bench at Marine Drive, second from the left." },
    { id: "pl3", text: "the bookstore where we pretended to be intellectual for two hours." },
    { id: "pl4", text: "your terrace, officially the best planetarium in the city." },
    { id: "pl5", text: "the Maggi point at Lonavala. no notes. perfect as is." },
  ],
  plans: [
    { id: "f1", text: "drive up to the hills and argue about the playlist the entire way." },
    { id: "f2", text: "learn to make your nani's dal — the real one, not my fake version." },
    { id: "f3", text: "that slow trip to Portugal we keep talking about. one day, one ticket each." },
    { id: "f4", text: "adopt a dog with terrible judgment about who the favourite human is." },
    { id: "f5", text: "grow old and still lose to you at carrom. probably." },
  ],
  loveNotes: [
    { id: "n1", text: "you make even Tuesday interesting, which is honestly rude to every other day of the week." },
    { id: "n2", text: "i like you more than chai. do you understand how serious that is?" },
    { id: "n3", text: "thanks for laughing at my worst jokes. they're really counting on you." },
    { id: "n4", text: "if i had to pick again, i'd pick you. and then i'd annoy you about it." },
    { id: "n5", text: "you're my favourite notification." },
    { id: "n6", text: "home isn't a place anymore. it's wherever you're doing your hair badly." },
  ],
  surpriseNotes: [
    { id: "s1", teaser: "tap me (i dare you)", text: "okay you tapped. now you owe me one (1) hug. those are the rules, i don't make them." },
    { id: "s2", teaser: "definitely don't open this one", text: "you opened it. classic you. honestly it's one of my favourite things about you. so impatient as always. can't keep any surprises from you." },
    { id: "s3", teaser: "a tiny secret lives here", text: "secret: i reread our old messages sometimes when i miss you. haha, it stays between us." },
    { id: "s4", teaser: "for a bad day only", text: "if you're reading this on a bad day: it ends. you don't. neither does this. — me, always. and you can't stay mad at me forever hehe" },
    { id: "s5", teaser: "the last one. probably boring.", text: "not boring! it's a coupon: one free 'you pick a movie, no complaining from me'. we will watch together hehe." },
  ],
  hiddenPhotos: [
    { id: "h1", url: IMG.hiddenbook, message: "tucked inside my copy of the book you borrowed and never returned. find it and it's yours." },
    { id: "h2", url: IMG.pancakes, message: "evidence from the pancake incident. your lawyer has been notified. (he hasn't.)" },
  ],
  timeline: [
    {
      id: "t1",
      date: "2023-01-14",
      title: "The accidental first date",
      description: "It was an awkward 'first date'. It was supposed to be 'just coffee' but you went and ordered lemon tea. the french fries were good tho hehe",
      location: "Next to D'cafe, Ground floor",
      note: "can't believe we had our first kiss there",
      photoUrl: IMG.coffee,
    },
    {
      id: "t2",
      date: "2023-11-03",
      title: "Officially us",
      description: "You said 'so what are we?' and I said something embarrassingly sincere and you pretended to hate it. Day one of everything.",
      location: "Marine Drive, our bench",
      note: "I rehearsed that sentence for two days. It still came out wrong. You said yes anyway.",
      photoUrl: IMG.beach,
    },
    {
      id: "t3",
      date: "2024-02-10",
      title: "First road trip",
      description: "We sang every song badly, got lost twice, and ate at that Maggi point like it was a five-star restaurant.",
      location: "Lonavala",
      note: "You navigated. We are never letting you navigate again. Love you.",
      photoUrl: IMG.roadtrip,
    },
    {
      id: "t4",
      date: "2024-08-22",
      title: "The great pancake incident",
      description: "Breakfast in bed went from romantic to fire-alarm-adjacent in under eight minutes. We ordered toast instead.",
      location: "Our kitchen",
      note: "You laughed so hard you cried. I pretended it was 'rustic'. It was not rustic.",
      photoUrl: IMG.pancakes,
    },
    {
      id: "t5",
      date: "2025-05-30",
      title: "Rooftop night",
      description: "Two paper cups, one blanket, and you naming three stars completely wrong with total confidence.",
      location: "Your terrace",
      note: "The moon looked good. You looked better. I didn't say it out loud but I'm saying it here.",
      photoUrl: IMG.rooftop,
    },
  ],
  tracks: [
    {
      id: "k1",
      title: "Waves",
      artist: "Oceanic Bloom",
      coverUrl: IMG.cover1,
      spotifyUrl: "https://open.spotify.com",
      note: "the windows-down song. singing mandatory, lyrics optional.",
    },
    {
      id: "k2",
      title: "Sunday, Slowly",
      artist: "lofi with you",
      coverUrl: IMG.cover2,
      spotifyUrl: "https://open.spotify.com",
      note: "for lazy Sundays when neither of us wants to be productive.",
    },
    {
      id: "k3",
      title: "3 A.M. (Still Awake)",
      artist: "Paper Moon",
      coverUrl: IMG.cover3,
      spotifyUrl: "https://open.spotify.com",
      note: "our late-night-calls-when-you-cant-sleep song.",
    },
  ],
  foundSurprises: [],
  heartPops: 0,
};

/* ---------------------------------- store --------------------------------- */

const KEY = "our-space-data-v1";

let cache: AppData | null = null;
const listeners = new Set<() => void>();

function loadData(): AppData {
  if (cache) return cache;
  if (typeof window === "undefined") {
    cache = defaultData;
    return cache;
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppData>;
      cache = {
        ...defaultData,
        ...parsed,
        settings: { ...defaultData.settings, ...(parsed.settings ?? {}) },
      };
    } else {
      cache = defaultData;
    }
  } catch {
    cache = defaultData;
  }
  return cache;
}

function persist(data: AppData) {
  cache = data;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable — keep in memory */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAppData(): AppData {
  return useSyncExternalStore(subscribe, loadData, () => defaultData);
}

export function updateData(updater: (data: AppData) => AppData) {
  const next = updater(loadData());
  persist(next);
}

export function resetData() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  cache = defaultData;
  listeners.forEach((l) => l());
}

/* --------------------------------- helpers -------------------------------- */

export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Local-time YYYY-MM-DD (toISOString would shift across timezones). */
export function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Next occurrence of a date; if it repeats yearly and already passed this year, use next year. */
export function nextOccurrence(iso: string, repeats: boolean): Date {
  const d = new Date(iso + "T00:00:00");
  if (!repeats) return d;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisYear = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  return thisYear >= today ? thisYear : new Date(today.getFullYear() + 1, d.getMonth(), d.getDate());
}

export function daysUntil(iso: string, repeats: boolean): number {
  const target = nextOccurrence(iso, repeats);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export function daysSince(iso: string): number {
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today.getTime() - d.getTime()) / 86400000));
}

/** Date-seeded pseudo-random pick, stable for the whole day. */
export function pickDaily<T>(items: T[], seedExtra = 0): T {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + seedExtra * 7919;
  let h = seed % 2147483647;
  h = (h * 16807) % 2147483647;
  return items[h % items.length];
}
