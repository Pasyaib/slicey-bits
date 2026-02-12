import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  externalLink?: string;
  status?: string;
}

const ProjectCard = ({ image, title, description, category, externalLink, status, slug }: ProjectCardProps) => {
  return (
    <article className="group">
      <Link to={`/project/${slug}`} className="block overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="project-image group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

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
          View Live
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
