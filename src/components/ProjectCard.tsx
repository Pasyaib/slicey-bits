import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
  externalLink?: string;
  status?: string;
}

const ProjectCard = ({ image, title, description, category, externalLink, status }: ProjectCardProps) => {
  return (
    <article className="group">
      <Dialog>
        <DialogTrigger asChild>
          <div className="block overflow-hidden mb-6 cursor-pointer">
            <img
              src={image}
              alt={title}
              className="project-image group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden border-none bg-transparent shadow-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-medium">{title}</h3>
        <span className="category-tag">{category}</span>
      </div>

      <p className="text-muted-foreground mb-6 max-w-md">
        {description}
      </p>

      {externalLink ? (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-portfolio"
        >
          {ctaLabel}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      ) : status ? (
        <span className="text-sm text-muted-foreground font-mono">
          {status}
        </span>
      ) : null}
    </article>
  );
};

export default ProjectCard;
