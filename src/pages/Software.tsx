import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ChevronDown, MessageCircle, Cpu, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { WarningTape } from "@/components/WarningTape";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContactModal } from "@/components/ContactModal";
import { software, engine, profile } from "@/data/site";
import { cn } from "@/lib/utils";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Software = () => {
  const [openId, setOpenId] = useState<string | null>(software[0]?.id ?? null);

  return (
    <PageLayout videoPage="home">
      <section className="container py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-8 md:mb-16 -mx-4 sm:mx-0"
        >
          <WarningTape text="SHIPPED CODE" subtitle="problem → build → measurable result" />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-10">
          {/* Engine spotlight */}
          <motion.article variants={itemVariant} className="bento-card grain p-8 md:p-10 relative overflow-hidden">
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
                <Button asChild className="bg-amber text-primary-foreground rounded-sm">
                  <a href={engine.repoURL} target="_blank" rel="noreferrer"><Github className="size-4" /> GitHub + README</a>
                </Button>
                <Button asChild variant="outline" className="rounded-sm border-white/15">
                  <a href={engine.repoURL + "/blob/main/ARCHITECTURE.md"} target="_blank" rel="noreferrer"><GitBranch className="size-4" /> Architecture doc</a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="font-mono-tech text-[10px] text-muted-foreground/80 leading-[1.4] whitespace-pre p-6 rounded-lg border border-amber/20 bg-amber/5"
              >{`
  ┌─ engine ─────────┐
  │  ECS  ⇄  Renderer │
  │   ↓        ↓      │
  │  Lua ─→ Hot-load  │
  └───────────────────┘
              `}</motion.div>
            </div>
          </div>
        </motion.article>

        {/* Project list */}
        <div className="space-y-5">
          {software.map(p => (
            <motion.div variants={itemVariant} key={p.id}>
              <Collapsible
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
                      <Button asChild className="bg-amber text-primary-foreground rounded-sm">
                        <a href={p.liveURL} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /> Live Demo</a>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="rounded-sm border-white/15">
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
            </motion.div>
          ))}
        </div>

        {/* Freelance nudge */}
        <motion.div variants={itemVariant} className="mt-12 bento-card p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono-tech text-xs uppercase text-muted-foreground">// freelance</p>
            <p className="font-display text-xl md:text-2xl font-semibold mt-1">Need something built? <span className="text-amber">Let's talk.</span></p>
          </div>
          <ContactModal subject="Start a Project">
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-sm" size="lg">
              <MessageCircle className="size-4 mr-2" /> Start a project
            </Button>
          </ContactModal>
        </motion.div>
        </motion.div>
      </section>
    </PageLayout>
  );
};

export default Software;
