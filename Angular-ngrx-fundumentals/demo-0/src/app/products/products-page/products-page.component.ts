import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import {
  selectProducts,
  selectProductsErrorMessage,
  selectProductsLoading,
  selectProductsShowProductCode,
  selectProductsTotal,
} from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  // use the store state of the products
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  // use the store state of the loading
  loading$ = this.store.select(selectProductsLoading);
  // use the store state of the showProductCode
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  // the store must be injected into the component
  constructor(private store: Store) {}

  toggleShowProductCode() {
    // dispact an action to trigger the productsReducer
    //  to update the state of the checkbox
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
