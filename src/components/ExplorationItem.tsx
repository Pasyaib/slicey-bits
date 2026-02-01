import { Link } from "react-router-dom";

interface ExplorationItemProps {
  images: string[];
  category: string;
  title: string;
  slug?: string;
}

const ExplorationItem = ({ images, category, title, slug }: ExplorationItemProps) => {
  const content = (
    <div className="group cursor-pointer">
      <div className="grid grid-cols-2 gap-1 mb-4">
        {images.map((img, index) => (
          <div key={index} className="exploration-item aspect-square">
            <img src={img} alt={`${title} ${index + 1}`} />
          </div>
        ))}
      </div>
      <span className="category-tag block mb-1">{category}</span>
      <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors">{title}</h3>
    </div>
  );

  if (slug) {
    return <Link to={`/exploration/${slug}`}>{content}</Link>;
  }

  return content;
};

export default ExplorationItem;
