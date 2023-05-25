import { Link } from 'react-router-dom';
import { RouteLink } from '../../utils/routes';

function NavLinks({ path, displayName, Icon }: RouteLink) {
  return (
    <Link className='flex gap-4 items-center text-xl text-gray-200' to={path}>
      <Icon />
      <h3>{displayName}</h3>
    </Link>
  );
}

export default NavLinks;
