import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
}

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
};

export const productsReducer = createReducer(
  // bad practice, manually define the initial state and use that instead
  // { showProductCode: false }
  initialState,
  /**
   * Syntax shoudld be:
   * [Where event happened] action that should happen
   */
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  // on load, set loading to true
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  // on load success, update the products in the store and set loading to false
  on(ProductsApiActions.productsLoadSuccess, (state, { products }) => ({
    ...state,
    products: products,
    loading: false,
  }))
);
