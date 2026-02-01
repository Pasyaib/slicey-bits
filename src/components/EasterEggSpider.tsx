import { useState } from "react";

const EasterEggSpider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 2) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setClickCount(0);
      }, 4000);
    }
  };

  return (
    <>
      {/* Secret trigger - the period after the name */}
      <span
        onClick={handleClick}
        className="cursor-default select-none"
        title=""
      >
        .
      </span>

      {/* Spider dropping down */}
      {isVisible && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
          {/* Web thread */}
          <div 
            className="w-px bg-muted-foreground/40 mx-auto origin-top"
            style={{
              animation: "thread-grow 0.8s ease-out forwards"
            }}
          />
          {/* Spider */}
          <div 
            className="flex flex-col items-center"
            style={{
              animation: "spider-drop 0.8s ease-out forwards, spider-swing 2s ease-in-out 0.8s infinite"
            }}
          >
            <span className="text-4xl">🕷️</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes thread-grow {
          0% { height: 0; }
          100% { height: 120px; }
        }
        @keyframes spider-drop {
          0% { 
            opacity: 0;
            transform: translateY(-20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spider-swing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </>
  );
};

export default EasterEggSpider;
