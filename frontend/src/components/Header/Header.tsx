import Avatar from './Avatar';
import sunflower from '../../assets/sunflower.svg';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import useAuthContext from '@/hooks/useAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { AuthActionTypes } from '@/contexts/AuthContext';

interface Props {
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setIsSidebarVisible }: Props) {
  const { auth, dispatch } = useAuthContext();

  const getUserInitials = () => {
    if (!auth.user || !auth.user.firstName || !auth.user.lastName) {
      return '...';
    } else {
      return auth.user.firstName[0] + auth.user.lastName[0];
    }
  };

  return (
    <header className='bg-gray-50 py-2 px-6 border-b border-gray-300'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <FaBars
            className='xl:hidden cursor-pointer hover:bg-gray-200 h-10 w-10 p-2 rounded-xl'
            onClick={() => setIsSidebarVisible(true)}
          />
          <Link className='flex items-center' to='/'>
            <img className='h-12 w-12' src={sunflower} alt='agro app icon' />
            <h2 className='text-2xl font-semibold text-gray-700'>AGRO</h2>
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar fallback={getUserInitials()} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='-translate-x-2'>
            <DropdownMenuItem
              onClick={() => dispatch({ type: AuthActionTypes.LOGOUT })}
              className='text-red-600 font-semibold cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-600'
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
export default Header;
