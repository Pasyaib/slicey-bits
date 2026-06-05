import ScrambleText from "./ScrambleText";

interface SectionHeaderProps {
  title: string;
  number: string;
}

const SectionHeader = ({ title, number }: SectionHeaderProps) => {
  return (
    <div className="section-header mb-12">
      <h2>
        <ScrambleText text={title} />
      </h2>
      <span className="section-number">
        (<ScrambleText text={number} />)
      </span>
    </div>
  );
};

export default SectionHeader;
