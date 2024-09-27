import { createAction, createReducer, on } from '@ngrx/store';

export interface ProductsState {
  showProductCode: boolean;
}

const initialState: ProductsState = {
  showProductCode: true,
};

export const productsReducer = createReducer(
  // bad practice, manually define the initial state and use that instead
  // { showProductCode: false }
  initialState,
  /**
   * Syntax shoudld be:
   * [Where event happened] action that should happen
   */
  on(createAction('[Products Page] Toggle Product Code'), (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  }))
);
