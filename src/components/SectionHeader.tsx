interface SectionHeaderProps {
  title: string;
  number: string;
}

const SectionHeader = ({ title, number }: SectionHeaderProps) => {
  return (
    <div className="section-header mb-12">
      <h2>{title}</h2>
      <span className="section-number">({number})</span>
    </div>
  );
};

export default SectionHeader;
