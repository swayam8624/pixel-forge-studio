import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { profile } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/models", label: "3D" },
  { to: "/games", label: "Games" },
  { to: "/software", label: "Software" },
  { to: "/research", label: "Research" },
  { to: "/book", label: "Book" },
  { to: "/resume", label: "Resume" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/70 border-b border-white/5">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          {profile.name}<span className="text-amber">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ContactModal subject="Portfolio Inquiry (Let's Talk)">
            <Button variant="default" size="sm" className="hidden md:inline-flex bg-foreground text-background hover:bg-foreground/90 rounded-full">
              Let's Talk
            </Button>
          </ContactModal>
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg border border-white/5"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl z-40 animate-fade-up">
          <div className="container flex flex-col gap-2 py-8">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-2xl font-display font-semibold py-3 border-b border-white/5",
                    isActive ? "text-amber" : "text-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <ContactModal subject="Portfolio Inquiry (Let's Talk)">
              <Button className="mt-6 bg-foreground text-background hover:bg-foreground/90 rounded-full" size="lg">
                Let's Talk
              </Button>
            </ContactModal>
          </div>
        </div>
      )}
    </header>
  );
};
