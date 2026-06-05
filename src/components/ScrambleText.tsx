import React, { useState, useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p" | "a";
  speed?: number;
  scrambleOnMount?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?`-=[]\\;',./";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  as: Component = "span",
  speed = 30,
  scrambleOnMount = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const isScrambling = useRef(false);

  const startScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    let iteration = 0;

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        isScrambling.current = false;
      }

      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, scrambleOnMount]);

  return (
    <Component
      className={className}
      onMouseEnter={startScramble}
    >
      {displayText}
    </Component>
  );
};

export default ScrambleText;
