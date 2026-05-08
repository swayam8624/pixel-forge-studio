import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ArrowCTA } from "@/components/ArrowCTA";

export function VerticalQuoteWheel({ quotes, bookTitle }: { quotes: { text: string, chapter: string, page: number }[], bookTitle: string }) {
  // We duplicate the quotes array to create a seamless infinite scroll loop
  const duplicatedQuotes = [...quotes, ...quotes];

  return (
    <div className="bento-card bento-card-hover col-span-12 sm:col-span-6 lg:col-span-4 p-0 flex flex-col min-h-[300px] h-[300px] overflow-hidden relative group">
      {/* Top and Bottom Fades for smooth entry/exit */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex flex-col gap-10 px-7 pt-7 pb-[150px]"
        >
          {duplicatedQuotes.map((q, i) => (
            <div key={i} className="flex flex-col flex-shrink-0 relative">
              <Quote className="size-6 text-amber/40 mb-2" strokeWidth={1.5} />
              <p className="font-display italic text-lg leading-snug text-balance">
                "{q.text}"
              </p>
              <p className="font-mono-tech text-[10px] text-muted-foreground mt-3 uppercase">
                {q.chapter} · p.{q.page}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fixed bottom footer */}
      <div className="absolute bottom-0 inset-x-0 p-7 pt-4 bg-gradient-to-t from-card via-card to-transparent z-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono-tech text-[11px] text-amber uppercase">From the book</p>
            <h3 className="font-display text-xl font-semibold mt-1">{bookTitle}</h3>
          </div>
          <ArrowCTA to="/book" ariaLabel="Read book" />
        </div>
      </div>
    </div>
  );
}
