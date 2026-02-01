import { useState, useEffect } from "react";

const CatAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  useEffect(() => {
    // Show cat after a delay
    const showTimer = setTimeout(() => setIsVisible(true), 2000);
    
    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // Occasionally sleep
    const sleepInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsSleeping(true);
        setTimeout(() => setIsSleeping(false), 5000);
      }
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(blinkInterval);
      clearInterval(sleepInterval);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSleeping) {
        const catX = window.innerWidth - 80;
        const catY = window.innerHeight - 60;
        const angle = Math.atan2(e.clientY - catY, e.clientX - catX);
        setPosition({ 
          x: Math.cos(angle) * 3, 
          y: Math.sin(angle) * 3 
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isSleeping]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-4 right-20 z-40 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
      }}
    >
      {/* Cat Body */}
      <div className="relative">
        {/* Ears */}
        <div className="absolute -top-3 left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-foreground" />
        <div className="absolute -top-3 right-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-foreground" />
        
        {/* Head */}
        <div className="w-10 h-8 bg-foreground rounded-full relative">
          {/* Eyes */}
          <div 
            className="absolute top-2 left-2 flex gap-2"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            {/* Left Eye */}
            <div className={`w-2 h-2 bg-background rounded-full transition-all duration-100 ${isBlinking || isSleeping ? 'scale-y-[0.1]' : ''}`}>
              {!isBlinking && !isSleeping && (
                <div className="w-0.5 h-0.5 bg-foreground rounded-full mt-0.5 ml-0.5" />
              )}
            </div>
            {/* Right Eye */}
            <div className={`w-2 h-2 bg-background rounded-full transition-all duration-100 ${isBlinking || isSleeping ? 'scale-y-[0.1]' : ''}`}>
              {!isBlinking && !isSleeping && (
                <div className="w-0.5 h-0.5 bg-foreground rounded-full mt-0.5 ml-0.5" />
              )}
            </div>
          </div>
          
          {/* Nose */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-muted-foreground rounded-full" />
          
          {/* Whiskers */}
          <div className="absolute bottom-2 left-0 w-3 h-px bg-muted-foreground -rotate-12" />
          <div className="absolute bottom-2.5 left-0 w-3 h-px bg-muted-foreground" />
          <div className="absolute bottom-2 right-0 w-3 h-px bg-muted-foreground rotate-12" />
          <div className="absolute bottom-2.5 right-0 w-3 h-px bg-muted-foreground" />
        </div>

        {/* Tail */}
        <div 
          className="absolute -right-4 bottom-0 w-6 h-2 bg-foreground rounded-full origin-left"
          style={{
            animation: isSleeping ? 'none' : 'tail-wag 2s ease-in-out infinite',
          }}
        />

        {/* Zzz when sleeping */}
        {isSleeping && (
          <div className="absolute -top-6 -right-2 text-xs text-muted-foreground animate-pulse font-mono">
            zzz
          </div>
        )}
      </div>

      <style>{`
        @keyframes tail-wag {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default CatAnimation;
