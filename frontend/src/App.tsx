import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Login from './pages/UserCredentials/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />

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
