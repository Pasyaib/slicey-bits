import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
          <span className="section-label">CONCEPT</span>
          <span className="section-number">2025</span>
        </div>
        <h1 className="mb-8">Composition Series</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A visual exploration of form, space, and balance through abstract compositions. 
          Each piece investigates the relationship between geometric elements and negative space.
        </p>
      </header>

      {/* Images Grid */}
      <section className="container-portfolio pb-20">
        <div className="grid gap-6">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={img}
                alt={`Composition Series ${index + 1}`}
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

export default ExplorationDetail;
