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
    link: "https://www.trynomad.co/",
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
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-border py-2 group"
          >
            <AccordionTrigger className="py-6 hover:no-underline [&[data-state=open]>div>.company-name]:text-foreground">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 w-full text-left pr-4">
                {/* Index Number */}
                <span className="text-xs text-muted-foreground font-mono md:w-12 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Company */}
                {/* @ts-ignore */}
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-name text-xl md:text-2xl font-medium md:flex-1 transition-colors hover:text-foreground group-hover:text-muted-foreground underline decoration-1 underline-offset-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {exp.company} ↗
                  </a>
                ) : (
                  <h3 className="company-name text-xl md:text-2xl font-medium md:flex-1 transition-colors group-hover:text-muted-foreground">
                    {exp.company}
                  </h3>
                )}

                {/* Role - Hidden on mobile, shown in content */}
                <p className="hidden md:block text-sm text-muted-foreground md:w-48 shrink-0">
                  {exp.role}
                </p>

                {/* Period */}
                <p className="text-xs md:text-sm text-muted-foreground md:w-40 shrink-0 md:text-right font-mono">
                  {exp.period}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="overflow-hidden">
              <div className="pb-6 pt-2 pl-0 md:pl-12">
                <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
                  {/* Meta Info */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Role</span>
                      <p className="text-sm font-medium mt-1">{exp.role}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Location</span>
                      <p className="text-sm font-medium mt-1">{exp.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Overview</span>
                    <p className="text-muted-foreground leading-relaxed mt-2 max-w-xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Experience;
