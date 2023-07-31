import { routesApp } from '../../utils/routes';
import NavLinks from './SidebarLinks';

type NavbarProps = {
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ setIsSidebarVisible }: NavbarProps) {
  return (
    <ul className='px-8 mt-10'>
      {routesApp.map((route) => (
        <li key={route.path} onClick={() => setIsSidebarVisible(false)}>
          <NavLinks {...route} />
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
