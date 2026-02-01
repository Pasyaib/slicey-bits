import SectionHeader from "./SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const experiences = [
  {
    company: "InterActive",
    role: "Product Designer / Fulltime",
    period: "Sept 2023 — Nov 2024",
    location: "Surabaya",
    description: "Worked as UI/UX Designer responsible for end-to-end design processes across multiple digital products. Conducted user and competitor research, created wireframes and interactive prototypes, built scalable design systems.",
  },
  {
    company: "The Nomad cast",
    role: "UI Designer / Freelancer",
    period: "Mei 2024 — Juni 2024",
    location: "San Florida",
    description: "Designed company profile.",
  },
  {
    company: "Godly",
    role: "UI Designer / Freelancer",
    period: "Mei 2024 — Juni 2024",
    location: "San Florida",
    description: "Designed company profile.",
  },
  {
    company: "Direction Excellence TGV-INTERCITÉS SNCF",
    role: "UI Designer / Freelancer",
    period: "Mei 2024 — Juni 2024",
    location: "French",
    description: "Designed the UI MVP (Minimum Viable Product) for a ticket ordering system.",
  },
  {
    company: "Digital Prodigies",
    role: "UI Designer / Freelancer",
    period: "Sept 2023 — Nov 2023",
    location: "Bekasi",
    description: "Designed landing pages for a new creative agency. Designed a CRUD Dashboard for the Papua government CMS project.",
  },
  {
    company: "Pt. Triniti Terang Teknologi (toxxo)",
    role: "UI Designer / Freelancer",
    period: "Mar 2023",
    location: "Jakarta",
    description: "Created UI/UX for a luxury lifestyle voucher membership app, encompassing component and design system creation.",
  },
  {
    company: "Black ace media",
    role: "UI Designer / Freelancer",
    period: "Feb 2023 — Mar 2023",
    location: "Toronto",
    description: "Designed journaling app interfaces and layouts.",
  },
  {
    company: "SosialKit",
    role: "Designer / Part time",
    period: "Feb 2023 — Juni 2023",
    location: "International",
    description: "Created high-fidelity UI mockups and visual assets for promotional and showcase purposes.",
  },
];

const Experience = () => {
  return (
    <section className="container-portfolio section-spacing">
      <SectionHeader title="Experience" number="03" />

      <Accordion type="single" collapsible className="w-full">
        {experiences.map((exp, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
            <AccordionTrigger className="py-6 hover:no-underline group">
              <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-4 md:gap-8 w-full text-left pr-4">
                <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors">
                  {exp.company}
                </h3>
                <p className="text-sm text-muted-foreground">{exp.role}</p>
                <p className="text-sm text-muted-foreground md:text-right">{exp.period}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8">
                <p className="text-sm text-muted-foreground">{exp.location}</p>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Experience;
