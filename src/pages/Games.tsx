import { useState } from "react";
import { X, Github, Copy, Check, Play, Terminal as TerminalIcon, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { games, GameEntry } from "@/data/site";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const statusBadge = {
  playable: { dot: "bg-status-green", label: "Play Now", color: "text-status-green" },
  terminal: { dot: "bg-status-amber", label: "Launch in Terminal", color: "text-status-amber" },
  repo:     { dot: "bg-status-blue",  label: "View Repo", color: "text-status-blue" },
} as const;

const Games = () => {
  const [active, setActive] = useState<GameEntry | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (line: string) => {
    navigator.clipboard.writeText(line);
    setCopied(line);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <PageLayout videoPage="games">
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-status-green flex items-center gap-2">
            <span className="size-2 rounded-full bg-status-green animate-pulse" /> system online
          </p>
          <h1 className="font-mono-tech text-5xl md:text-7xl font-bold mt-3 leading-[0.95] uppercase tracking-tight">
            Game <span className="text-amber">Archive</span>
          </h1>
          <p className="font-mono-tech text-muted-foreground mt-4">{"> browser-playable games & launchable projects"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {games.map(g => {
            const s = statusBadge[g.status];
            return (
              <button
                key={g.id}
                onClick={() => setActive(g)}
                className="bento-card bento-card-hover text-left group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={g.thumbnail} alt={g.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-white/10">
                    <span className={cn("size-1.5 rounded-full", s.dot)} />
                    <span className={cn("text-[10px] font-mono-tech uppercase", s.color)}>{s.label}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                    <span className="font-mono-tech text-[10px] text-muted-foreground uppercase">{g.genre}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{g.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {g.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono-tech px-2 py-1 rounded-full bg-card-elevated border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl bg-card border-white/10 p-6">
          {active && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                  <p className="font-mono-tech text-xs text-muted-foreground mt-1">{active.genre}</p>
                </div>
                <button onClick={() => setActive(null)} aria-label="Close" className="p-2 rounded-lg border border-white/10 hover:border-white/30">
                  <X className="size-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mt-4">{active.description}</p>

              {/* Browser playable */}
              {active.launchType === "browser" && active.playURL && (
                <div className="mt-6">
                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <iframe src={active.playURL} title={active.title} className="w-full h-full" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button asChild className="bg-amber text-primary-foreground rounded-full">
                      <a href={active.playURL} target="_blank" rel="noreferrer"><Play className="size-4" /> Open Full Screen</a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-white/10">
                      <a href={active.repoURL} target="_blank" rel="noreferrer"><Github className="size-4" /> Source</a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Terminal */}
              {(active.launchType === "terminal" || active.launchType === "repo") && active.runInstructions && (
                <div className="mt-6">
                  <div className="rounded-2xl border border-white/10 bg-black overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-card-elevated">
                      <div className="flex items-center gap-2">
                        <TerminalIcon className="size-4 text-amber" />
                        <span className="font-mono-tech text-xs text-muted-foreground">~/{active.id}/launch.sh</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-white/10" />
                        <span className="size-2.5 rounded-full bg-white/10" />
                        <span className="size-2.5 rounded-full bg-status-green/60" />
                      </div>
                    </div>
                    <div className="p-5 font-mono-tech text-sm space-y-2">
                      {active.runInstructions.map((line, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 group">
                          <code className="text-foreground/90"><span className="text-amber">{">"}</span> {line}</code>
                          <button
                            onClick={() => copy(line)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/5"
                            aria-label={`Copy ${line}`}
                          >
                            {copied === line ? <Check className="size-3.5 text-status-green" /> : <Copy className="size-3.5 text-muted-foreground" />}
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-amber">{">"}</span>
                        <span className="text-foreground/60">_</span>
                        <span className="inline-block w-2 h-4 bg-amber animate-blink" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button asChild className="bg-amber text-primary-foreground rounded-full">
                      <a href={active.repoURL} target="_blank" rel="noreferrer"><Github className="size-4" /> Open GitHub</a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-white/10">
                      <a href={active.repoURL} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /> Setup guide</a>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Games;
