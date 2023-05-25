import Navbar from './Navbar';

function Sidebar() {
  return (
    <aside className='flex flex-col w-[300px] h-screen bg-gray-800 text-white'>
      <h3 className='border-b h-[150px]'>NAVBAR HEADER</h3>
      <Navbar />
    </aside>
  );
}
export default Sidebar;
