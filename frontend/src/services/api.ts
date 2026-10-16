import type { Product } from '../types';

const TOKEN_KEY = 'nk_admin_token';
const ADMIN_USER_KEY = 'nk_admin_user';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export function mediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return apiUrl(path);
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
    credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Request failed.');
  }
  return data as T;
}

function normalizeProduct(p: Product): Product {
  return {
    ...p,
    id: p.id || p.slug || String(p._id || ''),
    _id: p._id ? String(p._id) : p.id,
    description: p.description || p.fullDescription || p.shortDescription || '',
    fullDescription: p.fullDescription || p.description || p.shortDescription || '',
  };
}

export async function loginAdmin(credentials: { email: string; password: string }) {
  const email = (credentials.email || '').trim().toLowerCase();
  const password = credentials.password || '';
  if (!email || !password) {
    throw new Error('Please enter both email and password.');
  }

  const data = await request<{ token: string; user: { id: string; email: string; role: string } }>(
    '/api/admin/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );

  setAdminToken(data.token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.user));
  return { success: true, token: data.token, user: data.user };
}

export async function checkAdminMe() {
  const token = getAdminToken();
  if (!token) throw new Error('Unauthorized');
  return request<{ user: { id: string; email: string; role: string } }>('/api/admin/auth/me');
}

export async function logoutAdmin(): Promise<void> {
  await fetch(apiUrl('/api/admin/auth/logout'), { method: 'POST', credentials: 'include' }).catch(
    () => undefined
  );
  removeAdminToken();
}

export async function fetchPublicProducts(params?: {
  search?: string;
  category?: string;
  brand?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);
  if (params?.brand) query.set('brand', params.brand);
  const qs = query.toString();
  const products = await request<Product[]>(`/api/products${qs ? `?${qs}` : ''}`);
  return products.map(normalizeProduct);
}

export async function fetchPublicProductByIdOrSlug(idOrSlug: string): Promise<Product> {
  const product = await request<Product>(`/api/products/${encodeURIComponent(idOrSlug)}`);
  return normalizeProduct(product);
}

export async function fetchAdminProducts(params?: {
  search?: string;
  category?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);
  const qs = query.toString();
  const products = await request<Product[]>(`/api/admin/products${qs ? `?${qs}` : ''}`);
  return products.map(normalizeProduct);
}

export async function fetchAdminProductById(id: string): Promise<Product> {
  const product = await request<Product>(`/api/admin/products/${encodeURIComponent(id)}`);
  return normalizeProduct(product);
}

export async function createAdminProduct(productData: Partial<Product>): Promise<Product> {
  const data = await request<{ product: Product }>('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
  return normalizeProduct(data.product);
}

export async function updateAdminProduct(id: string, productData: Partial<Product>): Promise<Product> {
  const data = await request<{ product: Product }>(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
  return normalizeProduct(data.product);
}

export async function deleteAdminProduct(id: string): Promise<void> {
  await request(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  const data = await request<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });
  return data.url;
}
