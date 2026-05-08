import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          
          {/* Vertical Broad Tape */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-amber z-10 flex items-start overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="flex flex-col whitespace-nowrap text-background font-display font-bold text-3xl md:text-5xl tracking-tighter"
              style={{ writingMode: "vertical-rl" }}
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className="my-8 flex items-center justify-center rotate-180">
                  SYSTEM BOOT <span className="opacity-30 inline-block mx-4">✦</span>
                </span>
              ))}
            </motion.div>
          </div>
          
          <div ref={containerRef} className="relative z-20 flex-1 overflow-y-auto overflow-x-hidden flex flex-col pb-10 whitespace-pre-wrap pr-20 md:pr-32">
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
