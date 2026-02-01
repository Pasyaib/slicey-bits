import { useState, useEffect } from "react";

const AnimatedSpider = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isScared, setIsScared] = useState(false);

  useEffect(() => {
    // Spider drops down after a short delay
    const dropTimer = setTimeout(() => setIsDropped(true), 1500);
    return () => clearTimeout(dropTimer);
  }, []);

  const handleSpiderClick = () => {
    setIsScared(true);
    // Spider runs back up when clicked
    setTimeout(() => {
      setIsScared(false);
    }, 2000);
  };

  return (
    <div className="fixed top-0 right-12 z-50 pointer-events-none">
      {/* Web thread */}
      <div 
        className="w-px bg-muted-foreground/30 mx-auto origin-top transition-all duration-1000 ease-out"
        style={{
          height: isDropped ? (isScared ? "20px" : "180px") : "0px",
        }}
      />
      
      {/* Spider */}
      <div 
        className="pointer-events-auto cursor-pointer transition-all duration-500"
        onClick={handleSpiderClick}
        style={{
          opacity: isDropped ? 1 : 0,
          transform: isScared ? "translateY(-160px) rotate(720deg)" : "translateY(0)",
          transition: isScared 
            ? "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s" 
            : "transform 0.5s ease-out, opacity 0.5s",
        }}
      >
        <div 
          className="text-3xl select-none"
          style={{
            animation: isScared 
              ? "none" 
              : "spider-swing 3s ease-in-out infinite, spider-wiggle 0.5s ease-in-out infinite",
            transformOrigin: "top center",
          }}
        >
          🕷️
        </div>
      </div>

      <style>{`
        @keyframes spider-swing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes spider-wiggle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSpider;
