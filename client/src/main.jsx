import React from 'react'
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
import { role } from './store/store';
import { EditProvider } from './Contexts/EditContext';



let router
if (role == 'User') {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <PageError />,
    },
    {
      path: "/dang-nhap",
      element:
        <Login />
    },
    {
      path: "/dang-ky",
      element:
        <Register />

    },
    {
      path: "/don-hang",
      element: <Order />,
    },
    {
      path: "/thanh-vien",
      element:
        <Profile />
    },
    {
      path: "/:loai/:ten",
      element: <ProductOverview />,
    },
    {
      path: "/:loai",
      element: <ProductLists />,
    }
    ,
    {
      path: "/search",
      element: <ResultList />,
    }
  ])
}
else {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <PageError />,
    },
    {
      path: "/admin/site/nhan-vien",
      element: <Admin />,
      errorElement: <PageError />,
    },
    {
      path: "/dang-nhap",
      element:
        <Login />
    },
    {
      path: "/dang-ky",
      element:
        <Register />
    },
  ])
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <ProductProvider>
        <ProfileProvider>
          <CartProvider>
            <EditProvider>
              <AddProvider>
                <RouterProvider router={router} />
              </AddProvider>
            </EditProvider>
          </CartProvider>
        </ProfileProvider>
      </ProductProvider>
    </AdminProvider>
    <Toaster />
  </React.StrictMode>,
)
