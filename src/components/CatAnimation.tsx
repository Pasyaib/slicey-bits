import { useState, useEffect, useCallback } from "react";

const CatAnimation = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 100 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isSitting, setIsSitting] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState<"normal" | "happy" | "curious">("normal");
  const [tailPhase, setTailPhase] = useState(0);

  const getRandomPosition = useCallback(() => {
    const padding = 80;
    return {
      x: padding + Math.random() * (window.innerWidth - padding * 2 - 60),
      y: padding + Math.random() * (window.innerHeight - padding * 2 - 60),
    };
  }, []);

  // Initial appearance
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Tail animation
  useEffect(() => {
    const tailInterval = setInterval(() => {
      setTailPhase((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(tailInterval);
  }, []);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isSleeping) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 120);
      }
    }, 2000 + Math.random() * 2500);
    return () => clearInterval(blinkInterval);
  }, [isSleeping]);

  // Random wandering
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      if (!isSleeping && !isWalking && Math.random() > 0.5) {
        const newTarget = getRandomPosition();
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsWalking(true);
        setIsSitting(false);
        setMood("curious");
      }
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(wanderInterval);
  }, [position, isSleeping, isWalking, getRandomPosition]);

  // Sleep behavior
  useEffect(() => {
    const sleepInterval = setInterval(() => {
      if (Math.random() > 0.85 && !isWalking && isSitting) {
        setIsSleeping(true);
        setMood("normal");
        setTimeout(() => {
          setIsSleeping(false);
          setMood("happy");
          setTimeout(() => setMood("normal"), 2000);
        }, 5000 + Math.random() * 4000);
      }
    }, 15000);
    return () => clearInterval(sleepInterval);
  }, [isWalking, isSitting]);

  // Smooth movement
  useEffect(() => {
    if (!isWalking) return;
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 3) {
          setIsWalking(false);
          setIsSitting(true);
          setMood("normal");
          return prev;
        }
        const speed = 1.8;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });
    }, 16);
    return () => clearInterval(moveInterval);
  }, [isWalking, targetPosition]);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSleeping) {
        const catCenterX = position.x + 25;
        const catCenterY = position.y + 15;
        const angle = Math.atan2(e.clientY - catCenterY, e.clientX - catCenterX);
        const distance = Math.min(
          Math.sqrt(Math.pow(e.clientX - catCenterX, 2) + Math.pow(e.clientY - catCenterY, 2)) / 100,
          1
        );
        setEyeOffset({
          x: Math.cos(angle) * 1.5 * distance,
          y: Math.sin(angle) * 1.5 * distance,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position, isSleeping]);

  // Click interaction
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const catArea = {
        x: position.x,
        y: position.y,
        width: 50,
        height: 50,
      };
      
      const clickedOnCat =
        e.clientX >= catArea.x &&
        e.clientX <= catArea.x + catArea.width &&
        e.clientY >= catArea.y &&
        e.clientY <= catArea.y + catArea.height;

      if (clickedOnCat) {
        setMood("happy");
        setIsSleeping(false);
        setTimeout(() => setMood("normal"), 3000);
      } else if (!isSleeping) {
        const newTarget = {
          x: Math.max(60, Math.min(e.clientX - 25, window.innerWidth - 80)),
          y: Math.max(60, Math.min(e.clientY - 25, window.innerHeight - 80)),
        };
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsWalking(true);
        setIsSitting(false);
        setIsSleeping(false);
        setMood("curious");
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [position, isSleeping]);

  if (!isVisible) return null;

  const tailRotation = Math.sin(tailPhase * 0.1) * (isSleeping ? 5 : isWalking ? 25 : 15);

  return (
    <div
      className="fixed z-50 pointer-events-none select-none"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          transform: `scaleX(${direction === "right" ? -1 : 1})`,
        }}
      >
        {/* Cat SVG */}
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          className={isWalking ? "" : ""}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          {/* Tail */}
          <path
            d={`M 20 65 Q ${5 + tailRotation} 50, ${10 + tailRotation * 0.5} 35`}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-foreground"
          />

          {/* Back leg */}
          <ellipse
            cx="30"
            cy="78"
            rx="8"
            ry="12"
            className="fill-foreground"
            style={{
              transform: isWalking ? `rotate(${Math.sin(tailPhase * 0.2) * 10}deg)` : "none",
              transformOrigin: "30px 70px",
            }}
          />

          {/* Body */}
          <ellipse cx="45" cy="60" rx="22" ry="18" className="fill-foreground" />

          {/* Front leg left */}
          <ellipse
            cx="55"
            cy="78"
            rx="6"
            ry="12"
            className="fill-foreground"
            style={{
              transform: isWalking ? `rotate(${Math.sin(tailPhase * 0.2 + Math.PI) * 12}deg)` : "none",
              transformOrigin: "55px 70px",
            }}
          />

          {/* Front leg right */}
          <ellipse
            cx="65"
            cy="78"
            rx="6"
            ry="12"
            className="fill-foreground"
            style={{
              transform: isWalking ? `rotate(${Math.sin(tailPhase * 0.2) * 12}deg)` : "none",
              transformOrigin: "65px 70px",
            }}
          />

          {/* Head */}
          <circle cx="70" cy="40" r="22" className="fill-foreground" />

          {/* Left ear */}
          <polygon points="52,25 58,8 66,22" className="fill-foreground" />
          <polygon points="55,23 58,14 63,22" className="fill-pink-300" />

          {/* Right ear */}
          <polygon points="78,22 86,8 92,25" className="fill-foreground" />
          <polygon points="81,22 86,14 89,23" className="fill-pink-300" />

          {/* Face */}
          <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
            {/* Left eye */}
            <ellipse
              cx="62"
              cy="38"
              rx={isSleeping ? 4 : 5}
              ry={isBlinking || isSleeping ? 1 : mood === "happy" ? 4 : 5}
              className="fill-background"
            />
            {!isBlinking && !isSleeping && (
              <circle cx="62" cy="38" r="2" className="fill-foreground" />
            )}

            {/* Right eye */}
            <ellipse
              cx="78"
              cy="38"
              rx={isSleeping ? 4 : 5}
              ry={isBlinking || isSleeping ? 1 : mood === "happy" ? 4 : 5}
              className="fill-background"
            />
            {!isBlinking && !isSleeping && (
              <circle cx="78" cy="38" r="2" className="fill-foreground" />
            )}
          </g>

          {/* Nose */}
          <ellipse cx="70" cy="48" rx="3" ry="2" className="fill-pink-400" />

          {/* Mouth */}
          <path
            d={mood === "happy" ? "M 65 52 Q 70 56, 75 52" : "M 67 52 L 70 54 L 73 52"}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-muted-foreground"
          />

          {/* Whiskers */}
          <g className="text-muted-foreground" opacity="0.5">
            <line x1="50" y1="45" x2="38" y2="42" stroke="currentColor" strokeWidth="1" />
            <line x1="50" y1="48" x2="36" y2="48" stroke="currentColor" strokeWidth="1" />
            <line x1="50" y1="51" x2="38" y2="54" stroke="currentColor" strokeWidth="1" />
            <line x1="90" y1="45" x2="102" y2="42" stroke="currentColor" strokeWidth="1" />
            <line x1="90" y1="48" x2="104" y2="48" stroke="currentColor" strokeWidth="1" />
            <line x1="90" y1="51" x2="102" y2="54" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* Stripes on body */}
          <path d="M 35 50 Q 40 55, 35 60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" className="text-foreground" />
          <path d="M 42 48 Q 47 55, 42 62" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" className="text-foreground" />
          <path d="M 49 47 Q 54 55, 49 63" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" className="text-foreground" />
        </svg>

        {/* Zzz when sleeping */}
        {isSleeping && (
          <div className="absolute -top-2 right-0 text-xs font-mono text-muted-foreground">
            <span className="inline-block animate-bounce" style={{ animationDuration: "1s" }}>z</span>
            <span className="inline-block animate-bounce" style={{ animationDuration: "1s", animationDelay: "0.15s" }}>z</span>
            <span className="inline-block animate-bounce" style={{ animationDuration: "1s", animationDelay: "0.3s" }}>z</span>
          </div>
        )}

        {/* Heart when happy */}
        {mood === "happy" && !isSleeping && (
          <div className="absolute -top-3 right-2 text-pink-400 animate-pulse">
            ♥
          </div>
        )}
      </div>
    </div>
  );
};

export default CatAnimation;
