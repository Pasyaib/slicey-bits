import { useState, useEffect, useCallback } from "react";

const CatAnimation = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 80 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 80 });
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Generate random position within viewport
  const getRandomPosition = useCallback(() => {
    const padding = 60;
    return {
      x: padding + Math.random() * (window.innerWidth - padding * 2 - 40),
      y: padding + Math.random() * (window.innerHeight - padding * 2 - 40),
    };
  }, []);

  // Initial appearance
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isSleeping) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [isSleeping]);

  // Random wandering
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      if (!isSleeping && Math.random() > 0.4) {
        const newTarget = getRandomPosition();
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsWalking(true);
      }
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(wanderInterval);
  }, [position, isSleeping, getRandomPosition]);

  // Occasionally sleep
  useEffect(() => {
    const sleepInterval = setInterval(() => {
      if (Math.random() > 0.8 && !isWalking) {
        setIsSleeping(true);
        setTimeout(() => setIsSleeping(false), 4000 + Math.random() * 3000);
      }
    }, 12000);

    return () => clearInterval(sleepInterval);
  }, [isWalking]);

  // Smooth movement towards target
  useEffect(() => {
    if (!isWalking) return;

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
          setIsWalking(false);
          return prev;
        }

        const speed = 2;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [isWalking, targetPosition]);

  // Eye tracking mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSleeping) {
        const angle = Math.atan2(e.clientY - position.y, e.clientX - position.x);
        setEyeOffset({
          x: Math.cos(angle) * 2,
          y: Math.sin(angle) * 2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position, isSleeping]);

  // Click to make cat come to cursor
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isSleeping) {
        const newTarget = {
          x: Math.max(40, Math.min(e.clientX - 20, window.innerWidth - 60)),
          y: Math.max(40, Math.min(e.clientY - 20, window.innerHeight - 60)),
        };
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsWalking(true);
        setIsSleeping(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [position, isSleeping]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transition-opacity duration-500"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        transform: `scaleX(${direction === "left" ? 1 : -1})`,
      }}
    >
      {/* Cat Container */}
      <div className={`relative ${isWalking ? "animate-bounce" : ""}`} style={{ animationDuration: "0.3s" }}>
        {/* Ears */}
        <div className="absolute -top-2.5 left-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-foreground" />
        <div className="absolute -top-2.5 right-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-foreground" />
        
        {/* Inner Ears */}
        <div className="absolute -top-1.5 left-2.5 w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[4px] border-b-pink-300" />
        <div className="absolute -top-1.5 right-2.5 w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[4px] border-b-pink-300" />

        {/* Head */}
        <div className="w-10 h-8 bg-foreground rounded-[50%] relative">
          {/* Eyes Container */}
          <div
            className="absolute top-2 left-2 flex gap-3"
            style={{
              transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            }}
          >
            {/* Left Eye */}
            <div
              className={`w-2.5 h-2.5 bg-background rounded-full transition-all duration-100 flex items-center justify-center ${
                isBlinking || isSleeping ? "scale-y-[0.15]" : ""
              }`}
            >
              {!isBlinking && !isSleeping && (
                <div className="w-1 h-1 bg-foreground rounded-full" />
              )}
            </div>
            {/* Right Eye */}
            <div
              className={`w-2.5 h-2.5 bg-background rounded-full transition-all duration-100 flex items-center justify-center ${
                isBlinking || isSleeping ? "scale-y-[0.15]" : ""
              }`}
            >
              {!isBlinking && !isSleeping && (
                <div className="w-1 h-1 bg-foreground rounded-full" />
              )}
            </div>
          </div>

          {/* Nose */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-pink-400 rounded-full" />

          {/* Mouth */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1.5 h-1 border-b border-muted-foreground rounded-full" />
            <div className="w-1.5 h-1 border-b border-muted-foreground rounded-full" />
          </div>

          {/* Whiskers */}
          <div className="absolute bottom-2.5 -left-2 w-3 h-px bg-muted-foreground -rotate-6 opacity-60" />
          <div className="absolute bottom-3 -left-2 w-3 h-px bg-muted-foreground opacity-60" />
          <div className="absolute bottom-3.5 -left-2 w-3 h-px bg-muted-foreground rotate-6 opacity-60" />
          <div className="absolute bottom-2.5 -right-2 w-3 h-px bg-muted-foreground rotate-6 opacity-60" />
          <div className="absolute bottom-3 -right-2 w-3 h-px bg-muted-foreground opacity-60" />
          <div className="absolute bottom-3.5 -right-2 w-3 h-px bg-muted-foreground -rotate-6 opacity-60" />
        </div>

        {/* Body */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-5 bg-foreground rounded-[50%]" />

        {/* Front Legs */}
        <div
          className="absolute top-9 left-1 w-1.5 h-3 bg-foreground rounded-full origin-top"
          style={{
            animation: isWalking ? "leg-walk 0.3s ease-in-out infinite" : "none",
          }}
        />
        <div
          className="absolute top-9 right-1 w-1.5 h-3 bg-foreground rounded-full origin-top"
          style={{
            animation: isWalking ? "leg-walk 0.3s ease-in-out infinite reverse" : "none",
          }}
        />

        {/* Tail */}
        <div
          className="absolute top-7 -right-4 w-5 h-1.5 bg-foreground rounded-full origin-left"
          style={{
            animation: isSleeping
              ? "none"
              : isWalking
              ? "tail-wag-fast 0.2s ease-in-out infinite"
              : "tail-wag 2s ease-in-out infinite",
          }}
        />

        {/* Zzz when sleeping */}
        {isSleeping && (
          <div className="absolute -top-6 -right-1 text-[10px] text-muted-foreground font-mono">
            <span className="animate-pulse">z</span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>z</span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>z</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes tail-wag {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes tail-wag-fast {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes leg-walk {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  );
};

export default CatAnimation;
