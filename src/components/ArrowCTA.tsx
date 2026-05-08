import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  to: string;
  ariaLabel?: string;
  className?: string;
}

export const ArrowCTA = ({ to, ariaLabel = "Open", className }: Props) => (
  <Link
    to={to}
    aria-label={ariaLabel}
    className={cn(
      "group inline-flex items-center justify-center size-10 rounded-sm border border-white/10 bg-card-elevated text-foreground hover:bg-amber hover:text-primary-foreground hover:border-transparent transition-all hover:-translate-y-0.5",
      className
    )}
  >
    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-12" />
  </Link>
);
