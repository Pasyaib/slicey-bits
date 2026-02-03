import { useState, useEffect } from "react";

const AnimatedSpider = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const dropTimer = setTimeout(() => setIsDropped(true), 800);
    
    // Occasional wave
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1200);
    }, 8000);

    // Eyes follow mouse
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.max(-3, Math.min(3, (e.clientX - window.innerWidth + 100) / 150));
      const y = Math.max(-2, Math.min(2, (e.clientY - 80) / 80));
      setEyeOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(dropTimer);
      clearInterval(waveInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 right-16 z-50 pointer-events-none">
      {/* Soft thread */}
      <div 
        className="relative mx-auto transition-all duration-[1200ms] ease-out"
        style={{ 
          height: isDropped ? (isHovered ? "60px" : "140px") : "0px",
        }}
      >
        <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/40 to-muted-foreground/50 left-1/2 -translate-x-1/2 rounded-full" />
      </div>
      
      {/* Spider blob */}
      <div 
        className="pointer-events-auto cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          opacity: isDropped ? 1 : 0,
          transform: isHovered ? "translateY(-80px) scale(1.1)" : "translateY(0) scale(1)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out",
        }}
      >
        <div 
          className="relative"
          style={{
            animation: isHovered ? "attio-bounce 0.6s ease-in-out infinite" : "attio-float 4s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute -inset-4 rounded-full opacity-0 transition-opacity duration-300"
            style={{ 
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
              opacity: isHovered ? 0.8 : 0,
            }} 
          />

          {/* Main body - soft blob shape */}
          <div className="relative flex flex-col items-center">
            
            {/* Cute little legs - simplified soft style */}
            <div className="absolute -left-4 top-6 flex flex-col gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={`left-${i}`}
                  className="h-1 bg-foreground/80 rounded-full origin-right"
                  style={{
                    width: isWaving && i === 0 ? "18px" : "14px",
                    transform: `rotate(${-15 + i * 15}deg)`,
                    animation: isWaving && i === 0 
                      ? "attio-wave 0.4s ease-in-out infinite" 
                      : `attio-leg-wiggle 2s ease-in-out infinite ${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            
            <div className="absolute -right-4 top-6 flex flex-col gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={`right-${i}`}
                  className="h-1 bg-foreground/80 rounded-full origin-left"
                  style={{
                    width: "14px",
                    transform: `rotate(${15 - i * 15}deg)`,
                    animation: `attio-leg-wiggle 2s ease-in-out infinite ${i * 0.15 + 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Body blob */}
            <div 
              className="w-12 h-11 rounded-[50%] relative overflow-hidden"
              style={{ 
                background: "linear-gradient(145deg, hsl(var(--foreground) / 0.85), hsl(var(--foreground)))",
                boxShadow: isHovered 
                  ? "0 8px 24px -4px hsl(var(--foreground) / 0.3), inset 0 -2px 8px hsl(var(--background) / 0.1)"
                  : "0 4px 12px -2px hsl(var(--foreground) / 0.2), inset 0 -2px 8px hsl(var(--background) / 0.1)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Shine */}
              <div 
                className="absolute top-1.5 left-2 w-3 h-2 rounded-full"
                style={{ background: "hsl(var(--background) / 0.25)" }}
              />
              
              {/* Eyes container */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1">
                {/* Left eye */}
                <div 
                  className="w-4 h-4 bg-background rounded-full relative overflow-hidden transition-transform duration-200"
                  style={{ 
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
                    boxShadow: "inset 0 2px 4px hsl(var(--foreground) / 0.1)",
                  }}
                >
                  <div 
                    className="absolute w-2.5 h-2.5 bg-foreground rounded-full transition-all duration-100"
                    style={{ 
                      left: `${4 + eyeOffset.x}px`, 
                      top: `${4 + eyeOffset.y}px`,
                    }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-background rounded-full" />
                  </div>
                </div>
                {/* Right eye */}
                <div 
                  className="w-4 h-4 bg-background rounded-full relative overflow-hidden transition-transform duration-200"
                  style={{ 
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
                    boxShadow: "inset 0 2px 4px hsl(var(--foreground) / 0.1)",
                  }}
                >
                  <div 
                    className="absolute w-2.5 h-2.5 bg-foreground rounded-full transition-all duration-100"
                    style={{ 
                      left: `${4 + eyeOffset.x}px`, 
                      top: `${4 + eyeOffset.y}px`,
                    }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-background rounded-full" />
                  </div>
                </div>
              </div>

              {/* Cheeks - appear on hover */}
              <div 
                className="absolute top-5 left-0.5 w-2 h-1.5 rounded-full transition-opacity duration-300"
                style={{ 
                  background: "hsl(var(--destructive) / 0.4)",
                  opacity: isHovered ? 1 : 0,
                }}
              />
              <div 
                className="absolute top-5 right-0.5 w-2 h-1.5 rounded-full transition-opacity duration-300"
                style={{ 
                  background: "hsl(var(--destructive) / 0.4)",
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Mouth */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                {isHovered ? (
                  <div 
                    className="w-3 h-2 bg-background/60 rounded-b-full"
                    style={{ animation: "attio-smile 0.3s ease-out forwards" }}
                  />
                ) : (
                  <div className="w-2 h-1 bg-background/40 rounded-full" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes attio-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes attio-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.02); }
        }
        @keyframes attio-leg-wiggle {
          0%, 100% { transform: rotate(var(--base-rotate, 0deg)); }
          50% { transform: rotate(calc(var(--base-rotate, 0deg) + 8deg)); }
        }
        @keyframes attio-wave {
          0%, 100% { transform: rotate(-45deg); }
          50% { transform: rotate(-70deg); }
        }
        @keyframes attio-smile {
          0% { transform: scaleY(0.5); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSpider;
