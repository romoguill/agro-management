import Avatar from './Avatar';
import sunflower from '../../assets/sunflower.svg';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

interface Props {
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setIsSidebarVisible }: Props) {
  return (
    <header className='bg-gray-50 py-2 px-6 border-b border-gray-300'>
      <div className='flex justify-between items-center max-w-7xl'>
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

        <Avatar fallback='RM' />
      </div>
    </header>
  );
}
export default Header;
