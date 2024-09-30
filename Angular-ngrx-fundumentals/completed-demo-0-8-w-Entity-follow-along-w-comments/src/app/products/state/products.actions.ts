import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';
import { Update } from '@ngrx/entity';

// Create all the actions to track for the products page
export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ id: number }>(),
  },
});

// create all the actions to track for the products API
export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load Products': emptyProps(),
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Fail': props<{ message: string }>(),
    'Product Added Success': props<{ product: Product }>(),
    'Product Added Fail': props<{ message: string }>(),
    // Make ts happy by converting from a generic type to a Update<Product> type
    'Product Updated Success': props<{ update: Update<Product> }>(),
    'Product Updated Fail': props<{ message: string }>(),
    'Product Deleted Success': props<{ id: number }>(),
    'Product Deleted Fail': props<{ message: string }>(),
  },
});
