import { motion } from "framer-motion";

export function WarningTape({ text, subtitle }: { text: string; subtitle?: string }) {
  const topText = "SWAYAM SINGAL ✦ YUGEN KAIRO ✦ ";

  return (
    <div className="relative w-[110vw] -ml-[5vw] my-12 h-36 flex items-center justify-center">
      {/* False Background Tape */}
      <div className="absolute w-full h-[70px] bg-black border-y-[2px] border-primary/20 transform rotate-3 opacity-50 blur-[1px]">
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,hsl(var(--primary))_20px,hsl(var(--primary))_40px)] pointer-events-none" />
        <div className="flex whitespace-nowrap overflow-hidden relative z-10 h-full">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-16 font-display font-black text-5xl md:text-7xl text-primary/30 uppercase tracking-tighter items-center h-full"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-16">
                {text} <span className="text-3xl text-primary/20">⚠</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Tape */}
      <div className="absolute w-full flex flex-col overflow-hidden bg-[#050505] border-y-[4px] border-primary/30 transform -rotate-3 shadow-[0_0_40px_rgba(245,158,11,0.1)] z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(-45deg,transparent,transparent_20px,hsl(var(--primary))_20px,hsl(var(--primary))_40px)] pointer-events-none" />
        
        {/* Top Border Ticker */}
        <div className="flex whitespace-nowrap overflow-hidden relative z-10 bg-primary/10 border-b border-primary/20 py-1">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-4 font-mono-tech text-[10px] md:text-xs text-primary/80 uppercase tracking-widest items-center"
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                {topText}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Main Big Text */}
        <div className="flex whitespace-nowrap overflow-hidden relative z-10 py-3 md:py-4">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-16 font-display font-black text-6xl md:text-8xl text-primary uppercase tracking-tighter items-center"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="drop-shadow-sm flex items-center gap-16 opacity-90">
                {text} <span className="text-4xl text-primary/60">⚠</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Border Ticker (Subtitle) */}
        {subtitle && (
          <div className="flex whitespace-nowrap overflow-hidden relative z-10 bg-primary/10 border-t border-primary/20 py-1">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex gap-8 font-mono-tech text-[10px] md:text-xs text-primary/80 uppercase tracking-widest items-center"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8">
                  {subtitle} <span className="text-primary/60">✦</span>
                </span>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
