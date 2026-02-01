import { useState, useEffect } from "react";

const AnimatedSpider = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isScared, setIsScared] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const dropTimer = setTimeout(() => setIsDropped(true), 1500);
    
    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => {
      clearTimeout(dropTimer);
      clearInterval(blinkInterval);
    };
  }, []);

  const handleSpiderClick = () => {
    setIsScared(true);
    setTimeout(() => setIsScared(false), 2000);
  };

  return (
    <div className="fixed top-0 right-16 z-50 pointer-events-none">
      {/* Web thread */}
      <div 
        className="w-0.5 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/40 mx-auto origin-top transition-all duration-1000 ease-out"
        style={{
          height: isDropped ? (isScared ? "30px" : "200px") : "0px",
        }}
      />
      
      {/* Spider container */}
      <div 
        className="pointer-events-auto cursor-pointer transition-all"
        onClick={handleSpiderClick}
        style={{
          opacity: isDropped ? 1 : 0,
          transform: isScared ? "translateY(-170px)" : "translateY(0)",
          transition: isScared 
            ? "transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)" 
            : "transform 0.8s ease-out, opacity 0.5s",
        }}
      >
        <div 
          className="relative"
          style={{
            animation: isScared ? "spider-shake 0.1s infinite" : "spider-swing 4s ease-in-out infinite",
            transformOrigin: "top center",
          }}
        >
          {/* Spider body */}
          <div className="relative flex flex-col items-center">
            {/* Legs left */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-1" style={{ transform: "translateX(-20px)" }}>
                <div className="w-5 h-0.5 bg-foreground rounded-full origin-right" style={{ animation: "leg-wave-1 0.6s ease-in-out infinite", transform: "rotate(-20deg)" }} />
                <div className="w-6 h-0.5 bg-foreground rounded-full origin-right" style={{ animation: "leg-wave-2 0.6s ease-in-out infinite 0.1s", transform: "rotate(0deg)" }} />
                <div className="w-6 h-0.5 bg-foreground rounded-full origin-right" style={{ animation: "leg-wave-3 0.6s ease-in-out infinite 0.2s", transform: "rotate(10deg)" }} />
                <div className="w-5 h-0.5 bg-foreground rounded-full origin-right" style={{ animation: "leg-wave-4 0.6s ease-in-out infinite 0.3s", transform: "rotate(25deg)" }} />
              </div>
            </div>
            
            {/* Legs right */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-1" style={{ transform: "translateX(2px)" }}>
                <div className="w-5 h-0.5 bg-foreground rounded-full origin-left" style={{ animation: "leg-wave-1 0.6s ease-in-out infinite 0.15s", transform: "rotate(20deg)" }} />
                <div className="w-6 h-0.5 bg-foreground rounded-full origin-left" style={{ animation: "leg-wave-2 0.6s ease-in-out infinite 0.25s", transform: "rotate(0deg)" }} />
                <div className="w-6 h-0.5 bg-foreground rounded-full origin-left" style={{ animation: "leg-wave-3 0.6s ease-in-out infinite 0.35s", transform: "rotate(-10deg)" }} />
                <div className="w-5 h-0.5 bg-foreground rounded-full origin-left" style={{ animation: "leg-wave-4 0.6s ease-in-out infinite 0.45s", transform: "rotate(-25deg)" }} />
              </div>
            </div>

            {/* Head */}
            <div className="w-6 h-5 bg-foreground rounded-full relative z-10">
              {/* Eyes */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-1">
                <div 
                  className="w-2 h-2 bg-background rounded-full flex items-center justify-center transition-all"
                  style={{ transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)" }}
                >
                  <div className={`w-1 h-1 bg-foreground rounded-full ${isScared ? "animate-pulse" : ""}`} 
                       style={{ transform: isScared ? "scale(1.5)" : "scale(1)" }} />
                </div>
                <div 
                  className="w-2 h-2 bg-background rounded-full flex items-center justify-center transition-all"
                  style={{ transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)" }}
                >
                  <div className={`w-1 h-1 bg-foreground rounded-full ${isScared ? "animate-pulse" : ""}`}
                       style={{ transform: isScared ? "scale(1.5)" : "scale(1)" }} />
                </div>
              </div>
              {/* Cute mouth */}
              <div 
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 transition-all"
                style={{
                  width: isScared ? "4px" : "6px",
                  height: isScared ? "4px" : "2px",
                  backgroundColor: "var(--background)",
                  borderRadius: isScared ? "50%" : "0 0 50% 50%",
                }}
              />
            </div>
            
            {/* Body */}
            <div className="w-8 h-7 bg-foreground rounded-full -mt-1 relative z-0">
              {/* Body pattern */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-3 border-2 border-background/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spider-swing {
          0%, 100% { transform: rotate(-6deg) translateX(-2px); }
          50% { transform: rotate(6deg) translateX(2px); }
        }
        @keyframes spider-shake {
          0%, 100% { transform: translateX(-2px) rotate(-5deg); }
          50% { transform: translateX(2px) rotate(5deg); }
        }
        @keyframes leg-wave-1 {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(-35deg); }
        }
        @keyframes leg-wave-2 {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes leg-wave-3 {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes leg-wave-4 {
          0%, 100% { transform: rotate(25deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSpider;
