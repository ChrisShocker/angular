import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';

// create a feature selector to select the products state
// takes in the string 'products' which is the name of feature state in the store
export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

// create a selector to select the products from the products state
export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
);

// create a selector to select the products loading state
export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

// create a selector to select the products showProductCode state
export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

// create a selector to select the total of the products
export const selectProductsTotal = createSelector(selectProducts, (products) =>
  sumProducts(products)
);
