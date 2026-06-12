// ─── Organization ─────────────────────────────────────────────
export interface OrganizationSettings {
  id: number;
  name: string;
  logo: string | null;
  color_primary: string;
  color_background: string;
  color_surface: string;
  color_text: string;
  is_active: boolean;
}

// ─── User ─────────────────────────────────────────────────────
export interface User {
  id: number;
  telegram_id: number;
  full_name: string;
  username: string | null;
  email: string | null;
  phone_number: string | null;
  lang: string | null;
  address: string | null;
  gender: string | null;
  birth_date: string | null;
  organization_id: number;
  is_active: boolean;
}

// ─── Category / Brand ─────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
}

// ─── Product ──────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  images: string[];       // доп. фото
  volume: string | null;  // "500ml", "1L" и т.д.
  price: number;          // в сумах
  final_price: number;    // цена после скидки
  discount: number | null; // процент скидки, например 15
  category: Category;
  brand: Brand | null;
  is_new: boolean;
  is_hit: boolean;
  in_stock: boolean;
}

// ─── Carousel / Ads ───────────────────────────────────────────
export interface CarouselItem {
  id: number;
  image: string;
  title: string | null;
  subtitle: string | null;
  url: string | null;
}

export interface Ad {
  id: number;
  image: string;
  url: string | null;
}

// ─── Cart ─────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Order ────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;       // цена на момент заказа
  final_price: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  comment: string | null;
  created_at: string;  // ISO datetime
}

// ─── API ──────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// ─── Filters ──────────────────────────────────────────────────
export type ProductFilter = 'all' | 'new' | 'hit' | 'sale' | 'brand';

export interface ProductQueryParams {
  search?: string;
  category?: number;
  brand?: number;
  is_new?: boolean;
  is_hit?: boolean;
  has_discount?: boolean;
  ordering?: string;
  page?: number;
}