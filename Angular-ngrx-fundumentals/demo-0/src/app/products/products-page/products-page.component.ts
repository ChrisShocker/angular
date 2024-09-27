import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import {
  ProductsApiActions,
  ProductsPageActions,
} from '../state/products.actions';
import {
  selectProducts,
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
  errorMessage = '';

  // the store must be injected into the component
  constructor(private productsService: ProductsService, private store: Store) {
    this.store.subscribe((store) => {
      console.log('Store:', store);
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts());
    this.productsService.getAll().subscribe({
      next: (products) => {
        // add the products to the store
        this.store.dispatch(
          ProductsApiActions.productsLoadSuccess({ products })
        );
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    // dispact an action to trigger the productsReducer
    //  to update the state of the checkbox
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
