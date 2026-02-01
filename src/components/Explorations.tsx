import SectionHeader from "./SectionHeader";
import ExplorationItem from "./ExplorationItem";
import exploration1 from "@/assets/exploration-1.jpg";
import exploration2 from "@/assets/exploration-2.jpg";
import exploration3 from "@/assets/exploration-3.jpg";

const explorations = [
  {
    images: [exploration1, exploration1, exploration1, exploration1],
    category: "CONCEPT",
    title: "Composition Series",
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
