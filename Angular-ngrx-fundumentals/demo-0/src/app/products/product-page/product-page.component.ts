import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { selectProductById } from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product$ = this.store.select(selectProductById);

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private store: Store
  ) {}

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

  goToProductsPage = () => this.router.navigate(['/products']);
}
