import { MouseEvent, ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

export function LinkWindow({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const isMailOrPhone = href.startsWith("mailto:") || href.startsWith("tel:");

  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isMailOrPhone) return;
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a href={href} onClick={click} className={className} target={isMailOrPhone ? undefined : "_blank"} rel="noreferrer">
        {children}
      </a>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 30, scale: 0.94 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.94 }} className="relative w-full max-w-xl overflow-hidden border border-white/10 bg-background shadow-elevated">
              <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                <p className="truncate font-mono-tech text-[10px] uppercase tracking-widest text-primary">{href}</p>
                <div className="flex gap-2">
                  <button onClick={() => setOpen(false)} className="rounded-sm border border-white/10 p-2" aria-label="Close link window"><X className="size-4" /></button>
                </div>
              </div>
              <div className="p-6">
                <p className="font-display text-2xl font-semibold">Open this link?</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Many sites block embedded previews, so this panel keeps you in the portfolio and opens the destination in a real tab only when you choose.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={href} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 font-medium text-primary-foreground">
                    <ExternalLink className="size-4" /> Open link
                  </a>
                  <button onClick={() => setOpen(false)} className="h-11 rounded-sm border border-white/10 px-5">Stay here</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
