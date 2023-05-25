import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function MainLayout() {
  return (
    <>
      <Header />
      <aside></aside>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
