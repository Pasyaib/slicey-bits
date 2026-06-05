import { Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "./theme-provider";
import { Button } from "@/components/ui/button";

// A minimal Web Audio API generator to play TV Static/Glitch noise programmatically
const playGlitchSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const context = new AudioContext();
        const duration = 0.6; // Matches the CSS animation duration perfectly
        const bufferSize = context.sampleRate * duration;

        // Create an empty buffer
        const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const data = buffer.getChannelData(0);

        // Fill the buffer with white noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        // Create a buffer source
        const noise = context.createBufferSource();
        noise.buffer = buffer;

        // Filter the noise to sound more like a deep TV static/electrical glitch rather than pure high-pitch hiss
        const bandpass = context.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 1000;

        // Create an envelope to fade out the glitch suddenly (like a TV snapping back)
        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(0.3, context.currentTime); // Low volume so it isn't deafening!
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

        noise.connect(bandpass);
        bandpass.connect(gainNode);
        gainNode.connect(context.destination);

        noise.start();
    } catch (e) {
        console.error("Audio playback suppressed or failed:", e);
    }
};

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        // Play the TV Static scratch immediately on click
        playGlitchSound();

        let newTheme: Theme;
        if (theme === "light") newTheme = "dark";
        else newTheme = "light";

        // If browser doesn't support View Transitions API, just switch theme normally
        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        // Trigger the glitch transition
        document.startViewTransition(() => {
            setTheme(newTheme);
        });
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="fixed top-8 right-8 z-50 rounded-full w-12 h-12 shadow-lg hover:scale-105 transition-transform bg-background/80 backdrop-blur-sm border-foreground/10"
            onClick={toggleTheme}
            title="Toggle Theme"
        >
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
