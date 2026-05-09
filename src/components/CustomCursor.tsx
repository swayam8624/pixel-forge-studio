import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 19, stiffness: 260, mass: 0.45 });
  const cursorYSpring = useSpring(cursorY, { damping: 19, stiffness: 260, mass: 0.45 });

  const [isClicking, setIsClicking] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lastTime = performance.now();
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (event: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(12, now - lastTime);
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const target = event.target as HTMLElement | null;

      setVelocity({
        x: Math.max(-3, Math.min(3, dx / dt)),
        y: Math.max(-3, Math.min(3, dy / dt)),
      });
      setIsInteractive(Boolean(target?.closest("a, button, input, textarea, select, [role='button']")));

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
      setTrail((items) => [...items.slice(-5), { id: now, x: event.clientX, y: event.clientY }]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  const speed = Math.min(1, Math.hypot(velocity.x, velocity.y) / 2.5);
  const angle = isInteractive ? 0 : Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
  const stretch = isInteractive ? 0.42 : 1 + speed * 0.75;
  const squash = isInteractive ? 0.42 : 1 - speed * 0.22;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[9999] hidden h-9 w-9 md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-full border border-white/45 bg-white/15 backdrop-blur-md"
          animate={{
            rotate: angle,
            scaleX: isClicking ? 0.32 : stretch,
            scaleY: isClicking ? 0.32 : squash,
            borderRadius: isInteractive
              ? "50%"
              : "58% 42% 48% 52% / 50% 58% 42% 50%",
          }}
          transition={{
            rotate: { duration: 0.08 },
            scaleX: { type: "spring", stiffness: 420, damping: 24 },
            scaleY: { type: "spring", stiffness: 420, damping: 24 },
            borderRadius: { duration: 0.18 },
          }}
          style={{
            boxShadow:
              "inset 8px 8px 16px rgba(255,255,255,0.25), inset -10px -10px 18px rgba(0,0,0,0.25), 0 8px 28px rgba(245,158,11,0.22)",
            mixBlendMode: isInteractive ? "difference" : "normal",
          }}
        >
          <div className="absolute left-2 top-1.5 h-3 w-2 rounded-full bg-white/70 blur-[1px]" />
          <div className="absolute inset-1 rounded-full border border-white/20" />
          <motion.div
            className="absolute inset-0 bg-primary/25"
            animate={{ opacity: isInteractive ? 0 : 0.12 }}
            transition={{ duration: 0.15 }}
          />
        </motion.div>
      </motion.div>
      {trail.map((point, index) => (
        <motion.span
          key={point.id}
          initial={{ opacity: 0.24, scale: 0.8 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.34, ease: "easeOut" }}
          className="pointer-events-none fixed z-[9998] hidden size-3 rounded-full border border-white/20 bg-white/15 backdrop-blur-sm md:block"
          style={{ left: point.x - 6, top: point.y - 6, transitionDelay: `${index * 12}ms` }}
        />
      ))}
    </>
  );
};
