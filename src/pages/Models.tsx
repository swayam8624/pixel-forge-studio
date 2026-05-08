import { useState, useMemo } from "react";
import { X, Download, MessageCircle, ChevronDown } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ModelViewer } from "@/components/ModelViewer";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { models, ModelEntry, profile } from "@/data/site";
import { cn } from "@/lib/utils";

const categories = ["All", "Character", "Abstract", "Environment"] as const;

const Models = () => {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<ModelEntry | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? models : models.filter(m => m.category === filter)),
    [filter]
  );

  return (
    <PageLayout videoPage="models">
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">/ models</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mt-3 leading-[0.95]">
            3D <span className="text-amber">Works.</span>
          </h1>
          <p className="font-mono-tech text-muted-foreground mt-4">// Rotate. Explore. Appreciate.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-10">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-mono-tech border transition-colors",
                filter === c
                  ? "bg-amber text-primary-foreground border-transparent"
                  : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {visible.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className="bento-card bento-card-hover text-left group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={m.thumbnail}
                  alt={m.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{m.title}</h3>
                  <span className="font-mono-tech text-xs text-muted-foreground">#{m.id}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{m.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {m.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono-tech px-2 py-1 rounded-full bg-card-elevated border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-5" onClick={(e) => e.stopPropagation()}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-amber text-primary-foreground text-xs font-medium hover:opacity-90"
                  >
                    <Download className="size-3.5" /> Download
                  </a>
                  <ContactModal subject={`Commission Inquiry: Similar to ${m.title}`} title="Commission a 3D Model">
                    <button
                      className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-white/15 text-xs font-medium hover:border-amber hover:text-amber transition-colors"
                    >
                      Commission Similar
                    </button>
                  </ContactModal>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl bg-card border-white/10 p-6">
          {active && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                  <p className="font-mono-tech text-xs text-muted-foreground mt-1">model #{active.id} · drag to rotate · scroll to zoom</p>
                </div>
                <button onClick={() => setActive(null)} aria-label="Close" className="p-2 rounded-lg border border-white/10 hover:border-white/30">
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-4">
                <ModelViewer geometry={active.geometry} objFile={active.objFile} />
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mt-4">
                <p className="text-sm text-muted-foreground max-w-2xl">{active.description}</p>
                <div className="flex flex-wrap gap-2 flex-none">
                  <Button className="bg-amber text-primary-foreground hover:opacity-90 rounded-full">
                    <Download className="size-4" /> Download
                  </Button>
                  <ContactModal subject={`Commission Inquiry: ${active.title}`} title="Commission a 3D Model">
                    <Button variant="outline" className="rounded-full border-white/15">
                      <MessageCircle className="size-4 mr-2" /> Commission
                    </Button>
                  </ContactModal>
                </div>
              </div>

              {active.featured && (
                <Collapsible className="mt-6 border-t border-white/5 pt-5">
                  <CollapsibleTrigger className="group flex items-center justify-between w-full">
                    <div className="text-left">
                      <p className="font-mono-tech text-[10px] uppercase text-amber">Process writeup</p>
                      <p className="font-display text-lg font-semibold mt-1">Wireframe → Sculpt → Retopo → PBR</p>
                    </div>
                    <ChevronDown className="size-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-5 grid md:grid-cols-4 gap-4">
                    {[
                      { step: "01", title: "Wireframe", body: "Reference board in PureRef. Silhouette thumbnails. Lock proportions before any geometry." },
                      { step: "02", title: "Sculpt", body: "Dyntopo block-out, then multiresolution for medium and fine forms. ~6 hours of pure shaping." },
                      { step: "03", title: "Retopo", body: "Hand-retopo'd to ~24k tris. Quads only on deformation areas. UV unwrap with a single 4K atlas." },
                      { step: "04", title: "PBR", body: "Substance Painter for base materials. Custom rim shader in GLSL for the real-time presentation pass." },
                    ].map(s => (
                      <div key={s.step} className="rounded-2xl border border-white/5 bg-background/40 p-4">
                        <p className="font-mono-tech text-[10px] text-amber">{s.step}</p>
                        <p className="font-display font-semibold mt-1">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Models;
