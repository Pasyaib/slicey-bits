import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import projectGodly from "@/assets/project-godly.jpg";
import projectInact from "@/assets/project-inact.jpg";
import projectNiseko from "@/assets/project-niseko.jpg";
import projectQris from "@/assets/project-qris.jpg";
import projectTgv from "@/assets/project-tgv.jpg";

const projects = [
  {
    image: projectGodly,
    title: "Godly",
    description: "Window cleaning & pressure washing services landing page with modern UI design for South Florida market.",
    category: "WEB",
    slug: "godly",
    externalLink: "https://godlywindows.com/",
  },
  {
    image: projectInact,
    title: "InAct HRIS",
    description: "Human Resource Information System mobile app for attendance tracking, scheduling, and employee management.",
    category: "APP",
    slug: "inact",
    externalLink: "https://play.google.com/store/search?q=inact+hris&c=apps&hl=id",
  },
  {
    image: projectNiseko,
    title: "Niseko Home",
    description: "Luxury real estate platform for discovering and investing in exclusive properties in Niseko, Japan.",
    category: "WEB",
    slug: "niseko",
    externalLink: "https://www.figma.com/design/9bwayxQSvhvruNVXB7WGD1/Niseko--Copy-?m=auto&t=LrsjyNC9Dsx2jDp2-6",
    ctaLabel: "Figma File",
  },
  {
    image: projectQris,
    title: "QRIS Online",
    description: "Payment registration flow for QRIS merchant onboarding with document verification and business data collection.",
    category: "APP",
    slug: "qris",
    externalLink: "https://play.google.com/store/apps/details?id=com.interactive.qrisid&hl=id",
  },
  {
    image: projectTgv,
    title: "TGV SNCF",
    description: "Train booking interface redesign for TGV inOui with AI-powered search and modern ticketing experience.",
    category: "APP",
    slug: "tgv",
    status: "MVP Only",
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
