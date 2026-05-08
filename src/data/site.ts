import profileData from "./profile.json";
import softwareData from "./software.json";
import researchData from "./research.json";
import engineData from "./engine.json";
import skillsData from "./skills.json";
import projectsData from "./projects.json";
import modelsData from "./models.json";
import gamesData from "./games.json";
import bookData from "./book.json";
import videosData from "./videos.json";

export const profile = profileData;

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

export const software: SoftwareEntry[] = softwareData;

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

export const research: ResearchEntry[] = researchData;

export const engine = engineData;

export const skills: string[] = skillsData;

export const projects = projectsData;

export interface ModelEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: "Character" | "Abstract" | "Environment";
  geometry: "bust" | "torus" | "ruins";
  objFile?: string;
  featured?: boolean;
}

export const models: ModelEntry[] = modelsData as ModelEntry[];

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

export const games: GameEntry[] = gamesData as GameEntry[];

export const book = bookData;

export interface VideoEntry {
  title: string;
  youtubeId: string;
  page: "home" | "models" | "games" | "book";
}

export const videos: VideoEntry[] = videosData as VideoEntry[];
