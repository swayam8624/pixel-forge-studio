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
  tagline: "Engines · Sculpts · Stories · Tools",
  headline: "Engines, sculpts, stories, tools.",
  headlineSub: "Sometimes all in the same week — engines, characters, fiction, and shipping tools.",
  bio: "I sculpt worlds in Blender, write speculative fiction, and ship code that bends pixels into meaning. Currently obsessed with the boundary between play and craft.",
  email: "hello@aether.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  itch: "https://itch.io",
  researchgate: "https://researchgate.net",
  cv: "/cv.pdf",
  status: { open: true, label: "Open to freelance · Available July 2026" },
};

export interface SoftwareEntry {
  id: string;
  title: string;
  problem: string;
  built: string;
  result: string;
  stack: string[];
  liveURL?: string;
  repoURL: string;
  caseStudy?: { architecture: string; decisions: string[]; nextTime: string };
}

export const software: SoftwareEntry[] = [
  {
    id: "s1",
    title: "Forge — render farm scheduler",
    problem: "Blender renders queued sequentially across 6 idle workstations.",
    built: "A lightweight scheduler that splits frames across nodes via SSH and a shared NFS mount.",
    result: "Reduced render time by 40% on a 3-min animation.",
    stack: ["Python", "FastAPI", "Redis", "Docker"],
    liveURL: "https://example.com/forge",
    repoURL: "https://github.com/example/forge",
    caseStudy: {
      architecture: "Single FastAPI orchestrator dispatches frame ranges; workers pull jobs from Redis, write outputs to NFS, then mark complete. Failed frames re-queue with backoff.",
      decisions: [
        "Picked Redis over RabbitMQ — simpler ops, sufficient throughput.",
        "Shared NFS over object storage — already in the studio LAN.",
        "Skipped a UI; CLI + Slack bot covered 95% of operator needs.",
      ],
      nextTime: "Make the scheduler stateless and persist job state in Postgres so a restart doesn't drop in-flight frames.",
    },
  },
  {
    id: "s2",
    title: "Lumen — color-grade CLI",
    problem: "Re-grading 300 stills per shoot in DaVinci was manual and slow.",
    built: "A CLI that applies LUT chains and exposure curves to folders of RAWs.",
    result: "Used by 200+ photographers since launch (GitHub stars: 412).",
    stack: ["Rust", "image-rs", "Clap"],
    repoURL: "https://github.com/example/lumen",
  },
  {
    id: "s3",
    title: "Petalmap — open data viewer",
    problem: "City pollinator survey data lived in 14 untyped spreadsheets.",
    built: "A typed ETL + React map that lets researchers filter by species/season.",
    result: "Adopted by a regional conservation NGO; live in 3 cities.",
    stack: ["TypeScript", "DuckDB", "MapLibre", "React"],
    liveURL: "https://example.com/petalmap",
    repoURL: "https://github.com/example/petalmap",
  },
];

export interface ResearchEntry {
  id: string;
  title: string;
  venue: string;
  year: number;
  abstract: string;
  pdfURL: string;
  citations?: number;
  tags: string[];
}

export const research: ResearchEntry[] = [
  {
    id: "r1",
    title: "Latent geometry of player intent in roguelike level traversal",
    venue: "FDG 2025 · Conference on Foundations of Digital Games",
    year: 2025,
    abstract: "We trained a small transformer on 50K runs of an open-source roguelike to predict where players will go next. The model's attention maps cluster around procedural choke-points, suggesting level designers can audit difficulty by inspecting attention rather than playtesting.",
    pdfURL: "/papers/latent-intent.pdf",
    citations: 7,
    tags: ["ML", "Game AI", "HCI"],
  },
  {
    id: "r2",
    title: "Cheap PBR: a perceptual study on shader cost vs. preference",
    venue: "I3D 2024 · Symposium on Interactive 3D Graphics",
    year: 2024,
    abstract: "A user study (n=84) shows viewers cannot reliably distinguish a 6-tap PBR approximation from full Cook-Torrance below 90 fps thresholds — relevant for mobile and web rendering budgets.",
    pdfURL: "/papers/cheap-pbr.pdf",
    citations: 12,
    tags: ["Rendering", "Perception"],
  },
];

export const engine = {
  name: "Aether Engine",
  pitch: "A focused 2D-first engine for narrative roguelikes — what Unity makes hard, this makes default.",
  notDoing: "It does not chase Unreal's rendering. It does small worlds beautifully.",
  architecture: "ECS core · custom Vulkan renderer · Lua scripting · hot-reload of assets and scripts under 200ms.",
  repoURL: "https://github.com/example/aether-engine",
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
  excerpt: [
    "The first map I ever drew was of a place I'd never been — a coastline I invented to give my grandfather somewhere to retire to in my head. I was nine. The compass rose was a sun with too many rays.",
    "Years later I would learn that all maps are like this: half memory, half wish. Cartographers call the empty parts 'sleeping space.' I have always preferred the sleeping space to the cities.",
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
