import { useEffect, useState } from "react";

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random incremental steps to feel like a diagnostic check
        const step = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + step, 100);
        return next;
      });
    }, 110); // Slower, rhythmic updates to align with terminal aesthetics

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  // Trigger brief glitch animation on every percentage change
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      setIsGlitching(true);
      const timeout = setTimeout(() => {
        setIsGlitching(false);
      }, 100); // Glitch duration: 100ms
      return () => clearTimeout(timeout);
    } else if (progress === 100) {
      setIsGlitching(true);
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
      }, 800);

      const finishTimeout = setTimeout(() => {
        onFinished();
      }, 1600);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, [progress, onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black transition-all ${
        isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        transitionDuration: "600ms",
        transitionTimingFunction: "cubic-bezier(0.85, 0, 0.15, 1)",
      }}
    >
      <style>{`
        @keyframes tick-glitch {
          0% { transform: none; text-shadow: none; }
          30% { transform: skew(8deg) translate(-2px, 1px); text-shadow: -2px 0 #39ff14, 2px 0 #ff0055; }
          60% { transform: skew(-8deg) translate(2px, -1px); text-shadow: 2px 0 #39ff14, -2px 0 #ff0055; }
          100% { transform: none; text-shadow: none; }
        }

        @keyframes final-glitch {
          0%, 100% { transform: none; text-shadow: -3px 0 #39ff14, 3px 0 #ff0055; }
          10% { transform: skew(15deg) translate(-5px, 2px) scale(1.05); text-shadow: -4px 1px #ff0055, 4px -1px #39ff14; opacity: 0.8; }
          20% { transform: skew(-15deg) translate(5px, -2px) scale(0.98); text-shadow: 4px -1px #ff0055, -4px 1px #39ff14; opacity: 0.9; }
          30% { transform: translate(-6px, -1px) scaleY(1.15); text-shadow: -5px 0 #ff0055, 5px 0 #39ff14; }
          40% { transform: skew(8deg) translate(5px, 3px) scale(1.02); text-shadow: 2px 2px #ff0055, -2px -2px #39ff14; }
          50% { transform: none; text-shadow: none; opacity: 1; }
          60% { transform: skew(-10deg) translate(-2px, -1px); text-shadow: -2px 1px #ff0055, 2px -1px #39ff14; }
          70% { transform: translate(4px, 1px) scaleX(1.1); text-shadow: 3px -1px #ff0055, -3px 1px #39ff14; }
          80% { transform: skew(12deg) translate(-3px, -2px); text-shadow: -2px 2px #ff0055, 2px -2px #39ff14; }
          90% { transform: none; text-shadow: none; }
        }

        @keyframes scanline-flicker {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.28; }
          70% { opacity: 0.12; }
          85% { opacity: 0.32; }
        }

        .mil-glitch-active {
          animation: tick-glitch 0.1s infinite linear;
        }

        .mil-glitch-final {
          animation: final-glitch 0.12s infinite linear;
        }

        .scanlines-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          z-index: 10;
          pointer-events: none;
          animation: scanline-flicker 0.15s infinite;
        }
      `}</style>

      {/* Terminal Grid Scanline Overlay */}
      <div className="scanlines-overlay" />

      {/* Semi-Military Monospaced Indicator */}
      <div className="relative z-20 flex justify-center items-center font-mono">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold select-none tabular-nums tracking-widest transition-colors duration-200 ${
            progress === 100
              ? "mil-glitch-final text-red-500"
              : isGlitching
              ? "mil-glitch-active text-[#39ff14]"
              : "text-emerald-400"
          }`}
        >
          [ {progress}% ]
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
