import { Review } from '../reviews/review';

/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode: string;
  description: string;
  price: number;
  quantityInStock?: number;
  hasReviews?: boolean;
  reviews?: Review[];
}

// generic interface for catching data and displaying errors (should be its own file)
export interface Result<T> {
  data: T | undefined;
  error?: string;
}
