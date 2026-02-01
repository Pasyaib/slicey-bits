import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container-portfolio py-16 border-t border-border">
      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {/* Contact */}
        <div>
          <span className="section-label block mb-6">Contact</span>
          <a
            href="mailto:hello@sultanpasya.com"
            className="text-lg font-medium hover:text-muted-foreground transition-colors"
          >
            hello@sultanpasya.com
          </a>
        </div>

        {/* Social */}
        <div>
          <span className="section-label block mb-6">Social</span>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.linkedin.com/in/sultanibrahimpasya/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:text-muted-foreground transition-colors"
              >
                LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/nonamefuvk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:text-muted-foreground transition-colors"
              >
                X
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="md:text-right">
          <span className="section-label block mb-6">© {currentYear}</span>
          <p className="text-muted-foreground">
            Designed & Built by
            <br />
            Sultan Ibrahim Pasya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
