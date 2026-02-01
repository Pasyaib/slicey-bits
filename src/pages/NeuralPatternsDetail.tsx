import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import neuralPatterns1 from "@/assets/neural-patterns-1.png";
import neuralPatterns2 from "@/assets/neural-patterns-2.png";
import neuralPatterns3 from "@/assets/neural-patterns-3.png";
import neuralPatterns4 from "@/assets/neural-patterns-4.png";
import neuralPatterns5 from "@/assets/neural-patterns-5.png";

const NeuralPatternsDetail = () => {
  const images = [
    neuralPatterns1,
    neuralPatterns2,
    neuralPatterns3,
    neuralPatterns4,
    neuralPatterns5,
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
        <span className="text-xs text-muted-foreground font-mono">03 / 03</span>
      </nav>

      {/* Title Only */}
      <header className="container-portfolio py-12 md:py-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-4">
          3D
        </span>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
          Neural Patterns
        </h1>
      </header>

      {/* Full-bleed Images */}
      <section className="pb-20">
        <div className="space-y-1">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Neural Patterns ${index + 1}`}
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

export default NeuralPatternsDetail;
