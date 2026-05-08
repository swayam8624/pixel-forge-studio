import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Typewriter = ({ text, delay = 0, speed = 50 }: { text: string, delay?: number, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, started, speed]);

  return (
    <span>
      {displayedText.split("").map((char, i) => (
        <span key={i} className={char === "," || char === "." ? "text-amber" : ""}>
          {char}
        </span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "stepEnd" }}
        className="inline-block w-[0.4em] h-[0.9em] bg-amber ml-1 align-baseline"
        style={{ marginBottom: "-0.05em" }}
      />
    </span>
  );
};
