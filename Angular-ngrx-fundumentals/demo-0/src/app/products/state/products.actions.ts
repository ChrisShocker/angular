import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';

// Create all the actions to track for the products page
export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ product: Product }>(),
  },
});

// create all the actions to track for the products API
export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Load Success': props<{ products: Product[] }>(),
    'Products Load Fail': props<{ message: string }>(),
    'Product Added Success': props<{ products: Product }>(),
    'Product Added Fail': props<{ message: string }>(),
    'Product Updated Success': props<{ products: Product }>(),
    'Product Updated Fail': props<{ message: string }>(),
    'Product Deleted Success': props<{ products: Product }>(),
    'Product Deleted Fail': props<{ message: string }>(),
  },
});
