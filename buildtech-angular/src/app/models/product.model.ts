// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  spec: string;
  price: number;
  cores?: number | null;
  threads?: number | null;
  clock?: string | null;
  description: string;
  fullDescription: string;
  image: string;
}

export interface Category {
  id: string;
  label: string;
}
