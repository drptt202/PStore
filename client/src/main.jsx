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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageError />,
  },
  {
    path: "/dang-nhap",
    element: <Login />,
  },
  {
    path: "/dang-ky",
    element: <Register />,
  },
  {
    path: "/don-hang",
    element: <Order />,
  },
  {
    path: "/thanh-vien",
    element: <Profile />,
  },
  {
    path: "/:loai/:ma",
    element: <ProductOverview />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
)
