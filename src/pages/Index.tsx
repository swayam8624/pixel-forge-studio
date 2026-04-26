import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ArrowCTA } from "@/components/ArrowCTA";
import { profile, skills, projects } from "@/data/site";
import model1 from "@/assets/model-1.jpg";

const iconTiles = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: FileText, href: profile.cv, label: "CV" },
];

const Index = () => {
  return (
    <PageLayout videoPage="home">
      <section className="container py-8 md:py-12">
        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* Hero card */}
          <article className="bento-card bento-card-hover grain col-span-12 lg:col-span-4 p-7 md:p-8 flex flex-col justify-between min-h-[340px]">
            <div>
              <p className="font-mono-tech text-xs text-muted-foreground uppercase tracking-widest">
                {profile.handle}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-[0.95] mt-4 text-balance">
                {profile.name}<span className="text-amber">.</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
                {profile.bio}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <span className="font-mono-tech text-xs uppercase text-muted-foreground">
                {profile.tagline}
              </span>
              <ArrowCTA to="/models" ariaLabel="See work" />
            </div>
          </article>

          {/* Icon 2x2 grid */}
          <article className="col-span-12 sm:col-span-6 lg:col-span-3 grid grid-cols-2 gap-4 md:gap-5 min-h-[340px]">
            {iconTiles.map(t => (
              <a
                key={t.label}
                href={t.href}
                aria-label={t.label}
                className="icon-tile h-full"
              >
                <t.icon className="size-7" strokeWidth={1.5} />
              </a>
            ))}
          </article>

          {/* Tagline card */}
          <article className="bento-card grain col-span-12 sm:col-span-6 lg:col-span-5 p-7 md:p-10 flex items-center min-h-[340px] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-amber)" }} />
            <h2 className="relative font-display text-3xl md:text-5xl font-bold leading-[1.05] text-balance">
              Building <span className="text-amber">Worlds.</span><br />
              Writing <span className="text-amber">Stories.</span><br />
              Shipping <span className="text-amber">Code.</span>
            </h2>
          </article>

          {/* Skills */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-4 p-7 flex flex-col justify-between min-h-[280px]">
            <div className="grid grid-cols-4 gap-3">
              {skills.map(s => (
                <div
                  key={s}
                  className="aspect-square rounded-xl border border-white/5 bg-card-elevated flex items-center justify-center text-[10px] font-mono-tech text-muted-foreground text-center px-1 hover:text-amber hover:border-amber/30 transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Most Used</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Skills</h3>
              </div>
              <ArrowCTA to="/models" ariaLabel="See skills in action" />
            </div>
          </article>

          {/* Projects preview with marquee */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-5 p-7 flex flex-col justify-between min-h-[280px] overflow-hidden">
            <div className="-mx-7 overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-5xl font-bold text-white/[0.04]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i}>MY WORKS · MY WORKS ·</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 -mt-8">
              {projects.map(p => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-white/5 aspect-video bg-card-elevated">
                  <img src={p.thumb} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Showcase</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Projects</h3>
              </div>
              <ArrowCTA to="/games" ariaLabel="See projects" />
            </div>
          </article>

          {/* 3D Art preview */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-3 flex flex-col justify-between min-h-[280px] relative overflow-hidden">
            <img src={model1} alt="3D art preview" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="relative mt-auto p-7 flex items-end justify-between">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Hobbies</p>
                <h3 className="font-display text-2xl font-semibold mt-1">3D Art</h3>
              </div>
              <ArrowCTA to="/models" ariaLabel="See 3D art" />
            </div>
          </article>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
