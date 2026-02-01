import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
  link?: string;
}

const ProjectCard = ({ image, title, description, category, link = "#" }: ProjectCardProps) => {
  return (
    <article className="group">
      <div className="overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="project-image group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-medium">{title}</h3>
        <span className="category-tag">{category}</span>
      </div>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      
      <a href={link} className="btn-outline-portfolio">
        View Live Demo
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </article>
  );
};

export default ProjectCard;
