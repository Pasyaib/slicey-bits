import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
  slug: string;
}

const ProjectCard = ({ image, title, description, category, slug }: ProjectCardProps) => {
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
      
      <Link to={`/project/${slug}`} className="btn-outline-portfolio">
        View Live Demo
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </article>
  );
};

export default ProjectCard;
