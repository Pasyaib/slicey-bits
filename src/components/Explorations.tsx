import SectionHeader from "./SectionHeader";
import ExplorationItem from "./ExplorationItem";
import explorationDetail1 from "@/assets/exploration-detail-1.png";
import explorationDetail2 from "@/assets/exploration-detail-2.png";
import explorationDetail3 from "@/assets/exploration-detail-3.png";
import explorationDetail4 from "@/assets/exploration-detail-4.png";
import kineticPoster1 from "@/assets/kinetic-poster-1.png";
import kineticPoster2 from "@/assets/kinetic-poster-2.png";
import kineticPoster3 from "@/assets/kinetic-poster-3.png";
import kineticPoster4 from "@/assets/kinetic-poster-4.png";
import neuralPatterns1 from "@/assets/neural-patterns-1.png";
import neuralPatterns2 from "@/assets/neural-patterns-2.png";
import neuralPatterns3 from "@/assets/neural-patterns-3.png";
import neuralPatterns4 from "@/assets/neural-patterns-4.png";

const explorations = [
  {
    images: [explorationDetail1, explorationDetail2, explorationDetail3, explorationDetail4],
    category: "ADMIN PANEL",
    title: "Awacs Admin Panel",
    slug: "composition-series",
  },
  {
    images: [kineticPoster1, kineticPoster2, kineticPoster3, kineticPoster4],
    category: "ADMIN PANEL",
    title: "F1 Admin Panel",
    slug: "kinetic-poster",
  },
  {
    images: [neuralPatterns1, neuralPatterns2, neuralPatterns3, neuralPatterns4],
    category: "SYSTEM",
    title: "Satcom",
    slug: "neural-patterns",
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
