import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';

function MainLayout() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='grow'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
