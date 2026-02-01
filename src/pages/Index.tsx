import HeroSection from "@/components/HeroSection";
import SelectedWork from "@/components/SelectedWork";
import Explorations from "@/components/Explorations";
import Capabilities from "@/components/Capabilities";
import FloatingHelpButton from "@/components/FloatingHelpButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SelectedWork />
      <Explorations />
      <Capabilities />
      <FloatingHelpButton />
      
      {/* Footer spacing */}
      <div className="h-32" />
    </main>
  );
};

export default Index;
