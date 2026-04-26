import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { P1_Catalog } from './pages/P1_Catalog';
import { P2_Product } from './pages/P2_Product';
import { P3_Cart } from './pages/P3_Cart';
import { P4_Checkout } from './pages/P4_Checkout';
import { P5_Confirmation } from './pages/P5_Confirmation';
import { A1_Login } from './pages/A1_Login';
import { A2_Products } from './pages/A2_Products';
import { A3_ProductForm } from './pages/A3_ProductForm';
import { A4_Orders } from './pages/A4_Orders';
import { A5_OrderDetail } from './pages/A5_OrderDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: P1_Catalog },
      { path: 'product/:id', Component: P2_Product },
      { path: 'cart', Component: P3_Cart },
      { path: 'checkout', Component: P4_Checkout },
      { path: 'confirmation/:orderNumber', Component: P5_Confirmation },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, Component: A1_Login },
      { path: 'login', Component: A1_Login },
      { path: 'products', Component: A2_Products },
      { path: 'products/:id', Component: A3_ProductForm },
      { path: 'orders', Component: A4_Orders },
      { path: 'orders/:id', Component: A5_OrderDetail },
    ],
  },
]);
