import { useState, useEffect, useRef } from "react";

const AnimatedSpider = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isScared, setIsScared] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isLookingAround, setIsLookingAround] = useState(false);
  const [isFleeing, setIsFleeing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [randomLook, setRandomLook] = useState({ x: 0, y: 0 });
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const dropTimer = setTimeout(() => setIsDropped(true), 1200);
    
    // Random blinking - sometimes double blink
    const blinkInterval = setInterval(() => {
      if (isFleeing || isHidden) return;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 100);
      // 30% chance of double blink
      if (Math.random() < 0.3) {
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 100);
        }, 200);
      }
    }, 2000 + Math.random() * 3000);

    // Random looking around when mouse isn't moving
    const lookInterval = setInterval(() => {
      if (isFleeing || isHidden) return;
      if (Math.random() < 0.4) {
        setIsLookingAround(true);
        setRandomLook({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 2
        });
        setTimeout(() => {
          setIsLookingAround(false);
          setRandomLook({ x: 0, y: 0 });
        }, 800 + Math.random() * 400);
      }
    }, 3000 + Math.random() * 2000);

    // Eyes follow mouse
    const handleMouseMove = (e: MouseEvent) => {
      if (isFleeing || isHidden) return;
      const x = Math.max(-2, Math.min(2, (e.clientX - window.innerWidth + 100) / 200));
      const y = Math.max(-1.5, Math.min(1.5, (e.clientY - 100) / 80));
      setEyeOffset({ x, y });
      setIsLookingAround(false);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(dropTimer);
      clearInterval(blinkInterval);
      clearInterval(lookInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFleeing, isHidden]);

  const handleSpiderClick = () => {
    if (isFleeing || isHidden) return;
    setIsScared(true);
    setTimeout(() => setIsScared(false), 2500);
  };

  const handleMouseEnter = () => {
    if (isFleeing || isHidden) return;
    // Start timer - if hovered for 2 seconds, spider flees
    hoverTimerRef.current = setTimeout(() => {
      setIsFleeing(true);
      // After fleeing animation, hide completely
      setTimeout(() => {
        setIsHidden(true);
        setIsFleeing(false);
        // Come back after 5 seconds
        setTimeout(() => {
          setIsHidden(false);
        }, 5000);
      }, 800);
    }, 2000);
  };

  const handleMouseLeave = () => {
    // Cancel flee timer if mouse leaves before 2 seconds
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const currentEyeOffset = isLookingAround ? randomLook : eyeOffset;

  // Calculate position based on state
  const getSpiderTransform = () => {
    if (isHidden) return "translateX(150px) translateY(-100px)";
    if (isFleeing) return "translateX(120px) translateY(-80px) rotate(45deg)";
    if (isScared) return "translateY(-180px)";
    return "translateY(0)";
  };

  return (
    <div className="fixed top-0 right-20 z-50 pointer-events-none">
      {/* Web thread with detail */}
      <div className="relative mx-auto transition-all duration-700 ease-out"
           style={{ 
             height: isDropped ? (isScared || isFleeing || isHidden ? "40px" : "220px") : "0px",
             transform: isFleeing || isHidden ? "translateX(60px)" : "translateX(0)",
           }}>
        <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-muted-foreground/50 to-muted-foreground/60 left-1/2 -translate-x-1/2" />
        {/* Diagonal web line when fleeing */}
        {(isFleeing || isHidden) && (
          <div 
            className="absolute top-0 left-1/2 w-px bg-gradient-to-br from-muted-foreground/60 to-transparent origin-top"
            style={{ 
              height: "150px",
              transform: "rotate(45deg) translateX(-50%)",
            }}
          />
        )}
        {/* Web shine - animated shimmer */}
        <div className="absolute inset-0 w-px left-1/2 -translate-x-1/2 ml-px overflow-hidden">
          <div 
            className="w-full h-8 bg-gradient-to-b from-transparent via-white/40 to-transparent"
            style={{ animation: "web-shimmer 3s ease-in-out infinite" }}
          />
        </div>
      </div>
      
      {/* Spider container */}
      <div 
        className="pointer-events-auto cursor-pointer"
        onClick={handleSpiderClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: isDropped ? (isHidden ? 0 : 1) : 0,
          transform: getSpiderTransform(),
          transition: isFleeing 
            ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s"
            : isScared 
              ? "transform 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)" 
              : "transform 1s ease-out, opacity 0.5s",
        }}
      >
        <div 
          className="relative"
          style={{
            animation: isFleeing 
              ? "spider-flee-crawl 0.15s ease-in-out infinite" 
              : isScared 
                ? "spider-shake 0.08s infinite" 
                : "spider-swing 3s ease-in-out infinite",
            transformOrigin: "top center",
          }}
        >
          <div className="relative flex flex-col items-center">
            
            {/* Simple stick legs - left */}
            <div className="absolute -left-5 top-2 flex flex-col gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={`left-${i}`}
                  className="w-5 h-0.5 bg-foreground rounded-full origin-right"
                  style={{ 
                    transform: `rotate(${-30 + i * 20}deg)`,
                    animation: `leg-wiggle 0.3s ease-in-out infinite ${i * 0.08}s`
                  }}
                />
              ))}
            </div>

            {/* Simple stick legs - right */}
            <div className="absolute -right-5 top-2 flex flex-col gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={`right-${i}`}
                  className="w-5 h-0.5 bg-foreground rounded-full origin-left"
                  style={{ 
                    transform: `rotate(${30 - i * 20}deg)`,
                    animation: `leg-wiggle 0.3s ease-in-out infinite ${i * 0.08 + 0.04}s`
                  }}
                />
              ))}
            </div>

            {/* Simple round body */}
            <div 
              className="w-8 h-8 bg-foreground rounded-full relative z-10"
              style={{ animation: "spider-bounce 2s ease-in-out infinite" }}
            >
              {/* HUGE googly eyes - the funny part */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                {/* Left eye */}
                <div 
                  className="w-5 h-5 bg-background rounded-full relative overflow-hidden border-2 border-foreground"
                  style={{ transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)" }}
                >
                  <div 
                    className="absolute w-3 h-3 bg-foreground rounded-full transition-all duration-75"
                    style={{ 
                      left: `${4 + currentEyeOffset.x * 1.5}px`, 
                      top: `${6 + currentEyeOffset.y * 2}px`,
                      transform: isScared ? "scale(0.6)" : "scale(1)",
                    }}
                  />
                </div>
                {/* Right eye */}
                <div 
                  className="w-5 h-5 bg-background rounded-full relative overflow-hidden border-2 border-foreground"
                  style={{ transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)" }}
                >
                  <div 
                    className="absolute w-3 h-3 bg-foreground rounded-full transition-all duration-75"
                    style={{ 
                      left: `${4 + currentEyeOffset.x * 1.5}px`, 
                      top: `${6 + currentEyeOffset.y * 2}px`,
                      transform: isScared ? "scale(0.6)" : "scale(1)",
                    }}
                  />
                </div>
              </div>

              {/* Worried eyebrows when scared */}
              {isScared && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-3">
                  <div className="w-3 h-1 bg-foreground rounded-full" style={{ transform: "rotate(-20deg)" }} />
                  <div className="w-3 h-1 bg-foreground rounded-full" style={{ transform: "rotate(20deg)" }} />
                </div>
              )}

              {/* Simple mouth */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                {isScared ? (
                  <div className="w-2 h-2 bg-background rounded-full" />
                ) : (
                  <div className="w-3 h-1 bg-background rounded-full" />
                )}
              </div>
            </div>
            
            {/* Tiny butt */}
            <div className="w-5 h-4 bg-foreground rounded-full -mt-2 z-0" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spider-swing {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes spider-shake {
          0%, 100% { transform: translateX(-4px) rotate(-10deg); }
          50% { transform: translateX(4px) rotate(10deg); }
        }
        @keyframes spider-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08) translateY(-1px); }
        }
        @keyframes spider-flee-crawl {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes web-shimmer {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(400%); opacity: 1; }
        }
        @keyframes leg-wiggle {
          0%, 100% { transform: rotate(var(--base-rotation, 0deg)); }
          50% { transform: rotate(calc(var(--base-rotation, 0deg) + 8deg)); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSpider;
