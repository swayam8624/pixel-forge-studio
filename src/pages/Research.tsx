import { FileText, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { WarningTape } from "@/components/WarningTape";
import { PageLayout } from "@/components/PageLayout";
import { research } from "@/data/site";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Research = () => (
  <PageLayout videoPage="home">
    <section className="container py-12 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 md:mb-16 -mx-4 sm:mx-0"
      >
        <WarningTape text="RESEARCH PAPERS" subtitle="peer-reviewed work and the questions I keep returning to" />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        {research.map(p => (
          <motion.article variants={itemVariant} key={p.id} className="bento-card bento-card-hover p-7 md:p-8 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono-tech text-[10px] uppercase text-amber">{p.venue}</span>
                <span className="font-mono-tech text-[10px] uppercase text-muted-foreground">· {p.year}</span>
                {p.citations !== undefined && (
                  <span className="font-mono-tech text-[10px] uppercase px-2 py-0.5 rounded-full bg-card-elevated border border-white/5 text-muted-foreground">
                    cited {p.citations}×
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mt-3 leading-tight text-balance">{p.title}</h3>
              <div className="mt-5 flex gap-3">
                <Quote className="size-4 text-amber/70 flex-none mt-1" />
                <p className="text-sm text-foreground/85 leading-relaxed">{p.abstract}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono-tech px-2 py-1 rounded-full bg-card-elevated border border-white/5">{t}</span>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex md:flex-col gap-3 md:items-end md:justify-center">
              <a
                href={p.pdfURL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-sm bg-amber text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <FileText className="size-4" /> Read PDF
              </a>
              {p.doiUrl && (
                <a
                  href={p.doiUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-sm border border-white/10 text-xs font-medium hover:border-amber hover:text-amber transition-colors"
                >
                  DOI Link
                </a>
              )}
              <p className="font-mono-tech text-[10px] uppercase text-muted-foreground mt-2">paper #{p.id}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  </PageLayout>
);

export default Research;
