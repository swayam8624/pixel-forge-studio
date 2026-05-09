import { motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MechanicalDialProps {
  label: string;
  value?: number | MotionValue<number>;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizes = {
  sm: "size-14",
  md: "size-20",
  lg: "size-28",
};

export function MechanicalDial({
  label,
  value = 0,
  min = 0,
  max = 100,
  size = "md",
  active,
  className,
  onClick,
}: MechanicalDialProps) {
  const numericValue = typeof value === "number" ? Math.min(max, Math.max(min, value)) : value;
  const rotation = typeof numericValue === "number"
    ? -135 + ((numericValue - min) / (max - min || 1)) * 270
    : numericValue;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex flex-col items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        onClick ? "cursor-pointer" : "cursor-default",
        className,
      )}
      aria-label={label}
    >
      <div className={cn("relative rounded-full border border-white/15 bg-[#101010] p-2 shadow-inner", sizes[size])}>
        <div className="absolute inset-1 rounded-full border border-white/5 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.04),rgba(0,0,0,0.45))]" />
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[46%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-white/10"
            style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}
          />
        ))}
        <motion.div
          className="absolute inset-3 rounded-full border border-primary/30 bg-background shadow-[0_0_24px_-12px_hsl(var(--primary))]"
          animate={typeof rotation === "number" ? { rotate: rotation } : undefined}
          style={typeof rotation === "number" ? undefined : { rotate: rotation }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
        >
          <div className="absolute left-1/2 top-1 h-[38%] w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
        </motion.div>
        <div className={cn(
          "absolute inset-[42%] rounded-full border border-white/10 bg-card-elevated",
          active && "bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.7)]",
        )} />
      </div>
      <span className="max-w-24 truncate font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary">
        {label}
      </span>
    </button>
  );
}
