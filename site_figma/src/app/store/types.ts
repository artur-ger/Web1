export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock_qty: number;
  image_url: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product_name_snapshot: string;
  product_image_snapshot: string;
  quantity: number;
  unit_price_snapshot: number;
  line_total: number;
}

export interface Cart {
  id: string;
  cart_key: string;
  items: CartItem[];
  total_amount: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name_snapshot: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  delivery_comment: string;
  total_amount: number;
  cart_id: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface ApiErrorShape {
  error?: {
    code?: string;
    message?: string;
  };
  message?: string;
}
