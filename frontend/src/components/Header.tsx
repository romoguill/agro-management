import Avatar from './Avatar';
import sunflower from '../assets/sunflower.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='bg-gray-50 py-2 px-6 border-b border-gray-300'>
      <div className='flex justify-between items-center max-w-7xl'>
        <Link className='flex items-center' to='/'>
          <img className='h-12 w-12' src={sunflower} alt='agro app icon' />
          <h2 className='text-2xl font-semibold text-gray-700'>AGRO</h2>
        </Link>

        <Avatar fallback='RM' />
      </div>
    </header>
  );
}
export default Header;
