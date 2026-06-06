import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Loop the single song
          }
          return prev + 0.5;
        });
      }, 150);
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
        "bg-background/80 backdrop-blur-md border border-foreground/10 shadow-lg rounded-full",
        "h-12 transition-all duration-500 ease-in-out px-3 gap-3 overflow-hidden select-none font-mono",
        isHovered ? "w-64" : "w-12"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Toggle Button / Core Circle (Always visible) */}
      <div className="flex items-center shrink-0">
        <button
          onClick={togglePlay}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center bg-foreground text-background transition-transform duration-300",
            isPlaying ? "scale-100" : "hover:scale-105 active:scale-95"
          )}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-background text-background" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-background text-background translate-x-[1px]" />
          )}
        </button>
      </div>

      {/* 2. Expanded State details */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center pr-1">
          <span className="text-[10px] font-bold tracking-tight truncate text-foreground/90">
            Sultan's Choice
          </span>
          <span className="text-[8px] text-muted-foreground tracking-wider uppercase">
            Lofi
          </span>
        </div>

        {/* Tiny seekbar bar */}
        <div className="w-full bg-foreground/10 h-[2px] rounded-full mt-1.5 overflow-hidden">
          <div
            className="bg-foreground h-full transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 3. Small Visualizer Wave (Only visible when expanded) */}
      <div
        className={cn(
          "flex items-end gap-[2px] h-3.5 shrink-0 pr-1 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <span
          className={cn(
            "w-[2px] bg-foreground/75 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.8s_infinite_ease-in-out_0.1s]" : "h-1"
          )}
          style={{ height: isPlaying ? undefined : "3px" }}
        />
        <span
          className={cn(
            "w-[2px] bg-foreground/75 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.6s_infinite_ease-in-out_0.2s]" : "h-2"
          )}
          style={{ height: isPlaying ? undefined : "6px" }}
        />
        <span
          className={cn(
            "w-[2px] bg-foreground/75 rounded-full transition-all duration-300",
            isPlaying ? "animate-[bounce_0.7s_infinite_ease-in-out_0.3s]" : "h-1.5"
          )}
          style={{ height: isPlaying ? undefined : "4px" }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
