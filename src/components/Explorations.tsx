import SectionHeader from "./SectionHeader";
import ExplorationItem from "./ExplorationItem";
import exploration2 from "@/assets/exploration-2.jpg";
import exploration3 from "@/assets/exploration-3.jpg";
import explorationDetail1 from "@/assets/exploration-detail-1.png";
import explorationDetail2 from "@/assets/exploration-detail-2.png";
import explorationDetail3 from "@/assets/exploration-detail-3.png";
import explorationDetail4 from "@/assets/exploration-detail-4.png";

const explorations = [
  {
    images: [explorationDetail1, explorationDetail2, explorationDetail3, explorationDetail4],
    category: "CONCEPT",
    title: "Composition Series",
    slug: "composition-series",
  },
  {
    images: [exploration2, exploration2, exploration2, exploration2],
    category: "TYPOGRAPHY",
    title: "Kinetic Poster 04",
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
