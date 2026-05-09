import { motion } from "framer-motion";

export function FloatingTarget() {
  return (
    <motion.div
      className="pointer-events-none fixed left-6 top-[42vh] z-20 hidden size-24 items-center justify-center md:flex"
      animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/25"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-dashed border-white/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <span className="h-px w-16 bg-primary/30" />
      <span className="absolute h-16 w-px bg-primary/30" />
      <span className="size-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
    </motion.div>
  );
}
