import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastTime = performance.now();
    let lastX = cursorX.get();
    let lastY = cursorY.get();

    const moveCursor = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      
      const vx = dx / dt;
      const vy = dy / dt;

      setVelocity({
        x: Math.min(Math.max(vx, -2), 2),
        y: Math.min(Math.max(vy, -2), 2),
      });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
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

  // Compute sheer based on velocity (stretches along movement direction)
  const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const scaleX = 1 + Math.min(speed * 0.5, 1);
  const scaleY = 1 - Math.min(speed * 0.2, 0.5);
  const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        /* Keep cursor default on interactive elements just in case, but let's hide it completely */
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full opacity-80"
          animate={{
            scale: isClicking ? 0.5 : 1,
            scaleX: isClicking ? 0.5 : scaleX,
            scaleY: isClicking ? 0.5 : scaleY,
            rotate: angle,
            borderRadius: speed > 0.5 ? "50% 50% 50% 40% / 50% 50% 40% 50%" : "50%",
          }}
          transition={{
            scale: { type: "spring", stiffness: 400, damping: 20 },
            rotate: { type: "tween", duration: 0.1 },
            scaleX: { type: "tween", duration: 0.1 },
            scaleY: { type: "tween", duration: 0.1 },
          }}
          style={{
            boxShadow: "0 0 10px rgba(255,255,255,0.5), inset 0 0 10px rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)" // sheer water drop effect
          }}
        />
      </motion.div>
    </>
  );
};
