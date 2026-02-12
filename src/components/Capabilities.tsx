import SectionHeader from "./SectionHeader";

const designSkills = [
  "UI & Visual Design",
  "UX Research",
  "Design Systems",
  "Prototyping",
  "Usability Testing",
];

const tools = ["Figma", "Framer", "Jitter", "Antigravity", "AI Studio"];

const Capabilities = () => {
  return (
    <section className="container-portfolio section-spacing">
      <SectionHeader title="Capabilities" number="03" />

      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        <div>
          <span className="section-label block mb-6 pb-4 border-b border-border">
            Design
          </span>
          <ul className="space-y-3">
            {designSkills.map((skill) => (
              <li key={skill} className="text-lg font-medium">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="section-label block mb-6 pb-4 border-b border-border">
            Tools
          </span>
          <ul className="space-y-3">
            {tools.map((tool) => (
              <li key={tool} className="text-lg font-medium">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
