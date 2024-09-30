import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
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
    products: [],
    errorMessage: '',
  })),
  // on load success, update the products in the store and set loading to false
  on(ProductsApiActions.productsLoadSuccess, (state, { products }) => ({
    ...state,
    products: products,
    loading: false,
  })),
  // on load fail, set the error message and set loading to false
  on(ProductsApiActions.productsLoadFail, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false,
  })),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    errorMessage: '',
    loading: true,
  })),
  on(ProductsApiActions.productAddedSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
  })),
  on(ProductsApiActions.productAddedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  }))
);
