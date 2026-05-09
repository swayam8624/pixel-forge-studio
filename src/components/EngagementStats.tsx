import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Activity, Boxes, FileText, GitFork, X } from "lucide-react";
import { games, models, projects, research, software } from "@/data/site";
import { seedBlogPosts } from "@/data/blog";

const stats = [
  { label: "visual works", value: models.length + games.length, icon: Boxes },
  { label: "shipped builds", value: software.length + projects.length, icon: GitFork },
  { label: "writing nodes", value: research.length + seedBlogPosts.length + 1, icon: FileText },
];

function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString().padStart(2, "0"));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export function EngagementStats() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-40 hidden items-center gap-2 rounded-sm border border-primary/30 bg-background/75 px-3 py-2 font-mono-tech text-[10px] uppercase tracking-widest text-primary backdrop-blur-xl hover:bg-primary/10 md:flex"
      >
        <Activity className="size-4" /> engage
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-sm border border-white/10 bg-background p-6 shadow-elevated"
            >
              <button aria-label="Close engagement stats" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm border border-white/10 p-2">
                <X className="size-4" />
              </button>
              <p className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">engagement telemetry</p>
              <h2 className="mt-2 font-display text-4xl font-bold">Live signal board</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.12 }}
                      className="border border-white/10 bg-card p-5"
                    >
                      <Icon className="size-5 text-primary" />
                      <p className="mt-5 font-display text-4xl font-bold"><Counter value={stat.value} /></p>
                      <p className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
