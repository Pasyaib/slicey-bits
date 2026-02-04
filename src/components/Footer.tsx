const Footer = () => {
  return (
    <footer className="container-portfolio py-24 md:py-32">
      {/* Section Label */}
      <div className="mb-8">
        <span className="section-label">(05) — CONTACT</span>
      </div>

      {/* Large Headline */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-16 max-w-4xl">
        Let's build something meaningless together.
      </h2>

      {/* Links */}
      <div className="flex flex-wrap gap-8">
        <a
          href="mailto:Pasyaibrhm@gmail.com"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          Pasyaibrhm@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/sultanibrahimpasya/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://dribbble.com/Pasyaibrhm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-lg font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          Dribbble
        </a>
      </div>
    </footer>
  );
};

export default Footer;
