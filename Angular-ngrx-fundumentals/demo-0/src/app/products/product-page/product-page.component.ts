import { Component } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import {
  selectProductById,
  selectProductsErrorMessage,
  selectProductsLoading,
} from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product$ = this.store.select(selectProductById);
  loading$ = this.store.select(selectProductsLoading);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) {}

  addProduct(product: Product) {
    // this.productsService.add(product).subscribe(this.goToProductsPage);
    // use the store to dispatch an action to add a product
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }
}
