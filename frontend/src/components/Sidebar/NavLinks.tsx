import { Link } from 'react-router-dom';
import { RouteLink } from '../../utils/routes';

function NavLinks({ path, displayName, Icon }: RouteLink) {
  return (
    <Link
      className='flex gap-4 items-center text-xl text-gray-200 py-2 px-4 my-1 
        rounded-md hover:bg-slate-700 active:bg-slate-600'
      to={path}
    >
      <Icon />
      <h3>{displayName}</h3>
    </Link>
  );
}

export default NavLinks;
