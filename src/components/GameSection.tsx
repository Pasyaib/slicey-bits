import SectionHeader from "./SectionHeader";

const GameSection = () => {
  return (
    <section className="container-portfolio section-spacing">
      <SectionHeader title="Featured Game" number="03" />
      <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <a href="https://shinobi-mbg-shipudden.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
            <img src="https://shinobi-mbg-shipudden.vercel.app/og-image.png" alt="Shinobi Game" className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform" />
          </a>
        </div>
        <div className="flex-1 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shinobi – MBG Shipudden</h2>
          <p className="text-lg mb-4">
            A fast‑paced action RPG built with modern web technologies. Play the demo online, experience fluid combat, and explore the stylized world of Shinobi.
          </p>
          <a href="https://shinobi-mbg-shipudden.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline">
            Play now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
