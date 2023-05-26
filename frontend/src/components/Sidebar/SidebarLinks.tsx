import { NavLink } from 'react-router-dom';
import { RouteLink } from '../../utils/routes';

function SidebarLinks({ path, displayName, Icon }: RouteLink) {
  const commonStyles = `flex gap-4 items-center text-xl text-gray-200 py-2 px-4 my-1 
  rounded-md hover:bg-slate-700 active:bg-slate-600`;
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `text-red-300 ${commonStyles}` : commonStyles
      }
      to={path}
    >
      <Icon />
      <h3>{displayName}</h3>
    </NavLink>
  );
}

export default SidebarLinks;
