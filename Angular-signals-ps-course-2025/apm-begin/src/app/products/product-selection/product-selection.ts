import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ReviewList } from '../../reviews/review-list/review-list';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CommonModule, ReviewList],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css',
})
export class ProductSelection {
  private productService = inject(ProductService);

  // call the http resource and issue the request, stops eager loading
  // re-retrieve data when the component is initted and remove it when destroyed
  productsResource = this.productService.createProducts();
  products = this.productsResource.value;

  isLoading = this.productService.productsResource.isLoading;
  error = this.productService.productsResource.error;

  errorMessage = computed(() => (this.error() ? this.error()?.message : ''));

  pageTitle = 'Product Selection';

  selectedProduct = this.productService.selectedProduct;

  // signals must always have a value
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: (p) => 1,
  });

  onIncrease() {
    this.quantity.update((quantity) => quantity + 1);
  }

  onDecrease() {
    this.quantity.update((quantity) => {
      if (quantity > 0) {
        quantity -= 1;
      }
      return quantity;
    });
  }

  // quick trick to debug signals, not this is lazy and is only scheduled to run when the cd has time
  qtyEffect = effect(() => console.log('quantity ' + this.quantity()));

  totalCost = computed(
    () => this.quantity() * (this.selectedProduct()?.price ?? 0),
  );

  color = computed(() => (this.totalCost() > 200 ? 'green' : 'blue'));
}
