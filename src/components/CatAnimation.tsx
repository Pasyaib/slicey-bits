import { useState, useEffect, useCallback } from "react";

const CatAnimation = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 120 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 120 });
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState<"normal" | "happy" | "love">("normal");
  const [frame, setFrame] = useState(0);
  const [isLicking, setIsLicking] = useState(false);
  const [earTwitch, setEarTwitch] = useState(false);

  const getRandomPosition = useCallback(() => {
    const padding = 100;
    return {
      x: padding + Math.random() * (window.innerWidth - padding * 2 - 80),
      y: Math.max(window.innerHeight - 200, padding + Math.random() * (window.innerHeight - padding * 2 - 80)),
    };
  }, []);

  // Animation frame
  useEffect(() => {
    const frameInterval = setInterval(() => setFrame((f) => f + 1), 50);
    return () => clearInterval(frameInterval);
  }, []);

  // Initial appearance
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isSleeping && !isLicking) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 100);
      }
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, [isSleeping, isLicking]);

  // Ear twitch
  useEffect(() => {
    const earInterval = setInterval(() => {
      if (!isSleeping && Math.random() > 0.6) {
        setEarTwitch(true);
        setTimeout(() => setEarTwitch(false), 200);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(earInterval);
  }, [isSleeping]);

  // Random licking
  useEffect(() => {
    const lickInterval = setInterval(() => {
      if (!isSleeping && !isWalking && Math.random() > 0.8) {
        setIsLicking(true);
        setTimeout(() => setIsLicking(false), 1500);
      }
    }, 8000 + Math.random() * 5000);
    return () => clearInterval(lickInterval);
  }, [isSleeping, isWalking]);

  // Random wandering
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      if (!isSleeping && !isWalking && !isLicking && Math.random() > 0.5) {
        const newTarget = getRandomPosition();
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsWalking(true);
      }
    }, 6000 + Math.random() * 5000);
    return () => clearInterval(wanderInterval);
  }, [position, isSleeping, isWalking, isLicking, getRandomPosition]);

  // Sleep behavior
  useEffect(() => {
    const sleepInterval = setInterval(() => {
      if (Math.random() > 0.88 && !isWalking && !isLicking) {
        setIsSleeping(true);
        setTimeout(() => {
          setIsSleeping(false);
          setMood("happy");
          setTimeout(() => setMood("normal"), 2000);
        }, 6000 + Math.random() * 4000);
      }
    }, 18000);
    return () => clearInterval(sleepInterval);
  }, [isWalking, isLicking]);

  // Smooth movement
  useEffect(() => {
    if (!isWalking) return;
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 2) {
          setIsWalking(false);
          return prev;
        }
        const speed = 1.5;
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
        const catCenterX = position.x + 40;
        const catCenterY = position.y + 25;
        const angle = Math.atan2(e.clientY - catCenterY, e.clientX - catCenterX);
        setEyeOffset({
          x: Math.cos(angle) * 2,
          y: Math.sin(angle) * 1.5,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position, isSleeping]);

  // Click interaction
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const catArea = { x: position.x, y: position.y, width: 70, height: 70 };
      const clickedOnCat =
        e.clientX >= catArea.x &&
        e.clientX <= catArea.x + catArea.width &&
        e.clientY >= catArea.y &&
        e.clientY <= catArea.y + catArea.height;

      if (clickedOnCat) {
        setMood("love");
        setIsSleeping(false);
        setIsLicking(false);
        setTimeout(() => setMood("happy"), 1500);
        setTimeout(() => setMood("normal"), 3500);
      } else if (!isSleeping) {
        const newTarget = {
          x: Math.max(80, Math.min(e.clientX - 35, window.innerWidth - 100)),
          y: Math.max(80, Math.min(e.clientY - 35, window.innerHeight - 100)),
        };
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsWalking(true);
        setIsSleeping(false);
        setIsLicking(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [position, isSleeping]);

  if (!isVisible) return null;

  const walkCycle = Math.sin(frame * 0.4) * (isWalking ? 8 : 0);
  const tailWag = Math.sin(frame * 0.15) * (isSleeping ? 3 : isWalking ? 18 : 10);
  const breathe = Math.sin(frame * 0.08) * 1.5;
  const headBob = isWalking ? Math.sin(frame * 0.4) * 2 : 0;

  return (
    <div
      className="fixed z-50 pointer-events-none select-none transition-opacity duration-700"
      style={{ left: position.x, top: position.y, opacity: isVisible ? 1 : 0 }}
    >
      <div style={{ transform: `scaleX(${direction === "right" ? -1 : 1})` }}>
        <svg width="70" height="70" viewBox="0 0 120 120" style={{ overflow: "visible" }}>
          {/* Shadow */}
          <ellipse cx="55" cy="105" rx="25" ry="6" fill="currentColor" opacity="0.08" className="text-foreground" />

          {/* Tail */}
          <path
            d={`M 18 75 Q ${-5 + tailWag * 0.8} ${55 - Math.abs(tailWag) * 0.3}, ${-8 + tailWag} 35`}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-foreground"
          />

          {/* Back paw */}
          <ellipse
            cx="28"
            cy={95 - walkCycle * 0.3}
            rx="9"
            ry="8"
            className="fill-foreground"
            style={{ transform: `rotate(${walkCycle * 0.8}deg)`, transformOrigin: "28px 90px" }}
          />

          {/* Body */}
          <ellipse
            cx="50"
            cy={72 + breathe}
            rx="28"
            ry={20 + breathe * 0.5}
            className="fill-foreground"
          />

          {/* Front paws */}
          <ellipse
            cx="62"
            cy={95 + walkCycle * 0.5}
            rx="8"
            ry="9"
            className="fill-foreground"
            style={{ transform: `rotate(${-walkCycle}deg)`, transformOrigin: "62px 88px" }}
          />
          <ellipse
            cx="78"
            cy={95 - walkCycle * 0.5}
            rx="8"
            ry="9"
            className="fill-foreground"
            style={{ transform: `rotate(${walkCycle}deg)`, transformOrigin: "78px 88px" }}
          />

          {/* Chest fluff */}
          <ellipse cx="70" cy="68" rx="12" ry="10" className="fill-background" opacity="0.15" />

          {/* Neck */}
          <ellipse cx="75" cy="55" rx="15" ry="12" className="fill-foreground" />

          {/* Head */}
          <g style={{ transform: `translateY(${headBob}px)` }}>
            <ellipse cx="80" cy={38 + headBob} rx="26" ry="24" className="fill-foreground" />

            {/* Left ear */}
            <g style={{ transform: earTwitch ? "rotate(-8deg)" : "rotate(0deg)", transformOrigin: "62px 25px" }}>
              <polygon points="54,28 60,4 72,24" className="fill-foreground" />
              <polygon points="58,25 60,12 68,24" fill="#f9a8d4" opacity="0.7" />
            </g>

            {/* Right ear */}
            <g style={{ transform: earTwitch ? "rotate(8deg)" : "rotate(0deg)", transformOrigin: "98px 25px" }}>
              <polygon points="88,24 100,4 106,28" className="fill-foreground" />
              <polygon points="92,24 100,12 102,25" fill="#f9a8d4" opacity="0.7" />
            </g>

            {/* Face markings */}
            <ellipse cx="80" cy="50" rx="8" ry="6" className="fill-background" opacity="0.1" />

            {/* Eyes */}
            <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
              {/* Left eye */}
              <ellipse
                cx="68"
                cy="36"
                rx="7"
                ry={isBlinking || isSleeping ? 1.5 : mood === "happy" || mood === "love" ? 5 : 7}
                className="fill-background"
              />
              {!isBlinking && !isSleeping && (
                <>
                  <ellipse cx="68" cy="36" rx="4" ry={mood === "happy" || mood === "love" ? 3 : 4.5} fill="#3b3b3b" />
                  <circle cx="66" cy="34" r="1.5" className="fill-background" opacity="0.8" />
                </>
              )}

              {/* Right eye */}
              <ellipse
                cx="92"
                cy="36"
                rx="7"
                ry={isBlinking || isSleeping ? 1.5 : mood === "happy" || mood === "love" ? 5 : 7}
                className="fill-background"
              />
              {!isBlinking && !isSleeping && (
                <>
                  <ellipse cx="92" cy="36" rx="4" ry={mood === "happy" || mood === "love" ? 3 : 4.5} fill="#3b3b3b" />
                  <circle cx="90" cy="34" r="1.5" className="fill-background" opacity="0.8" />
                </>
              )}
            </g>

            {/* Nose */}
            <path d="M 77 48 L 80 52 L 83 48 Z" fill="#f472b6" />

            {/* Mouth / Tongue */}
            {isLicking ? (
              <g>
                <ellipse cx="80" cy="58" rx="4" ry="6" fill="#f9a8d4" />
                <path d="M 76 54 Q 80 52 84 54" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
              </g>
            ) : (
              <path
                d={mood === "love" ? "M 74 54 Q 80 60, 86 54" : mood === "happy" ? "M 75 54 Q 80 58, 85 54" : "M 77 54 L 80 56 L 83 54"}
                fill="none"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}

            {/* Whiskers */}
            <g stroke="#9ca3af" strokeWidth="1" opacity="0.5">
              <line x1="55" y1="44" x2="40" y2="40" />
              <line x1="55" y1="48" x2="38" y2="48" />
              <line x1="55" y1="52" x2="40" y2="56" />
              <line x1="105" y1="44" x2="120" y2="40" />
              <line x1="105" y1="48" x2="122" y2="48" />
              <line x1="105" y1="52" x2="120" y2="56" />
            </g>

            {/* Blush when happy/love */}
            {(mood === "happy" || mood === "love") && (
              <>
                <ellipse cx="60" cy="44" rx="5" ry="3" fill="#fda4af" opacity="0.4" />
                <ellipse cx="100" cy="44" rx="5" ry="3" fill="#fda4af" opacity="0.4" />
              </>
            )}
          </g>

          {/* Body stripes */}
          <g opacity="0.08" className="text-foreground">
            <path d="M 35 62 Q 40 72 35 82" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M 45 60 Q 50 72 45 84" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M 55 59 Q 60 72 55 85" fill="none" stroke="currentColor" strokeWidth="3" />
          </g>
        </svg>

        {/* Zzz */}
        {isSleeping && (
          <div className="absolute -top-1 right-1 font-mono text-muted-foreground text-sm">
            <span className="inline-block" style={{ animation: "float 1s ease-in-out infinite" }}>z</span>
            <span className="inline-block" style={{ animation: "float 1s ease-in-out infinite 0.2s" }}>z</span>
            <span className="inline-block" style={{ animation: "float 1s ease-in-out infinite 0.4s" }}>z</span>
          </div>
        )}

        {/* Hearts */}
        {mood === "love" && (
          <div className="absolute -top-4 right-0">
            <span className="inline-block text-pink-400 text-lg" style={{ animation: "heartFloat 0.8s ease-out forwards" }}>♥</span>
            <span className="inline-block text-pink-300 text-sm ml-1" style={{ animation: "heartFloat 0.8s ease-out 0.2s forwards" }}>♥</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes heartFloat {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CatAnimation;
