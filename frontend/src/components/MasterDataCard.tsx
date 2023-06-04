import { Link } from 'react-router-dom';

export interface MasterDataCardProps {
  title: string;
  description: string;
  link: string;
}

function MasterDataCard({ title, description, link }: MasterDataCardProps) {
  return (
    <Link to={`/master-data/${link}`}>
      <article>
        <h2>{title}</h2>
        <p>{description}</p>
      </article>
    </Link>
  );
}
export default MasterDataCard;
