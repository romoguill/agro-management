import { routesApp } from '../../utils/routes';
import NavLinks from './NavLinks';

function Navbar() {
  return (
    <ul>
      {routesApp.map((route) => (
        <li>
          <NavLinks {...route} />
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
