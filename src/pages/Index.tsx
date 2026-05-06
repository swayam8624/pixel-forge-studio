import { Github, Linkedin, Mail, FileText, ArrowRight, Download, MessageCircle, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { ArrowCTA } from "@/components/ArrowCTA";
import { profile, skills, projects, book } from "@/data/site";
import model1 from "@/assets/model-1.jpg";
import game1 from "@/assets/game-1.jpg";

// Synthetic GitHub-style heatmap (last 12 weeks)
const heatmap = Array.from({ length: 12 * 7 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  return r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.82 ? 2 : r < 0.95 ? 3 : 4;
});
const heatLevel = ["bg-white/[0.04]", "bg-amber/20", "bg-amber/40", "bg-amber/70", "bg-amber"];

const Index = () => {
  return (
    <PageLayout videoPage="home">
      {/* HERO */}
      <section className="container pt-10 md:pt-16 pb-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-status-green/30 bg-status-green/5">
            <span className="size-2 rounded-full bg-status-green animate-pulse" />
            <span className="font-mono-tech text-[11px] uppercase text-status-green tracking-wider">{profile.status.label}</span>
          </span>
          <span className="font-mono-tech text-[11px] uppercase text-muted-foreground">/ {profile.handle}</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance max-w-5xl">
          {profile.headline.split(",").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-amber">,</span>}
            </span>
          ))}
        </h1>
        <p className="font-display text-2xl md:text-3xl text-muted-foreground mt-4 italic">{profile.headlineSub}</p>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            to="/models"
            className="group inline-flex items-center gap-2 px-6 h-12 rounded-full bg-amber text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            See My Work <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-white/15 hover:border-amber hover:text-amber transition-colors"
          >
            <MessageCircle className="size-4" /> Let's Talk
          </a>
          <a
            href={profile.cv}
            className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-white/15 hover:border-foreground transition-colors"
          >
            <Download className="size-4" /> Download CV
          </a>
        </div>
      </section>

      {/* BENTO */}
      <section className="container py-8 md:py-12">
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* Tagline panel */}
          <article className="bento-card grain col-span-12 lg:col-span-5 p-7 md:p-10 flex items-center min-h-[280px] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-amber)" }} />
            <h2 className="relative font-display text-3xl md:text-5xl font-bold leading-[1.05] text-balance">
              Building <span className="text-amber">Worlds.</span><br />
              Writing <span className="text-amber">Stories.</span><br />
              Shipping <span className="text-amber">Code.</span>
            </h2>
          </article>

          {/* GitHub heatmap */}
          <article className="bento-card bento-card-hover col-span-12 sm:col-span-6 lg:col-span-4 p-7 flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">// commit graph · 12w</p>
                <Github className="size-4 text-muted-foreground" />
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1 mt-5">
                {heatmap.map((lvl, i) => (
                  <span key={i} className={`size-3 rounded-sm ${heatLevel[lvl]}`} />
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="font-display text-3xl font-bold">412 <span className="text-amber">commits</span></p>
                <p className="font-mono-tech text-[11px] text-muted-foreground mt-1">across 18 repos · 84-day streak</p>
              </div>
              <a href={profile.github} aria-label="GitHub" className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 hover:border-amber hover:text-amber transition-colors">
                <ArrowRight className="size-4 -rotate-45" />
              </a>
            </div>
          </article>

          {/* Icon links */}
          <article className="col-span-12 sm:col-span-6 lg:col-span-3 grid grid-cols-2 gap-4 md:gap-5 min-h-[280px]">
            {[
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: FileText, href: profile.cv, label: "CV" },
            ].map(t => (
              <a key={t.label} href={t.href} aria-label={t.label} className="icon-tile h-full">
                <t.icon className="size-7" strokeWidth={1.5} />
              </a>
            ))}
          </article>

          {/* Latest 3D render */}
          <Link to="/models" className="bento-card bento-card-hover col-span-12 lg:col-span-4 min-h-[300px] relative overflow-hidden block group">
            <img src={model1} alt="Latest Blender render" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="font-mono-tech text-[10px] uppercase px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-white/10">
                Latest render · #04
              </span>
            </div>
            <div className="relative mt-auto p-7 flex items-end justify-between h-full">
              <div className="self-end">
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Sculpt</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Echo / Bust 04</h3>
              </div>
              <ArrowCTA to="/models" ariaLabel="See 3D work" />
            </div>
          </Link>

          {/* Latest game */}
          <Link to="/games" className="bento-card bento-card-hover col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] relative overflow-hidden block group">
            <img src={game1} alt="Latest game screenshot" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-status-green/30">
              <span className="size-1.5 rounded-full bg-status-green animate-pulse" />
              <span className="font-mono-tech text-[10px] uppercase text-status-green">Playable now</span>
            </div>
            <div className="relative mt-auto p-7 flex items-end justify-between h-full">
              <div className="self-end">
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Game</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Drift Protocol</h3>
              </div>
              <ArrowCTA to="/games" ariaLabel="Play games" />
            </div>
          </Link>

          {/* Book quote */}
          <Link to="/book" className="bento-card bento-card-hover col-span-12 sm:col-span-6 lg:col-span-4 p-7 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
            <Quote className="size-8 text-amber/70" strokeWidth={1.5} />
            <p className="font-display italic text-lg leading-snug text-balance mt-4">
              "{book.quotes[1].text}"
            </p>
            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="font-mono-tech text-[11px] text-muted-foreground uppercase">From the book</p>
                <h3 className="font-display text-xl font-semibold mt-1">{book.title}</h3>
              </div>
              <ArrowCTA to="/book" ariaLabel="Read book" />
            </div>
          </Link>

          {/* Skills */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-5 p-7 flex flex-col justify-between min-h-[260px]">
            <div className="grid grid-cols-6 sm:grid-cols-6 gap-2">
              {skills.map(s => (
                <div key={s} className="aspect-square rounded-xl border border-white/5 bg-card-elevated flex items-center justify-center text-[10px] font-mono-tech text-muted-foreground text-center px-1 hover:text-amber hover:border-amber/30 transition-colors">
                  {s}
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">// stack</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Tools I reach for</h3>
              </div>
              <ArrowCTA to="/software" ariaLabel="See tools in action" />
            </div>
          </article>

          {/* Projects marquee */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-7 p-7 flex flex-col justify-between min-h-[260px] overflow-hidden">
            <div className="-mx-7 overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-5xl font-bold text-white/[0.04]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i}>SHIPPED · SHIPPED · SHIPPED ·</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 -mt-6">
              {projects.map(p => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-white/5 aspect-video bg-card-elevated">
                  <img src={p.thumb} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Software</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Recent builds</h3>
              </div>
              <ArrowCTA to="/software" ariaLabel="See projects" />
            </div>
          </article>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
