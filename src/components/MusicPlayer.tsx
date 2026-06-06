import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(
      "https://helenamp3mcr23231-dpmrmdke9v20.edgeone.app/mazzacky_my-chemical-romance-helena.mp3"
    );
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback blocked by browser auto-play policy:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className={cn(
        "fixed bottom-8 right-8 z-40 font-mono text-xs uppercase tracking-widest transition-colors duration-300",
        "text-foreground/75 hover:text-foreground active:scale-98"
      )}
      title={isPlaying ? "Mute" : "Unmute"}
    >
      [ SOUND // {isPlaying ? "ON" : "OFF"} ]
    </button>
  );
};

export default MusicPlayer;
