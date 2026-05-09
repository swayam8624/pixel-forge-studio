import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WarningTape } from "@/components/WarningTape";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [show, setShow] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const sequence = [
    "sys_boot sequence initialized...",
    "mounting virtual file system [OK]",
    "allocating memory banks....... [OK]",
    "loading core assets........... [OK]",
    "fetching shaders.............. [OK]",
    "compiling materials........... [OK]",
    "starting render loop.......... [OK]",
    "establishing connection....... [OK]",
    "SYSTEM READY."
  ];

  useEffect(() => {
    // Only run once per session
    const hasPlayed = sessionStorage.getItem("preloader_played");
    if (!hasPlayed) {
      setShow(true);
      sessionStorage.setItem("preloader_played", "true");
    } else {
      if (onCompleteRef.current) onCompleteRef.current();
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    let currentLog = 0;
    let currentChar = 0;
    
    // Fast typing effect
    const interval = setInterval(() => {
      const logIndex = currentLog;
      const charIndex = currentChar;
      
      if (logIndex >= sequence.length) return;

      setLogs(current => {
        const newLogs = [...current];
        if (newLogs.length <= logIndex) {
          newLogs.push("");
        }
        
        const fullString = sequence[logIndex];
        if (!fullString) return current;
        
        newLogs[logIndex] = fullString.substring(0, charIndex + 1);
        
        return newLogs;
      });

      currentChar++;
      
      if (currentChar >= sequence[currentLog].length) {
        currentLog++;
        currentChar = 0;
        
        if (currentLog >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 300); // Short pause before boom
        }
      }
      
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 15); // Adjust speed here

    return () => clearInterval(interval);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="fixed inset-0 z-[100] bg-[#050505] text-amber font-mono-tech uppercase p-6 md:p-12 overflow-hidden flex flex-col"
        >
          {/* CRT scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-40" />
          
          {/* Vertical title tape rail */}
          <div className="absolute right-0 top-0 bottom-0 z-10 w-32 overflow-hidden border-l border-primary/20 bg-background/45 pointer-events-none md:w-52">
            <div className="absolute inset-y-0 left-2 right-2 opacity-[0.04] bg-[repeating-linear-gradient(90deg,transparent,transparent_16px,hsl(var(--primary))_16px,hsl(var(--primary))_17px)]" />
            <div className="absolute inset-0 z-10 flex justify-center">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="flex flex-col"
              >
                {Array.from({ length: 2 }).map((_, group) => (
                  <div key={group} className="flex flex-col items-center">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={`${group}-${index}`} className="my-7 flex flex-col items-center gap-3">
                        <div className="h-20 w-28 -skew-y-6 border-y-4 border-primary/35 bg-[#050505] shadow-[0_0_32px_rgba(245,158,11,0.18)] md:h-24 md:w-44">
                          <div className="flex h-full items-center justify-center overflow-visible px-2">
                            <span className="rotate-90 whitespace-nowrap bg-[#050505] px-3 font-display text-2xl font-black uppercase tracking-tighter text-primary md:text-4xl">
                              SYSTEM BOOT
                            </span>
                          </div>
                        </div>
                        <span className="font-mono-tech text-[8px] uppercase tracking-[0.35em] text-primary/60">swayam.dev</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 left-6 z-20 hidden w-[420px] border border-primary/20 bg-background/50 p-4 backdrop-blur-md md:block">
            <p className="mb-4 font-mono-tech text-[10px] uppercase tracking-widest text-primary">site graph / route boot progress</p>
            <div className="flex items-end gap-3">
              {["home", "3d", "games", "code", "paper", "book", "cv", "blog", "art"].map((page, index) => {
                const active = logs.length > index;
                return (
                  <div key={page} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-t-sm bg-primary/80"
                      initial={{ height: 4, opacity: 0.2 }}
                      animate={{ height: active ? 24 + index * 7 : 4, opacity: active ? 1 : 0.18 }}
                      transition={{ type: "spring", stiffness: 150, damping: 18 }}
                    />
                    <span className="font-mono-tech text-[8px] uppercase tracking-widest text-muted-foreground">{page}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 h-px w-full bg-primary/20">
              <motion.div className="h-px bg-primary" animate={{ width: `${Math.min(100, (logs.length / sequence.length) * 100)}%` }} />
            </div>
          </div>
          
          <div ref={containerRef} className="relative z-20 flex-1 overflow-y-auto overflow-x-hidden flex flex-col pb-10 whitespace-pre-wrap pr-32 md:pr-56">
            {logs.map((log, i) => (
              <div key={i} className="mb-2 leading-relaxed text-xs md:text-sm">
                <span className="text-muted-foreground mr-3 hidden sm:inline">sys@portfolio:~#</span>
                {log}
                {i === logs.length - 1 && log !== sequence[sequence.length - 1] && (
                  <span className="inline-block w-2 h-[1em] bg-amber ml-1 animate-pulse align-middle" />
                )}
              </div>
            ))}
            {logs.length === sequence.length && (
              <div className="mt-4 animate-pulse">
                <span className="text-muted-foreground mr-3 hidden sm:inline">sys@portfolio:~#</span>
                <span className="inline-block w-2 h-[1em] bg-amber align-middle" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
