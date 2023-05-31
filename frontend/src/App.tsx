import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Authenticate from './pages/UserCredentials/Authenticate';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/authenticate' element={<Authenticate />} />

      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='invoices' element={<Invoices />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
