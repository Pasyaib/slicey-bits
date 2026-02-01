import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import explorationDetail1 from "@/assets/exploration-detail-1.png";
import explorationDetail2 from "@/assets/exploration-detail-2.png";
import explorationDetail3 from "@/assets/exploration-detail-3.png";
import explorationDetail4 from "@/assets/exploration-detail-4.png";

const ExplorationDetail = () => {
  const images = [
    explorationDetail1,
    explorationDetail2,
    explorationDetail3,
    explorationDetail4,
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Minimal Header */}
      <nav className="container-portfolio py-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <span className="text-xs text-muted-foreground font-mono">01 / 03</span>
      </nav>

      {/* Title Only */}
      <header className="container-portfolio py-12 md:py-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-4">
          Concept
        </span>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
          Composition Series
        </h1>
      </header>

      {/* Full-bleed Images */}
      <section className="pb-20">
        <div className="space-y-1">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Composition ${index + 1}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="container-portfolio py-12 border-t border-border">
        <Link 
          to="/" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← All Explorations
        </Link>
      </footer>
    </main>
  );
};

export default ExplorationDetail;
