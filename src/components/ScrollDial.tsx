import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollDial() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const y = useTransform(progress, [0, 1], [8, 178]);

  return (
    <div className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 md:block">
      <div className="relative h-64 w-14 overflow-hidden rounded-sm border border-white/10 bg-background/65 p-2 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(245,158,11,0.18),transparent_30%),linear-gradient(180deg,transparent,rgba(245,158,11,0.08),transparent)]" />
        <div className="relative h-[218px] overflow-hidden rounded-sm border border-white/5 bg-black/25">
          {Array.from({ length: 24 }).map((_, index) => {
            const width = 10 + Math.abs(11.5 - index) * 1.8;
            return (
              <span
                key={index}
                className="absolute left-1/2 h-px -translate-x-1/2 bg-white/15"
                style={{ top: `${index * 4.3}%`, width }}
              />
            );
          })}
          <div className="absolute left-1/2 top-2 h-[202px] w-px -translate-x-1/2 bg-primary/15" />
          <motion.div
            style={{ y }}
            className="absolute left-1/2 top-0 flex h-9 w-10 -translate-x-1/2 flex-col items-center justify-center gap-1 rounded-sm border border-primary/45 bg-primary/15 shadow-[0_0_22px_-8px_hsl(var(--primary))]"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.span
                key={index}
                className="h-px bg-primary"
                animate={{ width: [9 + index * 3, 28 - index * 2, 9 + index * 3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.06 }}
              />
            ))}
          </motion.div>
        </div>
        <div className="mt-2 flex items-center justify-between font-mono-tech text-[8px] uppercase tracking-widest text-primary/80">
          <span>near</span>
          <span>far</span>
        </div>
      </div>
    </div>
  );
}
