import { routesApp } from '../../utils/routes';
import NavLinks from './NavLinks';

function Navbar() {
  return (
    <ul className='px-8 mt-10'>
      {routesApp.map((route) => (
        <li>
          <NavLinks {...route} />
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
