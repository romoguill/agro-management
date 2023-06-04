import { Link } from 'react-router-dom';

export interface MasterDataCardProps {
  title: string;
  description: string;
  link: string;
}

function MasterDataCard({ title, description, link }: MasterDataCardProps) {
  return (
    <Link to={`/master-data/${link}`}>
      <article className='bg-white rounded-r-lg shadow-lg py-2 px-4 h-full border-l-8 border-l-red-400 hover:bg-gray-100'>
        <h2 className='text-2xl font-bold text-primary'>{title}</h2>
        <p className='text-sm mt-2 text-primary-700'>{description}</p>
      </article>
    </Link>
  );
}
export default MasterDataCard;
