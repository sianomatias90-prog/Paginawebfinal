export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image_urls: string[];
  category: string;
  material: string;
  colors: string[];
  min_order: number;
  active: boolean;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  customization: string;
}

export interface SiteConfig {
  whatsapp_number: string;
  store_name: string;
  store_tagline: string;
  store_email: string;
  store_instagram: string;
}

export type Page = 'home' | 'catalog' | 'product' | 'admin';
