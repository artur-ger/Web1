import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { P1_Catalog } from './pages/P1_Catalog';
import { P2_Product } from './pages/P2_Product';
import { P3_Cart } from './pages/P3_Cart';
import { P4_Checkout } from './pages/P4_Checkout';
import { P5_Confirmation } from './pages/P5_Confirmation';

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
]);
