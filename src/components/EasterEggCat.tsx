import { useState } from "react";
import { Cat } from "lucide-react";

const EasterEggCat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 2) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setClickCount(0);
      }, 3000);
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

      {/* Cat popup */}
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-lg flex flex-col items-center gap-2">
            <Cat className="w-12 h-12 text-foreground animate-[bounce_1s_ease-in-out_infinite]" />
            <span className="text-xs text-muted-foreground font-mono">meow! 🐱</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEggCat;
