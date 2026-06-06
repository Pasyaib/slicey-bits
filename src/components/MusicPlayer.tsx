import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Loop track
          }
          return prev + 0.4;
        });
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-40 flex items-center justify-between",
        "bg-background/40 backdrop-blur-xl border border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-full",
        "h-14 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) select-none font-mono",
        isHovered ? "w-72 px-3 pl-2" : "w-14 px-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Interactive Rotating Vinyl Record Toggle */}
      <button
        onClick={togglePlay}
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden transition-transform active:scale-95 border border-foreground/5",
          isPlaying ? "" : "hover:scale-105"
        )}
        title={isPlaying ? "Pause" : "Play"}
      >
        {/* Vinyl Body Design */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-foreground shadow-lg flex items-center justify-center transition-transform duration-1000 ease-linear",
            isPlaying ? "animate-spin" : ""
          )}
          style={{ animationDuration: isPlaying ? "5s" : undefined }}
        >
          {/* Vinyl grooves */}
          <div className="absolute inset-[3px] rounded-full border border-background/5" />
          <div className="absolute inset-[6px] rounded-full border border-background/5" />
          <div className="absolute inset-[9px] rounded-full border border-background/5" />
          <div className="absolute inset-[12px] rounded-full border border-background/5" />
          
          {/* Center label */}
          <div className="absolute w-3.5 h-3.5 rounded-full bg-background flex items-center justify-center border border-foreground/10">
            <div className="w-1 h-1 rounded-full bg-foreground/60" />
          </div>
        </div>

        {/* Hover overlay icon controls */}
        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 fill-white text-white translate-x-[1px]" />
          )}
        </div>
      </button>

      {/* 2. Expanded Content area (Middle) */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-500 px-1",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
        )}
      >
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">
            Now Playing
          </span>
          <span className="text-[10px] font-bold text-foreground/90 truncate pr-2 leading-none">
            Sultan's Choice — Lofi
          </span>
        </div>

        {/* Dynamic progress seekbar at the bottom of the text */}
        <div className="w-full bg-foreground/10 h-[2px] rounded-full mt-2 overflow-hidden relative">
          <div
            className="bg-foreground h-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 3. High-fidelity Fluid 5-Bar Equalizer visualizer */}
      <div
        className={cn(
          "flex items-end gap-[2px] h-4 shrink-0 pr-1 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <span
          className={cn(
            "w-[2px] bg-foreground/70 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.8s_infinite_ease-in-out_0.1s]" : "h-1"
          )}
          style={{ height: isPlaying ? undefined : "3px" }}
        />
        <span
          className={cn(
            "w-[2px] bg-foreground/70 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.5s_infinite_ease-in-out_0.3s]" : "h-2"
          )}
          style={{ height: isPlaying ? undefined : "6px" }}
        />
        <span
          className={cn(
            "w-[2px] bg-foreground/70 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.7s_infinite_ease-in-out_0.2s]" : "h-1.5"
          )}
          style={{ height: isPlaying ? undefined : "4px" }}
        />
        <span
          className={cn(
            "w-[2px] bg-foreground/70 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.6s_infinite_ease-in-out_0.4s]" : "h-2.5"
          )}
          style={{ height: isPlaying ? undefined : "8px" }}
        />
        <span
          className={cn(
            "w-[2px] bg-foreground/70 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.9s_infinite_ease-in-out_0.15s]" : "h-1"
          )}
          style={{ height: isPlaying ? undefined : "3px" }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
