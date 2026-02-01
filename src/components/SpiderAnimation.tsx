import { useState, useEffect, useCallback } from "react";

const SpiderAnimation = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 50 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth - 100, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [frame, setFrame] = useState(0);
  const [isHanging, setIsHanging] = useState(true);
  const [ropeLength, setRopeLength] = useState(0);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const getRandomPosition = useCallback(() => {
    return {
      x: 80 + Math.random() * (window.innerWidth - 160),
      y: 30 + Math.random() * (window.innerHeight - 200),
    };
  }, []);

  // Animation frame
  useEffect(() => {
    const frameInterval = setInterval(() => setFrame((f) => f + 1), 40);
    return () => clearInterval(frameInterval);
  }, []);

  // Initial appearance with rope descending
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate rope descending
      const ropeInterval = setInterval(() => {
        setRopeLength((prev) => {
          if (prev >= 80) {
            clearInterval(ropeInterval);
            return 80;
          }
          return prev + 2;
        });
      }, 20);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 100);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Random movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isMoving && Math.random() > 0.5) {
        const newTarget = getRandomPosition();
        setTargetPosition(newTarget);
        setDirection(newTarget.x < position.x ? "left" : "right");
        setIsMoving(true);
        setIsHanging(false);
      }
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(moveInterval);
  }, [position, isMoving, getRandomPosition]);

  // Smooth movement
  useEffect(() => {
    if (!isMoving) return;
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 3) {
          setIsMoving(false);
          // Sometimes hang from new position
          if (Math.random() > 0.5) {
            setIsHanging(true);
            setRopeLength(0);
            const ropeInterval = setInterval(() => {
              setRopeLength((prev) => {
                if (prev >= 60 + Math.random() * 40) {
                  clearInterval(ropeInterval);
                  return prev;
                }
                return prev + 2;
              });
            }, 20);
          }
          return prev;
        }
        const speed = 2.5;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });
    }, 16);
    return () => clearInterval(moveInterval);
  }, [isMoving, targetPosition]);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const spiderY = isHanging ? position.y + ropeLength : position.y;
      const angle = Math.atan2(e.clientY - spiderY - 20, e.clientX - position.x - 20);
      setEyeOffset({
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position, ropeLength, isHanging]);

  // Click to move
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newTarget = {
        x: Math.max(60, Math.min(e.clientX - 20, window.innerWidth - 80)),
        y: Math.max(30, Math.min(e.clientY - 20, window.innerHeight - 100)),
      };
      setTargetPosition(newTarget);
      setDirection(newTarget.x < position.x ? "left" : "right");
      setIsMoving(true);
      setIsHanging(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [position]);

  if (!isVisible) return null;

  const legWave = Math.sin(frame * 0.5) * (isMoving ? 15 : 5);
  const bodyBob = Math.sin(frame * 0.15) * 2;
  const spiderY = isHanging ? ropeLength : 0;

  return (
    <div
      className="fixed z-50 pointer-events-none select-none transition-opacity duration-500"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Web thread */}
      {isHanging && (
        <line
          x1="20"
          y1="0"
          x2="20"
          y2={ropeLength}
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground"
          style={{
            position: "absolute",
            top: 0,
            left: 20,
            height: ropeLength,
            width: 1,
            background: "currentColor",
            opacity: 0.4,
          }}
        />
      )}
      
      <div
        style={{
          transform: `translateY(${spiderY}px) scaleX(${direction === "right" ? -1 : 1})`,
        }}
      >
        <svg width="50" height="50" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
          {/* Web thread (SVG) */}
          {isHanging && (
            <line x1="50" y1={-ropeLength} x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" opacity="0.5" />
          )}

          {/* Back legs */}
          <g className="text-foreground">
            {/* Left back legs */}
            <path
              d={`M 35 50 Q 15 ${40 + legWave}, -5 ${25 + legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 38 55 Q 12 ${55 - legWave}, -10 ${50 - legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 38 60 Q 15 ${70 + legWave}, -5 ${80 + legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 35 65 Q 20 ${80 - legWave}, 0 ${95 - legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Right back legs */}
            <path
              d={`M 65 50 Q 85 ${40 - legWave}, 105 ${25 - legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 62 55 Q 88 ${55 + legWave}, 110 ${50 + legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 62 60 Q 85 ${70 - legWave}, 105 ${80 - legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M 65 65 Q 80 ${80 + legWave}, 100 ${95 + legWave * 0.5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Abdomen */}
          <ellipse
            cx="50"
            cy={65 + bodyBob}
            rx="20"
            ry="18"
            className="fill-foreground"
          />
          
          {/* Abdomen pattern */}
          <ellipse cx="50" cy={60 + bodyBob} rx="8" ry="6" className="fill-background" opacity="0.1" />
          <ellipse cx="50" cy={70 + bodyBob} rx="6" ry="4" className="fill-background" opacity="0.1" />

          {/* Cephalothorax (head) */}
          <ellipse
            cx="50"
            cy={40 + bodyBob}
            rx="18"
            ry="16"
            className="fill-foreground"
          />

          {/* Eyes */}
          <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y + bodyBob}px)` }}>
            {/* Main eyes (big) */}
            <circle
              cx="42"
              cy="38"
              r={isBlinking ? 2 : 6}
              className="fill-background"
            />
            {!isBlinking && (
              <>
                <circle cx="42" cy="38" r="3" fill="#2d2d2d" />
                <circle cx="40" cy="36" r="1.5" className="fill-background" opacity="0.8" />
              </>
            )}
            
            <circle
              cx="58"
              cy="38"
              r={isBlinking ? 2 : 6}
              className="fill-background"
            />
            {!isBlinking && (
              <>
                <circle cx="58" cy="38" r="3" fill="#2d2d2d" />
                <circle cx="56" cy="36" r="1.5" className="fill-background" opacity="0.8" />
              </>
            )}

            {/* Secondary eyes (small) */}
            <circle cx="36" cy="32" r={isBlinking ? 1 : 3} className="fill-background" />
            {!isBlinking && <circle cx="36" cy="32" r="1.5" fill="#2d2d2d" />}
            
            <circle cx="64" cy="32" r={isBlinking ? 1 : 3} className="fill-background" />
            {!isBlinking && <circle cx="64" cy="32" r="1.5" fill="#2d2d2d" />}

            {/* Tiny top eyes */}
            <circle cx="44" cy="28" r="2" className="fill-background" />
            <circle cx="56" cy="28" r="2" className="fill-background" />
          </g>

          {/* Fangs */}
          <path d="M 45 48 L 43 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground" />
          <path d="M 55 48 L 57 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground" />

          {/* Pedipalps */}
          <ellipse cx="40" cy="50" rx="4" ry="3" className="fill-foreground" />
          <ellipse cx="60" cy="50" rx="4" ry="3" className="fill-foreground" />
        </svg>
      </div>
    </div>
  );
};

export default SpiderAnimation;
