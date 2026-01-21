import { createAction, createActionGroup, props } from '@ngrx/store';
import { Product } from '../product.model';

export const productsPageOpened = createAction('[Products Page] Opened');

export const ProductAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    productsFetchedSuccsess: props<{ products: Product[] }>(),
    productsFetchedFailure: props<{ error: string }>(),
  },
});
