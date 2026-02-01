import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
      {/* Back navigation */}
      <nav className="container-portfolio py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </nav>

      {/* Hero */}
      <header className="container-portfolio pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <span className="section-label">3D</span>
          <span className="section-number">2025</span>
        </div>
        <h1 className="mb-8">Neural Patterns</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A study of organic forms and algorithmic structures inspired by neural networks. 
          Each piece explores the intersection of biological patterns and digital aesthetics.
        </p>
      </header>

      {/* Images Grid */}
      <section className="container-portfolio pb-20">
        <div className="grid gap-6">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={img}
                alt={`Neural Patterns ${index + 1}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="container-portfolio py-20 border-t border-border">
        <Link to="/" className="btn-outline-portfolio">
          View All Explorations
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer spacing */}
      <div className="h-16" />
    </main>
  );
};

export default NeuralPatternsDetail;
