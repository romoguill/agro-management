import { Link } from 'react-router-dom';

interface BreadCrumbProps {
  location: string;
  mainLevelName: string;
  mainLevelPath: string;
}

function BreadCrumb({
  location,
  mainLevelName,
  mainLevelPath,
}: BreadCrumbProps) {
  return (
    <h1 className='text-2xl/none font-section-title font-bold text-gray-800 uppercase mb-5'>
      <span className='text-xl text-gray-600 pr-2 capitalize'>
        <Link to={`/${mainLevelPath}`} className='hover:text-primary pr-2'>
          {mainLevelName}
        </Link>
        /
      </span>
      {location}
    </h1>
  );
}
export default BreadCrumb;
