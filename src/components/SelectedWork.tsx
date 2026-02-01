import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import projectBanking from "@/assets/project-banking.jpg";
import projectAI from "@/assets/project-ai.jpg";

const projects = [
  {
    image: projectBanking,
    title: "Aether Banking",
    description: "A futuristic fintech dashboard focusing on negative space and monochromatic data visualization.",
    category: "WEB",
    slug: "aether-banking",
  },
  {
    image: projectAI,
    title: "Ocular AI",
    description: "Interface for a computer vision model, prioritizing readability and real-time inference feedback.",
    category: "AI",
    slug: "ocular-ai",
  },
];

const SelectedWork = () => {
  return (
    <section className="container-portfolio section-spacing">
      <SectionHeader title="Selected Work" number="01" />
      
      <div className="grid md:grid-cols-2 gap-12 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
