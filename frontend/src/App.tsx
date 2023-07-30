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
import Auth from './pages/UserCredentials/Authenticate';
import MasterData from './pages/MasterData/MasterData';
import Suppliers from './pages/MasterData/Suppliers';
import Products from './pages/MasterData/Products';
import Currencies from './pages/MasterData/Currencies';
import FarmPlots from './pages/MasterData/FarmPlots';
import Agriculture from './pages/MasterData/Agriculture';
import { AuthContextProvider } from './contexts/AuthContext';
import AuthGuard from './guards/AuthGuard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/authenticate' element={<Auth />} />

      <Route element={<AuthGuard />}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='invoices' element={<Invoices />} />
          <Route path='master-data'>
            <Route index element={<MasterData />} />
            <Route path='suppliers' element={<Suppliers />} />
            <Route path='products' element={<Products />} />
            <Route path='currencies' element={<Currencies />} />
            <Route path='plots' element={<FarmPlots />} />
            <Route path='crops' element={<Agriculture />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
