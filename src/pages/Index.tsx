import HeroSection from "@/components/HeroSection";
import SelectedWork from "@/components/SelectedWork";
import Explorations from "@/components/Explorations";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";
import AnimeSection from "@/components/AnimeSection";

import AnimatedSpider from "@/components/AnimatedSpider";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* <AnimatedSpider /> */}
      <HeroSection />
      <SelectedWork />
      <Explorations />
      <Experience />
      <Skills />
      <Capabilities />
      <Capabilities />
      <AnimeSection />
      <Footer />

    </main>
  );
};

export default Index;
