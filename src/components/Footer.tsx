import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Gamepad2, GraduationCap } from "lucide-react";
import { profile } from "@/data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/models", label: "3D" },
  { to: "/games", label: "Games" },
  { to: "/software", label: "Software" },
  { to: "/research", label: "Research" },
  { to: "/book", label: "Book" },
];

export const Footer = () => (
  <footer className="border-t border-white/5 mt-24">
    <div className="container py-12 flex flex-col items-center gap-6 text-center">
      <Link to="/" className="font-display text-2xl font-bold">
        {profile.name}<span className="text-amber">.</span>
      </Link>

      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-status-green/30 bg-status-green/5">
        <span className="size-2 rounded-full bg-status-green animate-pulse" />
        <span className="font-mono-tech text-[11px] uppercase text-status-green tracking-wider">{profile.status.label}</span>
      </span>

      <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        {links.map(l => (
          <Link key={l.to} to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
        ))}
      </nav>
      <div className="flex gap-3">
        <a href={profile.github} aria-label="GitHub" className="icon-tile size-10"><Github className="size-4" /></a>
        <a href={profile.linkedin} aria-label="LinkedIn" className="icon-tile size-10"><Linkedin className="size-4" /></a>
        <a href={profile.itch} aria-label="Itch.io" className="icon-tile size-10"><Gamepad2 className="size-4" /></a>
        <a href={profile.researchgate} aria-label="ResearchGate" className="icon-tile size-10"><GraduationCap className="size-4" /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email" className="icon-tile size-10"><Mail className="size-4" /></a>
      </div>
      <p className="text-xs text-muted-foreground font-mono-tech">
        © 2026 · All rights reserved by {profile.name} · {profile.email}
      </p>
    </div>
  </footer>
);
