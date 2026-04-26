import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { videos } from "@/data/site";

export const FloatingVideo = ({ page }: { page: "home" | "models" | "games" | "book" }) => {
  const [open, setOpen] = useState(false);
  const list = videos.filter(v => v.page === page);

  if (list.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-amber text-primary-foreground px-4 py-3 font-medium text-sm shadow-[0_0_30px_-4px_hsl(var(--primary)/0.6)] hover:scale-105 transition-transform"
        style={{ background: "var(--gradient-amber)" }}
      >
        <Play className="size-4 fill-current" />
        Watch
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-card border-white/10 p-6">
          <DialogTitle className="font-display text-xl mb-4">Latest videos</DialogTitle>
          <div className="grid gap-4">
            {list.map(v => (
              <div key={v.youtubeId + v.title} className="bento-card p-2">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="px-3 py-2 font-mono-tech text-sm text-muted-foreground">{v.title}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
