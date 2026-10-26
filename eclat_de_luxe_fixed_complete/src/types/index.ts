export interface ProductShade {
  name: string;
  colorCode: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Lipsticks' | 'Foundations' | 'Eyeshadow' | 'Blush & Highlighters' | 'Makeup Brushes' | 'Skincare';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  formulation: string;
  volume: string;
  bestSeller?: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
  shades?: ProductShade[];
  ingredients: string[];
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface CategoryItem {
  id: string;
  name: 'Lipsticks' | 'Foundations' | 'Eyeshadow' | 'Blush & Highlighters' | 'Makeup Brushes' | 'Skincare';
  subtitle: string;
  image: string;
  productCount: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';
