import Navbar from './Navbar';

function Sidebar() {
  return (
    <aside className='flex flex-col w-[300px] h-screen bg-gray-800 text-white'>
      <h3>NAVBAR HEADER</h3>
      <Navbar />
    </aside>
  );
}
export default Sidebar;
