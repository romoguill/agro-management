import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useState } from 'react';

function MainLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  return (
    <div className='flex'>
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
      <div className='grow'>
        <Header setIsSidebarVisible={setIsSidebarVisible} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
