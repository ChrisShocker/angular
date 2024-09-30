import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// use EntityState to define the shape of the state
export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

// define the initial state of the store using entity adapter
// We don't include the ids, this is done automatically by entity
const initialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
});

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
  on(ProductsPageActions.loadProducts, (state) =>
    adapter.setAll([], {
      ...state,
      loading: true,
      // no longer needed at entity will build a dictionary of products for us
      // products: [],
      errorMessage: '',
    })
  ),
  // on load success, update the products in the store and set loading to false
  on(ProductsApiActions.productsLoadedSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      // no longer needed at entity will build a dictionary of products for us
      // products: products,
      loading: false,
    })
  ),
  // on load fail, set the error message and set loading to false
  on(ProductsApiActions.productsLoadedFail, (state, { message }) =>
    adapter.setAll([], {
      ...state,
      // no longer needed at entity will build a dictionary of products for us
      // products: [],
      errorMessage: message,
      loading: false,
    })
  ),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    errorMessage: '',
    loading: true,
  })),
  // we do not mutate state, never use push or anything to modify the state,
  // doing so would violate the immutability of the store
  on(ProductsApiActions.productAddedSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      // products: [...state.products, product],
      loading: false,
    })
  ),

  on(ProductsApiActions.productAddedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  })),

  on(ProductsApiActions.productUpdatedSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
      // products: state.products.map((item) =>
      //   item.id === product.id ? product : item
      // ),
    })
  ),

  on(ProductsApiActions.productUpdatedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  })),

  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    errorMessage: '',
    loading: true,
  })),

  on(ProductsApiActions.productDeletedSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
      // products: state.products.filter((item) => item.id !== id),
    })
  ),

  on(ProductsApiActions.productDeletedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  }))
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectAllProducts = selectAll;
