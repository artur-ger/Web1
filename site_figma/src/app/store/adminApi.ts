const ADMIN_BASE = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:3003/api/v1';

interface ApiErrorShape {
  error?: { message?: string };
  message?: string;
}

async function parseJson<T>(response: Response): Promise<T> {
  let body: ApiErrorShape | T | null = null;
  try {
    body = (await response.json()) as T;
  } catch {
    body = null;
  }
  if (!response.ok) {
    const err = body as ApiErrorShape | null;
    throw new Error(err?.error?.message || err?.message || `HTTP ${response.status}`);
  }
  return body as T;
}

function authHeaders(token: string, extra?: HeadersInit): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

export const adminApi = {
  async login(login: string, password: string) {
    const response = await fetch(`${ADMIN_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    return parseJson<{
      access_token: string;
      token_type: string;
      expires_in: string;
      user: { login: string; full_name: string };
    }>(response);
  },

  async getMe(token: string) {
    const response = await fetch(`${ADMIN_BASE}/me`, {
      headers: authHeaders(token),
    });
    return parseJson<{ login: string; role: string; full_name: string }>(response);
  },

  async getCategories(token: string) {
    const response = await fetch(`${ADMIN_BASE}/categories`, {
      headers: authHeaders(token),
    });
    return parseJson<{ items: Array<{ id: string; name: string; slug: string }> }>(response);
  },

  async getProducts(token: string, search?: string) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    const qs = params.toString() ? `?${params}` : '';
    const response = await fetch(`${ADMIN_BASE}/products${qs}`, {
      headers: authHeaders(token),
    });
    return parseJson<{ items: import('./types').Product[]; total: number }>(response);
  },

  async getProduct(token: string, id: string) {
    const response = await fetch(`${ADMIN_BASE}/products/${id}`, {
      headers: authHeaders(token),
    });
    return parseJson<import('./types').Product>(response);
  },

  async createProduct(token: string, payload: Record<string, unknown>) {
    const response = await fetch(`${ADMIN_BASE}/products`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
    return parseJson<import('./types').Product>(response);
  },

  async updateProduct(token: string, id: string, payload: Record<string, unknown>) {
    const response = await fetch(`${ADMIN_BASE}/products/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });
    return parseJson<import('./types').Product>(response);
  },

  async setProductPublished(token: string, id: string, isPublished: boolean) {
    const response = await fetch(`${ADMIN_BASE}/products/${id}/publish`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ is_published: isPublished }),
    });
    return parseJson<import('./types').Product>(response);
  },

  async deleteProduct(token: string, id: string) {
    const response = await fetch(`${ADMIN_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });
    if (!response.ok && response.status !== 204) {
      await parseJson(response);
    }
  },

  async getAdminOrders(token: string, status?: string) {
    const params = new URLSearchParams({ page: '1', page_size: '50' });
    if (status) params.set('status', status);
    const response = await fetch(`${ADMIN_BASE}/orders?${params}`, {
      headers: authHeaders(token),
    });
    return parseJson<{ items: import('./types').Order[]; total: number }>(response);
  },

  async getAdminOrder(token: string, id: string) {
    const response = await fetch(`${ADMIN_BASE}/orders/${id}`, {
      headers: authHeaders(token),
    });
    return parseJson<import('./types').Order>(response);
  },

  async patchOrderStatus(token: string, id: string, status: string) {
    const response = await fetch(`${ADMIN_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ status }),
    });
    return parseJson<import('./types').Order>(response);
  },
};
