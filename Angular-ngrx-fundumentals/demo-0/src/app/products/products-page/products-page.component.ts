import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  // use the store state of the showProductCode
  showProductCode$ = this.store.select(
    (state: any) => state.products.showProductCode
  );
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
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    // dispact an action to trigger the productsReducer
    //  to update the state of the checkbox
    this.store.dispatch({ type: '[Products Page] Toggle Product Code' });
  }
}
