import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ChevronDown, MessageCircle, Cpu, GitBranch } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContactModal } from "@/components/ContactModal";
import { software, engine, profile } from "@/data/site";
import { cn } from "@/lib/utils";

const Software = () => {
  const [openId, setOpenId] = useState<string | null>(software[0]?.id ?? null);

  return (
    <PageLayout videoPage="home">
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">/ software</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mt-3 leading-[0.95]">
            Things I <span className="text-amber">shipped.</span>
          </h1>
          <p className="font-mono-tech text-muted-foreground mt-4">// problem → build → measurable result</p>
        </div>

        {/* Engine spotlight */}
        <article className="bento-card grain mt-12 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-amber)" }} />
          <div className="relative grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <Cpu className="size-5 text-amber" />
                <p className="font-mono-tech text-xs uppercase tracking-widest text-amber">Engine work</p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">{engine.name}</h2>
              <p className="text-lg text-foreground/90 mt-4 leading-relaxed">{engine.pitch}</p>
              <p className="text-sm text-muted-foreground mt-3 italic">{engine.notDoing}</p>
              <div className="mt-6 p-4 rounded-2xl bg-background/50 border border-white/5">
                <p className="font-mono-tech text-[11px] uppercase text-muted-foreground mb-2">// architecture</p>
                <p className="font-mono-tech text-sm text-foreground/90 leading-relaxed">{engine.architecture}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button asChild className="bg-amber text-primary-foreground rounded-full">
                  <a href={engine.repoURL} target="_blank" rel="noreferrer"><Github className="size-4" /> GitHub + README</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/15">
                  <a href={engine.repoURL + "/blob/main/ARCHITECTURE.md"} target="_blank" rel="noreferrer"><GitBranch className="size-4" /> Architecture doc</a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="font-mono-tech text-[10px] text-muted-foreground/60 leading-[1.4] whitespace-pre">{`
  ┌─ engine ─────────┐
  │  ECS  ⇄  Renderer │
  │   ↓        ↓      │
  │  Lua ─→ Hot-load  │
  └───────────────────┘
              `}</div>
            </div>
          </div>
        </article>

        {/* Project list */}
        <div className="mt-10 space-y-5">
          {software.map(p => (
            <Collapsible
              key={p.id}
              open={openId === p.id}
              onOpenChange={(o) => setOpenId(o ? p.id : null)}
              className="bento-card overflow-hidden"
            >
              <div className="p-7 md:p-8 grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  <div className="mt-5 space-y-3 text-sm">
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase text-muted-foreground">Problem</p>
                      <p className="text-foreground/90 mt-1">{p.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase text-muted-foreground">What I built</p>
                      <p className="text-foreground/90 mt-1">{p.built}</p>
                    </div>
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase text-amber">Result</p>
                      <p className="text-foreground mt-1 font-medium">{p.result}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map(s => (
                      <span key={s} className="text-[10px] font-mono-tech px-2 py-1 rounded-full bg-card-elevated border border-white/5">{s}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.liveURL && (
                      <Button asChild className="bg-amber text-primary-foreground rounded-full">
                        <a href={p.liveURL} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /> Live Demo</a>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="rounded-full border-white/15">
                      <a href={p.repoURL} target="_blank" rel="noreferrer"><Github className="size-4" /> GitHub</a>
                    </Button>
                  </div>
                  {p.caseStudy && (
                    <CollapsibleTrigger className="inline-flex items-center gap-2 text-sm font-mono-tech text-muted-foreground hover:text-amber transition-colors self-start">
                      <ChevronDown className={cn("size-4 transition-transform", openId === p.id && "rotate-180")} />
                      {openId === p.id ? "Hide case study" : "Read case study"}
                    </CollapsibleTrigger>
                  )}
                </div>
              </div>
              {p.caseStudy && (
                <CollapsibleContent>
                  <div className="border-t border-white/5 bg-background/40 p-7 md:p-8 grid md:grid-cols-3 gap-8">
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase text-amber mb-2">Architecture</p>
                      <p className="text-sm text-foreground/85 leading-relaxed">{p.caseStudy.architecture}</p>
                    </div>
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase text-amber mb-2">Decisions</p>
                      <ul className="text-sm text-foreground/85 space-y-2 list-none">
                        {p.caseStudy.decisions.map((d, i) => (
                          <li key={i} className="flex gap-2"><span className="text-amber">→</span><span>{d}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase text-amber mb-2">What I'd do differently</p>
                      <p className="text-sm text-foreground/85 leading-relaxed">{p.caseStudy.nextTime}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </div>

        {/* Freelance nudge */}
        <div className="mt-12 bento-card p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono-tech text-xs uppercase text-muted-foreground">// freelance</p>
            <p className="font-display text-xl md:text-2xl font-semibold mt-1">Need something built? <span className="text-amber">Let's talk.</span></p>
          </div>
          <ContactModal subject="Start a Project">
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full" size="lg">
              <MessageCircle className="size-4 mr-2" /> Start a project
            </Button>
          </ContactModal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Software;
