import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(selectProductsState, (state) => state.products);

export const selectProductsCount = createSelector(selectProducts, (products) => products.length);

export const selectProductsStatus = createSelector(selectProductsState, (state) => state.status);
