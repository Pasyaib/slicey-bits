import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import kineticPoster1 from "@/assets/kinetic-poster-1.png";
import kineticPoster2 from "@/assets/kinetic-poster-2.png";
import kineticPoster3 from "@/assets/kinetic-poster-3.png";
import kineticPoster4 from "@/assets/kinetic-poster-4.png";
import kineticPoster5 from "@/assets/kinetic-poster-5.png";

const KineticPosterDetail = () => {
  const images = [
    kineticPoster1,
    kineticPoster2,
    kineticPoster3,
    kineticPoster4,
    kineticPoster5,
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
          <span className="section-label">TYPOGRAPHY</span>
          <span className="section-number">2025</span>
        </div>
        <h1 className="mb-8">Kinetic Poster 04</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          An exploration of motion and typography through dynamic poster design. 
          Each piece captures the energy of movement through carefully crafted typographic elements.
        </p>
      </header>

      {/* Images Grid */}
      <section className="container-portfolio pb-20">
        <div className="grid gap-6">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={img}
                alt={`Kinetic Poster ${index + 1}`}
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

export default KineticPosterDetail;
