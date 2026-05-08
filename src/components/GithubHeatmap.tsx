import { Github, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface GithubHeatmapProps {
  username: string;
  profileUrl: string;
}

const fetchGithubEvents = async (username: string) => {
  const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch github events");
  }
  return response.json();
};

const heatLevel = ["bg-white/[0.04]", "bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"];

export default function GithubHeatmap({ username, profileUrl }: GithubHeatmapProps) {
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ["github-events", username],
    queryFn: () => fetchGithubEvents(username),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { heatmap, totalCommits } = useMemo(() => {
    const map: number[] = [];
    let totalCommits = 0;

    if (events && events.contributions) {
      totalCommits = events.totalContributions || 0;
      
      const flatDays: any[] = [];
      events.contributions.forEach((week: any[]) => {
        week.forEach((day: any) => flatDays.push(day));
      });
      
      const last84 = flatDays.slice(-84);
      
      last84.forEach((day: any) => {
        const count = day.contributionCount;
        let level = 0;
        if (count > 0) {
          if (count === 1) level = 1;
          else if (count <= 3) level = 2;
          else if (count <= 6) level = 3;
          else level = 4;
        }
        map.push(level);
      });
    } else {
      for (let i = 0; i < 84; i++) map.push(0);
    }

    return { heatmap: map, totalCommits };
  }, [events]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <p className="font-mono-tech text-xs text-muted-foreground uppercase">// commit graph · 12w</p>
          <Github className="size-4 text-muted-foreground" />
        </div>
        
        {isLoading ? (
          <div className="mt-5 h-[100px] flex items-center justify-center">
            <span className="font-mono-tech text-[10px] text-muted-foreground animate-pulse">Fetching REST data...</span>
          </div>
        ) : isError ? (
          <div className="mt-5 h-[100px] flex items-center justify-center">
            <span className="font-mono-tech text-[10px] text-red-400">Failed to load Github data.</span>
          </div>
        ) : (
          <div className="grid grid-flow-col grid-rows-7 gap-1 mt-5">
            {heatmap.map((lvl, i) => (
              <span key={i} className={`size-3 rounded-[2px] transition-colors duration-500 hover:scale-125 ${heatLevel[lvl]}`} />
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between mt-6">
        <div>
          {isLoading ? (
             <div className="h-[40px] animate-pulse bg-white/5 rounded w-24"></div>
          ) : (
            <>
              <p className="font-display text-3xl font-bold">{totalCommits} <span className="text-amber">commits</span></p>
              <p className="font-mono-tech text-[11px] text-muted-foreground mt-1">across all repos · last year</p>
            </>
          )}
        </div>
        <a href={profileUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 hover:border-amber hover:text-amber transition-colors hover:bg-amber/5">
          <ArrowRight className="size-4 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </>
  );
}
