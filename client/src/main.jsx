import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './components/Home'
import Order from './components/Order'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import { ProductProvider } from './Contexts/ProductContext';
import { CartProvider } from './Contexts/CartContext';
import PageError from './components/PageError'
import ProductOverview from './components/ProductOverview'
import ProductLists from './components/ProductLists'
import { ProfileProvider } from './Contexts/ProfileContext';
import ResultList from './components/Navigation/Search/resultList';
import Admin from './components/Admin'
import { AddProvider } from './Contexts/AddContext';
import { AdminProvider } from './Contexts/AdminContext';
import { EditProvider } from './Contexts/EditContext';
import { CommentProvider } from './Contexts/CommentContext';

const role = localStorage.getItem('Role')



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageError />,
  },
  {
    path: "/dang-nhap",
    element: <Login />,
    errorElement: <PageError />,
  },
  {
    path: "/dang-ky",
    element: <Register />,
    errorElement: <PageError />,
  },
  role == 'User' &&
  {
    path: "/don-hang",
    element: <Order />,
    errorElement: <PageError />,
  },
  role == 'User' &&
  {
    path: "/thanh-vien",
    element: <Profile />,
    errorElement: <PageError />,
  },
  {
    path: "/:loai/:ten",
    element: <ProductOverview />,
    errorElement: <PageError />,
  },
  {
    path: "/:loai",
    element: <ProductLists />,
    errorElement: <PageError />,
  }
  ,
  {
    path: "/search",
    element: <ResultList />,
    errorElement: <PageError />,
  },
  role != 'User' &&
  {
    path: "/admin/site/nhan-vien",
    element: <Admin />,
    errorElement: <PageError />,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AdminProvider>
      <ProductProvider>
        <ProfileProvider>
          <CartProvider>
            <CommentProvider>
              <EditProvider>
                <AddProvider>
                  <RouterProvider router={router} />
                </AddProvider>
              </EditProvider>
            </CommentProvider>
          </CartProvider>
        </ProfileProvider>
      </ProductProvider>
    </AdminProvider>
    <Toaster />
  </>
)
