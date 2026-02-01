interface ExplorationItemProps {
  images: string[];
  category: string;
  title: string;
}

const ExplorationItem = ({ images, category, title }: ExplorationItemProps) => {
  return (
    <div className="group">
      <div className="grid grid-cols-2 gap-1 mb-4">
        {images.map((img, index) => (
          <div key={index} className="exploration-item aspect-square">
            <img src={img} alt={`${title} ${index + 1}`} />
          </div>
        ))}
      </div>
      <span className="category-tag block mb-1">{category}</span>
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
};

export default ExplorationItem;
