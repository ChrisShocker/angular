export interface Product {
  id: number;
  name: string;
  price: number;
}

export type ProductStatus = {
  type: 'idle' | 'loading' | 'loaded' | 'error';
  message?: string;
};
