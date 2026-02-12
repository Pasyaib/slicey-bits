import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import projectBanking from "@/assets/project-banking.jpg";
import projectBankingDetail1 from "@/assets/project-banking-detail-1.jpg";
import projectBankingDetail2 from "@/assets/project-banking-detail-2.jpg";
import projectAI from "@/assets/project-ai.jpg";
import projectAIDetail1 from "@/assets/project-ai-detail-1.jpg";
import projectAIDetail2 from "@/assets/project-ai-detail-2.jpg";

const projects = {
  "inact": {
    title: "InAct HRIS",
    category: "APP",
    year: "2024",
    hero: projectBanking, // Placeholder
    description: "Human Resource Information System mobile app for attendance tracking, scheduling, and employee management.",
    role: "Lead UI/UX Designer",
    duration: "3 months",
    team: "2 designers, 4 developers",
    images: [projectBankingDetail1, projectBankingDetail2], // Placeholder
    overview: "InAct HRIS streamlines HR processes by providing a comprehensive mobile solution for employee management. It simplifies attendance tracking, leave requests, and scheduling, making HR tasks efficient and accessible.",
    challenge: "Managing a disparate workforce with varying schedules and attendance needs was complex and error-prone. The challenge was to create a unified system that catered to both office and field employees.",
    solution: "We designed a mobile-first experience with geofencing for accurate attendance, an intuitive shift management interface, and real-time notifications for approval workflows.",
  },
  "godly": {
    title: "Godly",
    category: "WEB",
    year: "2024",
    hero: projectAI, // Placeholder
    description: "Window cleaning & pressure washing services landing page with modern UI design for South Florida market.",
    role: "UI/UX Designer",
    duration: "2 weeks",
    team: "Solo Designer",
    images: [projectAIDetail1, projectAIDetail2], // Placeholder
    overview: "Godly is a premium service provider for window cleaning and pressure washing. The website was designed to reflect their high-quality service and attract high-end clients in the South Florida market.",
    challenge: "The local market is competitive, and standing out required a brand image that communicated trust and excellence. The website needed to convert visitors into leads effectively.",
    solution: "We utilized a clean, modern aesthetic with high-quality imagery and a clear value proposition. The booking flow was streamlined to maximize conversion rates.",
  },
  "niseko": {
    title: "Niseko Home",
    category: "WEB",
    year: "2024",
    hero: projectBanking, // Placeholder
    description: "Luxury real estate platform for discovering and investing in exclusive properties in Niseko, Japan.",
    role: "UI/UX Designer",
    duration: "1 month",
    team: "2 designers",
    images: [projectBankingDetail1, projectBankingDetail2], // Placeholder
    overview: "Niseko Home is the premier destination for luxury real estate in Niseko. The platform offers an exclusive selection of properties for discerning investors and homeowners.",
    challenge: "Presenting detailed property information and high-value investment opportunities in a way that feels exclusive and trustworthy.",
    solution: "We focused on a visual-first approach with immersive property galleries and detailed neighborhood guides to give users a sense of place and value.",
  },
  "qris": {
    title: "QRIS Online",
    category: "APP",
    year: "2023",
    hero: projectAI, // Placeholder
    description: "Payment registration flow for QRIS merchant onboarding with document verification and business data collection.",
    role: "UI/UX Designer",
    duration: "2 months",
    team: "3 designers, 5 developers",
    images: [projectAIDetail1, projectAIDetail2], // Placeholder
    overview: "QRIS Online simplifies the merchant onboarding process for QRIS payments. It guides business owners through document submission and verification seamlessly.",
    challenge: "The regulatory requirements for merchant onboarding are complex and can be daunting for small business owners.",
    solution: "We broke down the registration process into simple, guided steps with clear instructions and immediate feedback on document validity.",
  },
  "tgv": {
    title: "TGV SNCF",
    category: "APP",
    year: "2023",
    hero: projectBanking, // Placeholder
    description: "Train booking interface redesign for TGV inOui with AI-powered search and modern ticketing experience.",
    role: "UI/UX Designer",
    duration: "3 months",
    team: "4 designers",
    images: [projectBankingDetail1, projectBankingDetail2], // Placeholder
    overview: "The TGV SNCF app redesign focused on improving the booking experience and integrating smart features for travelers.",
    challenge: "Users often found the existing booking flow cumbersome, especially for complex itineraries.",
    solution: "We introduced AI-powered search suggestions and a streamlined booking flow that remembers user preferences and travel history.",
  },
  "aether-banking": {
    title: "Aether Banking",
    category: "WEB",
    year: "2025",
    hero: projectBanking,
    description: "A futuristic fintech dashboard focusing on negative space and monochromatic data visualization. The project aimed to redefine how users interact with their financial data through a minimalist yet powerful interface.",
    role: "Lead UI/UX Designer",
    duration: "4 months",
    team: "3 designers, 5 developers",
    images: [projectBankingDetail1, projectBankingDetail2],
    overview: "Aether Banking reimagines the traditional banking dashboard with a focus on clarity and user empowerment. By stripping away visual clutter and emphasizing key financial metrics, users can make informed decisions at a glance.",
    challenge: "Traditional banking interfaces overwhelm users with information, making it difficult to focus on what matters. The challenge was to present complex financial data in an intuitive, scannable format without sacrificing functionality.",
    solution: "We developed a modular card-based system with progressive disclosure, allowing users to dive deeper into data only when needed. The monochromatic palette reduces cognitive load while strategic use of accent colors highlights actionable items.",
  },
  "ocular-ai": {
    title: "Ocular AI",
    category: "AI",
    year: "2025",
    hero: projectAI,
    description: "Interface for a computer vision model, prioritizing readability and real-time inference feedback. Designed for machine learning engineers and researchers who need to monitor model performance at scale.",
    role: "UI/UX Designer",
    duration: "3 months",
    team: "2 designers, 4 ML engineers",
    images: [projectAIDetail1, projectAIDetail2],
    overview: "Ocular AI provides a comprehensive visualization platform for computer vision models, enabling real-time monitoring of inference pipelines, model accuracy, and system performance.",
    challenge: "Computer vision systems generate massive amounts of data that need to be visualized in real-time. Engineers required a dashboard that could display complex metrics without overwhelming them during critical debugging sessions.",
    solution: "We created a hierarchical information architecture that surfaces critical alerts immediately while allowing deep dives into specific model behaviors. The dark interface reduces eye strain during extended monitoring sessions.",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return (
      <div className="container-portfolio min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Back navigation */}
      <nav className="container-portfolio py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </nav>

      {/* Hero */}
      <header className="container-portfolio pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <span className="section-label">{project.category}</span>
          <span className="section-number">{project.year}</span>
        </div>
        <h1 className="mb-8">{project.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {project.description}
        </p>
      </header>

      {/* Hero Image */}
      <section className="container-portfolio pb-20">
        <div className="overflow-hidden">
          <img
            src={project.hero}
            alt={project.title}
            className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* Project Info */}
      <section className="container-portfolio pb-20">
        <div className="grid md:grid-cols-3 gap-8 border-t border-border pt-8">
          <div>
            <span className="section-label block mb-3">Role</span>
            <p className="font-medium">{project.role}</p>
          </div>
          <div>
            <span className="section-label block mb-3">Duration</span>
            <p className="font-medium">{project.duration}</p>
          </div>
          <div>
            <span className="section-label block mb-3">Team</span>
            <p className="font-medium">{project.team}</p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-portfolio pb-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6">Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Detail Images */}
      <section className="container-portfolio pb-20">
        <div className="grid gap-6">
          {project.images.map((img, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={img}
                alt={`${project.title} detail ${index + 1}`}
                className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="container-portfolio pb-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="container-portfolio py-20 border-t border-border">
        <Link
          to="/"
          className="btn-outline-portfolio"
        >
          View All Projects
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer spacing */}
      <div className="h-16" />
    </main>
  );
};

export default ProjectDetail;
