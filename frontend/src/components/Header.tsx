import Avatar from './Avatar';
import sunflower from '../assets/sunflower.svg';

function Header() {
  return (
    <header className='bg-gray-50 py-2 px-6'>
      <div className='flex justify-between items-center max-w-7xl'>
        <div className='flex items-center'>
          <img className='h-12 w-12' src={sunflower} alt='agro app icon' />
          <h2 className='text-2xl font-semibold text-gray-700'>AGRO</h2>
        </div>
        <Avatar fallback='RM' />
      </div>
    </header>
  );
}
export default Header;
