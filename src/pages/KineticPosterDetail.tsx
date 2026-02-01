import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
      {/* Minimal Header */}
      <nav className="container-portfolio py-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <span className="text-xs text-muted-foreground font-mono">02 / 03</span>
      </nav>

      {/* Title Only */}
      <header className="container-portfolio py-12 md:py-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-4">
          Typography
        </span>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
          Kinetic Poster 04
        </h1>
      </header>

      {/* Full-bleed Images */}
      <section className="pb-20">
        <div className="space-y-1">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Kinetic Poster ${index + 1}`}
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

export default KineticPosterDetail;
