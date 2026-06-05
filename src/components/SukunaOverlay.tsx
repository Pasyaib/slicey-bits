import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const SukunaOverlay = () => {
    const { theme } = useTheme();
    const [isExpanding, setIsExpanding] = useState(false);

    useEffect(() => {
        if (theme === "sukuna") {
            setIsExpanding(true);
            const timer = setTimeout(() => setIsExpanding(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [theme]);

    if (theme !== "sukuna") return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
            {/* Domain Expansion Ripple */}
            {isExpanding && <div className="domain-expansion-ripple" />}

            {/* Tattoo Patterns Background */}
            <div className="absolute inset-0 sukuna-bg-pattern opacity-20" />

            {/* Floating Red Glows / "Cursed Energy" */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Sharp "Cleave" Slashes (Randomly appears) */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[200%] h-[2px] bg-primary/40"
                    style={{
                        top: '30%',
                        left: '-50%',
                        transform: 'rotate(-45deg)',
                        animation: 'cleave-slash 3s infinite linear'
                    }}
                />
                <div className="absolute w-[200%] h-[2px] bg-primary/40"
                    style={{
                        top: '70%',
                        left: '-50%',
                        transform: 'rotate(-45deg)',
                        animation: 'cleave-slash 3s infinite linear',
                        animationDelay: '1.5s'
                    }}
                />
            </div>

            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-60" />
        </div>
    );
};

export default SukunaOverlay;
