import { productIcons } from './productIcons';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    comment?: string;
  };
}

export const orders: Order[] = [
  {
    id: '1',
    number: 'ORD-2026-10234',
    date: '2026-04-12',
    status: 'new',
    total: 3240,
    customer: {
      name: 'Иванов Иван Иванович',
      phone: '+7 (912) 345-67-89',
      email: 'ivanov@example.com',
      address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
      comment: 'Позвоните за 30 минут до доставки',
    },
    items: [
      {
        productId: '5',
        productName: 'Филаментная LED-лампа',
        productImage: productIcons.led5,
        quantity: 2,
        price: 680,
      },
      {
        productId: '7',
        productName: 'Умная LED-лампа RGB',
        productImage: productIcons.smart,
        quantity: 1,
        price: 1580,
      },
      {
        productId: '8',
        productName: 'LED-лампа GU10 spot',
        productImage: productIcons.led8,
        quantity: 1,
        price: 340,
      },
    ],
  },
  {
    id: '2',
    number: 'ORD-2026-10233',
    date: '2026-04-11',
    status: 'processing',
    total: 8960,
    customer: {
      name: 'Петрова Мария Сергеевна',
      phone: '+7 (903) 111-22-33',
      email: 'petrova@example.com',
      address: 'г. Санкт-Петербург, Невский пр., д. 45, офис 301',
    },
    items: [
      {
        productId: '17',
        productName: 'LED-светильник подвесной',
        productImage: productIcons.pendant,
        quantity: 2,
        price: 4200,
      },
      {
        productId: '16',
        productName: 'Диммер для LED-ламп',
        productImage: productIcons.accessory1,
        quantity: 1,
        price: 890,
      },
    ],
  },
  {
    id: '3',
    number: 'ORD-2026-10232',
    date: '2026-04-10',
    status: 'shipped',
    total: 1350,
    customer: {
      name: 'Сидоров Петр Александрович',
      phone: '+7 (985) 777-88-99',
      email: 'sidorov@example.com',
      address: 'г. Екатеринбург, ул. Малышева, д. 23, кв. 77',
    },
    items: [
      {
        productId: '1',
        productName: 'Светодиодная лампа E27 12W',
        productImage: productIcons.led1,
        quantity: 3,
        price: 450,
      },
    ],
  },
];

export const statusNames = {
  new: 'Принят',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};
