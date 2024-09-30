import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';
// use entity adapter from reducer
import * as fromProducts from './products.reducer';

/**
 * Selectors are pure functions that return slices of the store state.
 * An entire feature state can be selected using the createFeatureSelector function.
 * The createSelector function is used to select specific slices of the state.
 */

// create a feature selector to select the products state
// takes in the string 'products' which is the name of feature state in the store
// use enetity adapter to get the products
export const selectProductsState =
  createFeatureSelector<fromProducts.ProductsState>('products');

// create a selector to select the products from the products state
export const selectProducts = createSelector(
  selectProductsState,
  // Use entity adapter to get all the products
  fromProducts.selectAllProducts
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  // Use entity adapter to get all the products
  fromProducts.selectProductEntities
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

// create a selector to select the error message
export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage
);

// use NgRx router selectors to select the route params
export const { selectRouteParams } = getRouterSelectors();

// create a selector to select a product by id
export const selectProductById = createSelector(
  selectProductsEntities,
  selectRouteParams,
  // use dictionary from entity to find the product by id
  (productsEntities, { id }) => productsEntities[id]
);
