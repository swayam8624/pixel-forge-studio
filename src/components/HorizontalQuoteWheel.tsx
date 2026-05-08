import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function HorizontalQuoteWheel({ quotes }: { quotes: { text: string, chapter: string, page: number }[] }) {
  // Duplicate for seamless infinite horizontal scroll
  const duplicatedQuotes = [...quotes, ...quotes, ...quotes];

  return (
    <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 sm:-mx-8 sm:px-8">
      {/* Left and Right Fades */}
      <div className="absolute left-0 inset-y-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-33.333333%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex gap-6 w-max"
      >
        {duplicatedQuotes.map((q, i) => (
          <article key={i} className="bento-card w-[350px] md:w-[450px] p-7 flex-shrink-0 flex flex-col justify-between whitespace-normal relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <Quote className="size-32" strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <Quote className="size-8 text-amber/60 mb-4" strokeWidth={1.5} />
              <p className="font-display italic text-xl leading-relaxed text-balance text-foreground/90">"{q.text}"</p>
            </div>
            <p className="font-mono-tech text-xs text-muted-foreground mt-8 uppercase tracking-widest relative z-10">
              {q.chapter} <span className="text-white/20 mx-2">|</span> p.{q.page}
            </p>
          </article>
        ))}
      </motion.div>
    </div>
  );
}
