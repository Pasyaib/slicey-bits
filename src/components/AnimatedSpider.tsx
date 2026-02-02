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
          <div className="relative flex flex-col items-center" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}>
            
            {/* Left legs - improved with joints */}
            <svg className="absolute -left-7 top-3 w-9 h-12" viewBox="0 0 36 48">
              <path d="M34 8 Q26 4, 16 2 Q8 1, 2 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-left-1 0.4s ease-in-out infinite" }} className="text-foreground" />
              <path d="M34 16 Q24 12, 14 11 Q6 10, 0 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-left-2 0.4s ease-in-out infinite 0.1s" }} className="text-foreground" />
              <path d="M34 24 Q24 24, 14 26 Q6 28, 0 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-left-3 0.4s ease-in-out infinite 0.2s" }} className="text-foreground" />
              <path d="M34 32 Q26 36, 16 40 Q8 44, 2 48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-left-4 0.4s ease-in-out infinite 0.3s" }} className="text-foreground" />
            </svg>

            {/* Right legs - improved with joints */}
            <svg className="absolute -right-7 top-3 w-9 h-12" viewBox="0 0 36 48">
              <path d="M2 8 Q10 4, 20 2 Q28 1, 34 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-right-1 0.4s ease-in-out infinite 0.05s" }} className="text-foreground" />
              <path d="M2 16 Q12 12, 22 11 Q30 10, 36 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-right-2 0.4s ease-in-out infinite 0.15s" }} className="text-foreground" />
              <path d="M2 24 Q12 24, 22 26 Q30 28, 36 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-right-3 0.4s ease-in-out infinite 0.25s" }} className="text-foreground" />
              <path d="M2 32 Q10 36, 20 40 Q28 44, 34 48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-right-4 0.4s ease-in-out infinite 0.35s" }} className="text-foreground" />
            </svg>

            {/* Pedipalps (small front appendages) */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              <div 
                className="w-1 h-3 bg-foreground rounded-full origin-bottom"
                style={{ 
                  transform: "rotate(-25deg)",
                  animation: "pedipalp-left 2s ease-in-out infinite"
                }} 
              />
              <div 
                className="w-1 h-3 bg-foreground rounded-full origin-bottom"
                style={{ 
                  transform: "rotate(25deg)",
                  animation: "pedipalp-right 2s ease-in-out infinite 0.3s"
                }} 
              />
            </div>

            {/* Head */}
            <div 
              className="w-9 h-8 bg-foreground rounded-full relative z-10"
              style={{ 
                background: "radial-gradient(ellipse at 30% 30%, hsl(var(--foreground) / 0.7), hsl(var(--foreground)))",
                animation: "spider-breathe 3s ease-in-out infinite"
              }}
            >
              {/* Big cute eyes */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                {/* Left eye */}
                <div 
                  className="w-3.5 h-3.5 bg-background rounded-full relative overflow-hidden transition-transform duration-75"
                  style={{ 
                    transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
                  }}
                >
                  <div 
                    className="absolute w-2 h-2 bg-foreground rounded-full transition-all duration-100"
                    style={{ 
                      left: `${3 + currentEyeOffset.x}px`, 
                      top: `${3 + currentEyeOffset.y}px`,
                      transform: isScared ? "scale(0.5)" : "scale(1)",
                    }}
                  >
                    <div className="absolute top-0 left-0.5 w-1 h-1 bg-background rounded-full opacity-90" />
                  </div>
                </div>
                {/* Right eye */}
                <div 
                  className="w-3.5 h-3.5 bg-background rounded-full relative overflow-hidden transition-transform duration-75"
                  style={{ 
                    transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
                  }}
                >
                  <div 
                    className="absolute w-2 h-2 bg-foreground rounded-full transition-all duration-100"
                    style={{ 
                      left: `${3 + currentEyeOffset.x}px`, 
                      top: `${3 + currentEyeOffset.y}px`,
                      transform: isScared ? "scale(0.5)" : "scale(1)",
                    }}
                  >
                    <div className="absolute top-0 left-0.5 w-1 h-1 bg-background rounded-full opacity-90" />
                  </div>
                </div>
              </div>
              
              {/* Eyebrows when scared */}
              {isScared && (
                <>
                  <div className="absolute top-0 left-1.5 w-2.5 h-0.5 bg-background rounded-full origin-right" 
                       style={{ transform: "rotate(-25deg)" }} />
                  <div className="absolute top-0 right-1.5 w-2.5 h-0.5 bg-background rounded-full origin-left" 
                       style={{ transform: "rotate(25deg)" }} />
                </>
              )}

              {/* Mouth */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                {isScared ? (
                  <div className="w-2.5 h-2.5 bg-background rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
                  </div>
                ) : (
                  <div 
                    className="w-3 h-1.5 bg-background/50 rounded-b-full" 
                    style={{ animation: "mouth-smile 4s ease-in-out infinite" }} 
                  />
                )}
              </div>

              {/* Chelicerae (fangs) */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                <div 
                  className="w-1 h-2 bg-background/90 rounded-b-full origin-top"
                  style={{ animation: "fang-wiggle 3s ease-in-out infinite" }}
                />
                <div 
                  className="w-1 h-2 bg-background/90 rounded-b-full origin-top"
                  style={{ animation: "fang-wiggle 3s ease-in-out infinite 0.2s" }}
                />
              </div>
            </div>
            
            {/* Body with breathing animation */}
            <div 
              className="w-11 h-10 bg-foreground rounded-full -mt-2 relative z-0"
              style={{ 
                background: "radial-gradient(ellipse at 40% 30%, hsl(var(--foreground) / 0.6), hsl(var(--foreground)))",
                animation: "spider-breathe 3s ease-in-out infinite 0.1s"
              }}
            >
              {/* Body pattern - hourglass */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
                <div className="w-2.5 h-1.5 bg-destructive/80 rounded-t-full" />
                <div className="w-1.5 h-1 bg-destructive/80 rounded-full" />
                <div className="w-2.5 h-1.5 bg-destructive/80 rounded-b-full" />
              </div>
              {/* Body shine */}
              <div className="absolute top-1 left-2 w-3 h-3 bg-background/15 rounded-full blur-sm" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-background/10 rounded-full" />
            </div>

            {/* Spinnerets (back segment) */}
            <div className="flex flex-col items-center -mt-1 z-0">
              <div 
                className="w-5 h-3 bg-foreground rounded-b-full"
                style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--foreground) / 0.8), hsl(var(--foreground)))" }}
              />
              <div className="flex gap-0.5 -mt-0.5">
                <div className="w-0.5 h-1 bg-foreground/60 rounded-b-full" />
                <div className="w-0.5 h-1.5 bg-foreground/60 rounded-b-full" />
                <div className="w-0.5 h-1 bg-foreground/60 rounded-b-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spider-swing {
          0%, 100% { transform: rotate(-4deg) translateX(-3px); }
          50% { transform: rotate(4deg) translateX(3px); }
        }
        @keyframes spider-shake {
          0%, 100% { transform: translateX(-3px) rotate(-8deg); }
          50% { transform: translateX(3px) rotate(8deg); }
        }
        @keyframes spider-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes spider-flee-crawl {
          0%, 100% { transform: rotate(-2deg) translateX(-1px); }
          50% { transform: rotate(2deg) translateX(1px); }
        }
        @keyframes web-shimmer {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(400%); opacity: 1; }
        }
        @keyframes pedipalp-left {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(-35deg) translateY(-1px); }
        }
        @keyframes pedipalp-right {
          0%, 100% { transform: rotate(25deg); }
          50% { transform: rotate(35deg) translateY(-1px); }
        }
        @keyframes fang-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes leg-crawl-left-1 {
          0%, 100% { d: path('M34 8 Q26 4, 16 2 Q8 1, 2 4'); }
          50% { d: path('M34 8 Q28 2, 18 0 Q10 -1, 4 2'); }
        }
        @keyframes leg-crawl-left-2 {
          0%, 100% { d: path('M34 16 Q24 12, 14 11 Q6 10, 0 14'); }
          50% { d: path('M34 16 Q26 10, 16 8 Q8 7, 2 10'); }
        }
        @keyframes leg-crawl-left-3 {
          0%, 100% { d: path('M34 24 Q24 24, 14 26 Q6 28, 0 34'); }
          50% { d: path('M34 24 Q26 26, 16 30 Q8 34, 2 40'); }
        }
        @keyframes leg-crawl-left-4 {
          0%, 100% { d: path('M34 32 Q26 36, 16 40 Q8 44, 2 48'); }
          50% { d: path('M34 32 Q28 38, 18 44 Q10 50, 4 54'); }
        }
        @keyframes leg-crawl-right-1 {
          0%, 100% { d: path('M2 8 Q10 4, 20 2 Q28 1, 34 4'); }
          50% { d: path('M2 8 Q8 2, 18 0 Q26 -1, 32 2'); }
        }
        @keyframes leg-crawl-right-2 {
          0%, 100% { d: path('M2 16 Q12 12, 22 11 Q30 10, 36 14'); }
          50% { d: path('M2 16 Q10 10, 20 8 Q28 7, 34 10'); }
        }
        @keyframes leg-crawl-right-3 {
          0%, 100% { d: path('M2 24 Q12 24, 22 26 Q30 28, 36 34'); }
          50% { d: path('M2 24 Q10 26, 20 30 Q28 34, 34 40'); }
        }
        @keyframes leg-crawl-right-4 {
          0%, 100% { d: path('M2 32 Q10 36, 20 40 Q28 44, 34 48'); }
          50% { d: path('M2 32 Q8 38, 18 44 Q26 50, 32 54'); }
        }
        @keyframes mouth-smile {
          0%, 40%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.2); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSpider;
