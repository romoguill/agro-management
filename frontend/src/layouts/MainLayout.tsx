import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';

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
        <main className='p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
