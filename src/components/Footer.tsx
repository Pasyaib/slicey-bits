import DinoGame from "./DinoGame";
import ScrambleText from "./ScrambleText";

const Footer = () => {
  return (
    <footer className="container-portfolio py-24 md:py-32">
      {/* Section Label */}
      <div className="mb-8">
        <span className="section-label">(05) — CONTACT</span>
      </div>

      {/* Large Headline */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-16 max-w-4xl">
        <ScrambleText text="Let's build something meaningful together." />
      </h2>

      {/* Links */}
      <div className="flex flex-wrap gap-8">
        <a
          href="mailto:Pasyaibrhm@gmail.com"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          <ScrambleText text="Pasyaibrhm@gmail.com" />
        </a>
        <a
          href="https://www.linkedin.com/in/sultanibrahimpasya/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          <ScrambleText text="LinkedIn" />
        </a>
        <a
          href="https://dribbble.com/Pasyaibrhm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          <ScrambleText text="Dribbble" />
        </a>
        <a
          href="https://layers.to/pasyaibrhm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          <ScrambleText text="Layers" />
        </a>
      </div>

      <div className="mt-24 border-t border-border pt-12 text-center">
        <p className="text-sm md:text-base text-muted-foreground mb-4 font-mono">
          If you're not interested in me, at least please play with my cat.
        </p>
        <DinoGame />
      </div>
    </footer>
  );
};

export default Footer;
