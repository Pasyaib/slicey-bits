import React, { useState } from "react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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
