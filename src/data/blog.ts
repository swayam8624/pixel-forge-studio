export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  body: string;
}

export const seedBlogPosts: BlogPost[] = [
  {
    id: "mechanical-portfolio",
    title: "Designing a Mechanical Portfolio Interface",
    date: "2026-05-08",
    tags: ["design", "motion", "portfolio"],
    excerpt: "Notes on making motion feel like a control surface instead of decoration.",
    body: "## Why dials?\n\nA dial gives motion a job. It can show progress, select a build, or make a skill section feel tactile.\n\n## Rule\n\nEvery moving piece should either report state, invite action, or make the system feel alive.",
  },
  {
    id: "build-log-001",
    title: "Build Log 001: Cards, Carousels, and Control Panels",
    date: "2026-05-07",
    tags: ["build-log", "frontend"],
    excerpt: "A compact log about turning recent builds into a rotary selection surface.",
    body: "The recent builds panel now behaves like a small machine: cards rotate in, the dial controls selection, and hover states reveal a little more texture.",
  },
];
