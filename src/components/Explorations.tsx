import SectionHeader from "./SectionHeader";
import ExplorationItem from "./ExplorationItem";
import exploration3 from "@/assets/exploration-3.jpg";
import explorationDetail1 from "@/assets/exploration-detail-1.png";
import explorationDetail2 from "@/assets/exploration-detail-2.png";
import explorationDetail3 from "@/assets/exploration-detail-3.png";
import explorationDetail4 from "@/assets/exploration-detail-4.png";
import kineticPoster1 from "@/assets/kinetic-poster-1.png";
import kineticPoster2 from "@/assets/kinetic-poster-2.png";
import kineticPoster3 from "@/assets/kinetic-poster-3.png";
import kineticPoster4 from "@/assets/kinetic-poster-4.png";

const explorations = [
  {
    images: [explorationDetail1, explorationDetail2, explorationDetail3, explorationDetail4],
    category: "CONCEPT",
    title: "Composition Series",
    slug: "composition-series",
  },
  {
    images: [kineticPoster1, kineticPoster2, kineticPoster3, kineticPoster4],
    category: "TYPOGRAPHY",
    title: "Kinetic Poster 04",
    slug: "kinetic-poster",
  },
  {
    images: [exploration3, exploration3, exploration3, exploration3],
    category: "3D",
    title: "Neural Patterns",
  },
];

const Explorations = () => {
  return (
    <section className="container-portfolio section-spacing">
      <SectionHeader title="Explorations" number="02" />
      
      <div className="grid md:grid-cols-3 gap-8 md:gap-6">
        {explorations.map((exploration) => (
          <ExplorationItem key={exploration.title} {...exploration} />
        ))}
      </div>
    </section>
  );
};

export default Explorations;
