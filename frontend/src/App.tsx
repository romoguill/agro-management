import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './contexts/AuthContext';
import AuthGuard from './guards/AuthGuard';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Agriculture from './pages/MasterData/Agriculture';
import CreateEntity from './pages/MasterData/CreateEntity';
import Currencies from './pages/MasterData/Currencies';
import FarmPlots from './pages/MasterData/FarmPlots';
import MasterData from './pages/MasterData/MasterData';
import Products from './pages/MasterData/Products';
import EditEntity from './pages/MasterData/SupplierDetail';
import Suppliers from './pages/MasterData/Suppliers';
import Auth from './pages/UserCredentials/Authenticate';
import SupplierDetail from './pages/MasterData/SupplierDetail';
import ProductDetail from './pages/MasterData/ProductDetail';

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

            <Route path='suppliers'>
              <Route index element={<Suppliers />} />
              <Route path=':_id' element={<SupplierDetail />} />
            </Route>

            <Route path='products'>
              <Route index element={<Products />} />
              <Route path=':_id' element={<ProductDetail />} />
            </Route>

            <Route path='currencies' element={<Currencies />} />
            <Route path='plots' element={<FarmPlots />} />
            <Route path='crops' element={<Agriculture />} />
            <Route path='new' element={<CreateEntity />} />
            <Route path='edit' element={<EditEntity />} />
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
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
