import { ArrowUpRight } from "lucide-react";
import ScrambleText from "./ScrambleText";

const HeroSection = () => {
  return (
    <section className="container-portfolio py-24 md:py-36 border-b border-foreground/10">
      {/* Top thin line */}
      <div className="w-full border-t border-foreground pt-4 mb-12 flex justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span>[ 01 // SELECTED PORTFOLIO ]</span>
        <span>SURABAYA, ID</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Category/Roles list (asymmetry) */}
        <div className="md:col-span-4 flex flex-col gap-6 font-mono text-xs text-muted-foreground">
          <div>
            <span className="text-foreground block font-bold mb-1">ROLE /</span>
            UI/UX DESIGNER<br />
            PRODUCT DESIGNER<br />
            INTERACTIVE SYSTEM ARCHITECT
          </div>
          <div>
            <span className="text-foreground block font-bold mb-1">CLIENTS /</span>
            INTERACTIVE / SNCF /<br />
            BLACK ACE MEDIA
          </div>
        </div>

        {/* Right Side: Main typographic headline */}
        <div className="md:col-span-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-12 text-foreground">
            <ScrambleText text="Sultan" /><br />
            <ScrambleText text="Ibrahim" /><br />
            <ScrambleText text="Pasya" />
          </h1>

          {/* Sub-divider line */}
          <div className="w-full border-t border-foreground/20 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
            {/* Description */}
            <div className="md:col-span-5">
              <p className="text-lg md:text-xl font-normal leading-relaxed text-foreground">
                Three years of engineering strategic UI/UX design solutions. Building functional, 
                high-fidelity digital products that bridge the gap between user satisfaction and business scalability.
              </p>
            </div>

            {/* Direct action list (Swiss style table/rows instead of generic buttons) */}
            <div className="md:col-span-3 flex flex-col border-t border-foreground/10 text-sm font-mono divide-y divide-foreground/10">
              <a 
                href="https://wa.me/6285730941680" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span><ScrambleText text="GET IN TOUCH" /></span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="https://www.instagram.com/mediocre.works/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span><ScrambleText text="INSTAGRAM" /></span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="https://dribbble.com/Pasyaibrhm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span><ScrambleText text="DRIBBBLE" /></span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a 
                href="https://layers.to/pasyaibrhm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 hover:text-muted-foreground transition-colors group"
              >
                <span><ScrambleText text="LAYERS" /></span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

