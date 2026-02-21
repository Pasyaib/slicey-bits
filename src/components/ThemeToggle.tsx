import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
        const newTheme = isDark ? "light" : "dark";

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
