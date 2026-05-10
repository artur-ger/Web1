import type { ApiErrorShape, Cart, Category, Order, Product } from './types';

const CATALOG_BASE_URL = import.meta.env.VITE_CATALOG_API_URL || 'http://localhost:3001/api/v1';
const ORDER_BASE_URL = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:3002/api/v1';
const CART_KEY_STORAGE = 'lumen-cart-key';

function buildErrorMessage(errorBody: ApiErrorShape | null, fallback: string): string {
  return errorBody?.error?.message || errorBody?.message || fallback;
}

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  let body: ApiErrorShape | T | null = null;
  try {
    body = (await response.json()) as T;
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(buildErrorMessage(body as ApiErrorShape | null, `HTTP ${response.status}`));
  }

  return body as T;
}

function generateCartKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `cart-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function getCartKey(): string {
  const existing = localStorage.getItem(CART_KEY_STORAGE);
  if (existing) return existing;

  const created = generateCartKey();
  localStorage.setItem(CART_KEY_STORAGE, created);
  return created;
}

export const api = {
  async getCategories(): Promise<Category[]> {
    const result = await fetchJson<{ items: Category[] }>(`${CATALOG_BASE_URL}/categories`);
    return result.items;
  },

  async getProducts(): Promise<Product[]> {
    const result = await fetchJson<{ items: Product[] }>(
      `${CATALOG_BASE_URL}/products?published_only=true`,
    );
    return result.items;
  },

  async getProductById(id: string): Promise<Product> {
    return fetchJson<Product>(`${CATALOG_BASE_URL}/products/${id}`);
  },

  async getCart(cartKey: string): Promise<Cart> {
    return fetchJson<Cart>(`${ORDER_BASE_URL}/cart`, {
      headers: { 'X-Cart-Key': cartKey },
    });
  },

  async addCartItem(cartKey: string, productId: string, quantity: number): Promise<Cart> {
    return fetchJson<Cart>(`${ORDER_BASE_URL}/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Cart-Key': cartKey,
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },

  async updateCartItemQuantity(cartKey: string, itemId: string, quantity: number): Promise<Cart> {
    return fetchJson<Cart>(`${ORDER_BASE_URL}/cart/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Cart-Key': cartKey,
      },
      body: JSON.stringify({ quantity }),
    });
  },

  async removeCartItem(cartKey: string, itemId: string): Promise<Cart> {
    return fetchJson<Cart>(`${ORDER_BASE_URL}/cart/items/${itemId}`, {
      method: 'DELETE',
      headers: { 'X-Cart-Key': cartKey },
    });
  },

  async createOrder(
    cartKey: string,
    payload: {
      customer_name: string;
      customer_phone: string;
      customer_email: string;
      delivery_address: string;
      delivery_comment?: string;
    },
  ): Promise<Order> {
    return fetchJson<Order>(`${ORDER_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Cart-Key': cartKey,
      },
      body: JSON.stringify(payload),
    });
  },

  async getOrderByNumber(orderNumber: string): Promise<Order> {
    return fetchJson<Order>(`${ORDER_BASE_URL}/orders/by-number/${orderNumber}`);
  },
};
