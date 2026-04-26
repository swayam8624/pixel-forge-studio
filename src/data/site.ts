import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import bookCover from "@/assets/book-cover.jpg";

export const profile = {
  name: "Aether",
  handle: "aether.dev",
  tagline: "3D Artist · Game Dev · Author · Builder",
  bio: "I sculpt worlds in Blender, write speculative fiction, and ship code that bends pixels into meaning. Currently obsessed with the boundary between play and craft.",
  email: "hello@aether.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  cv: "/cv.pdf",
};

export const skills = [
  "Blender", "Unity", "Three.js", "TypeScript",
  "Python", "C++", "React", "Node.js",
  "Figma", "GLSL", "Rust", "Pygame",
];

export const projects = [
  { id: "p1", title: "Lumen Studio", thumb: project1 },
  { id: "p2", title: "Forge Dashboard", thumb: project2 },
];

export interface ModelEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: "Character" | "Abstract" | "Environment";
  geometry: "bust" | "torus" | "ruins";
  featured?: boolean;
}

export const models: ModelEntry[] = [
  {
    id: "01", title: "Echo / Bust 04",
    description: "Stylized character study. Sculpted in Blender, retopologized for real-time. PBR materials with custom rim shader.",
    tags: ["Blender", "Character", "PBR"],
    thumbnail: model1, category: "Character", geometry: "bust", featured: true,
  },
  {
    id: "02", title: "Liquid Obsidian",
    description: "Procedural metallic flow generated with geometry nodes. Part of an ongoing material exploration series.",
    tags: ["Blender", "Abstract", "Procedural"],
    thumbnail: model2, category: "Abstract", geometry: "torus",
  },
  {
    id: "03", title: "Hollow Sanctum",
    description: "Hand-modeled diorama. Ruined arches, mossy stone, ember-lit interior. Built for a short film concept.",
    tags: ["Blender", "Environment", "Diorama"],
    thumbnail: model3, category: "Environment", geometry: "ruins",
  },
];

export interface GameEntry {
  id: string;
  title: string;
  genre: string;
  description: string;
  thumbnail: string;
  status: "playable" | "terminal" | "repo";
  launchType: "browser" | "terminal" | "repo";
  playURL?: string;
  repoURL: string;
  runInstructions?: string[];
  tags: string[];
}

export const games: GameEntry[] = [
  {
    id: "g1", title: "Drift Protocol", genre: "Puzzle / Atmospheric",
    description: "A minimalist isometric puzzle about routing light through ruined machines.",
    thumbnail: game1, status: "playable", launchType: "browser",
    playURL: "https://example.com/drift",
    repoURL: "https://github.com/example/drift",
    tags: ["TypeScript", "WebGL", "Browser"],
  },
  {
    id: "g2", title: "Hollow Run", genre: "Roguelike / Terminal",
    description: "ASCII roguelike with procedural caverns. Permadeath. Fits in your terminal.",
    thumbnail: game2, status: "terminal", launchType: "terminal",
    repoURL: "https://github.com/example/hollow-run",
    runInstructions: [
      "git clone https://github.com/example/hollow-run",
      "cd hollow-run",
      "python main.py",
    ],
    tags: ["Python", "Terminal", "Roguelike"],
  },
  {
    id: "g3", title: "Ember Climb", genre: "Pixel Platformer",
    description: "A short, tense pixel platformer about climbing toward a moon that keeps moving.",
    thumbnail: game3, status: "repo", launchType: "repo",
    repoURL: "https://github.com/example/ember-climb",
    runInstructions: ["git clone https://github.com/example/ember-climb", "npm install", "npm start"],
    tags: ["Pygame", "Pixel Art", "Platformer"],
  },
];

export const book = {
  title: "Hollow Cartography",
  subtitle: "A field guide to worlds that almost exist.",
  description:
    "Twelve interconnected stories about builders, dreamers, and the spaces between intention and outcome. Equal parts speculative fiction and quiet manifesto on craft.",
  cover: bookCover,
  quotes: [
    { text: "Every world begins as a hesitation — a held breath between the page and the pen.", chapter: "Chapter 1", page: 11 },
    { text: "The map is not the territory. The map is the apology you owe the territory.", chapter: "Chapter 4", page: 73 },
    { text: "We don't build to be remembered. We build to remember ourselves.", chapter: "Chapter 9", page: 188 },
  ],
  purchaseLinks: [
    { store: "Amazon", url: "https://amazon.com", primary: true },
    { store: "Gumroad", url: "https://gumroad.com" },
    { store: "Bookshop", url: "https://bookshop.org" },
  ],
  faqItems: [
    { q: "Who is this book for?", a: "Builders, designers, writers — anyone who has ever felt the gap between what they imagined and what they shipped." },
    { q: "Is this fiction or non-fiction?", a: "Both. Twelve linked short stories with essayistic asides. Think Calvino meets a developer changelog." },
    { q: "How long is it?", a: "248 pages. Designed to be finished in two long evenings or twelve short commutes." },
    { q: "Will there be a sequel?", a: "I'm drafting a companion volume. Subscribe through any purchase link to be notified." },
  ],
};

export interface VideoEntry {
  title: string;
  youtubeId: string;
  page: "home" | "models" | "games" | "book";
}

export const videos: VideoEntry[] = [
  { title: "Studio Tour 2026", youtubeId: "dQw4w9WgXcQ", page: "home" },
  { title: "Sculpting Echo: Process", youtubeId: "dQw4w9WgXcQ", page: "models" },
  { title: "Drift Protocol — Devlog 01", youtubeId: "dQw4w9WgXcQ", page: "games" },
  { title: "Hollow Cartography — Reading", youtubeId: "dQw4w9WgXcQ", page: "book" },
];
