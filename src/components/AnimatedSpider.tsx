import { useState, useEffect } from "react";

const AnimatedSpider = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isScared, setIsScared] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const dropTimer = setTimeout(() => setIsDropped(true), 1200);
    
    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 2500 + Math.random() * 2000);

    // Eyes follow mouse slightly
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.max(-2, Math.min(2, (e.clientX - window.innerWidth + 100) / 200));
      const y = Math.max(-1, Math.min(1, (e.clientY - 100) / 100));
      setEyeOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(dropTimer);
      clearInterval(blinkInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSpiderClick = () => {
    setIsScared(true);
    setTimeout(() => setIsScared(false), 2500);
  };

  return (
    <div className="fixed top-0 right-20 z-50 pointer-events-none">
      {/* Web thread with detail */}
      <div className="relative mx-auto transition-all duration-1000 ease-out"
           style={{ height: isDropped ? (isScared ? "40px" : "220px") : "0px" }}>
        <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-muted-foreground/50 to-muted-foreground/60 left-1/2 -translate-x-1/2" />
        {/* Web shine */}
        <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent left-1/2 -translate-x-1/2 ml-px" />
      </div>
      
      {/* Spider container */}
      <div 
        className="pointer-events-auto cursor-pointer"
        onClick={handleSpiderClick}
        style={{
          opacity: isDropped ? 1 : 0,
          transform: isScared ? "translateY(-180px)" : "translateY(0)",
          transition: isScared 
            ? "transform 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)" 
            : "transform 1s ease-out, opacity 0.5s",
        }}
      >
        <div 
          className="relative"
          style={{
            animation: isScared ? "spider-shake 0.08s infinite" : "spider-swing 3s ease-in-out infinite",
            transformOrigin: "top center",
          }}
        >
          <div className="relative flex flex-col items-center" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            
            {/* Left legs */}
            <svg className="absolute -left-6 top-4 w-8 h-10" viewBox="0 0 32 40" style={{ transform: "scaleX(-1)" }}>
              <path d="M30 8 Q20 5, 8 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-1 0.4s ease-in-out infinite" }} className="text-foreground" />
              <path d="M30 15 Q18 12, 4 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-2 0.4s ease-in-out infinite 0.1s" }} className="text-foreground" />
              <path d="M30 22 Q18 22, 4 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-3 0.4s ease-in-out infinite 0.2s" }} className="text-foreground" />
              <path d="M30 29 Q20 32, 8 38" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-4 0.4s ease-in-out infinite 0.3s" }} className="text-foreground" />
            </svg>

            {/* Right legs */}
            <svg className="absolute -right-6 top-4 w-8 h-10" viewBox="0 0 32 40">
              <path d="M2 8 Q12 5, 24 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-1 0.4s ease-in-out infinite 0.05s" }} className="text-foreground" />
              <path d="M2 15 Q14 12, 28 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-2 0.4s ease-in-out infinite 0.15s" }} className="text-foreground" />
              <path d="M2 22 Q14 22, 28 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-3 0.4s ease-in-out infinite 0.25s" }} className="text-foreground" />
              <path d="M2 29 Q12 32, 24 38" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{ animation: "leg-crawl-4 0.4s ease-in-out infinite 0.35s" }} className="text-foreground" />
            </svg>

            {/* Head */}
            <div className="w-8 h-7 bg-foreground rounded-full relative z-10"
                 style={{ 
                   background: "radial-gradient(ellipse at 30% 30%, hsl(var(--foreground) / 0.8), hsl(var(--foreground)))" 
                 }}>
              {/* Big cute eyes */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                {/* Left eye */}
                <div 
                  className="w-3 h-3 bg-background rounded-full relative overflow-hidden transition-transform duration-75"
                  style={{ transform: isBlinking ? "scaleY(0.15)" : "scaleY(1)" }}
                >
                  <div 
                    className="absolute w-2 h-2 bg-foreground rounded-full transition-all duration-150"
                    style={{ 
                      left: `${2 + eyeOffset.x}px`, 
                      top: `${2 + eyeOffset.y}px`,
                      transform: isScared ? "scale(0.6)" : "scale(1)",
                    }}
                  >
                    {/* Eye shine */}
                    <div className="absolute top-0 left-0.5 w-1 h-1 bg-background rounded-full opacity-80" />
                  </div>
                </div>
                {/* Right eye */}
                <div 
                  className="w-3 h-3 bg-background rounded-full relative overflow-hidden transition-transform duration-75"
                  style={{ transform: isBlinking ? "scaleY(0.15)" : "scaleY(1)" }}
                >
                  <div 
                    className="absolute w-2 h-2 bg-foreground rounded-full transition-all duration-150"
                    style={{ 
                      left: `${2 + eyeOffset.x}px`, 
                      top: `${2 + eyeOffset.y}px`,
                      transform: isScared ? "scale(0.6)" : "scale(1)",
                    }}
                  >
                    <div className="absolute top-0 left-0.5 w-1 h-1 bg-background rounded-full opacity-80" />
                  </div>
                </div>
              </div>
              
              {/* Eyebrows when scared */}
              {isScared && (
                <>
                  <div className="absolute -top-0.5 left-1 w-2 h-0.5 bg-background rounded-full" 
                       style={{ transform: "rotate(-20deg)" }} />
                  <div className="absolute -top-0.5 right-1 w-2 h-0.5 bg-background rounded-full" 
                       style={{ transform: "rotate(20deg)" }} />
                </>
              )}

              {/* Mouth */}
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
                {isScared ? (
                  <div className="w-2 h-2 bg-background rounded-full" />
                ) : (
                  <div className="w-2 h-1 bg-background/60 rounded-b-full" 
                       style={{ animation: "mouth-smile 3s ease-in-out infinite" }} />
                )}
              </div>

              {/* Fangs */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                <div className="w-0.5 h-1.5 bg-background/80 rounded-b-full" />
                <div className="w-0.5 h-1.5 bg-background/80 rounded-b-full" />
              </div>
            </div>
            
            {/* Body */}
            <div className="w-10 h-9 bg-foreground rounded-full -mt-2 relative z-0"
                 style={{ 
                   background: "radial-gradient(ellipse at 40% 30%, hsl(var(--foreground) / 0.7), hsl(var(--foreground)))" 
                 }}>
              {/* Body pattern - hourglass */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
                <div className="w-2 h-1 bg-destructive/70 rounded-t-full" />
                <div className="w-1 h-1 bg-destructive/70 rounded-full" />
                <div className="w-2 h-1 bg-destructive/70 rounded-b-full" />
              </div>
              {/* Shine */}
              <div className="absolute top-1 left-2 w-2 h-2 bg-background/10 rounded-full blur-sm" />
            </div>

            {/* Little butt segment */}
            <div className="w-4 h-2 bg-foreground rounded-b-full -mt-1 z-0" />
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
        @keyframes leg-crawl-1 {
          0%, 100% { d: path('M30 8 Q20 5, 8 2'); }
          50% { d: path('M30 8 Q22 3, 12 0'); }
        }
        @keyframes leg-crawl-2 {
          0%, 100% { d: path('M30 15 Q18 12, 4 10'); }
          50% { d: path('M30 15 Q20 10, 8 6'); }
        }
        @keyframes leg-crawl-3 {
          0%, 100% { d: path('M30 22 Q18 22, 4 24'); }
          50% { d: path('M30 22 Q20 24, 8 28'); }
        }
        @keyframes leg-crawl-4 {
          0%, 100% { d: path('M30 29 Q20 32, 8 38'); }
          50% { d: path('M30 29 Q22 34, 12 42'); }
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
