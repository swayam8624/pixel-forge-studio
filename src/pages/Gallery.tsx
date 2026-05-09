import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Play, RotateCw, X } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { models, games, projects, videos } from "@/data/site";
import { cn } from "@/lib/utils";

const galleryItems = [
  ...models.map((item) => ({ type: "image" as const, title: item.title, src: item.thumbnail, meta: item.category, label: "render" })),
  ...games.map((item) => ({ type: "image" as const, title: item.title, src: item.thumbnail, meta: item.genre, label: "game" })),
  ...projects.map((item) => ({ type: "image" as const, title: item.title, src: item.thumb, meta: "Build still", label: "build" })),
  ...videos.map((item) => ({ type: "video" as const, title: item.title, src: `https://www.youtube.com/embed/${item.youtubeId}`, meta: item.page, label: "video" })),
];

const bentoSpans = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-5",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-3",
  "md:col-span-3",
];

const Gallery = () => {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const activeItem = galleryItems[active];
  const previewItem = preview === null ? null : galleryItems[preview];
  const wheelItems = useMemo(() => galleryItems.slice(0, 9), []);
  const wheelIndex = Math.max(0, wheelItems.findIndex((item) => item.title === activeItem.title));

  return (
    <PageLayout videoPage="models">
      <section className="container py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">visual archive / live board</p>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">Art board</h1>
          </div>
          <div className="hidden min-w-56 border border-white/10 bg-card p-3 md:block">
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">selector rail</p>
            <div className="mt-3 h-1 bg-white/10">
              <motion.div className="h-full bg-primary" animate={{ width: `${((active + 1) / galleryItems.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="grid min-h-[640px] gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-card p-5 shadow-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_42%,rgba(245,158,11,0.16),transparent_34%),linear-gradient(140deg,rgba(255,255,255,0.05),rgba(0,0,0,0.34))]" />
            <div className="relative flex min-h-[580px] items-center justify-center overflow-hidden">
              <motion.div
                className="absolute size-[520px] rounded-full border border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
              />
              <motion.div
                className="absolute size-[390px] rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 52, ease: "linear" }}
              />
              <motion.div
                className="relative size-[520px]"
                animate={{ rotate: -wheelIndex * (360 / wheelItems.length) }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
              >
                {wheelItems.map((item, index) => {
                  const angle = (index / wheelItems.length) * 360;
                  const radius = [168, 210, 244][index % 3];
                  const cardSize = index % 3 === 2 ? "h-32 w-24" : "h-36 w-24";
                  return (
                    <motion.button
                      key={`${item.title}-wheel`}
                      type="button"
                      onClick={() => setActive(index)}
                      className={cn(
                        "absolute left-1/2 top-1/2 overflow-hidden rounded-sm border bg-background text-left shadow-card transition-opacity",
                        cardSize,
                        active === index ? "border-primary/60" : "border-white/10 opacity-70 hover:opacity-100",
                      )}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
                      }}
                    >
                      {item.type === "video" ? (
                        <div className="flex h-full items-center justify-center bg-black/40 text-primary">
                          <Play className="size-8 fill-current" />
                        </div>
                      ) : (
                        <img src={item.src} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 truncate font-mono-tech text-[8px] uppercase tracking-widest text-primary">{item.label}</p>
                    </motion.button>
                  );
                })}
              </motion.div>

              <div className="absolute inset-x-8 bottom-8 rounded-sm border border-white/10 bg-background/75 p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">{activeItem.meta} / selected artifact</p>
                    <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">{activeItem.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive((active + 1) % wheelItems.length)}
                    className="flex size-11 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-primary hover:border-primary/40"
                    aria-label="Rotate display"
                  >
                    <RotateCw className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-sm border border-white/10 bg-card shadow-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_30%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative h-full min-h-[640px]"
              >
                {activeItem.type === "video" ? (
                  <iframe src={activeItem.src} title={activeItem.title} className="h-full min-h-[640px] w-full" allowFullScreen />
                ) : (
                  <img src={activeItem.src} alt={activeItem.title} className="h-full min-h-[640px] w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <button
                  type="button"
                  onClick={() => setPreview(active)}
                  className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-sm border border-white/10 bg-background/55 backdrop-blur-md hover:border-primary/40"
                  aria-label="Open active work"
                >
                  <Maximize2 className="size-5" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">{activeItem.label} / live panel</p>
                  <h3 className="mt-2 font-display text-3xl font-bold">{activeItem.title}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold">Archive surface</h2>
          <p className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">click any tile to load the panel</p>
        </div>
        <div className="grid auto-rows-[170px] grid-cols-1 gap-4 md:grid-cols-12">
          {galleryItems.slice(1, 9).map((item, offset) => {
            const index = offset + 1;
            return (
              <motion.button
                key={`${item.title}-bento`}
                type="button"
                onClick={() => setActive(index)}
                whileHover={{ y: -5 }}
                className={cn(
                  "group relative overflow-hidden rounded-sm border border-white/10 bg-card text-left",
                  bentoSpans[offset] || "md:col-span-3",
                )}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),transparent_45%)]" />
                {item.type === "video" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-primary">
                    <Play className="size-9 fill-current" />
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">{item.meta}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{item.title}</h3>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setPreview(null)}
              className="absolute right-5 top-5 rounded-sm border border-white/10 bg-background/50 p-2 text-foreground backdrop-blur"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              className="h-[82vh] w-full max-w-6xl border border-white/10 bg-background p-3"
            >
              {previewItem.type === "video" ? (
                <iframe src={previewItem.src} title={previewItem.title} className="h-full w-full" allowFullScreen />
              ) : (
                <img src={previewItem.src} alt={previewItem.title} className="h-full w-full object-contain" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Gallery;
