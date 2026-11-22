export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  descriptionAr: string;
  availability: boolean;
  volume: number; // how much space it takes in the box (1-5)
}

export type ProductCategory =
  | 'all'
  | 'women'
  | 'men'
  | 'beauty'
  | 'baby'
  | 'accessories'
  | 'offers';

export interface BoxItem {
  product: Product;
  quantity: number;
  position?: [number, number, number];
}

export interface CategoryOption {
  id: ProductCategory;
  label: string;
  labelAr: string;
  icon: string;
}

export type Language = 'fr' | 'ar';

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

export interface OrderSummary {
  items: BoxItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}
