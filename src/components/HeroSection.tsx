import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="container-portfolio min-h-[80vh] flex flex-col justify-center py-20 md:py-32">
      <div className="max-w-3xl">
        <p className="section-label mb-6">Portfolio 2026</p>
        <h1 className="mb-8">Sultan Ibrahim Pasya</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
          I've been working as a UI/UX Designer for 3 years, creating strategic
          design solutions for companies like InterActive, SNCF, and Black Ace
          Media. I focus on developing designs that meet business needs and
          enhance user experiences.
        </p>
        <Button asChild size="lg" className="gap-2">
          <a href="mailto:sultanibrahimpasya@gmail.com">
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
