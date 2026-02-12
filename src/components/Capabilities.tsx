import SectionHeader from "./SectionHeader";

const skills = [
  "Communication",
  "Design Thinking",
  "User Research",
  "UI & Visual Design",
  "UX Design",
  "Design Systems",
  "Prototyping",
  "Usability Testing",
  "Animation",
];

const tools = [
  "Figma",
  "Framer",
  "Jitter",
  "Whimsical",
  "Miro",
  "Antigravity",
  "AI Studio",
];

const certifications = [
  {
    title: "Certified of UI/UX Design Fullstack",
    issuer: "Rakamin Academy",
    year: "2023",
  },
  {
    title: "Certified of UX Design",
    issuer: "Google / Coursera",
    year: "",
  },
];

const Capabilities = () => {
  return (
    <section className="container-portfolio section-spacing">
      <SectionHeader title="Capabilities" number="03" />

      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {/* Skills */}
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-6">
            Skills
          </h3>
          <ul className="space-y-3">
            {skills.map((skill) => (
              <li key={skill} className="text-lg font-medium">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-6">
            Tools
          </h3>
          <ul className="space-y-3">
            {tools.map((tool) => (
              <li key={tool} className="text-lg font-medium">
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-6">
            Certifications
          </h3>
          <ul className="space-y-6">
            {certifications.map((cert, index) => (
              <li key={index}>
                <p className="text-lg font-medium">{cert.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {cert.issuer} {cert.year && `/ ${cert.year}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
