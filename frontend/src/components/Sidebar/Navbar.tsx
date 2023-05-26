import { routesApp } from '../../utils/routes';
import NavLinks from './SidebarLinks';

function Navbar() {
  return (
    <ul className='px-8 mt-10'>
      {routesApp.map((route) => (
        <li key={route.path}>
          <NavLinks {...route} />
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
