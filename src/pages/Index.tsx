import HeroSection from "@/components/HeroSection";
import SelectedWork from "@/components/SelectedWork";
import Explorations from "@/components/Explorations";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";
import FloatingHelpButton from "@/components/FloatingHelpButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SelectedWork />
      <Explorations />
      <Experience />
      <Capabilities />
      <Footer />
      <FloatingHelpButton />
    </main>
  );
};

export default Index;
