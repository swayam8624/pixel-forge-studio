import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { profile, skills, projects, software, research } from "@/data/site";
import { WarningTape } from "@/components/WarningTape";
import { ArrowRight, Calendar, Briefcase, Award, Code, Globe, Database, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const Resume = () => {
  const [activeSkill, setActiveSkill] = useState<number>(0);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.2]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSkill((current) => (current + 1) % skills.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <PageLayout videoPage="home">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative overflow-hidden bg-background"
      >
        {/* HERO SECTION */}
        <section className="container min-h-screen pt-24 pb-12 flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            viewport={{ once: true }}
            className="text-center z-10"
          >
            <WarningTape text="LIVE RESUME" subtitle="Interactive Career Narrative" />
            <h1 className="mt-12 font-display text-6xl md:text-8xl font-bold tracking-tighter">
              {profile.name}<span className="text-amber">.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-mono-tech max-w-2xl mx-auto">
              {profile.tagline}
            </p>
          </motion.div>

          {/* Radial Skill Slider */}
          <div className="mt-24 relative size-[360px] md:size-[500px] flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-white/5"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 34, ease: "linear" }}
            >
              <div className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2 bg-primary/60" />
              <div className="absolute bottom-0 left-1/2 h-7 w-px -translate-x-1/2 bg-primary/20" />
            </motion.div>
            <motion.div
              className="absolute inset-10 rounded-full border border-dashed border-primary/15"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 48, ease: "linear" }}
            />
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSkill}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="z-10 max-w-56 text-center"
              >
                <h3 className="font-display text-3xl font-bold text-amber md:text-5xl">{skills[activeSkill]}</h3>
                <p className="mt-2 font-mono-tech text-xs text-muted-foreground uppercase tracking-widest">Core Competency</p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 58, ease: "linear" }}
            >
              {skills.map((skill, i) => {
                const angle = (i / skills.length) * 360;

                return (
                  <motion.button
                    key={skill}
                    onClick={() => setActiveSkill(i)}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.92 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={cn(
                      "absolute left-1/2 top-1/2 size-6 rounded-full border transition-colors duration-500",
                      activeSkill === i ? "border-primary bg-amber shadow-[0_0_24px_var(--primary)]" : "border-white/10 bg-white/15 hover:bg-white/35"
                    )}
                    style={{
                      transform: `rotate(${angle}deg) translateX(clamp(150px, 22vw, 235px)) rotate(-${angle}deg)`,
                    }}
                    title={skill}
                  />
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="container py-24 relative" ref={scrollRef}>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          
          <div className="space-y-32">
            {[...software, ...research].sort((a: any, b: any) => (b.year || 0) - (a.year || 0)).map((item: any, i) => (
              <motion.div
                key={item.id}
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ margin: "-100px" }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-amber text-sm font-bold tracking-widest uppercase">
                      {item.year || "Ongoing"}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.problem || item.abstract || item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((t: string) => (
                      <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono-tech uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 size-12 rounded-full bg-background border border-white/10 items-center justify-center z-10">
                  {i % 2 === 0 ? <Cpu className="size-5 text-amber" /> : <Globe className="size-5 text-amber" />}
                </div>

                <div className="md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/5 bg-card-elevated group">
                   {item.thumbnail ? (
                     <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber/5 to-transparent">
                        <Code className="size-12 text-white/5" />
                     </div>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS CAROUSEL */}
        <section className="py-24 bg-card/30 relative">
          <div className="container mb-12">
            <h2 className="font-display text-4xl font-bold">Featured Builds</h2>
            <p className="text-muted-foreground font-mono-tech mt-2 uppercase tracking-widest text-xs">A lateral view of shippable code</p>
          </div>

          <div className="flex gap-6 overflow-x-auto px-[5%] pb-12 scrollbar-hide snap-x">
             {projects.map((p: any) => (
               <motion.div
                 key={p.id}
                 whileHover={{ y: -10 }}
                 className="flex-none w-[300px] md:w-[450px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-card-elevated group snap-center relative"
               >
                 <img src={p.thumb} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-mono-tech text-[10px] text-amber uppercase">View Case Study</span>
                      <ArrowRight className="size-3 text-amber" />
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </section>

        {/* CONTACT CALLOUT */}
        <section className="container py-32 text-center">
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="bento-card p-12 md:p-24 relative overflow-hidden"
           >
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: "var(--gradient-radial-amber)" }} />
              <h2 className="font-display text-4xl md:text-6xl font-bold">Interested in working together?</h2>
              <p className="mt-6 text-muted-foreground max-w-xl mx-auto italic">
                Currently taking on new projects for {profile.status.label.split("Available ")[1]}
              </p>
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <a href={`mailto:${profile.email}`} className="px-12 py-4 bg-amber text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform">
                  Email Me
                </a>
                <a href={profile.linkedin} className="px-12 py-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                  LinkedIn
                </a>
              </div>
           </motion.div>
        </section>
      </motion.div>
    </PageLayout>
  );
};

export default Resume;
