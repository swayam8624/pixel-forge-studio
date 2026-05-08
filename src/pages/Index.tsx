import { Github, Linkedin, Mail, FileText, ArrowRight, Download, MessageCircle, Quote, Phone, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { ArrowCTA } from "@/components/ArrowCTA";
import { ContactModal } from "@/components/ContactModal";
import { Preloader } from "@/components/Preloader";
import { WarningTape } from "@/components/WarningTape";
import { VerticalQuoteWheel } from "@/components/VerticalQuoteWheel";
import { profile, skills, projects, book, models, games } from "@/data/site";
import { skillIcons, brandIcons } from "@/data/icons";
import GithubHeatmap from "@/components/GithubHeatmap";

const Index = () => {
  const isFirstLoad = !sessionStorage.getItem("preloader_played");
  const delayOffset = isFirstLoad ? 2.8 : 0;

  return (
    <PageLayout videoPage="home">
      <Preloader />
      {/* HERO */}
      <section className="container pt-10 md:pt-16 pb-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        {/* Moving Background Elements */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0], 
            x: [0, 20, 0],
            rotate: [0, 10, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] size-32 md:size-64 rounded-full border border-amber/10 blur-[2px] -z-10"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0], 
            x: [0, -25, 0],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-[10%] size-48 md:size-96 rounded-full bg-amber/5 blur-3xl -z-10"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delayOffset }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-status-green/30 bg-status-green/5 backdrop-blur-md">
            <span className="size-2 rounded-full bg-status-green animate-pulse shadow-[0_0_8px_var(--status-green)]" />
            <span className="font-mono-tech text-[11px] uppercase text-status-green tracking-wider">{profile.status.label}</span>
          </span>
          <span className="font-mono-tech text-[11px] uppercase text-muted-foreground">/ {profile.handle}</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delayOffset + 0.1 }}
          className="my-8 md:my-12 -mx-4 sm:mx-0"
        >
          <WarningTape text={profile.headline} />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delayOffset + 0.2 }}
          className="font-display text-2xl md:text-3xl text-muted-foreground mt-4 italic"
        >
          {profile.headlineSub}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delayOffset + 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10"
        >
          <Link
            to="/models"
            className="group w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 h-12 rounded-full bg-gradient-to-r from-amber to-orange-500 text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          >
            See My Work <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <ContactModal subject="Portfolio Inquiry (Let's Talk)">
            <button
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 h-12 rounded-full border border-white/15 hover:border-amber hover:text-amber hover:bg-amber/5 transition-colors backdrop-blur-sm"
            >
              <MessageCircle className="size-4" /> Let's Talk
            </button>
          </ContactModal>
          <a
            href={profile.cv}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 h-12 rounded-full border border-white/15 hover:border-foreground hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <Download className="size-4" /> Download CV
          </a>
        </motion.div>
      </section>

      {/* BENTO */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delayOffset + 0.4 }}
        className="container py-8 md:py-12"
      >
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* Tagline panel */}
          <article className="bento-card grain col-span-12 lg:col-span-5 p-7 md:p-10 flex items-center min-h-[280px] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-radial-amber)" }} />
            <h2 className="relative font-display text-3xl md:text-5xl font-bold leading-[1.05] text-balance">
              Building <span className="text-amber">Worlds.</span><br />
              Writing <span className="text-amber">Stories.</span><br />
              Shipping <span className="text-amber">Code.</span>
            </h2>
          </article>

          {/* GitHub heatmap */}
          <article className="bento-card bento-card-hover col-span-12 sm:col-span-6 lg:col-span-4 p-7 flex flex-col justify-between min-h-[280px]">
            <GithubHeatmap username={profile.github.split("/").pop() || "swayamsingal"} profileUrl={profile.github} />
          </article>

          {/* Icon links */}
          <article className="col-span-12 sm:col-span-6 lg:col-span-3 grid grid-cols-2 gap-4 md:gap-5 min-h-[280px]">
            {[
              { icon: brandIcons.github, href: profile.github, label: "GitHub" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
              { icon: brandIcons.linkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: brandIcons.medium, href: profile.medium, label: "Medium" },
              { icon: Phone, href: `tel:${profile.phone.replace(/\\s+/g, '')}`, label: "Phone" },
              { icon: FileText, href: profile.cv, label: "CV" },
            ].map((t, i) => {
              const Icon = t.icon as React.ComponentType<{ className?: string }>;
              return (
                <a key={t.label} href={t.href} aria-label={t.label} className="icon-tile h-full">
                  <Icon className="size-7" />
                </a>
              );
            })}
          </article>

          {/* Latest 3D render */}
          <Link to="/models" className="bento-card bento-card-hover col-span-12 lg:col-span-4 min-h-[300px] relative overflow-hidden block group">
            <img src={models[0]?.thumbnail} alt="Latest Blender render" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="font-mono-tech text-[10px] uppercase px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-white/10">
                Latest render · #04
              </span>
            </div>
            <div className="relative mt-auto p-7 flex items-end justify-between h-full">
              <div className="self-end">
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Sculpt</p>
                <h3 className="font-display text-2xl font-semibold mt-1">{models[0]?.title}</h3>
              </div>
              <ArrowCTA to="/models" ariaLabel="See 3D work" />
            </div>
          </Link>

          {/* Latest game */}
          <Link to="/games" className="bento-card bento-card-hover col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] relative overflow-hidden block group">
            <img src={games[0]?.thumbnail} alt="Latest game screenshot" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-status-green/30">
              <span className="size-1.5 rounded-full bg-status-green animate-pulse" />
              <span className="font-mono-tech text-[10px] uppercase text-status-green">Playable now</span>
            </div>
            <div className="relative mt-auto p-7 flex items-end justify-between h-full">
              <div className="self-end">
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Game</p>
                <h3 className="font-display text-2xl font-semibold mt-1">{games[0]?.title}</h3>
              </div>
              <ArrowCTA to="/games" ariaLabel="Play games" />
            </div>
          </Link>

          {/* Book quote */}
          <VerticalQuoteWheel quotes={book.quotes} bookTitle={book.title} />

          {/* Skills */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-5 p-7 flex flex-col justify-between min-h-[260px]">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {skills.map(s => {
                const matchedKey = Object.keys(skillIcons).find(k => k.toLowerCase() === s.toLowerCase());
                const Icon = matchedKey ? skillIcons[matchedKey] : Terminal;
                return (
                  <a 
                    key={s} 
                    href={`https://google.com/search?q=${encodeURIComponent(s + " official documentation")}&btnI`}
                    target="_blank"
                    rel="noreferrer"
                    className="group aspect-square rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-[10px] font-mono-tech text-muted-foreground text-center p-2 hover:text-amber hover:border-amber/30 hover:bg-amber/5 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(251,191,36,0.3)] cursor-pointer"
                  >
                    <Icon className="size-5 md:size-6 transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden sm:block truncate w-full px-1">{s}</span>
                  </a>
                );
              })}
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">// stack</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Tools I reach for</h3>
              </div>
              <ArrowCTA to="/software" ariaLabel="See tools in action" />
            </div>
          </article>

          {/* Projects marquee */}
          <article className="bento-card bento-card-hover col-span-12 lg:col-span-7 p-7 flex flex-col justify-between min-h-[260px] overflow-hidden">
            <div className="-mx-7 overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-5xl font-bold text-white/[0.04]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i}>SHIPPED · SHIPPED · SHIPPED ·</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 -mt-6">
              {projects.map(p => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-white/5 aspect-video bg-card-elevated">
                  <img src={p.thumb} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <p className="font-mono-tech text-xs text-muted-foreground uppercase">Software</p>
                <h3 className="font-display text-2xl font-semibold mt-1">Recent builds</h3>
              </div>
              <ArrowCTA to="/software" ariaLabel="See projects" />
            </div>
          </article>
        </div>
      </motion.section>
    </PageLayout>
  );
};

export default Index;

