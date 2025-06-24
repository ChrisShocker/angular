import { Component, computed, inject } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, CommonModule } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, CommonModule],
})
export class ProductDetailComponent {
  // Just enough here for the template to compile

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Product to display
  // use signals instad of the service observable
  product = this.productService.product;
  errorMessage = this.productService.productError;
  // product$ = this.productService.productResult$.pipe(
  //   catchError((error) => {
  //     this.errorMessage = error;
  //     return EMPTY;
  //   })
  // );

  // Set the page title
  // pageTitle = this.product
  //   ? `Product Detail for: ${this.product.productName}`
  //   : 'Product Detail';

  // use signal with dynamic title instead of the static one
  pageTitle = computed(() =>
    this.product() ? `${this.product()?.productName}` : 'Product Details'
  );
  // pageTitle = 'ProductDetail';

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
